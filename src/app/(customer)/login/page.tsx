'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Typography, Alert } from '@/utils/MTailwind';
import { loginUser } from '@/services/auth.service';
import { LoginUserCommand } from '@/interfaces/auth/auth.interface';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginUserCommand>({
    userName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<'username' | 'email'>('username');

  const handleInputChange = (field: keyof LoginUserCommand, value: string) => {
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
      const response = await loginUser(formData);
      
      if (response.succeeded && response.data) {
        // Guardar datos del usuario en localStorage o contexto
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
        
        // Redirigir a la tienda o página principal
        router.push('/tienda');
      } else {
        setError(response.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Iniciar Sesión
          </Typography>
          <Typography color="gray" className="font-normal">
            Ingresa tus credenciales para acceder
          </Typography>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de método de login */}
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('username')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === 'username'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Usuario
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === 'email'
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
              <Alert color="red" className="text-sm">
                {error}
              </Alert>
            )}

            {/* Botón de envío */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center">
            <Typography variant="small" color="gray" className="font-normal">
              ¿No tienes una cuenta?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Regístrate aquí
              </a>
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}