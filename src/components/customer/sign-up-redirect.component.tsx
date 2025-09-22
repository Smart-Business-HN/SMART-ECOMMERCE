'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface SignUpRedirectProps {
  children: React.ReactNode;
}

export default function SignUpRedirect({ children }: SignUpRedirectProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirigir si ya está logueado
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      router.push('/profile');
    }
  }, [status, session, router]);

  // Mostrar loading mientras se verifica la sesión
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-5 md:pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center py-8">
            <p className="text-gray-600">Verificando sesión...</p>
          </div>
        </div>
      </div>
    );
  }

  // No mostrar el formulario si ya está autenticado
  if (status === 'authenticated') {
    return null;
  }

  return <>{children}</>;
}
