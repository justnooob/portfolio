/** @type {import('next').NextConfig} */
const nextConfig = {
  // Сжатие
  compress: true,
  // Убираем заголовок powered-by для безопасности
  poweredByHeader: false,
  // Чистый production-минимизатор
  swcMinify: true,
  // Кэшируем статику агрессивнее
  async headers() {
    return [
      {
        source: '/logos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/projects/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
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
