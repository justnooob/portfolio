/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: false,

  // Headers для Cloudflare — чтобы он кешировал статику долго
  async headers() {
    return [
      // Все Next.js чанки (JS, CSS) — кешируются год, immutable (имена с хэшем)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Изображения и SVG в /public/logos
      {
        source: '/logos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Картинки проектов
      {
        source: '/projects/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Favicon и прочая статика
      {
        source: '/:path*\\.(svg|png|jpg|jpeg|webp|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn-cf.behance.net',
      },
      {
        protocol: 'https',
        hostname: '**.behance.net',
      },
    ],
  },
};

module.exports = nextConfig;
