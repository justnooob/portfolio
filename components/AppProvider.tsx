'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Locale } from '@/lib/data';

type Theme = 'dark' | 'light';

interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** Переключить тему. Можно передать координаты клика (x, y), чтобы анимация
   *  раскрытия начиналась оттуда. Если координаты не переданы — берём центр экрана. */
  toggleTheme: (originX?: number, originY?: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Проверка поддержки View Transitions API
function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && typeof (document as any).startViewTransition === 'function';
}

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
    document.documentElement.classList.add('js-ready');
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

  /**
   * Переключение темы с красивой анимацией:
   * - на светлую: "перелистывает" с правой стороны (как поворот страницы)
   * - на тёмную: с левой стороны
   * - используется View Transitions API (Chrome 111+, Edge 111+, Safari 18+)
   * - в неподдерживаемых браузерах просто меняется тема без анимации
   */
  const toggleTheme = (originX?: number, originY?: number) => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    if (!supportsViewTransitions() || typeof window === 'undefined') {
      // Фолбэк — просто меняем тему
      setThemeState(newTheme);
      return;
    }

    // Записываем точку начала анимации в CSS-переменные
    const root = document.documentElement;
    const x = originX ?? window.innerWidth / 2;
    const y = originY ?? window.innerHeight / 2;

    // Направление перелистывания: для перехода в светлую — справа, в тёмную — слева
    const direction = newTheme === 'light' ? 'to-light' : 'to-dark';
    root.style.setProperty('--theme-anim-x', `${x}px`);
    root.style.setProperty('--theme-anim-y', `${y}px`);
    root.setAttribute('data-theme-anim', direction);

    // Стартуем View Transition
    const transition = (document as any).startViewTransition(() => {
      setThemeState(newTheme);
    });

    transition.finished.finally(() => {
      root.removeAttribute('data-theme-anim');
    });
  };

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
