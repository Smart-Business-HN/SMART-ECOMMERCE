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
};

export default nextConfig;
