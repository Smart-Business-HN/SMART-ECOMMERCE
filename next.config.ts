import type { NextConfig } from "next";

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
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default nextConfig;
