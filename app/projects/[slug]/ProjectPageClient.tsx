'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { useReveal, useStaggerReveal } from '@/lib/useReveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { translations, projects } from '@/lib/data';
import styles from './project.module.css';

/**
 * Обёртка для появления текстовых блоков при скролле.
 * Использует CSS reveal-анимации (fade + slide-up + blur).
 */
function RevealBlock({
  children,
  className,
  variant = 'reveal',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'reveal' | 'reveal-slide-left' | 'reveal-mask-up';
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`${className ?? ''} ${variant} ${visible ? 'visible' : ''}`}
    >
      {children}
    </section>
  );
}

export default function ProjectPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { locale } = useApp();
  const t = translations[locale];
  const [resultsExpanded, setResultsExpanded] = useState(false);
  const { ref: screensRef, visible: screensVisible } = useReveal<HTMLDivElement>();
  // Reveal-анимации для META (3 колонки) и финальных кнопок
  const { ref: metaRef, visible: metaVisible } = useStaggerReveal<HTMLDivElement>(120);
  const { ref: footerRef, visible: footerVisible } = useReveal<HTMLDivElement>();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

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

  const openModal = (imageSrc: string) => {
    setActiveImage(imageSrc);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveImage(null);
    document.body.style.overflow = '';
  };

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
  const firstScreen = screens[0];
  const otherScreens = screens.slice(1, 5);

  return (
    <main>
      <Nav />

      {/* HERO */}
      <div
        className={`${styles.hero} ${project.lightText ? styles.heroLight : ''}`}
        style={{ background: project.color }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <button onClick={() => router.push('/#projects')} className={styles.back}>
            ← {t.project.back}
          </button>
          <div className={styles.heroTop}>
            <div className={styles.tags}>
              {project.tags[locale].map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
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

      {/* META */}
      <div
        ref={metaRef}
        className={`${styles.meta} reveal-stagger ${metaVisible ? 'visible' : ''}`}
      >
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
      <div className={styles.content}>
        {project.context && (
          <RevealBlock className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Контекст' : 'Context'}</div>
            <p className={styles.blockText}>{project.context[locale]}</p>
          </RevealBlock>
        )}

        {project.problem && (
          <RevealBlock className={styles.block}>
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
          </RevealBlock>
        )}

        {project.goals && project.goals[locale]?.length > 0 && (
          <RevealBlock className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Цели' : 'Goals'}</div>
            <ul className={styles.resultsList}>
              {project.goals[locale].map((goal, i) => (
                <li key={i} className={styles.result}>{goal}</li>
              ))}
            </ul>
          </RevealBlock>
        )}

        {project.process && (
          <RevealBlock className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Процесс' : 'Process'}</div>
            <p className={styles.blockText}>{project.process[locale]}</p>
          </RevealBlock>
        )}

        {project.keyFeatures && project.keyFeatures[locale]?.length > 0 && (
          <RevealBlock className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Ключевые фичи' : 'Key Features'}</div>
            <ul className={styles.resultsList}>
              {project.keyFeatures[locale].map((feature, i) => (
                <li key={i} className={styles.result}>{feature}</li>
              ))}
            </ul>
          </RevealBlock>
        )}

        {project.uiDirection && (
          <RevealBlock className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'UI Направление' : 'UI Direction'}</div>
            <p className={styles.blockText}>{project.uiDirection[locale]}</p>
          </RevealBlock>
        )}

        {/* SCREENS */}
        {screens.length > 0 && (
          <RevealBlock className={styles.screensBlock}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Экраны' : 'Screens'}</div>
            <div
              ref={screensRef}
              className={`${styles.screensGrid} ${screensVisible ? styles.screensGridVisible : ''}`}
            >
              {firstScreen && firstScreen.image && (
                <div className={`${styles.screenItem} ${styles.screenWide} ${styles.screenItem1}`}>
                  <div className={styles.screenPlaceholder} style={{ background: project.color }}>
                    <img
                      src={firstScreen.image}
                      alt={firstScreen.title[locale]}
                      onClick={() => openModal(firstScreen.image!)}
                      onContextMenu={(e) => e.preventDefault()}
                      className={styles.clickableImg}
                    />
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
                      <img
                        src={screen.image}
                        alt={screen.title[locale]}
                        onClick={() => openModal(screen.image!)}
                        onContextMenu={(e) => e.preventDefault()}
                        className={styles.clickableImg}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealBlock>
        )}

        {/* RESULTS */}
        <RevealBlock className={styles.block}>
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
        </RevealBlock>

        {project.conclusion && (
          <RevealBlock className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Выводы' : 'Conclusion'}</div>
            <p className={styles.blockText}>{project.conclusion[locale]}</p>
          </RevealBlock>
        )}

        {/* BUTTONS: Behance + Next project */}
        <div
          ref={footerRef}
          className={`${styles.projectFooter} reveal-bounce ${footerVisible ? 'visible' : ''}`}
        >
          {project.behanceUrl && (
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta">
              {t.project.viewBehance}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          )}
          {nextProject && (
            <Link href={`/projects/${nextProject.slug}`} className="btn-secondary">
              {locale === 'ru' ? 'Следующий проект' : 'Next project'}
            </Link>
          )}
        </div>
      </div>

      <FinalCta />
      <Footer />

      {/* MODAL */}
      <div
        className={`${styles.modalOverlay} ${modalOpen ? styles.modalOverlayOpen : ''}`}
        onClick={closeModal}
      >
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={closeModal}>✕</button>
          {activeImage && (
            <img
              src={activeImage}
              alt="Полноразмерное изображение"
              onContextMenu={(e) => e.preventDefault()}
              className={styles.modalImage}
              onClick={closeModal}
            />
          )}
        </div>
      </div>
    </main>
  );
}