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
    }
}
module.exports = nextConfig
