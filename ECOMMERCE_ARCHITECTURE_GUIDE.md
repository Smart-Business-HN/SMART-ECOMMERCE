# SMART E-COMMERCE - Next.js Architecture Guide

## Document Purpose

This document serves as the **authoritative reference** for understanding and working with the SMART E-commerce Next.js application. It is designed for:

1. **Senior Front-End Architects** - To understand architectural decisions and patterns
2. **AI Agents** - To work autonomously on features without degrading performance, SEO, or security
3. **Development Teams** - To maintain consistency and follow established patterns

---

## Table of Contents

1. [Repository & Stack Analysis](#1-repository--stack-analysis)
2. [Application Architecture](#2-application-architecture)
3. [Rendering Strategy & Performance](#3-rendering-strategy--performance)
4. [State Management & Data Fetching](#4-state-management--data-fetching)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [SEO & Metadata Strategy](#6-seo--metadata-strategy)
7. [Conventions & Standards](#7-conventions--standards)
8. [AI Agent Guidelines](#8-ai-agent-guidelines)

---

## 1. Repository & Stack Analysis

### 1.1 Technology Stack

#### Core Framework
- **Next.js 16.1.1** - Latest App Router with React Server Components
- **React 19.2.3** - Latest React with Server Components and Actions
- **TypeScript 5** - Strict type checking enabled
- **Node.js** - ES2017 target

#### Build & Development
- **Turbopack** - Next-generation bundler (enabled in dev mode via `--turbopack`)
- **HTTPS in Development** - `--experimental-https` flag enabled for local SSL
- **Standalone Output** - `output: 'standalone'` for optimized Docker deployments

#### UI & Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Material Tailwind 2.1.10** - React component library based on Material Design
- **Geist Font** - Custom Google Fonts (Geist Sans & Geist Mono)
- **Heroicons** - Icon library for React

#### Authentication & Session Management
- **NextAuth.js 4.24.11** - Complete authentication solution
- **JWT Strategy** - Token-based session management (30-day expiration)
- **Credentials Provider** - Custom authentication against .NET backend

#### State Management & Data Fetching
- **Server Components** - Primary rendering strategy (default)
- **Server Actions** - `'use server'` directive for data mutations
- **URL State Management** - `nuqs 2.4.3` for URL-based state synchronization
- **React Hooks** - `useState`, `useEffect` for client-side state

#### Analytics & Monitoring
- **Vercel Analytics 1.5.0** - Performance and user analytics
- **Google Tag Manager** - Marketing and conversion tracking
- **Microsoft Clarity** - User behavior analytics
- **Google Analytics 4** - Website analytics

#### API Integration
- **.NET 9.0 Backend** - RESTful API at `https://localhost:7211/api/v2` (dev) or `https://api.smartbusiness.site/api/v2` (prod)
- **Next.js API Routes** - Proxy layer for backend communication
- **Azure Blob Storage** - Product image hosting

### 1.2 Project Structure

```
c:\Repos\SMART\SMART-ECOMMERCE\
│
├── src/
│   ├── app/                          # Next.js App Router (file-based routing)
│   │   ├── (branding)/              # Route group - marketing pages
│   │   │   ├── contacto/
│   │   │   ├── quienes-somos/
│   │   │   ├── servicios/
│   │   │   └── terminos-y-condiciones/
│   │   │
│   │   ├── (customer)/              # Route group - authenticated customer area
│   │   │   ├── auth-error/
│   │   │   ├── cart/[id]/          # Dynamic route - cart by ID
│   │   │   ├── login/
│   │   │   ├── profile/
│   │   │   ├── sign-up/
│   │   │   └── layout.tsx          # Shared layout for customer routes
│   │   │
│   │   ├── (store)/                # Route group - product catalog
│   │   │   └── tienda/
│   │   │       ├── buscar/         # Search results page
│   │   │       ├── [category]/     # Dynamic route - category pages
│   │   │       │   ├── [subcategory]/
│   │   │       │   │   ├── [product]/  # Product detail page (SSG)
│   │   │       │   │   │   └── page.tsx
│   │   │       │   │   └── page.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── layout.tsx      # Store layout with sidebar
│   │   │       └── page.tsx        # Store homepage with products grid
│   │   │
│   │   ├── api/                    # Next.js API Routes (Backend Proxy)
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/  # NextAuth.js dynamic route
│   │   │   │   ├── ecommerce-login/
│   │   │   │   ├── ecommerce-register/
│   │   │   │   └── user/[id]/
│   │   │   ├── cart/
│   │   │   ├── categories/
│   │   │   ├── departments/
│   │   │   └── products/
│   │   │       ├── category/[slug]/
│   │   │       ├── subcategory/[slug]/
│   │   │       ├── search/
│   │   │       ├── [slug]/         # Product by slug
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx              # Root layout (SEO, fonts, providers)
│   │   ├── page.tsx                # Homepage (/) with hero & branding
│   │   ├── not-found.tsx           # 404 page
│   │   ├── globals.css             # Global Tailwind styles
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── components/                 # React Components
│   │   ├── customer/               # Customer-specific components
│   │   ├── home/                   # Homepage sections
│   │   ├── providers/              # Context providers (SessionProvider)
│   │   ├── shared/                 # Shared components (navbar, footer)
│   │   └── store/                  # E-commerce components (product cards, grids)
│   │
│   ├── services/                   # Data fetching services
│   │   ├── auth.service.ts         # Authentication API calls
│   │   ├── cart.service.tsx
│   │   ├── products.service.tsx    # Server Actions for products
│   │   ├── categories.service.tsx
│   │   └── user.service.tsx
│   │
│   ├── interfaces/                 # TypeScript interfaces
│   │   ├── auth/
│   │   ├── product/
│   │   └── http/
│   │
│   ├── utils/                      # Utility functions
│   │   ├── server-url.ts           # Dynamic URL resolution
│   │   ├── fetch-config.ts         # Global fetch configuration
│   │   ├── number-format.ts
│   │   └── string.utils.ts
│   │
│   ├── auth.config.ts              # NextAuth configuration
│   └── types/
│       └── next-auth.d.ts          # NextAuth TypeScript extensions
│
├── public/                         # Static assets
│   └── images/
│
├── certificates/                   # Local HTTPS certificates
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json
├── .env.local                      # Environment variables (gitignored)
└── AUTH_SETUP.md                   # Authentication implementation guide
```

### 1.3 Key Configuration Files

#### `next.config.ts`
```typescript
{
  output: 'standalone',                    // Optimized for Docker/containerization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'grupoplatino.blob.core.windows.net' },
      { protocol: 'https', hostname: 'smarterpstorage.blob.core.windows.net' }
    ]
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'https://localhost:7211/api/v2' (dev),
    NEXTAUTH_URL: 'https://www.smartbusiness.site',
    NEXTAUTH_SECRET: '...'
  },
  logging: {
    fetches: { fullUrl: true }             // Debug fetch requests
  }
}
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]                   // Path alias for imports
    }
  }
}
```

---

## 2. Application Architecture

### 2.1 App Router Structure

This application uses **Next.js 15+ App Router** with the following architectural decisions:

#### Route Groups
Route groups organize pages without affecting the URL structure:

1. **(branding)** - Marketing/informational pages
   - `/contacto`, `/quienes-somos`, `/servicios`
   - **Purpose**: Corporate information, SEO-optimized static content
   - **Rendering**: Static Site Generation (SSG)

2. **(customer)** - Authenticated user area
   - `/login`, `/sign-up`, `/profile`, `/cart/[id]`
   - **Purpose**: User authentication and account management
   - **Rendering**: Client-side rendering with auth guards
   - **Layout**: `(customer)/layout.tsx` provides shared customer UI

3. **(store)** - Product catalog
   - `/tienda`, `/tienda/[category]`, `/tienda/[category]/[subcategory]`, `/tienda/[category]/[subcategory]/[product]`
   - **Purpose**: E-commerce product browsing and discovery
   - **Rendering**: Mixed (SSR for listings, SSG for product pages)

#### Dynamic Routes
```
/tienda/[category]/[subcategory]/[product]
   │         │            │            └─ Slug-based product detail
   │         │            └─ Subcategory filter
   │         └─ Category filter
   └─ Store root
```

**Example URL**: `/tienda/redes/switches/ubiquiti-us-24-250w`

- `category`: "redes" (networks)
- `subcategory`: "switches"
- `product`: "ubiquiti-us-24-250w"

### 2.2 Rendering Strategy

#### Server Components (Default)
**95% of components are Server Components** - This is the recommended pattern:

```typescript
// src/app/(store)/tienda/[category]/[subcategory]/[product]/page.tsx
export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const session = await getServerSession(authOptions); // Server-only API

  const response = await getProductBySlug(product, isUserSignIn, customerTypeId);

  return (
    <main>
      <h1>{response.data.name}</h1>
      {/* Static HTML rendered on server */}
    </main>
  );
}
```

**Benefits**:
- Zero JavaScript sent to client for static content
- Faster Time to First Byte (TTFB)
- Direct backend access without API routes
- SEO-friendly (fully rendered HTML)

#### Client Components
Only use `'use client'` when absolutely necessary:

```typescript
// src/app/(store)/tienda/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function Store() {
  const [products, setProducts] = useState<ProductDto[]>([]);

  // Client-side interactivity required here
  const loadProducts = async (page: number) => {
    const response = await getProductsEcommerce(page, 20);
    setProducts(response.data);
  };

  return <ProductsGrid products={products} />;
}
```

**Use `'use client'` when**:
- Using React hooks (`useState`, `useEffect`, `useContext`)
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`, `document`)
- Third-party libraries requiring browser environment

### 2.3 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Client Components          Server Components (RSC)              │
│  ┌──────────────┐          ┌──────────────────────┐            │
│  │  useState()  │          │  Direct data fetch   │            │
│  │  useEffect() │          │  await fetch(...)    │            │
│  │  onClick     │          │  No client JS        │            │
│  └──────┬───────┘          └──────────┬───────────┘            │
│         │                              │                         │
│         │ fetch('/api/...')           │ Server-side only       │
│         ▼                              ▼                         │
├─────────────────────────────────────────────────────────────────┤
│                   Next.js Server (Middleware)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  API Routes (Proxy Layer)         Server Actions                │
│  ┌─────────────────────┐          ┌────────────────┐           │
│  │ /api/products       │          │ 'use server'   │           │
│  │ /api/auth/[...]     │          │ async function │           │
│  │ /api/cart           │          │ getProducts()  │           │
│  └──────────┬──────────┘          └────────┬───────┘           │
│             │                                │                   │
│             │ HTTP Proxy                     │ Direct call      │
│             ▼                                ▼                   │
├─────────────────────────────────────────────────────────────────┤
│                    .NET 9.0 Backend API                          │
│              https://api.smartbusiness.site/api/v2               │
└─────────────────────────────────────────────────────────────────┘
```

### 2.4 Layout Hierarchy

```
app/layout.tsx (Root Layout)
├─ Metadata (SEO, Open Graph, Twitter Cards)
├─ Google Fonts (Geist Sans, Geist Mono)
├─ Analytics Scripts (GTM, Clarity, GA4)
├─ AuthProvider (NextAuth SessionProvider)
├─ NavBarComponent (persistent across all pages)
├─ {children} (page content)
└─ Footer (persistent across all pages)

app/(customer)/layout.tsx (Customer Layout)
└─ Extends root layout with customer-specific UI

app/(store)/tienda/layout.tsx (Store Layout)
└─ Sidebar navigation for categories/subcategories
```

**Root Layout Features**:
- **Persistent Navigation**: Navbar and footer never unmount
- **Global Providers**: AuthProvider wraps entire app
- **SEO Foundation**: Comprehensive metadata in `<head>`
- **Analytics**: GTM, Clarity, GA4 scripts in `<Script>` components

---

## 3. Rendering Strategy & Performance

### 3.1 Server-Side Rendering (SSR)

#### Product Listings (Dynamic SSR)
```typescript
// src/app/(store)/tienda/page.tsx
'use client'; // Required for pagination interactivity

export default function Store() {
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = async (page: number) => {
    // Fetches fresh data on every page change
    const response = await getProductsEcommerce(page, 20);
    setProducts(response.data);
  };

  // Data is fetched client-side for instant navigation
}
```

**Why SSR for listings**:
- Product availability changes frequently (stock updates)
- Personalized pricing based on customer type
- Pagination requires interactivity

### 3.2 Static Site Generation (SSG)

#### Product Detail Pages (SSG with ISR potential)
```typescript
// src/app/(store)/tienda/[category]/[subcategory]/[product]/page.tsx

// Generates static HTML at build time
export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const response = await getProductBySlug(product, false, 0);

  return <ProductDetail data={response.data} />;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const { product } = await params;
  const response = await getProductBySlug(product, false, 0);
  const productData = response.data;

  return {
    title: `${productData.name} | ${productData.brand.name}`,
    description: productData.description.slice(0, 160),
    openGraph: { images: [productData.productImages[0].url] }
  };
}
```

**Benefits of SSG for products**:
- Near-instant page loads (pre-rendered HTML)
- Optimal SEO (fully crawlable by search engines)
- Reduced backend load
- CDN-cacheable

**Note**: Currently **no ISR (Incremental Static Regeneration)** is configured. To enable:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

### 3.3 Client-Side Rendering (CSR)

#### Interactive Components
Only components requiring user interaction are client-rendered:

```typescript
// src/components/shared/nav-bar.component.tsx
'use client';

export default function NavBarComponent() {
  const { data: session, status } = useSession(); // Client-side hook

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/';
  };

  return (
    <Navbar>
      {status === 'authenticated' ? (
        <Avatar onClick={handleProfileMenu} />
      ) : (
        <Button onClick={redirectToLogin}>Login</Button>
      )}
    </Navbar>
  );
}
```

### 3.4 Performance Optimizations

#### Image Optimization
```typescript
// Automatic optimization via Next.js Image component
import Image from 'next/image';

<Image
  src={productImage}
  alt={productName}
  width={1200}
  height={630}
  priority // LCP optimization for hero images
/>
```

**Configuration** (`next.config.ts`):
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'smarterpstorage.blob.core.windows.net' }
  ]
}
```

#### Font Optimization
```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap' // Prevents FOIT (Flash of Invisible Text)
});
```

#### Bundle Optimization
- **Turbopack** in development (faster HMR)
- **Standalone output** for production (minimal Docker images)
- **Automatic code splitting** per route

---

## 4. State Management & Data Fetching

### 4.1 Server Actions Pattern

**Primary data fetching mechanism** for Server Components:

```typescript
// src/services/products.service.tsx
'use server'; // Server Action directive

export async function getProductBySlug(
  slug: string,
  isLogged: boolean,
  customerTypeId: number
): Promise<ProductResponse> {
  const url = getApiUrl(`/api/products/${slug}?isLogged=${isLogged}`);

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  return await res.json();
}
```

**Benefits**:
- No client-side JavaScript required
- Direct backend access from Server Components
- Type-safe responses
- Automatic error handling

### 4.2 Client-Side State Management

#### Local State (useState)
```typescript
// src/app/(store)/tienda/page.tsx
const [products, setProducts] = useState<ProductDto[]>([]);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
```

**Use for**:
- Component-specific UI state
- Form inputs
- Toggles and flags

#### URL State (nuqs)
```typescript
import { useQueryState } from 'nuqs';

const [searchQuery, setSearchQuery] = useQueryState('q');
const [category, setCategory] = useQueryState('category');

// URL: /tienda/buscar?q=ubiquiti&category=redes
```

**Use for**:
- Search filters
- Pagination state
- Shareable UI state (users can bookmark filtered views)

#### Session State (NextAuth)
```typescript
'use client';
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();

if (status === 'authenticated') {
  const userId = session.user.id;
  const customerType = session.customerType;
  const accessToken = session.accessToken;
}
```

**Available session data**:
- `user.id`, `user.name`, `user.email`, `user.image`
- `accessToken` (JWT for backend API calls)
- `expirationDate` (token expiry)
- `customerType` (for personalized pricing)
- `activeCartId` (current shopping cart)

### 4.3 Data Fetching Patterns

#### Pattern 1: Server Component Fetch
```typescript
// Runs on server, zero client JS
async function ProductPage() {
  const data = await getProductBySlug('product-slug', false, 0);
  return <div>{data.name}</div>;
}
```

#### Pattern 2: Client Component Fetch
```typescript
// Runs on client, requires JavaScript
'use client';
function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductsEcommerce(1, 20).then(setData);
  }, []);

  return <div>{data.map(...)}</div>;
}
```

#### Pattern 3: API Route Proxy
```typescript
// src/app/api/products/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseUrl}/Product/GetAll?${searchParams}`, {
    headers: { 'Accept': 'application/json' }
  });

  return NextResponse.json(await response.json());
}
```

**Use API routes when**:
- Need to proxy backend API for client components
- Hiding sensitive API endpoints
- Transforming response data
- Adding authentication headers

### 4.4 Caching Strategy

#### Server Component Caching
```typescript
// Default: fetch() results are cached until revalidated
const response = await fetch(url); // Cached by default

