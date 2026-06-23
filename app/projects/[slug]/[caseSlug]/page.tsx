import { projects } from '@/lib/data';
import CasePageClient from './CasePageClient';

export function generateStaticParams() {
  const productProjects = projects.filter((p) => p.isProduct && p.cases);
  return productProjects.flatMap((p) =>
    (p.cases ?? []).map((c) => ({ slug: p.slug, caseSlug: c.slug }))
  );
}

export default function CasePage({ params }: { params: { slug: string; caseSlug: string } }) {
  return <CasePageClient productSlug={params.slug} caseSlug={params.caseSlug} />;
}
