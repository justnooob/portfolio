import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data';

// Статическая генерация для output: 'export' → /sitemap.xml
export const dynamic = 'force-static';

const BASE = 'https://soromax.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/projects/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

  // Стенделон-проекты
  const projectPages: MetadataRoute.Sitemap = projects
    .filter((p) => !p.isProduct)
    .map((p) => ({
      url: `${BASE}/projects/${p.slug}/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    }));

  // Кейсы продуктов
  const casePages: MetadataRoute.Sitemap = projects
    .filter((p) => p.isProduct && p.cases)
    .flatMap((p) =>
      (p.cases ?? []).map((c) => ({
        url: `${BASE}/projects/${p.slug}/${c.slug}/`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }))
    );

  return [...staticPages, ...projectPages, ...casePages];
}