// Opt-out of caching:
const response = await fetch(url, { cache: 'no-store' });

// Time-based revalidation:
const response = await fetch(url, { next: { revalidate: 3600 } });
```

#### Client-Side Caching
Currently **no React Query or SWR** implemented. Consider adding for:
- Automatic refetching on window focus
- Optimistic updates
- Request deduplication

---

## 5. Authentication & Authorization

### 5.1 NextAuth.js Configuration

Located in `src/auth.config.ts`:

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        userName: { label: 'Usuario', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        loginMethod: { label: 'Método de login', type: 'text' }
      },
      async authorize(credentials) {
        const loginData = {
          password: credentials.password,
          ...(credentials.loginMethod === 'email'
            ? { email: credentials.email }
            : { userName: credentials.userName })
        };

        const response = await loginUser(loginData); // Backend API call

        if (response.succeeded && response.data) {
          return {
            id: response.data.id,
            name: response.data.fullName,
            token: response.data.token,
            customerType: response.data.customerType,
            activeCartId: response.data.activeCartId
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.customerType = user.customerType;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.customerType = token.customerType;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
};
```

### 5.2 Authentication Flow

```
1. User submits login form
   └─> /login page (Client Component)

2. Form calls signIn('credentials', { userName, password })
   └─> NextAuth.js handles request

3. CredentialsProvider.authorize() executes
   └─> Calls backend: POST /api/auth/ecommerce-login
   └─> Backend validates credentials
   └─> Returns JWT token + user data

4. JWT callback stores token in JWT
   └─> token.accessToken = user.token

5. Session callback adds data to session
   └─> session.accessToken, session.customerType

6. Client receives session via useSession()
   └─> status: 'authenticated'
   └─> data: { user, accessToken, customerType }
```

