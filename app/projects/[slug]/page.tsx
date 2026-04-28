import Nav from '@/components/Nav';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  // Импортируем динамически чтобы избежать cycles
  const { projects } = require('@/lib/data');
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPageClient slug={params.slug} />;
}
