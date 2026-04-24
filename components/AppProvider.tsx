'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Locale } from '@/lib/data';

type Theme = 'dark' | 'light';

interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedLocale === 'ru' || savedLocale === 'en') setLocaleState(savedLocale);
    if (savedTheme === 'dark' || savedTheme === 'light') setThemeState(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem('locale', locale);
  }, [locale, mounted]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <AppContext.Provider value={{ locale, setLocale, theme, setTheme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
