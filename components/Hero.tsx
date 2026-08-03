'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import { useGSAP, gsap, prefersReducedMotion } from '@/lib/gsap';
import SplitHeading from './SplitHeading';
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

  // Parallax по hero — scrub через GSAP/ScrollTrigger (синхронизирован с Lenis)
  const heroRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !titleBlockRef.current) return;
      gsap.to(titleBlockRef.current, {
        yPercent: -16,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          // число вместо true → playhead «догоняет» скролл с лёгким лагом,
          // поэтому при быстром скролле вверх hero не выскакивает резко
          scrub: 0.8,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <div className={styles.hero} id="about" data-section="hero" ref={heroRef}>
      <div className={styles.titleBlock} ref={titleBlockRef}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          <span className={styles.dot} />
          {t.hero.badge}
        </motion.div>

        <SplitHeading
          as="h1"
          className={styles.title}
          text={`${t.hero.name1}\n${t.hero.name2}`}
          type="lines, chars"
          delay={0.25}
          stagger={0.035}
        />

      </div>

      <motion.div
        className={styles.subtitleBlock}
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
            <a href="/Sorokin_CV.pdf" download="Sorokin_CV.pdf" className="btn-secondary">
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
 * Magnetic-эффект для CTA: курсор «притягивает» кнопку (GSAP quickTo).
 */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: 'power3' });
      yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: 'power3' });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={styles.magnetic}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        xTo.current?.((e.clientX - cx) * 0.25);
        yTo.current?.((e.clientY - cy) * 0.35);
      }}
      onMouseLeave={() => {
        xTo.current?.(0);
        yTo.current?.(0);
      }}
    >
      {children}
    </div>
  );
}
