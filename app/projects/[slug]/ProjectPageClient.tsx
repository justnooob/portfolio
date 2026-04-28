'use client';

import { useApp } from '@/components/AppProvider';
import { Project } from '@/lib/data';
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
    <main className={styles.page} style={{ background: project.color }}>
      {/* HERO — СТАРАЯ СТРУКТУРА */}
      <section className={styles.hero} style={{ background: project.color }}>
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <a href="/projects#projects" className={styles.backLink}>← {t.back}</a>
            <div className={styles.tags}>
              {project.tags[lang].map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <h1 className={styles.heroTitle}>{project.name[lang]}</h1>
          <p className={styles.heroDesc}>{project.shortDesc[lang]}</p>

          {/* МЕТАДАННЫЕ СТРОКИ */}
          <div className={styles.heroMeta}>
            <div className={styles.metaLine}>
              <span className={styles.metaLabel}>{t.role}</span>
              <span className={styles.metaValue}>{project.role[lang]}</span>
            </div>
            <div className={styles.metaLine}>
              <span className={styles.metaLabel}>{t.duration}</span>
              <span className={styles.metaValue}>{project.duration[lang]}</span>
            </div>
            <div className={styles.metaLine}>
              <span className={styles.metaLabel}>{t.tools}</span>
              <span className={styles.metaValue}>{project.tools.join(', ')}</span>
            </div>
          </div>

          {/* МЕТРИКИ */}
          {project.metrics && project.metrics.length > 0 && (
            <div className={styles.metricsRow}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.metricItem}>
                  <div className={styles.metricNum}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label[lang]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* КОНТЕНТ СЕКЦИИ */}
      <section className={styles.content}>
        {/* CONTEXT */}
        {project.context && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.context}</h2>
            <p className={styles.sectionText}>{project.context[lang]}</p>
          </div>
        )}

        {/* PROBLEM */}
        {project.problem && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.problem}</h2>
            <p className={styles.sectionText}>{project.problem[lang]}</p>
          </div>
        )}

        {/* GOALS */}
        {project.goals && project.goals[lang]?.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.goals}</h2>
            <ul className={styles.list}>
              {project.goals[lang].map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </div>
        )}

        {/* PROCESS */}
        {project.process && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.process}</h2>
            <p className={styles.sectionText}>{project.process[lang]}</p>
          </div>
        )}

        {/* KEY FEATURES */}
        {project.keyFeatures && project.keyFeatures[lang]?.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.keyFeatures}</h2>
            <ul className={styles.list}>
              {project.keyFeatures[lang].map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* UI DIRECTION */}
        {project.uiDirection && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.uiDirection}</h2>
            <p className={styles.sectionText}>{project.uiDirection[lang]}</p>
          </div>
        )}

        {/* SCREENS — GRID: 1 ШИР + 2x2 */}
        {project.screens && project.screens.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.screens}</h2>
            <div className={styles.screensGrid}>
              {/* Первый экран — на всю ширину */}
              {project.screens[0] && (
                <div className={styles.screenWide}>
                  <div className={styles.screenPlaceholder}>
                    {project.screens[0].image && (
                      <img src={project.screens[0].image} alt={project.screens[0].title[lang]} />
                    )}
                  </div>
                  <div className={styles.screenLabel}>{project.screens[0].title[lang]}</div>
                </div>
              )}

              {/* Остальные 4 экрана — 2 в ряд */}
              {project.screens.slice(1, 5).map((screen, i) => (
                <div key={i + 1} className={styles.screenCard}>
                  <div className={styles.screenPlaceholder}>
                    {screen.image && <img src={screen.image} alt={screen.title[lang]} />}
                  </div>
                  <div className={styles.screenLabel}>{screen.title[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.results}</h2>
          <ul className={styles.list}>
            {project.results[lang].map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        </div>

        {/* CONCLUSION */}
        {project.conclusion && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.conclusion}</h2>
            <p className={styles.sectionText}>{project.conclusion[lang]}</p>
          </div>
        )}
      </section>

      {/* BEHANCE BUTTON */}
      {project.behanceUrl && (
        <section className={styles.behanceSection}>
          <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className={styles.behanceButton}>
            {t.viewOnBehance}
            <span className={styles.behanceArrow}>→</span>
          </a>
        </section>
      )}
    </main>
  );
}
