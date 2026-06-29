'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from './AppProvider';
import { useReveal, useStaggerReveal } from '@/lib/useReveal';
import { projects, Project } from '@/lib/data';
import { useTilt } from './motion-utils';
import styles from './ViewAllWork.module.css';

/**
 * Большой раздел WORK как у itsjay.us:
 *   - Заголовок WORK + год
 *   - 2 широкие карточки с обложкой во весь блок
 *   - Под каждой карточкой — бегущая строка с тэгами и стэком
 *   - Снизу ссылка «See all →» на /projects
 */
export default function ViewAllWork() {
  const { locale } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reveal-анимации через CSS (как в других секциях для консистентности)
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLDivElement>();
  const { ref: cardsRef, visible: cardsVisible } = useStaggerReveal<HTMLDivElement>(180);
  const { ref: seeAllRef, visible: seeAllVisible } = useReveal<HTMLDivElement>();

  // Берём 2 «свежих» не-featured проекта для главного блока на странице.
  const pool = projects.filter((p) => !p.featured && !p.isThisSite && !p.isProduct);
  const featured = pool.slice(0, 2);

  // Год для заголовка — берём диапазон годов отображаемых карточек.
  // Формат: '24-25 (если разные) или просто '24 (если одинаковые)
  const cardYears = featured
    .flatMap((p) => p.year.match(/\d{4}/g) || [])
    .map((y) => parseInt(y, 10))
    .filter((y) => !Number.isNaN(y));
  const yMin = cardYears.length ? Math.min(...cardYears) : new Date().getFullYear();
  const yMax = cardYears.length ? Math.max(...cardYears) : yMin;
  const yearShort =
    yMin === yMax
      ? `'${String(yMin).slice(-2)}`
      : `'${String(yMin).slice(-2)}-${String(yMax).slice(-2)}`;

  const seeAll = locale === 'ru' ? 'Смотреть все' : 'See all';
  const workLabel = locale === 'ru' ? 'РАБОТЫ' : 'WORK';

  const { theme } = useApp();
  // Все карточки в этом блоке имеют монохромный фон (без цветных проектных
  // палитр) — solid под тему сайта, чтобы марки/обложка были на спокойной подложке.
  const cardBg = theme === 'light' ? '#EDEFF7' : '#131313';

  return (
    <section className={styles.section} ref={sectionRef} data-section="projects">
      <div className={styles.inner}>
        <div
          ref={headerRef}
          className={`${styles.header} reveal-slide-left ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className={styles.title}>{workLabel}</h2>
          <span className={styles.year}>{yearShort}</span>
        </div>

        <div
          ref={cardsRef}
          className={`${styles.cardsRow} reveal-stagger-3d ${cardsVisible ? 'visible' : ''}`}
        >
          {featured.map((p) => (
            <BigCard key={p.slug} project={p} cardBg={cardBg} />
          ))}
        </div>

        <div
          ref={seeAllRef}
          className={`${styles.seeAllWrap} reveal-bounce ${seeAllVisible ? 'visible' : ''}`}
        >
          <Link href="/projects" className="btn-cta">
            {seeAll}
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
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Override-палитры аватарок для конкретных проектов (фон + цвет буквы).
 * Если slug есть в карте — используем эти значения вместо project.logoColor.
 */
const AVATAR_OVERRIDES: Record<string, { bg: string; fg: string }> = {
  buildit: { bg: '#6588F4', fg: '#ffffff' },
  hobbist: { bg: '#131313', fg: '#CCFF00' },
};

/** Большая широкая карточка с оверлеем */
function BigCard({
  project,
  cardBg,
}: {
  project: Project;
  cardBg: string;
}) {
  const { locale } = useApp();
  const tilt = useTilt<HTMLDivElement>(2.2);

  const categoryLabel = (() => {
    if (project.category === 'saas') return locale === 'ru' ? 'ПРОДУКТ' : 'PRODUCT';
    if (project.category === 'mobile') return locale === 'ru' ? 'МОБ. ПРИЛОЖЕНИЕ' : 'MOBILE';
    return locale === 'ru' ? 'САЙТ' : 'WEBSITE';
  })();

  const avatar = AVATAR_OVERRIDES[project.slug] ?? {
    bg: project.logoColor || '#4fa3ff',
    fg: '#ffffff',
  };

  // Берём только год (без диапазона)
  const yearDisplay = (project.year.match(/\d{4}/g) || []).pop() ?? project.year;

  // Список тегов для бегущей строки. Объединяем теги локали и инструменты.
  const marqueeItems = [...project.tags[locale], ...project.tools];

  return (
    <div className={styles.cardWrap}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{ width: '100%' }}
      >
        <Link
          href={`/projects/${project.slug}`}
          className={styles.bigCard}
          style={{ background: cardBg }}
        >
          <div className={styles.coverArea}>
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.name[locale]}
                className={styles.cover}
                loading="lazy"
              />
            ) : (
              <div className={styles.coverMock}>{project.name[locale]}</div>
            )}

            <div className={styles.overlay}>
              <div className={styles.overlayLeft}>
                <span
                  className={styles.avatar}
                  style={{ background: avatar.bg, color: avatar.fg }}
                >
                  {project.logo}
                </span>
                <span className={styles.projectName}>{project.name[locale]}</span>
              </div>
              <div className={styles.overlayRight}>
                <span className={styles.category}>{categoryLabel}</span>
                <span className={styles.cardYear}>{yearDisplay}</span>
              </div>
            </div>
          </div>

          {/* Бегущая строка тегов/стека — нижняя полоса самой карточки */}
          <div className={styles.marqueeWrap} aria-hidden="true">
            <div className={styles.marqueeTrack}>
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span key={idx} className={styles.marqueeItem}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
