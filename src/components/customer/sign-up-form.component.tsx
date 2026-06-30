//@ts-nocheck
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { createUser } from '@/services/auth.service';
import { CreateEcommerceUserCommand } from '@/interfaces/auth/auth.interface';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { trackFbEvent } from '@/lib/meta/fbpixel';
import Link from 'next/link';
import Button from '@/components/ui/button.component';

interface SignUpFormProps {
  departments: { id: number; name: string }[];
  genders: { id: number; name: string }[];
}

const labelCls = 'block text-[13px] font-semibold text-ink2-700 mb-[7px]';
const inputCls =
  'sb-in w-full rounded-[11px] border border-line-input bg-white px-3.5 py-3 text-[14.5px] text-text outline-none placeholder:text-ink2-400';

export default function SignUpForm({ departments, genders }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateEcommerceUserCommand>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    genderId: 1,
    departmentId: 0,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (field: keyof CreateEcommerceUserCommand, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handlePhoneChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4) + '-' + formattedValue.substring(4, 8);
    }
    handleInputChange('phoneNumber', formattedValue);
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('El Email es requerido.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El Email no es valido.');
      return false;
    }
    if (!formData.password) {
      setError('La Contraseña es requerida.');
      return false;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return false;
    }
    if (formData.password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (!formData.firstName.trim()) {
      setError('Primer Nombre es requerido.');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('El apellido es requerido');
      return false;
    }
    if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
      setError('El número telefónico es requerido.');
      return false;
    }
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('El número telefónico debe tener el formato 0000-0000.');
      return false;
    }
    if (!formData.genderId) {
      setError('El género es requerido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await createUser(formData);

      if (response.succeeded && response.data) {
        // Meta Pixel: CompleteRegistration (navegador + Conversions API con dedup).
        trackFbEvent('CompleteRegistration', { status: true }, {
          email: formData.email,
          phone: formData.phoneNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        const loginResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          loginMethod: 'email',
          redirect: false,
        });

        if (loginResult?.ok) {
          router.push('/tienda');
        } else {
          router.push('/login?message=Registro exitoso. Por favor, inicia sesión.');
        }
      } else {
        setError(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error?.errors?.[0] || 'Error en el registro. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-[30px] font-bold tracking-[-0.02em] text-text">Crear cuenta</h1>
      <p className="mt-1.5 text-[15px] text-ink2-500">
        Únete y compra más rápido con precios para empresas.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="su-first" className={labelCls}>Nombre</label>
            <input
              id="su-first"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Tu nombre"
              required
              disabled={isLoading}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="su-last" className={labelCls}>Apellido</label>
            <input
              id="su-last"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Tu apellido"
              required
              disabled={isLoading}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="su-email" className={labelCls}>Correo</label>
          <input
            id="su-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="tucorreo@empresa.com"
            required
            disabled={isLoading}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="su-phone" className={labelCls}>Teléfono</label>
          <input
            id="su-phone"
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="0000-0000"
            required
            disabled={isLoading}
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="su-gender" className={labelCls}>Género</label>
            <select
              id="su-gender"
              value={formData.genderId}
              onChange={(e) => handleInputChange('genderId', parseInt(e.target.value))}
              disabled={isLoading}
              className={inputCls}
            >
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="su-dept" className={labelCls}>Departamento (opcional)</label>
            <select
              id="su-dept"
              value={formData.departmentId}
              onChange={(e) => handleInputChange('departmentId', parseInt(e.target.value))}
              disabled={isLoading}
              className={inputCls}
            >
              <option value={0}>Selecciona…</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="su-pass" className={labelCls}>Contraseña</label>
          <div className="relative">
            <input
              id="su-pass"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className={inputCls + ' pr-11'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink2-400 hover:text-ink2-600"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <p className="mt-1.5 text-[12.5px] text-ink2-400">
            Mínimo 8 caracteres, una mayúscula y un dígito.
          </p>
        </div>

        <div>
          <label htmlFor="su-confirm" className={labelCls}>Confirmar contraseña</label>
          <div className="relative">
            <input
              id="su-confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className={inputCls + ' pr-11'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink2-400 hover:text-ink2-600"
            >
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]">{error}</p>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
          {isLoading ? 'Creando cuenta...' : 'Crear mi cuenta'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[14px] text-ink2-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="sb-link font-semibold text-accent">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
