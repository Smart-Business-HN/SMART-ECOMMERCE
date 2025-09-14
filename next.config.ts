import type { NextConfig } from "next";

// Configurar Node.js para ignorar certificados SSL auto-firmados en desarrollo
if (process.env.NODE_ENV === 'development' && process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '1') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
          protocol: "https",
          hostname: "grupoplatino.blob.core.windows.net",
      },
      {
          protocol: "https",
          hostname: "smarterpstorage.blob.core.windows.net",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'https://localhost:7211/api/v2' : 'https://sb8.azurewebsites.net/api/v2'),
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.smartbusiness.site'),
    VERCEL_URL: process.env.VERCEL_URL,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.smartbusiness.site'),
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '11ce0ae293280fe23bfe6d7129f5cd07'
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default nextConfig;
