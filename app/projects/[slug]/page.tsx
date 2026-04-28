import { projects } from '@/lib/data';
import Nav from '@/components/Nav';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return <div>Project not found</div>;
  return (
    <>
      <Nav />
      <ProjectPageClient project={project} />
    </>
  );
}
