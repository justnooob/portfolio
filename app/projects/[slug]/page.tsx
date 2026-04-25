import { projects } from '@/lib/data';
import ProjectPageClient from './ProjectPageClient';

/**
 * Серверный компонент.
 * generateStaticParams говорит Next.js на сборке:
 * "сгенерируй HTML-страницу для каждого slug из этого списка".
 */
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPageClient slug={params.slug} />;
}
