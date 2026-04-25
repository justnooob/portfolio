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
  const [heroMode, setHeroMode] = useState<string | null>(null);

  // Добавляем тень/бэкдроп когда юзер проскроллил
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Следим за data-hero-mode на <html>: страницы проектов выставляют его
  // в 'dark' (на тёмном hero нужен белый текст в Nav) или 'light' (наоборот).
  // На главной атрибута нет → null → обычные цвета темы.
  useEffect(() => {
    const updateHero = () => {
      setHeroMode(document.documentElement.getAttribute('data-hero-mode'));
    };
    updateHero();
    const observer = new MutationObserver(updateHero);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-hero-mode'] });
    return () => observer.disconnect();
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
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} data-hero={heroMode || undefined}>
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
            <div className={styles.langSwitch}>
              <button
                className={`${styles.langBtn} ${locale === 'ru' ? styles.langActive : ''}`}
                onClick={() => setLocale('ru')}
              >
                RU
              </button>
              <button
                className={`${styles.langBtn} ${locale === 'en' ? styles.langActive : ''}`}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
            </div>

            {/* Switch темы: луна слева, солнце справа */}
            <button
              className={`${styles.themeSwitch} ${theme === 'light' ? styles.themeSwitchLight : ''}`}
              onClick={(e) => {
                // Передаём координаты клика чтобы анимация начиналась оттуда
                const rect = e.currentTarget.getBoundingClientRect();
                toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
              }}
              aria-label="Toggle theme"
            >
              <span className={styles.themeKnob}></span>
              <span className={`${styles.themeIco} ${styles.themeIcoMoon}`} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className={`${styles.themeIco} ${styles.themeIcoSun}`} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
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
            <div className={styles.langSwitch}>
              <button
                className={`${styles.langBtn} ${locale === 'ru' ? styles.langActive : ''}`}
                onClick={() => setLocale('ru')}
              >
                RU
              </button>
              <button
                className={`${styles.langBtn} ${locale === 'en' ? styles.langActive : ''}`}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
            </div>
            <button
              className={`${styles.themeSwitch} ${theme === 'light' ? styles.themeSwitchLight : ''}`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
              }}
              aria-label="Toggle theme"
            >
              <span className={styles.themeKnob}></span>
              <span className={`${styles.themeIco} ${styles.themeIcoMoon}`} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className={`${styles.themeIco} ${styles.themeIcoSun}`} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
