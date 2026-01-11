# Smart Business E-Commerce - Copilot Instructions

## Project Overview
A Next.js 15 e-commerce platform for a Honduran technology provider (networking, surveillance, fiber optics, IT solutions). Uses NextAuth.js for authentication, Material Tailwind for UI, and communicates with a .NET backend API.

## Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│ Next.js App Router (Frontend)                           │
├────────────────────┬────────────────────┬───────────────┤
│ Public Routes      │ Protected Routes   │ API Routes    │
│ /, /tienda        │ /profile, /cart    │ /api/auth/*   │
│ /servicios        │ (require session)  │ /api/cart/*   │
│ /contacto         │                    │ /api/products │
└────────────────────┴────────────────────┴───────────────┘
                     ↓
        ┌────────────────────────────┐
        │ Services Layer             │
        │ (Server Actions via 'use server')
        ├────────────────────────────┤
        │ - auth.service.ts          │
        │ - products.service.tsx     │
        │ - cart.service.tsx         │
        │ - categories.service.tsx   │
        └────────────────────────────┘
                     ↓
        ┌────────────────────────────┐
        │ .NET Backend API           │
        │ NEXT_PUBLIC_API_BASE_URL   │
        │ https://api.smartbusiness  │
        └────────────────────────────┘
```

## Key Conventions & Patterns

### 1. Server Components by Default
- **All services** are marked `'use server'` (see `src/services/`)
- Client components use `'use client'` ONLY for Web APIs, state, or interactions
- Server-side data fetching via server components reduces client bundle size
- Example: `getProductsEcommerce()` in [products.service.tsx](src/services/products.service.tsx) is a server action

### 2. Authentication Flow (NextAuth.js 4.24)
**Credentials Provider** → Backend Login → JWT Token + Session

```typescript
// Session includes: id, email, firstName, lastName, customType, activeCartId, accessToken
// Access via: const session = await getServerSession(config)
// In clients: const { data: session } = useSession()
```

**Key Files:**
- [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts) - NextAuth config, credentials provider
- [src/types/next-auth.d.ts](src/types/next-auth.d.ts) - Custom session/JWT types (includes customerType, accessToken)
- [src/middleware.ts](src/middleware.ts) - Route protection (allows `/login`, `/register`, `/tienda`, `/contacto`, etc.)

### 3. API Communication Pattern
**Server-side fetching with dual URL resolution:**

```typescript
// In services: Use isServer() to determine URL
const url = isServer 
  ? getApiUrl(`/api/products/${slug}`)      // Absolute URL (server-to-server)
  : `/api/products/${slug}`;                // Relative URL (client-to-proxy)

// Authorized requests include Bearer token from session
const token = session?.accessToken;
const headers = { 'Authorization': `Bearer ${token}` }
```

- **Production API:** Configured in `next.config.ts` env vars
- **Development API:** `https://localhost:7211/api/v2` (backend runs on port 7211)
- See [server-url.ts](src/utils/server-url.ts) and [fetch-config.ts](src/utils/fetch-config.ts) for URL resolution

### 4. Component Structure
**Directory structure follows Next.js conventions:**

```
src/components/
├── customer/           # Auth-related: sign-up, profile, cart
├── home/              # Homepage sections
├── store/             # Product listing, filters, pagination
├── shared/            # Nav, footer, cart drawer (used everywhere)
└── providers/         # NextAuth SessionProvider
```

**Naming:** Use kebab-case for directories, PascalCase for `.component.tsx` files (e.g., `sign-up-form.component.tsx`)

### 5. Styling & UI
- **Tailwind CSS** + **Material Tailwind** components
- Mobile-first responsive design
- Examples: [MaterialTailwind components](https://www.material-tailwind.com/) imported from `@/utils/MTailwind`
- Global styles in [src/app/globals.css](src/app/globals.css)

### 6. Type System
- **Interfaces over Types:** Use `interface` for object contracts
- **No Enums:** Use maps/objects instead (e.g., `const genderMap = { 1: 'Male', 2: 'Female' }`)
- Interfaces organized in [src/interfaces/](src/interfaces/) by domain (auth, cart, product, http)

**Example Data Structures:**

```typescript
// Auth
interface SessionEcommerceUserDto {
  id: string; firstName: string; email: string; 
  token: string; customerType?: { id: number; name: string };
}

// Products
interface ProductDto {
  id: string; name: string; price: number; slug: string;
  image?: string; description?: string;
}

// Cart
interface CartDto {
  id: string; customerId: string; cartItems?: CartItemDto[];
}
```

See [src/interfaces/auth/](src/interfaces/auth/), [product/](src/interfaces/product/), [cart/](src/interfaces/cart/) for full definitions.

## Development Workflow

### Build & Run
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Run production build
npm run lint         # Run ESLint
```

**Turbopack enabled:** `dev` script uses `--turbopack` for faster rebuilds

### Environment Setup
`.env.local` required (see [AUTH_SETUP.md](AUTH_SETUP.md)):
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-unique-key>
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Database & Cart Management
- **Cart operations:** `src/services/cart.service.tsx` - requires authenticated session
- **Backend-driven:** Cart state stored in backend, synced via `getCartsByCustomerId()`

## Critical Integration Points

### 1. Backend API Contracts
**Login Endpoint:** `POST /api/auth/ecommerce-login`
- Request: `{ userName?: string, email?: string, password: string }`
- Response: `{ succeeded: bool, data: SessionEcommerceUserDto, errors?: [] }`

**Products Endpoint:** `GET /api/products?pageNumber&pageSize&isUserSignIn&customerTypeId`
- Returns: `{ succeeded: bool, data: ProductDto[], totalItems: number, pageSize: number }`

**Cart Endpoints:** `GET /api/cart/GetCarts/{customerId}` (requires Bearer token)

See [services/](src/services/) for full endpoint signatures.

### 2. Environment Variations
- **Development:** Backend on localhost:7211
- **Production:** `https://api.smartbusiness.site/api/v2`
- **Self-signed certs:** Set `ALLOW_SELF_SIGNED_CERT=true` only if needed

### 3. Deployment
- Standalone output mode (`output: 'standalone'` in next.config.ts)
- Docker support (see [Dockerfile](Dockerfile), [docker-compose.yml](docker-compose.yml))
- Vercel-compatible with dynamic URLs for Vercel deployments

## Common Tasks

### Add a New Product Filter
1. Extend `getProductsEcommerce()` parameters in [products.service.tsx](src/services/products.service.tsx)
2. Update client call in store page component
3. Pass new params to backend API

### Add Protected Route
1. Create route in `src/app/(customer)/` (already protected by middleware)
2. Add session check: `const session = await getServerSession(config)`
3. Redirect if !session: `redirect('/login')`

### Access User Data in Client Component
```typescript
'use client';
import { useSession } from 'next-auth/react';
export default function Profile() {
  const { data: session } = useSession();
  return <div>{session?.user?.email}</div>;
}
```

### Fetch Data Server-Side
```typescript
const response = await getProductsEcommerce(1, 20);
if (response.succeeded) {
  // Use response.data (ProductDto[])
}
```

## Known Patterns & Gotchas

1. **Always check `succeeded` flag** in backend responses before accessing `.data`
2. **Session expiration:** Configured in backend; token refresh handled by NextAuth
3. **Cart operations:** Always retrieve current session to get `accessToken` for authorization
4. **Image optimization:** Remote images must be whitelisted in `next.config.ts` remotePatterns
5. **TypeScript strict mode enabled:** Use proper typing, no `any` without justification

## References

- [Next.js 15 Docs](https://nextjs.org/docs)
- [NextAuth.js 4 Docs](https://next-auth.js.org/v4)
- [Material Tailwind Docs](https://www.material-tailwind.com/)
- [Cursor Rules](src/.cursor/rules/next-js-rule.mdc) - Team's TypeScript & React conventions
