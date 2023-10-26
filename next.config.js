const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  assetPrefix: isProd ? 'https://a.espncdn.com/prod/scripts/pagetype/otl/2023/231218_multi_2023-year-in-review/' : undefined,
  webpack: {
    output: {
      filename: '[name].[ext]',
    }
  }
}

module.exports = nextConfig;
