/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled via CLI flag: npm run dev --turbo
  devIndicators: {
    position: 'bottom-right', // Move indicator to bottom-right
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
