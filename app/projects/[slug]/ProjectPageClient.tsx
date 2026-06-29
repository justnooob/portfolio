'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { useReveal, useContentReveal } from '@/lib/useReveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { MediaProvider, MediaSingle, type MediaItem } from '@/components/MediaViewer';
import { translations, projects } from '@/lib/data';
import SplitHeading from '@/components/SplitHeading';
import Magnetic from '@/components/Magnetic';
import styles from './project.module.css';

export default function ProjectPageClient({ slug }: { slug: string }) {
  const { locale } = useApp();
  const t = translations[locale];
  const contentRef = useContentReveal<HTMLDivElement>();
  const [resultsExpanded, setResultsExpanded] = useState(false);
  const { ref: screensRef, visible: screensVisible } = useReveal<HTMLDivElement>();

  const project = projects.find((p) => p.slug === slug);
	const currentIndex = projects.findIndex((p) => p.slug === slug);
	const nextProject = currentIndex !== -1
	  ? projects[(currentIndex + 1) % projects.length]
	  : null;

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
  const hasMore = allResults.length > 3;
  const displayedResults = resultsExpanded ? allResults : allResults.slice(0, 3);
  const showMoreLabel = locale === 'ru' ? 'Показать все' : 'Show all';
  const collapseLabel = locale === 'ru' ? 'Свернуть' : 'Collapse';

  const screens = project.screens ?? [];
  const screenItems: MediaItem[] = screens
    .filter((s) => s.image)
    .map((s) => ({
      kind: 'single' as const,
      color: project.color,
      src: s.image!,
      label: s.title[locale],
    }));
  const firstScreen = screens[0];
  const otherScreens = screens.slice(1, 5);

  return (
    <MediaProvider items={screenItems}>
    <main>
      <Nav />

      {/* HERO */}
      <div
        className={styles.hero}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Link href={`/projects#${slug}`} scroll={false} className={styles.back}>
            ← {locale === 'ru' ? 'Назад к проектам' : 'Back to projects'}
          </Link>
          <div className={styles.heroTop}>
            <div className={styles.tags}>
              {project.tags[locale].map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.year}>{project.year}</div>
          </div>
          <SplitHeading as="h1" className={styles.title} text={project.name[locale]} type="lines" delay={0.15} stagger={0.1} />
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

      {/* META */}
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

      {/* CONTENT */}
      <div className={styles.content} ref={contentRef}>
        {project.context && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Контекст' : 'Context'}</div>
            <p className={styles.blockText}>{project.context[locale]}</p>
          </section>
        )}

        {project.problem && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Проблема' : 'Problem'}</div>
            {project.problem[locale].includes('(1)') || project.problem[locale].includes('(2)') ? (
              <ul className={styles.resultsList}>
                {project.problem[locale].split(/\(\d+\)\s+/).filter(Boolean).map((item, i) => (
                  <li key={i} className={styles.result}>{item.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.blockText}>{project.problem[locale]}</p>
            )}
          </section>
        )}

        {project.goals && project.goals[locale]?.length > 0 && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Цели' : 'Goals'}</div>
            <ul className={styles.resultsList}>
              {project.goals[locale].map((goal, i) => (
                <li key={i} className={styles.result}>{goal}</li>
              ))}
            </ul>
          </section>
        )}

        {project.process && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Процесс' : 'Process'}</div>
            <p className={styles.blockText}>{project.process[locale]}</p>
          </section>
        )}

        {project.keyFeatures && project.keyFeatures[locale]?.length > 0 && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Ключевые фичи' : 'Key Features'}</div>
            <ul className={styles.resultsList}>
              {project.keyFeatures[locale].map((feature, i) => (
                <li key={i} className={styles.result}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {project.uiDirection && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'UI Направление' : 'UI Direction'}</div>
            <p className={styles.blockText}>{project.uiDirection[locale]}</p>
          </section>
        )}

        {/* SCREENS */}
        {screens.length > 0 && (
          <section className={styles.screensBlock}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Экраны' : 'Screens'}</div>
            <div
              ref={screensRef}
              className={`${styles.screensGrid} ${screensVisible ? styles.screensGridVisible : ''}`}
            >
              {firstScreen && firstScreen.image && (
                <div className={`${styles.screenItem} ${styles.screenWide} ${styles.screenItem1}`}>
                  <div className={styles.screenPlaceholder} style={{ background: project.color }}>
                    <MediaSingle index={0} />
                  </div>
                </div>
              )}

              {otherScreens.map((screen, idx) => {
                if (!screen || !screen.image) return null;
                return (
                  <div
                    key={idx}
                    className={`${styles.screenItem} ${styles[`screenItem${idx + 2}`]}`}
                  >
                    <div className={styles.screenPlaceholder} style={{ background: project.color }}>
                      <MediaSingle index={idx + 1} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* RESULTS */}
        <section className={styles.block}>
          <div className={styles.blockLbl}>{t.project.results}</div>
          <div className={`${styles.resultsWrap} ${!resultsExpanded && hasMore ? styles.resultsCollapsed : ''}`}>
            <ul className={styles.resultsList}>
              {displayedResults.map((r, i) => (
                <li key={i} className={styles.result}>{r}</li>
              ))}
            </ul>
            {!resultsExpanded && hasMore && <div className={styles.fadeOverlay}></div>}
          </div>
          {hasMore && (
            <button className={styles.expandBtn} onClick={() => setResultsExpanded(!resultsExpanded)}>
              {resultsExpanded ? collapseLabel : showMoreLabel}
              <span className={`${styles.expandChev} ${resultsExpanded ? styles.expandChevRotated : ''}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          )}
        </section>

        {project.conclusion && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Выводы' : 'Conclusion'}</div>
            <p className={styles.blockText}>{project.conclusion[locale]}</p>
          </section>
        )}

        {/* BUTTONS: Back + Behance + Next project */}
        <div className={styles.projectFooter}>
          <Magnetic>
            <Link href={`/projects#${slug}`} scroll={false} className="btn-secondary">
              {locale === 'ru' ? 'Назад к кейсам' : 'Back to cases'}
            </Link>
          </Magnetic>
          {project.behanceUrl && (
            <Magnetic>
              <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta btn-behance">
                {t.project.viewBehance}
                <span className="btn-cta-ico-wrap">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </Magnetic>
          )}
          {nextProject && (
            <Magnetic>
              <Link href={`/projects/${nextProject.slug}`} className="btn-cta btn-cta-next">
                {locale === 'ru' ? 'Следующий проект' : 'Next project'}
                <span className="btn-cta-ico-wrap">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 7H10.5M10.5 7L7 3.5M10.5 7L7 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </Magnetic>
          )}
        </div>
      </div>

      <FinalCta />
      <Footer />
    </main>
    </MediaProvider>
  );
}