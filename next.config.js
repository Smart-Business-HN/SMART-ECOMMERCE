/** @type {import('next').NextConfig} */
const nextConfig = {
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
        baseApi: 'https://localhost:7211/api/v2',
    },
}
module.exports = nextConfig
