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
        BASEAPI: 'https://sb8.azurewebsites.net/api/v2',
        NEXTAUTH_SECRET: 'no.utilizar.en.produccion'
    },
}
module.exports = nextConfig
