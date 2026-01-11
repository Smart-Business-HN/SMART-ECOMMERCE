import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Aquí puedes agregar lógica adicional si es necesario
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acceso a rutas públicas
        const publicPaths = ['/login', '/register', '/', '/tienda', '/servicios', '/quienes-somos', '/contacto', '/terminos-y-condiciones'];
        const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));
        
        if (isPublicPath) {
          return true;
        }

        // Para rutas protegidas, verificar que el token existe
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
