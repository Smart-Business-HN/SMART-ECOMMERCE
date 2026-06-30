// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';
import { LoginEcommerceUserCommand } from '@/interfaces/auth/auth.interface';
import { loginUser } from '@/services/auth.service';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AuthShell from '@/components/auth/auth-shell.component';
import Button from '@/components/ui/button.component';

const labelCls = 'block text-[13px] font-semibold text-ink2-700 mb-[7px]';
const inputCls =
  'sb-in w-full rounded-[11px] border border-line-input bg-white px-3.5 py-3 text-[14.5px] text-text outline-none placeholder:text-ink2-400';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<LoginEcommerceUserCommand>({
    userName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<'username' | 'email'>('username');

  // Redirigir si ya está logueado
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      router.push('/profile');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-24 text-ink2-500">
        Verificando sesión...
      </div>
    );
  }
  if (status === 'authenticated') {
    return null;
  }

  const handleInputChange = (field: keyof LoginEcommerceUserCommand, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
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
      const loginData: LoginEcommerceUserCommand = {
        password: formData.password,
        ...(loginMethod === 'email'
          ? { email: formData.email }
          : { userName: formData.userName }),
      };

      const response = await loginUser(loginData);
      if (!response.succeeded) {
        setError(response.statusText || 'Error de autenticación');
        return;
      }

      const result = await signIn('credentials', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        loginMethod: loginMethod,
        redirect: false,
      });

      if (result?.ok) {
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
    <AuthShell>
      <h1 className="text-[30px] font-bold tracking-[-0.02em] text-text">Iniciar sesión</h1>
      <p className="mt-1.5 text-[15px] text-ink2-500">Bienvenido de nuevo. Ingresa tus datos.</p>

      {/* Google OAuth no está configurado en el backend (solo Credentials). Botón inerte. */}
      <button
        type="button"
        disabled
        title="Próximamente"
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-[11px] border border-line-input bg-white py-3 text-[15px] font-semibold text-ink2-700 opacity-60"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
        </svg>
        Continuar con Google
      </button>

      <div className="my-6 flex items-center gap-3 text-[12.5px] text-ink2-400">
        <span className="h-px flex-1 bg-line" />
        o con tu correo
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selector de método de login */}
        <div className="flex rounded-[11px] border border-line p-1">
          <button
            type="button"
            onClick={() => setLoginMethod('username')}
            className={`flex-1 rounded-[8px] py-2 text-[14px] font-semibold transition-colors ${
              loginMethod === 'username' ? 'bg-accent text-white' : 'text-ink2-600 hover:text-text'
            }`}
          >
            Usuario
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 rounded-[8px] py-2 text-[14px] font-semibold transition-colors ${
              loginMethod === 'email' ? 'bg-accent text-white' : 'text-ink2-600 hover:text-text'
            }`}
          >
            Email
          </button>
        </div>

        <div>
          <label htmlFor="login-id" className={labelCls}>
            {loginMethod === 'username' ? 'Usuario' : 'Correo'}
          </label>
          <input
            id="login-id"
            type={loginMethod === 'username' ? 'text' : 'email'}
            value={(loginMethod === 'username' ? formData.userName : formData.email) || ''}
            onChange={(e) =>
              handleInputChange(loginMethod === 'username' ? 'userName' : 'email', e.target.value)
            }
            placeholder={loginMethod === 'username' ? 'tuusuario' : 'tucorreo@empresa.com'}
            required
            disabled={isLoading}
            className={inputCls}
          />
        </div>

        <div>
          <div className="mb-[7px] flex items-center justify-between">
            <label htmlFor="login-password" className={labelCls + ' mb-0'}>
              Contraseña
            </label>
            <Link href="/recuperar" className="sb-link text-[13px] font-medium text-accent">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
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
        </div>

        {error && (
          <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]">{error}</p>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[14px] text-ink2-500">
        ¿No tienes cuenta?{' '}
        <Link href="/sign-up" className="sb-link font-semibold text-accent">
          Regístrate
        </Link>
      </p>
    </AuthShell>
  );
}