### 5.3 Protected Routes

**Current Implementation**: No middleware protection configured.

**Recommended Middleware** (create `src/middleware.ts`):
```typescript
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Protect customer routes
      if (req.nextUrl.pathname.startsWith('/profile')) {
        return !!token;
      }
      if (req.nextUrl.pathname.startsWith('/cart')) {
        return !!token;
      }
      return true;
    }
  }
});

export const config = {
  matcher: ['/profile/:path*', '/cart/:path*']
};
```

### 5.4 Backend API Authentication

When calling backend from Server Components:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';

async function getProtectedData() {
  const session = await getServerSession(authOptions);

  const response = await fetch(backendUrl, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Accept': 'application/json'
    }
  });

  return response.json();
}
```

---

## 6. SEO & Metadata Strategy

### 6.1 Root Layout Metadata

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Smart Business | Tienda Online de Tecnología en Honduras",
    template: "%s | Smart Business" // Suffix for all pages
  },
  description: "Proveedor líder de tecnología en Honduras...",
  keywords: ["tecnología Honduras", "redes", "videovigilancia"],
  metadataBase: new URL("https://www.smartbusiness.site"),
  openGraph: {
    type: "website",
    locale: "es_HN",
    siteName: "Smart Business",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@smartbusinesshn"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'S-MABBGjddcLo8_kNkNfuqVi7etsoBNnLSR-OpHJBeg'
  }
};
```

