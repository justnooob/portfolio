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
  title: 'Maxim Sorokin · UX/UI Product Designer',
  description: 'UX/UI · Продуктовый дизайнер с опытом более 5 лет. AI SaaS, TG MiniApps, дизайн-системы.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark">
      <body>
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
