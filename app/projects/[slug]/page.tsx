import { redirect } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return projects
    .filter((p) => !p.isProduct)
    .map((project) => ({ slug: project.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (project?.isProduct) {
    redirect('/#projects');
  }
  return <ProjectPageClient slug={params.slug} />;
}
