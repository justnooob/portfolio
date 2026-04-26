'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { translations, projects } from '@/lib/data';
import styles from './project.module.css';

const VISIBLE_RESULTS = 3;

export default function ProjectPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { locale } = useApp();
  const t = translations[locale];
  const [resultsExpanded, setResultsExpanded] = useState(false);

  const project = projects.find((p) => p.slug === slug);

  // Управляем "режимом" хедера на странице проекта:
  // - dark hero (белый текст) → ставим на <html> data-hero-mode="dark"
  //   → Nav рендерит логотип/бургер белым цветом до скролла
  // - light hero (тёмный текст) → data-hero-mode="light"
  //   → Nav рендерит логотип чёрным цветом
  // После скролла классы убираются, Nav возвращается к обычным цветам темы
  useEffect(() => {
    if (!project) return;
    const heroMode = project.lightText ? 'light' : 'dark';
    document.documentElement.setAttribute('data-hero-mode', heroMode);
    return () => {
      document.documentElement.removeAttribute('data-hero-mode');
    };
  }, [project]);

  if (!project) {
    return (
      <main>
        <Nav />
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Project not found</p>
          <Link href="/" className="btn-cta">
            {t.project.back}
            <span className="btn-cta-ico-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const allResults = project.results[locale];
  const hasMore = allResults.length > VISIBLE_RESULTS;
  const displayedResults = resultsExpanded ? allResults : allResults.slice(0, VISIBLE_RESULTS);

  const showMoreLabel = locale === 'ru' ? 'Показать все' : 'Show all';
  const collapseLabel = locale === 'ru' ? 'Свернуть' : 'Collapse';

  return (
    <main>
      <Nav />

      <div
        className={`${styles.hero} ${project.lightText ? styles.heroLight : ''}`}
        style={{ background: project.color }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <button onClick={() => router.push('/')} className={styles.back}>
            ← {t.project.back}
          </button>
          <div className={styles.heroTop}>
            <div className={styles.tags}>
              {project.tags[locale].map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.year}>{project.year}</div>
          </div>
          <h1 className={styles.title}>{project.name[locale]}</h1>
          <p className={styles.subtitle}>{project.shortDesc[locale]}</p>
          {project.metrics && (
            <div className={styles.metrics}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.metric}>
                  <div className={styles.metricNum}>{m.value}</div>
                  <div className={styles.metricLbl}>{m.label[locale]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.role}</div>
          <div className={styles.metaVal}>{project.role[locale]}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.duration}</div>
          <div className={styles.metaVal}>{project.duration[locale]}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.tools}</div>
          <div className={styles.metaVal}>{project.tools.join(', ')}</div>
        </div>
      </div>

      <div className={styles.content}>
        <section className={`${styles.block}`}>
          <div className={styles.blockLbl}>{t.project.overview}</div>
          <p className={styles.blockText}>{project.overview[locale]}</p>
        </section>

        <section className={`${styles.block}`}>
          <div className={styles.blockLbl}>{t.project.challenge}</div>
          <p className={styles.blockText}>{project.challenge[locale]}</p>
        </section>

        <section className={`${styles.block}`}>
          <div className={styles.blockLbl}>{t.project.solution}</div>
          <p className={styles.blockText}>{project.solution[locale]}</p>
        </section>

        <section className={`${styles.block}`}>
          <div className={styles.blockLbl}>{t.project.results}</div>
          <div className={`${styles.resultsWrap} ${!resultsExpanded && hasMore ? styles.resultsCollapsed : ''}`}>
            <ul className={styles.resultsList}>
              {displayedResults.map((r, i) => (
                <li key={i} className={styles.result}>
                  {r}
                </li>
              ))}
            </ul>
            {!resultsExpanded && hasMore && <div className={styles.fadeOverlay}></div>}
          </div>
          {hasMore && (
            <button
              className={styles.expandBtn}
              onClick={() => setResultsExpanded(!resultsExpanded)}
            >
              {resultsExpanded ? collapseLabel : showMoreLabel}
              <span className={`${styles.expandChev} ${resultsExpanded ? styles.expandChevRotated : ''}`}>⌄</span>
            </button>
          )}
        </section>

        <section className={`${styles.screensBlock}`}>
          <div className={styles.blockLbl}>{t.project.screens}</div>
          <div className={styles.screensPlaceholder} style={{ background: project.color }}>
            <div className={styles.screensMsg}>
              {locale === 'ru'
                ? 'Добавьте скриншоты проекта в папку public/projects/' + project.slug + '/'
                : 'Add project screenshots to public/projects/' + project.slug + '/'}
            </div>
          </div>
        </section>

        {project.behanceUrl && (
          <div className={`${styles.behance}`}>
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta">
              {t.project.viewBehance}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        )}
      </div>

      <FinalCta />
      <Footer />
    </main>
  );
}
