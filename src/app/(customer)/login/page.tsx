// @ts-nocheck
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import { Card, Input, Button, Typography, Alert } from '@/utils/MTailwind';
import { LoginEcommerceUserCommand } from '@/interfaces/auth/auth.interface';
import { loginUser } from '@/services/auth.service';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginEcommerceUserCommand>({
    userName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<'username' | 'email'>('username');
  const handleInputChange = (field: keyof LoginEcommerceUserCommand, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Limpiar error al escribir
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Validación básica
    if (!formData.password) {
      setError('La contraseña es requerida');
      setIsLoading(false);
      return;
    }
    if (loginMethod === 'username' && !formData.userName) {
      setError('El nombre de usuario es requerido');
      setIsLoading(false);
      return;
    }
    if (loginMethod === 'email' && !formData.email) {
      setError('El correo electrónico es requerido');
      setIsLoading(false);
      return;
    }
    try {
      // Primero validar con el backend para obtener el mensaje de error específico
      const loginData: LoginEcommerceUserCommand = {
        password: formData.password,
        ...(loginMethod === 'email' 
          ? { email: formData.email }
          : { userName: formData.userName }
        ),
      };

      const response = await loginUser(loginData);
      if (!response.succeeded) {
        // Mostrar el mensaje específico del backend
        setError(response.statusText || 'Error de autenticación');
        return;
      }

      // Si el backend valida correctamente, proceder con NextAuth
      const result = await signIn('credentials', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        loginMethod: loginMethod,
        redirect: false
      });
      
      if (result?.ok) {
        // Verificar que la sesión se creó correctamente
        const session = await getSession();
        if (session) {
          router.push('/tienda');
        } else {
          setError('Error al crear la sesión. Por favor, intenta de nuevo.');
        }
      } else {
        setError('Error inesperado. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-50 py-5 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="p-6" placeholder="">
          <div className="text-center pt-4">
            <Typography variant="h2" color="blue-gray" className="" placeholder="">
              Iniciar Sesión
            </Typography>
            <Typography color="gray" className="font-normal" placeholder="">
              Ingresa tus credenciales para acceder
            </Typography>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            {/* Selector de método de login */}
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('username')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${loginMethod === 'username'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Usuario
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${loginMethod === 'email'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Email
              </button>
            </div>
            {/* Campo de usuario o email */}
            {loginMethod === 'username' ? (
              <Input
                type="text"
                label="Nombre de Usuario"
                value={formData.userName || ''}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                required
                disabled={isLoading}
              />
            ) : (
              <Input
                type="email"
                label="Correo Electrónico"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isLoading}
              />
            )}
            {/* Campo de contraseña */}
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
            </div>
            {/* Mensaje de error */}
            {error && (
              <Alert color="red" className="text-sm text-center p-2">
                {error}
              </Alert>
            )}
            <div className="flex justify-end mt-2">
              <Link href="/recuperar-contrasena">
                <Typography variant="small" className="font-normal hover:cursor-pointer hover:text-blue-500" placeholder="">
                  ¿Olvidaste tu contraseña?
                </Typography>
              </Link>
            </div>
            {/* Botón de envío */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
              disabled={isLoading}
              placeholder=""
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          {/* Enlaces adicionales */}
          <div className="mt-6 text-center">
            <Typography variant="small" color="gray" className="font-normal" placeholder="">
              ¿No tienes una cuenta?{' '}
              <a href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
                Regístrate aquí
              </a>
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}