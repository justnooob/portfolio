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
      overview: 'Обзор',
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
    },
    en: {
      role: 'Role',
      duration: 'Duration',
      tools: 'Tools',
      overview: 'Overview',
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
    },
  };
  const t = translations[lang];

  return (
    <>
      {/* HERO — старый вид */}
      <section className={styles.projectHero} style={{ background: project.color }}>
        <div className={styles.projectHeroInner}>
          <div className={styles.projectHeroContent}>
            <h1 className={styles.projectName}>{project.name[lang]}</h1>
            <p className={styles.projectOverview}>{project.overview[lang]}</p>
          </div>
        </div>
      </section>

      {/* META — Роль, Период, Инструменты */}
      <section className={styles.projectMeta}>
        <div className={styles.projectMetaInner}>
          <div className={styles.projectMetaItem}>
            <div className={styles.projectMetaLabel}>{t.role}</div>
            <div className={styles.projectMetaValue}>{project.role[lang]}</div>
          </div>
          <div className={styles.projectMetaItem}>
            <div className={styles.projectMetaLabel}>{t.duration}</div>
            <div className={styles.projectMetaValue}>{project.duration[lang]}</div>
          </div>
          <div className={styles.projectMetaItem}>
            <div className={styles.projectMetaLabel}>{t.tools}</div>
            <div className={styles.projectMetaTools}>
              {project.tools.map((tool, i) => (
                <span key={i} className={styles.projectTool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КОНТЕНТ */}
      <section className={styles.projectContent}>
        <div className={styles.projectContentInner}>
          {/* CONTEXT */}
          {project.context && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.context}</h2>
              <p className={styles.projectSectionText}>{project.context[lang]}</p>
            </div>
          )}

          {/* PROBLEM */}
          {project.problem && (
            <div className={styles.projectSection}>
              <h2 className={styles.projectSectionTitle}>{t.problem}</h2>
              <p className={styles.projectSectionText}>{project.problem[lang]}</p>
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

      {/* BEHANCE */}
      {project.behanceUrl && (
        <section className={styles.projectBehance}>
          <div className={styles.projectBehanceInner}>
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className={styles.projectBehanceButton}>
              {t.viewOnBehance}
              <span className={styles.projectBehanceIcon}>→</span>
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
