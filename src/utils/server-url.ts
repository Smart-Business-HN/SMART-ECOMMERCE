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
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // En Vercel, podemos usar VERCEL_URL si está disponible
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Último fallback - usar un dominio genérico
  console.warn('Using fallback URL. Please set NEXT_PUBLIC_APP_URL environment variable.');
  return 'https://www.smartbusiness.site';
}

/**
 * Construye una URL completa para API routes en Server Components
 */
export function getApiUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
} 