### 6.2 Dynamic Page Metadata

```typescript
// src/app/(store)/tienda/[category]/[subcategory]/[product]/page.tsx

export async function generateMetadata({ params }): Promise<Metadata> {
  const { product } = await params;
  const response = await getProductBySlug(product, false, 0);
  const data = response.data;

  return {
    title: `${data.name} | ${data.brand.name} | SMART BUSINESS`,
    description: data.description.slice(0, 160),
    keywords: [data.name, data.brand.name, data.category.name],
    alternates: {
      canonical: `https://smartbusiness.site/tienda/${data.category.slug}/${data.subcategory.slug}/${data.slug}`
    },
    openGraph: {
      title: data.name,
      description: data.description,
      images: [data.productImages[0].url],
      url: canonical
    },
    other: {
      'product:price:amount': data.recomendedSalePrice.toString(),
      'product:price:currency': 'HNL',
      'product:availability': data.currentStock > 0 ? 'in stock' : 'out of stock'
    }
  };
}
```

### 6.3 Structured Data (JSON-LD)

#### Product Schema
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productData.name,
      "sku": productData.code,
      "brand": { "@type": "Brand", "name": brandName },
      "offers": {
        "@type": "Offer",
        "price": productData.recomendedSalePrice,
        "priceCurrency": "HNL",
        "availability": productData.currentStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock"
      },
      "image": productData.productImages.map(img => img.url),
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "/" },
          { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "/tienda" },
          { "@type": "ListItem", "position": 3, "name": categoryTitle }
        ]
      }
    })
  }}
/>
```

