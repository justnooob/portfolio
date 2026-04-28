'use client';

import { useApp } from '@/components/AppProvider';
import { Project } from '@/lib/data';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import styles from './project.module.css';

export default function ProjectPageClient({ project }: { project: Project }) {
  const { locale } = useApp();
  const lang = locale as 'ru' | 'en';

  const translations = {
    ru: {
      role: 'Роль',
      duration: 'Период',
      tools: 'Инструменты',
      context: 'Контекст',
      problem: 'Проблема',
      goals: 'Цели',
      process: 'Процесс',
      keyFeatures: 'Ключевые фичи',
      uiDirection: 'UI Направление',
      screens: 'Экраны',
      results: 'Результаты',
      conclusion: 'Выводы',
      viewOnBehance: 'Смотреть на Behance',
      back: 'Назад',
    },
    en: {
      role: 'Role',
      duration: 'Duration',
      tools: 'Tools',
      context: 'Context',
      problem: 'Problem',
      goals: 'Goals',
      process: 'Process',
      keyFeatures: 'Key Features',
      uiDirection: 'UI Direction',
      screens: 'Screens',
      results: 'Results',
      conclusion: 'Conclusion',
      viewOnBehance: 'View on Behance',
      back: 'Back',
    },
  };
  const t = translations[lang];

  return (
    <>
      {/* HERO — полный блок со всем содержимым */}
      <section className={styles.projectHero} style={{ background: project.color }}>
        <div className={styles.projectHeroInner}>
          {/* Top row: Back + Tags */}
          <div className={styles.projectHeroTop}>
            <a href="/projects#projects" className={styles.projectBackLink}>← {t.back}</a>
            <div className={styles.projectHeroTags}>
              {project.tags[lang].map((tag, i) => (
                <span key={i} className={styles.projectHeroTag}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Name */}
          <h1 className={styles.projectName}>{project.name[lang]}</h1>

          {/* Description */}
          <p className={styles.projectDesc}>{project.shortDesc[lang]}</p>

          {/* Meta: Role + Duration + Tools */}
          <div className={styles.projectHeroMeta}>
            <div className={styles.projectHeroMetaItem}>
              <span className={styles.projectHeroMetaLabel}>{t.role}</span>
              <span className={styles.projectHeroMetaValue}>{project.role[lang]}</span>
            </div>
            <div className={styles.projectHeroMetaItem}>
              <span className={styles.projectHeroMetaLabel}>{t.duration}</span>
              <span className={styles.projectHeroMetaValue}>{project.duration[lang]}</span>
            </div>
            <div className={styles.projectHeroMetaItem}>
              <span className={styles.projectHeroMetaLabel}>{t.tools}</span>
              <div className={styles.projectHeroMetaTools}>
                {project.tools.map((tool, i) => (
                  <span key={i} className={styles.projectHeroMetaTool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className={styles.projectHeroMetrics}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.projectHeroMetric}>
                  <div className={styles.projectHeroMetricValue}>{m.value}</div>
                  <div className={styles.projectHeroMetricLabel}>{m.label[lang]}</div>
                </div>
              ))}
            </div>
          )}

          {/* Year */}
          <div className={styles.projectYear}>{project.year}</div>
        </div>
      </section>

      {/* CONTENT */}
      <section className={styles.projectContent}>
        <div className={styles.projectContentInner}>
          {/* CONTEXT */}
          {project.context && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.context}</h2>
              <p className={styles.projectSectionText}>{project.context[lang]}</p>
            </div>
          )}

          {/* PROBLEM — as list */}
          {project.problem && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.problem}</h2>
              {/* Проблема может быть либо текст, либо список (если она содержит скобки) */}
              {project.problem[lang].includes('(1)') || project.problem[lang].includes('(2)') ? (
                <ul className={styles.projectList}>
                  {project.problem[lang].split(/\(\d+\)\s+/).filter(Boolean).map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.projectSectionText}>{project.problem[lang]}</p>
              )}
            </div>
          )}

          {/* GOALS */}
          {project.goals && project.goals[lang]?.length > 0 && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.goals}</h2>
              <ul className={styles.projectList}>
                {project.goals[lang].map((goal, i) => (
                  <li key={i}>{goal}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PROCESS */}
          {project.process && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.process}</h2>
              <p className={styles.projectSectionText}>{project.process[lang]}</p>
            </div>
          )}

          {/* KEY FEATURES */}
          {project.keyFeatures && project.keyFeatures[lang]?.length > 0 && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.keyFeatures}</h2>
              <ul className={styles.projectList}>
                {project.keyFeatures[lang].map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* UI DIRECTION */}
          {project.uiDirection && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.uiDirection}</h2>
              <p className={styles.projectSectionText}>{project.uiDirection[lang]}</p>
            </div>
          )}

          {/* SCREENS */}
          {project.screens && project.screens.length > 0 && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.screens}</h2>
              <div className={styles.projectScreensGrid}>
                {/* 1-й экран на всю ширину */}
                {project.screens[0] && (
                  <div className={styles.projectScreenWide}>
                    <div className={styles.projectScreenPlaceholder}>
                      {project.screens[0].image && (
                        <img src={project.screens[0].image} alt={project.screens[0].title[lang]} />
                      )}
                    </div>
                  </div>
                )}

                {/* 2-5 экраны в grid 2x2 */}
                <div className={styles.projectScreenGrid2x2}>
                  {project.screens.slice(1, 5).map((screen, i) => (
                    <div key={i + 1} className={styles.projectScreenCard}>
                      <div className={styles.projectScreenPlaceholder}>
                        {screen.image && (
                          <img src={screen.image} alt={screen.title[lang]} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}
          <div className={styles.projectSection}>
            <h2 className={styles.projectSectionTitle}>{t.results}</h2>
            <ul className={styles.projectList}>
              {project.results[lang].map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>
          </div>

          {/* CONCLUSION */}
          {project.conclusion && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.conclusion}</h2>
              <p className={styles.projectSectionText}>{project.conclusion[lang]}</p>
            </div>
          )}
        </div>
      </section>

      {/* BEHANCE — как CTA кнопка */}
      {project.behanceUrl && (
        <section className={styles.projectBehance}>
          <div className={styles.projectBehanceInner}>
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta">
              {t.viewOnBehance}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </section>
      )}

      {/* CTA + FOOTER */}
      <FinalCta />
      <Footer />
    </>
  );
}
