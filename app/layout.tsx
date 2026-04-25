import type { Metadata } from 'next';
import { AppProvider } from '@/components/AppProvider';
import CustomCursor from '@/components/CustomCursor';
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
          <CustomCursor />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
