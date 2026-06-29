import type { MetadataRoute } from 'next';

// Статическая генерация для output: 'export' → /robots.txt
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://soromax.ru/sitemap.xml',
    host: 'https://soromax.ru',
  };
}
