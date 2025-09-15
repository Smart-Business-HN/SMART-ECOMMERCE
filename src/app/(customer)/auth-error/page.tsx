//@ts-nocheck
'use client';
import { useSearchParams } from 'next/navigation';
import { Card, Typography, Button, Alert } from '@/utils/MTailwind';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Credenciales inválidas. Verifica tu usuario/email y contraseña.';
      case 'CallbackRouteError':
        return 'Error en el servidor. Por favor, intenta de nuevo.';
      case 'Configuration':
        return 'Error de configuración del servidor.';
      case 'AccessDenied':
        return 'Acceso denegado.';
      case 'Verification':
        return 'Error de verificación.';
      default:
        return 'Error de autenticación. Por favor, intenta de nuevo.';
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-5 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="p-6" placeholder="">
          <div className="text-center pt-4">
            <Typography variant="h2" color="red" className="" placeholder="">
              Error de Autenticación
            </Typography>
            <Typography color="gray" className="font-normal mt-2" placeholder="">
              {getErrorMessage(error)}
            </Typography>
          </div>
          
          <div className="mt-6 space-y-4">
            <Alert color="red" className="text-sm">
              {getErrorMessage(error)}
            </Alert>
            
            <div className="flex flex-col space-y-2">
              <Link href="/login">
                <Button 
                  color="blue" 
                  size="lg" 
                  className="w-full"
                  placeholder=""
                >
                  Intentar de nuevo
                </Button>
              </Link>
              
              <Link href="/sign-up">
                <Button 
                  variant="outlined" 
                  color="blue" 
                  size="lg" 
                  className="w-full"
                  placeholder=""
                >
                  Crear cuenta
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
