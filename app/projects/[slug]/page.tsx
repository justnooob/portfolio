import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return projects
    .filter((p) => !p.isProduct)
    .map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
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
    redirect('/#projects');
  }
  return <ProjectPageClient slug={params.slug} />;
}
