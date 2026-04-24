'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './Nav.module.css';

export default function Nav() {
  const { locale, setLocale, theme, toggleTheme } = useApp();
  const t = translations[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Добавляем тень/бэкдроп когда юзер проскроллил
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            {/* ⭐ Сюда вставь свой SVG-логотип. Положи файл в public/logo.svg */}
            <span className={styles.logoMark}>
              <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
                <text x="16" y="21" fontFamily="inherit" fontWeight="600" fontSize="13" fill="currentColor" textAnchor="middle">MS</text>
              </svg>
            </span>
            <span className={styles.logoText}>Maxim Sorokin</span>
          </Link>

          <div className={styles.links}>
            <a href="#about" className={`${styles.link} ${styles.active}`}>
              {t.nav.about}
            </a>
            <a href="#projects" className={styles.link}>
              {t.nav.projects}
            </a>
            <a href="#experience" className={styles.link}>
              {t.nav.experience}
            </a>
          </div>

          <div className={styles.toggles}>
            <button
              className={`${styles.tgb} ${locale === 'ru' ? styles.tgbActive : ''}`}
              onClick={() => setLocale('ru')}
            >
              RU
            </button>
            <button
              className={`${styles.tgb} ${locale === 'en' ? styles.tgbActive : ''}`}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
            <button className={styles.tgb} onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>

          {/* Burger — только на мобилке */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Мобильное меню на весь экран */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <a href="#about" className={styles.mobileLink} onClick={closeMenu}>
            {t.nav.about}
          </a>
          <a href="#projects" className={styles.mobileLink} onClick={closeMenu}>
            {t.nav.projects}
          </a>
          <a href="#experience" className={styles.mobileLink} onClick={closeMenu}>
            {t.nav.experience}
          </a>

          <div className={styles.mobileDivider}></div>

          <div className={styles.mobileToggles}>
            <button
              className={`${styles.tgb} ${locale === 'ru' ? styles.tgbActive : ''}`}
              onClick={() => setLocale('ru')}
            >
              RU
            </button>
            <button
              className={`${styles.tgb} ${locale === 'en' ? styles.tgbActive : ''}`}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
            <button className={styles.tgb} onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☀ Светлая' : '☾ Тёмная'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
