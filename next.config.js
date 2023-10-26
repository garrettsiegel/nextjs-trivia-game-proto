const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  assetPrefix: isProd ? 'https://a1.espncdn.com/prod/' : undefined,
}

module.exports = nextConfig;
