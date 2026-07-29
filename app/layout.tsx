import type { Metadata } from 'next';
import Script from 'next/script';

import { AppProvider } from '@/components/AppProvider';
import BottomDock from '@/components/BottomDock';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import Scene3DMount from '@/components/Scene3DMount';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScroll from '@/components/SmoothScroll';

import { structuredData } from '@/lib/schema';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://soromax.ru'),

  title: {
    default: 'Максим Сорокин — Product Designer | UX/UI Designer | AI SaaS',
    template: '%s | Максим Сорокин',
  },

  description:
    'Продуктовый и UX/UI-дизайнер из Санкт-Петербурга с опытом более 7 лет. Проектирует AI SaaS-продукты, Telegram Mini Apps, B2B-платформы, дизайн-системы и мобильные приложения. Автор блога о продуктовом дизайне и влиянии ИИ на профессию дизайнера. Разработал сайт-портфолио soromax.ru в сотрудничестве с ИИ-инструментами (Claude, Claude Design).',

  applicationName: 'Soromax Portfolio',
  generator: 'Next.js',
  creator: 'Максим Сорокин',
  publisher: 'Максим Сорокин',
  referrer: 'origin-when-cross-origin',

  authors: [
    {
      name: 'Максим Сорокин',
      url: 'https://soromax.ru',
    },
  ],

  keywords: [
    'Максим Сорокин',
    'Maxim Sorokin',
    'Soromax',
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'UX/UI Designer',
    'Lead Product Designer',
    'UX/UI дизайнер',
    'Продуктовый дизайнер',
    'Product Design',
    'UX Design',
    'UI Design',
    'AI SaaS',
    'Figma',
    'Design Systems',
    'Telegram Mini Apps',
    'Dashboard Design',
    'Mobile App Design',
    'UX Portfolio',
    'UI Portfolio',
    'Портфолио UX/UI дизайнера',
    'Портфолио Product Designer',
    'soromax.ru',
  ],

  alternates: {
    canonical: 'https://soromax.ru',
  },

  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'profile',
    locale: 'ru_RU',
    url: 'https://soromax.ru',
    siteName: 'Soromax',
    title: 'Максим Сорокин — Product Designer | UX/UI Designer',
    description:
      'Продуктовый и UX/UI-дизайнер из Санкт-Петербурга с опытом более 7 лет. Проектирует AI SaaS-продукты, Telegram Mini Apps, B2B-платформы, дизайн-системы и мобильные приложения. Автор блога о продуктовом дизайне и влиянии ИИ на профессию дизайнера. Разработал сайт-портфолио soromax.ru в сотрудничестве с ИИ-инструментами (Claude, Claude Design).',
    images: [
      {
        url: '/og-maksim-sorokin.png',
        width: 1200,
        height: 630,
        alt: 'Максим Сорокин — Product Designer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Максим Сорокин — Product Designer',
    description: 'UX/UI Designer • Product Designer • AI SaaS',
    images: ['/og-maksim-sorokin.png'],
  },

  verification: {
    google: 'vXb7S4YWZ-2PSuG4eNrf-6nK1e_GhYmnu4yaOqyXi6A',
    yandex: '17a33846382e19fb',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-theme="dark" suppressHydrationWarning>
      <body>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
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

        <Script id="yandex-metrika" strategy="lazyOnload">
          {`
(function(m,e,t,r,i,k,a){
m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j=0;j<document.scripts.length;j++){
if(document.scripts[j].src===r){return;}
}
k=e.createElement(t),
a=e.getElementsByTagName(t)[0],
k.async=1,
k.src=r,
a.parentNode.insertBefore(k,a);
})(window,document,'script',
'https://mc.yandex.ru/metrika/tag.js?id=111031642','ym');

ym(
111031642,
'init',
{
  ssr:true,
  webvisor:true,
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  ecommerce:"dataLayer",
  defer:true
});
`}
        </Script>

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/111031642"
              style={{
                position: 'absolute',
                left: '-9999px',
              }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
