import type { Metadata } from 'next';
import { projects } from '@/lib/data';
import CasePageClient from './CasePageClient';

export function generateStaticParams() {
  const productProjects = projects.filter((p) => p.isProduct && p.cases);
  return productProjects.flatMap((p) =>
    (p.cases ?? []).map((c) => ({ slug: p.slug, caseSlug: c.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; caseSlug: string };
}): Metadata {
  const product = projects.find((p) => p.slug === params.slug);
  const c = product?.cases?.find((x) => x.slug === params.caseSlug);
  if (!product || !c) return {};
  const desc = (c.cardDesc ?? c.context)?.ru ?? product.shortDesc.ru;
  const url = `https://soromax.ru/projects/${product.slug}/${c.slug}`;
  return {
    title: `${c.name.ru} — ${product.name.ru}`,
    description: desc,
    alternates: { canonical: `/projects/${product.slug}/${c.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: `${c.name.ru} · ${product.name.ru} · Максим Сорокин`,
      description: desc,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
  };
}

export default function CasePage({ params }: { params: { slug: string; caseSlug: string } }) {
  return <CasePageClient productSlug={params.slug} caseSlug={params.caseSlug} />;
}
