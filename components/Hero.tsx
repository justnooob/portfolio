'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './Hero.module.css';

/**
 * Большая типографика на всю ширину + 3D-сфера справа (рендерится в Scene3D
 * за main'ом). Magnetic CTA, parallax по тексту от скролла.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { locale } = useApp();
  const t = translations[locale];
  const words = t.hero.typewriter;

  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter
  useEffect(() => {
    const current = words[wordIdx];
    let timeout: NodeJS.Timeout;
    if (!deleting && display.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 60);
    } else if (!deleting && display.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 35);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words]);

  useEffect(() => {
    setDisplay('');
    setWordIdx(0);
    setDeleting(false);
  }, [locale]);

  // Parallax по hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 600], [0, -80]);
  const subtitleY = useTransform(scrollY, [0, 600], [0, -40]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  // Кнопка «Смотреть проекты» теперь ведёт на /projects (вынесли в отдельный роут)

  // Разбиваем имя на слова с раздельной анимацией
  const renderWord = (word: string, baseDelay: number) => (
    <span className={styles.wordWrap}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={styles.letter}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease, delay: baseDelay + i * 0.04 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );

  return (
    <div className={styles.hero} id="about" data-section="hero" ref={heroRef}>
      <motion.div
        className={styles.titleBlock}
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          <span className={styles.dot} />
          {t.hero.badge}
        </motion.div>

        <h1 className={styles.title}>
          <span className={styles.titleRow}>{renderWord(t.hero.name1, 0.4)}</span>
          <span className={styles.titleRow}>{renderWord(t.hero.name2, 0.55)}</span>
        </h1>
      </motion.div>

      <motion.div
        className={styles.subtitleBlock}
        style={{ y: subtitleY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 1.0 }}
      >
        <div className={styles.leftCol}>
          <div className={styles.type}>
            <span className={styles.twText}>{display}</span>
            <span className={styles.cursor} />
          </div>
          <div className={styles.btns}>
          <MagneticButton>
            <a
              href="https://t.me/sfokin1337"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              {t.hero.ctaPrimary}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="/Sorokin_CV.pdf" download className="btn-secondary">
              {locale === 'ru' ? 'Скачать CV' : 'Download CV'}
            </a>
          </MagneticButton>
          </div>
        </div>
        <p className={styles.desc}>{t.hero.description}</p>
      </motion.div>

      {/* Маленькая подсказка о скролле */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span>{locale === 'ru' ? 'Прокрути' : 'Scroll'}</span>
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] as any }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Magnetic-эффект для CTA: курсор «притягивает» кнопку.
 */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={styles.magnetic}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * 0.25);
        y.set((e.clientY - cy) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
