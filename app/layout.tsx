import type { Metadata } from 'next';
import { AppProvider } from '@/components/AppProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maxim Sorokin · UX/UI Product Designer',
  description: 'UX/UI · Продуктовый дизайнер с опытом 5+ лет. AI SaaS, TG MiniApps, дизайн-системы.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
