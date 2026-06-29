import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Работы — кейсы UX/UI и продуктового дизайна',
  description:
    'Портфолио Максима Сорокина: кейсы по AI SaaS, B2B-продуктам, мобильным приложениям, сайтам и Telegram Mini Apps. Опыт более 7 лет.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://soromax.ru/projects',
    siteName: 'Максим Сорокин · soromax.ru',
    title: 'Работы — кейсы UX/UI и продуктового дизайна · Максим Сорокин',
    description:
      'Кейсы: AI SaaS, B2B-продукты, мобильные приложения, сайты и Telegram Mini Apps.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Максим Сорокин — UX/UI Product Designer' }],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
