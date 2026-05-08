'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from './AppProvider';
import { useMagnetic, easeOut } from './motion-utils';
import styles from './BottomDock.module.css';

/**
 * Плавающий нижний док в стиле macOS.
 * Иконочные кнопки для основных разделов + быстрый переключатель темы и языка.
 *
 * Active state — по pathname.
 */
export default function BottomDock() {
  const pathname = usePathname();
  const { locale, setLocale, theme, toggleTheme } = useApp();
  const [mounted, setMounted] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Скрываем dok когда видим футер
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>('[data-section="footer"]');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [mounted]);

  const isHome = pathname === '/';
  const isWork = pathname === '/projects' || pathname.startsWith('/projects/');;

  const labelHome = locale === 'ru' ? 'Главная' : 'Home';
  const labelWork = locale === 'ru' ? 'Проекты' : 'Work';
  const labelContact = locale === 'ru' ? 'Связь' : 'Contact';

  return (
    <motion.div
      className={styles.dockWrap}
      initial={{ opacity: 0, y: 24 }}
      animate={
        !mounted
          ? { opacity: 0, y: 24 }
          : nearFooter
          ? { opacity: 0, y: 16 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.4, ease: easeOut }}
      style={{ pointerEvents: nearFooter ? 'none' : undefined }}
    >
      <div className={styles.dock}>
        {/* Home */}
        <DockButton href="/" active={isHome} label={labelHome}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-8.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DockButton>

        {/* Work */}
        <DockButton href="/projects" active={isWork} label={labelWork}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="6"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </DockButton>

        {/* Contact (Telegram) */}
        <DockExternal href="https://t.me/sfokin1337" label={labelContact}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.7 4.3c-.4-.3-.9-.4-1.4-.2L3.4 11.2c-.6.2-.9.8-.8 1.4.1.6.5 1 1.1 1.1l4.4.9 1.6 5c.2.5.6.8 1.1.8.4 0 .7-.2.9-.5l2.4-3 4.6 3.4c.3.2.6.3.9.3.2 0 .4 0 .5-.1.5-.2.9-.7 1-1.2l2.6-13.4c.1-.5-.1-1-.5-1.3z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </DockExternal>

        <div className={styles.divider} aria-hidden="true" />

        {/* Lang */}
        <button
          className={styles.langPill}
          onClick={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
          aria-label="Toggle language"
        >
          <span className={locale === 'ru' ? styles.langActive : ''}>RU</span>
          <span className={styles.langSep}>/</span>
          <span className={locale === 'en' ? styles.langActive : ''}>EN</span>
        </button>

        {/* Theme */}
        <button
          className={styles.themeBtn}
          aria-label="Toggle theme"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function DockButton({
  href,
  active,
  label,
  children,
}: {
  href: string;
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const m = useMagnetic<HTMLAnchorElement>(0.18);
  return (
    <Link
      href={href}
      className={`${styles.btn} ${active ? styles.btnActive : ''}`}
      ref={m.ref as any}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
    >
      <motion.span style={m.style} className={styles.btnInner}>
        {children}
      </motion.span>
      <span className={styles.tooltip}>{label}</span>
      {active && <span className={styles.activeDot} />}
    </Link>
  );
}

function DockExternal({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const m = useMagnetic<HTMLAnchorElement>(0.18);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      ref={m.ref as any}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
    >
      <motion.span style={m.style} className={styles.btnInner}>
        {children}
      </motion.span>
      <span className={styles.tooltip}>{label}</span>
    </a>
  );
}