### 6.4 SEO Best Practices

✅ **Implemented**:
- Dynamic metadata per page
- Canonical URLs
- Open Graph tags
- Twitter Cards
- JSON-LD structured data
- Sitemap.xml (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Google Search Console verification

⚠️ **Missing**:
- Dynamic sitemap generation (currently static)
- `generateStaticParams()` for all product pages
- Alt text on some images
- Lazy loading for below-fold images

---

## 7. Conventions & Standards

### 7.1 File Naming

- **Pages**: `page.tsx` (App Router convention)
- **Layouts**: `layout.tsx` (App Router convention)
- **Components**: `kebab-case.component.tsx` (e.g., `nav-bar.component.tsx`)
- **Services**: `kebab-case.service.tsx` (e.g., `products.service.tsx`)
- **Interfaces**: `kebab-case.interface.ts` (e.g., `product.interface.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `server-url.ts`)

### 7.2 Import Path Alias

```typescript
// Use @ alias instead of relative paths
import { ProductDto } from '@/interfaces/product/product.interface';
import { getProductBySlug } from '@/services/products.service';

// ❌ Avoid
import { ProductDto } from '../../../interfaces/product/product.interface';
```

### 7.3 TypeScript Conventions

#### Interfaces over Types
```typescript
// ✅ Preferred
export interface ProductDto {
  id: string;
  name: string;
  price: number;
}

// ❌ Avoid (unless using union types)
export type ProductDto = {
  id: string;
  name: string;
};
```

#### Async Function Typing
```typescript
// ✅ Explicit return type
async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch(url);
  return res.json();
}
```

### 7.4 Component Patterns

#### Server Component (Default)
```typescript
// No 'use client' directive
export default async function ProductPage({ params }: Props) {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Client Component
```typescript
'use client';
import { useState } from 'react';

export default function InteractiveComponent() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(state + 1)}>{state}</button>;
}
```

### 7.5 Error Handling

```typescript
// Server Actions
export async function getProductBySlug(slug: string): Promise<ProductResponse> {
  const res = await fetch(url);

  if (!res.ok) {
    let errorResponse: ProductResponse | undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  return await res.json();
}

// Client Components
try {
  const data = await getProducts();
  setProducts(data);
} catch (error) {
  console.error('Error fetching products:', error);
  // Show user-friendly error message
}
```

---

## 8. AI Agent Guidelines

### 8.1 Critical Rules

#### ⚠️ NEVER Break These Rules

1. **DO NOT convert Server Components to Client Components** unless absolutely necessary
   - If you need interactivity, create a separate Client Component wrapper
   - Example: Keep `ProductPage` as Server Component, create `AddToCartButton` as Client Component

2. **DO NOT remove TypeScript types**
   - All functions must have explicit return types
   - All props must be typed with interfaces
   - Use `unknown` over `any`

3. **DO NOT bypass NextAuth session checks**
   - Always validate `status === 'authenticated'` before accessing user data
   - Use `getServerSession(authOptions)` in Server Components

4. **DO NOT hardcode URLs**
   - Use `getApiUrl()` utility for backend calls
   - Use `getBaseUrl()` for application URLs
   - Respect environment variables

5. **DO NOT skip SEO metadata**
   - Every new page must export `generateMetadata()`
   - Include JSON-LD structured data for products
   - Add canonical URLs

### 8.2 Step-by-Step: Adding a New Feature

#### Example: Add "Recently Viewed Products" Feature

**Step 1: Determine Rendering Strategy**
```
Question: Does this feature require user interactivity?
- Yes (tracking clicks) → Client Component
- No (display only) → Server Component

Answer: Yes → Client Component with localStorage
```

**Step 2: Create Component**
```typescript
// src/components/store/recently-viewed.component.tsx
'use client';
import { useEffect, useState } from 'react';
import { ProductDto } from '@/interfaces/product/product.interface';

export default function RecentlyViewed() {
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      setProducts(JSON.parse(viewed));
    }
  }, []);

  return (
    <div>
      <h2>Productos Vistos Recientemente</h2>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

**Step 3: Add Tracking Logic**
```typescript
// src/app/(store)/tienda/[category]/[subcategory]/[product]/page.tsx

// Keep this as Server Component for SEO
export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.product);

  return (
    <>
      <ProductDetail product={product} />
      <TrackProductView product={product} /> {/* New Client Component */}
    </>
  );
}

