import type { Metadata } from 'next';
import { AppProvider } from '@/components/AppProvider';
import CustomCursor from '@/components/CustomCursor';
import Scene3DMount from '@/components/Scene3DMount';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';
import BottomDock from '@/components/BottomDock';
import ScrollToTop from '@/components/ScrollToTop';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://soromax.ru'),
  title: {
    default: 'Максим Сорокин — UX/UI Product Designer · soromax.ru',
    template: '%s · soromax.ru',
  },
  description:
    'Максим Сорокин — UX/UI и продуктовый дизайнер с опытом более 7 лет. AI SaaS, Telegram Mini Apps, дизайн-системы, B2B-продукты и мобильные приложения. Портфолио и кейсы.',
  applicationName: 'Максим Сорокин · Портфолио',
  authors: [{ name: 'Максим Сорокин', url: 'https://soromax.ru' }],
  creator: 'Максим Сорокин',
  publisher: 'Максим Сорокин',
  keywords: [
    'Максим Сорокин',
    'Maxim Sorokin',
    'Максим Сорокин дизайнер',
    'UX/UI дизайнер',
    'продуктовый дизайнер',
    'product designer',
    'UX/UI designer',
    'дизайнер интерфейсов',
    'AI SaaS дизайн',
    'дизайн-системы',
    'Telegram Mini Apps',
    'портфолио дизайнера',
    'soromax',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    locale: 'ru_RU',
    url: 'https://soromax.ru',
    siteName: 'Максим Сорокин · soromax.ru',
    title: 'Максим Сорокин — UX/UI Product Designer',
    description:
      'UX/UI и продуктовый дизайнер с опытом более 7 лет. AI SaaS, Telegram Mini Apps, дизайн-системы.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Максим Сорокин — UX/UI Product Designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Максим Сорокин — UX/UI Product Designer',
    description:
      'UX/UI и продуктовый дизайнер с опытом более 7 лет. AI SaaS, Telegram Mini Apps, дизайн-системы.',
    images: ['/og.png'],
  },
  verification: {
    google: 'vXb7S4YWZ-2PSuG4eNrf-6nK1e_GhYmnu4yaOqyXi6A',
    yandex: '17a33846382e19fb',
  },
};

// Schema.org structured data — помогает Google/Яндексу понять, что это персона
// (имя, должность, навыки, профили) и улучшает выдачу по имени и должности.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Максим Сорокин',
  alternateName: 'Maxim Sorokin',
  url: 'https://soromax.ru',
  image: 'https://soromax.ru/me.jpg',
  jobTitle: 'UX/UI Product Designer',
  description:
    'UX/UI и продуктовый дизайнер с опытом более 7 лет: AI SaaS, Telegram Mini Apps, дизайн-системы, B2B-продукты и мобильные приложения.',
  knowsAbout: [
    'UX/UI Design',
    'Product Design',
    'AI SaaS',
    'Design Systems',
    'Telegram Mini Apps',
    'Mobile App Design',
    'B2B Product Design',
  ],
  sameAs: [
    'https://t.me/sfokin1337',
    'https://setka.ru/users/140f8a9b-bda6-4796-806d-ad68256b7d86',
    'https://spb.hh.ru/resume/e091bcd6ff093a30910039ed1f48544f4f6749',
  ],
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Максим Сорокин · Портфолио',
  url: 'https://soromax.ru',
  inLanguage: 'ru-RU',
  author: { '@type': 'Person', name: 'Максим Сорокин' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <AppProvider>
          <SmoothScroll />
          <Scene3DMount />
          <ScrollProgress />
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
          <BottomDock />
          <ScrollToTop />
        </AppProvider>
      </body>
    </html>
  );
}
