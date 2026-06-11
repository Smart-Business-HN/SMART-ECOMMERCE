//@ts-nocheck
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, Input, Button, Typography, Alert, Select, Option } from '@/utils/MTailwind';
import { createUser } from '@/services/auth.service';
import { CreateEcommerceUserCommand, DepartmentDto } from '@/interfaces/auth/auth.interface';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { trackFbEvent } from '@/lib/meta/fbpixel';

interface SignUpFormProps {
  departments: { id: number; name: string }[];
  genders: { id: number; name: string }[];
}

export default function SignUpForm({ departments, genders }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateEcommerceUserCommand>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    genderId: 1,
    departmentId: 0
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (field: keyof CreateEcommerceUserCommand, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Limpiar error al escribir
  };

  const handlePhoneChange = (value: string) => {
    // Formatear automáticamente el número de teléfono
    let formattedValue = value.replace(/\D/g, ''); // Solo números
    
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4) + '-' + formattedValue.substring(4, 8);
    }
    
    handleInputChange('phoneNumber', formattedValue);
  };

  const validateForm = () => {
    // Validación de Email
    if (!formData.email.trim()) {
      setError('El Email es requerido.');
      return false;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El Email no es valido.');
      return false;
    }

    // Validación de Password
    if (!formData.password) {
      setError('La Contraseña es requerida.');
      return false;
    }

    // Validación de contraseña: al menos 8 caracteres, una mayúscula y un número
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return false;
    }

    // Validación de confirmación de contraseña
    if (formData.password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    // Validación de FirstName
    if (!formData.firstName.trim()) {
      setError('Primer Nombre es requerido.');
      return false;
    }

    // Validación de LastName
    if (!formData.lastName.trim()) {
      setError('El apellido es requerido');
      return false;
    }

    // Validación de PhoneNumber (requerido según backend)
    if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
      setError('El número telefónico es requerido.');
      return false;
    }

    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('El número telefónico debe tener el formato 0000-0000.');
      return false;
    }

    // Validación de género
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

    // Aplicar validaciones del backend
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await createUser(formData);
      
      if (response.succeeded && response.data) {
        // Meta Pixel: CompleteRegistration (navegador + Conversions API con dedup).
        // El teléfono está disponible aquí, así que se incluye para Advanced Matching.
        trackFbEvent('CompleteRegistration', { status: true }, {
          email: formData.email,
          phone: formData.phoneNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        // Login automático después del registro exitoso
        const loginResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          loginMethod: 'email',
          redirect: false
        });

        if (loginResult?.ok) {
          router.push('/tienda');
        } else {
          // Si el login automático falla, redirigir al login
          router.push('/login?message=Registro exitoso. Por favor, inicia sesión.');
        }
      } else {
        setError(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.errors[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6" placeholder="">
      <div className="text-center pt-4">
        <Typography variant="h2" color="blue-gray" className="" placeholder="">
          Crear Cuenta
        </Typography>
        <Typography color="gray" className="font-normal" placeholder="">
          Completa tus datos para registrarte
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        {/* Nombre y Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Nombre"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            type="text"
            label="Apellido"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <Input
          type="email"
          label="Correo Electrónico"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          disabled={isLoading}
        />

        {/* Teléfono */}
        <Input
          type="tel"
          label="Número de Teléfono"
          placeholder="0000-0000"
          value={formData.phoneNumber || ''}
          onChange={(e) => handlePhoneChange(e.target.value)}
          required
          disabled={isLoading}
        />

        {/* Género */}
        <Select
          label="Género"
          value={formData.genderId}
          onChange={(value) => handleInputChange('genderId', parseInt(value))}
          disabled={isLoading}
        >
          {genders.map((gender) => {
            return (
              <Option key={gender.id} value={gender.id}>
                {gender.name}
              </Option>
            );
          })}
        </Select>

        {/* Departamento */}
        <Select
          label="Departamento (Opcional)"
          value={formData.departmentId}
          onChange={(value) => handleInputChange('departmentId', parseInt(value))}
          disabled={isLoading}
        >
          {departments.map((dept) => {
            return (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            );
          })}
        </Select>

        {/* Contraseña */}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            disabled={isLoading}
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            }
          />
          <Typography variant="small" color="gray" className="mt-1" placeholder="">
            Debe tener mínimo 8 caracteres, mayúsculas y un digito.
          </Typography>
        </div>

        {/* Confirmar Contraseña */}
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            icon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            }
          />
        </div>

        {/* Mensaje de error */}
        {error && (
          <Alert color="red" className="text-sm">
            {error}
          </Alert>
        )}

        {/* Botón de envío */}
        <Button
          type="submit"
          className="w-full"
          color="blue"
          size="lg"
          disabled={isLoading}
          placeholder=""
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      </form>

      {/* Enlaces adicionales */}
      <div className="mt-6 text-center">
        <Typography variant="small" color="gray" className="font-normal" placeholder="">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Inicia sesión aquí
          </a>
        </Typography>
      </div>
    </Card>
  );
}
