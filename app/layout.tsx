import type { Metadata } from 'next';
import Script from 'next/script';

import { AppProvider } from '@/components/AppProvider';
import CustomCursor from '@/components/CustomCursor';
import Scene3DMount from '@/components/Scene3DMount';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';
import BottomDock from '@/components/BottomDock';
import ScrollToTop from '@/components/ScrollToTop';

import { structuredData } from '@/lib/schema';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://soromax.ru'),

  title: {
    default: 'Максим Сорокин — Product Designer | UX/UI Designer',
    template: '%s · Максим Сорокин',
  },

  description:
    'Максим Сорокин — Product Designer и UX/UI дизайнер с опытом более 7 лет. AI SaaS, Telegram Mini Apps, дизайн-системы, мобильные приложения и B2B-продукты. Портфолио, кейсы и статьи.',

  applicationName: 'Soromax Portfolio',

  authors: [
    {
      name: 'Максим Сорокин',
      url: 'https://soromax.ru',
    },
  ],

  creator: 'Максим Сорокин',

  publisher: 'Максим Сорокин',

  keywords: [
    'Максим Сорокин',
    'Maxim Sorokin',
    'Soromax',
    'Максим Сорокин дизайнер',
    'Product Designer',
    'Lead Product Designer',
    'UX/UI Designer',
    'UX Designer',
    'UI Designer',
    'Продуктовый дизайнер',
    'UX/UI дизайнер',
    'AI SaaS',
    'Artificial Intelligence',
    'Design Systems',
    'Telegram Mini Apps',
    'Mobile App Design',
    'Dashboard Design',
    'Figma',
    'UX Portfolio',
    'UI Portfolio',
    'Product Design',
    'B2B Design',
    'soromax.ru',
  ],

  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },

  alternates: {
    canonical: 'https://soromax.ru',
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'profile',
    locale: 'ru_RU',
    url: 'https://soromax.ru',
    siteName: 'Soromax',

    title: 'Максим Сорокин — Product Designer',

    description:
      'Lead Product Designer. AI SaaS, Telegram Mini Apps, Mobile Apps, Design Systems.',

    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Максим Сорокин — Product Designer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Максим Сорокин — Product Designer',

    description:
      'UX/UI Designer • Product Designer • AI SaaS',

    images: ['/og.png'],
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
    <html lang="ru" data-theme="dark">
      <body>

        {/* Schema.org */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <AppProvider>
          <SmoothScroll />
          <Scene3DMount />
          <ScrollProgress />
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
          <BottomDock />
          <ScrollToTop />
        </AppProvider>

        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="lazyOnload">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) {
                    return;
                  }
                }
                k=e.createElement(t),
                a=e.getElementsByTagName(t)[0],
                k.async=1,
                k.src=r,
                a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111031642', 'ym');

            ym(111031642, 'init', {
              ssr:true,
              webvisor:true,
              clickmap:true,
              ecommerce:"dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce:true,
              trackLinks:true
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
