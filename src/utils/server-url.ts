// @ts-nocheck
import { headers } from 'next/headers';

/**
 * Obtiene la URL base de la aplicación de manera dinámica
 * Funciona en desarrollo, producción y previews de Vercel
 */
export function getBaseUrl(): string {
  // Si tenemos la variable de entorno configurada, la usamos
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // En desarrollo, usar localhost
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://localhost:3000';
//   }

  // En producción/preview, intentar detectar automáticamente
  try {
    debugger;
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    
    if (host) {
      return `${protocol}://${host}`;
    }
  } catch (error) {
    console.warn('Could not detect host from headers:', error);
  }

  // Fallback para casos donde no se puede detectar
  throw new Error('NEXT_PUBLIC_APP_URL is not configured and could not detect host automatically');
}

/**
 * Construye una URL completa para API routes en Server Components
 */
export function getApiUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
} 