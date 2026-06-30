import type { Metadata } from 'next';
import { projects } from '@/lib/data';
import ProjectPageClient from './ProjectPageClient';
import ProductRedirect from '@/components/ProductRedirect';

export function generateStaticParams() {
  // Генерируем все слаги: стенделон-проекты → страница кейса,
  // продукты → страница-редирект на /projects (чтобы не было 404 на старых URL).
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  // Продукты не имеют собственной страницы — указываем canonical на /projects и noindex
  if (project.isProduct) {
    return {
      title: `${project.name.ru} — кейсы`,
      alternates: { canonical: '/projects' },
      robots: { index: false, follow: true },
    };
  }

  const url = `https://soromax.ru/projects/${project.slug}`;
  return {
    title: `${project.name.ru} — ${project.role.ru}`,
    description: project.shortDesc.ru,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: `${project.name.ru} · Максим Сорокин`,
      description: project.shortDesc.ru,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (project?.isProduct) {
    return <ProductRedirect />;
  }
  return <ProjectPageClient slug={params.slug} />;
}
