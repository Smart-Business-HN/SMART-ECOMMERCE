# Configuración de Autenticación con NextAuth.js

## Resumen
Se ha implementado un sistema de autenticación completo usando NextAuth.js que se integra con el backend de ecommerce. El sistema permite login tanto con nombre de usuario como con email.

## Archivos Modificados/Creados

### 1. Interfaces TypeScript (`src/interfaces/auth/auth.interface.ts`)
- `LoginEcommerceUserCommand`: Comando para login (coincide con el backend)
- `SessionEcommerceUserDto`: DTO de sesión del usuario (coincide con el backend)
- `CustomerType`: Tipo de cliente
- `LoginResponse`: Respuesta del login

### 2. Configuración NextAuth (`src/app/api/auth/[...nextauth]/route.ts`)
- Provider de credenciales personalizado
- Callbacks JWT y Session para manejar datos adicionales del usuario
- Configuración de páginas de login y error

### 3. Tipos NextAuth (`src/types/next-auth.d.ts`)
- Extensión de tipos para incluir datos personalizados del usuario
- Soporte para token, fecha de expiración, tipo de cliente, etc.

### 4. Página de Login (`src/app/(customer)/login/page.tsx`)
- Interfaz de usuario actualizada para usar NextAuth
- Soporte para login con usuario o email
- Manejo de errores mejorado

### 5. Servicio de Autenticación (`src/services/auth.service.ts`)
- Actualizado para usar las nuevas interfaces
- Mejor manejo de errores

### 6. Middleware (`src/middleware.ts`)
- Protección de rutas
- Configuración de rutas públicas y protegidas

### 7. Provider de Sesión (`src/components/providers/session-provider.tsx`)
- Wrapper para SessionProvider de NextAuth

### 8. Layout Principal (`src/app/layout.tsx`)
- Integración del AuthProvider

## Variables de Entorno Requeridas

Crea un archivo `.env.local` con las siguientes variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Uso en Componentes

### Obtener Sesión del Usuario
```typescript
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Cargando...</p>;
  if (status === 'unauthenticated') return <p>No autenticado</p>;
  
  return <p>Bienvenido {session?.user?.name}!</p>;
}
```

### Login Programático
```typescript
import { signIn, signOut } from 'next-auth/react';

// Login
const result = await signIn('credentials', {
  userName: 'usuario',
  password: 'contraseña',
  loginMethod: 'username',
  redirect: false
});

// Logout
await signOut();
```

### Datos Adicionales del Usuario
La sesión incluye datos adicionales del backend:
- `accessToken`: Token JWT del backend
- `expirationDate`: Fecha de expiración del token
- `customerType`: Tipo de cliente
- `firstName`: Nombre del usuario
- `lastName`: Apellido del usuario
- `userName`: Nombre de usuario

## Rutas Protegidas

El middleware protege automáticamente las rutas que no están en la lista de rutas públicas:
- `/login`, `/register`, `/`, `/tienda`, `/servicios`, `/quienes-somos`, `/contacto`, `/terminos-y-condiciones`

## Backend Integration

El sistema se conecta al endpoint `/api/auth/ecommerce-login` del backend que espera:

**Request:**
```json
{
  "userName": "string (opcional)",
  "email": "string (opcional)", 
  "password": "string (requerido)"
}
```

**Response:**
```json
{
  "succeeded": true,
  "message": "string",
  "data": {
    "id": "guid",
    "firstName": "string",
    "lastName": "string", 
    "fullName": "string",
    "userName": "string",
    "email": "string",
    "photo": "string (opcional)",
    "token": "string",
    "expirationDate": "datetime",
    "customerType": {
      "id": "number",
      "name": "string",
      "isActive": "boolean"
    }
  }
}
```

## Próximos Pasos

1. Configurar las variables de entorno
2. Probar el login con credenciales válidas
3. Implementar logout en la barra de navegación
4. Agregar protección a rutas específicas según el tipo de cliente
5. Implementar registro de usuarios
6. Agregar recuperación de contraseña