// src/components/store/track-product-view.component.tsx
'use client';
import { useEffect } from 'react';

export default function TrackProductView({ product }) {
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const updated = [product, ...viewed.filter(p => p.id !== product.id)].slice(0, 10);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  }, [product]);

  return null; // No UI, just side effect
}
```

**Step 4: Add SEO Considerations**
```typescript
// No SEO impact - localStorage is client-side only
// Ensure Server Component remains for crawlers
```

### 8.3 Common Mistakes to Avoid

#### ❌ Mistake 1: Making Everything a Client Component
```typescript
// ❌ BAD
'use client';
export default function ProductPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/api/products/123').then(res => res.json()).then(setProduct);
  }, []);

  return <div>{product?.name}</div>;
}
```

```typescript
// ✅ GOOD
export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug, false, 0);
  return <div>{product.name}</div>;
}
```

#### ❌ Mistake 2: Not Using Path Aliases
```typescript
// ❌ BAD
import { ProductDto } from '../../../../../interfaces/product/product.interface';

// ✅ GOOD
import { ProductDto } from '@/interfaces/product/product.interface';
```

#### ❌ Mistake 3: Ignoring TypeScript Errors
```typescript
// ❌ BAD
// @ts-ignore
const price = product.price;

// ✅ GOOD
const price: number = product.recomendedSalePrice ?? 0;
```

### 8.4 Testing Checklist

Before marking a task complete, verify:

- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] SEO metadata present (`view-source:` in browser)
- [ ] Authentication flows work (login/logout)
- [ ] Mobile responsive (test in DevTools)
- [ ] Images optimized (using `next/image`)
- [ ] Server Components remain Server Components
- [ ] Client Components have `'use client'` directive

### 8.5 When to Ask for Clarification

Ask the user when:

1. **Rendering strategy unclear**
   - "Should this be a Server Component or Client Component?"
   - "Does this need real-time data or can it be cached?"

2. **Business logic ambiguous**
   - "Should guest users see pricing?"
   - "What happens when a product is out of stock?"

3. **Performance trade-offs**
   - "Should we use ISR (revalidate: 3600) or on-demand revalidation?"
   - "Should this list virtualize (1000+ items)?"

4. **Breaking changes**
   - "This requires migrating from Client to Server Component. Proceed?"
   - "This will change the URL structure. Update sitemap?"

---

## Appendix A: Quick Reference

### File Locations
- **Root Layout**: `src/app/layout.tsx`
- **NextAuth Config**: `src/auth.config.ts`
- **Next.js Config**: `next.config.ts`
- **API Routes**: `src/app/api/**/route.ts`
- **Server Actions**: `src/services/*.service.tsx`

### Key Commands
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm run start        # Start production server
```

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=https://localhost:7211/api/v2
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret>
ALLOW_SELF_SIGNED_CERT=true  # Only in development
```

---

## Appendix B: Architecture Decisions

### Why App Router over Pages Router?
- Native Server Components support
- Improved performance (zero client JS by default)
- Better SEO (fully rendered HTML)
- Cleaner data fetching (no getServerSideProps)

### Why NextAuth.js?
- Industry-standard authentication for Next.js
- JWT strategy for stateless sessions
- Easy integration with backend APIs
- Built-in session management

### Why No State Management Library?
- Server Components eliminate most client state
- URL state via `nuqs` for shareable filters
- NextAuth handles session state
- Local state via `useState` sufficient for UI

### Why API Routes as Proxy?
- Hide backend URL from client
- Add authentication headers
- Transform responses
- Rate limiting and caching layer

---

## Document Version

- **Version**: 1.0.0
- **Last Updated**: 2026-01-12
- **Author**: Senior Front-End Architect
- **Repository**: `c:\Repos\SMART\SMART-ECOMMERCE`

---

**End of Document**
