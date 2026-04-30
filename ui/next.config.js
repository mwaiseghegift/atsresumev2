/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com']
  },
    allowedDevOrigins: [
      '*.ngrok-free.app'                  // Or use a wildcard for all ngrok subdomains
    ],
  }

module.exports = nextConfig
