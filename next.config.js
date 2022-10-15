/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pokeapi.co', 'raw.githubusercontent.com'],
  },
  output: 'standalone',
}

module.exports = nextConfig
