/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: false,
  compress: true,
};

module.exports = nextConfig;
