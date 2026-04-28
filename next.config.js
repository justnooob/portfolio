/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт — генерирует обычные HTML-файлы
  // которые можно положить на любой статический хостинг (Cloudflare Pages)
  output: 'export',

  // trailingSlash: true делает URL такими: /projects/iywi/
  // Cloudflare Pages любит такой формат и правильно резолвит index.html
  trailingSlash: true,

  // В export-режиме Next.js Image не работает в SSR-режиме оптимизации,
  // поэтому отключаем оптимизацию (картинки отдаются как есть)
  images: {
    unoptimized: true,
  },

  poweredByHeader: false,
  reactStrictMode: false,
  compress: true,
  swcMinify: true,

  // Копируем _headers в out директорию для Cloudflare Pages
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8'
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;
