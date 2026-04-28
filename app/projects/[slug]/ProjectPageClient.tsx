'use client';

import { useApp } from '@/components/AppProvider';
import { Project } from '@/lib/data';
import styles from './project.module.css';

export default function ProjectPageClient({ project }: { project: Project }) {
  const { locale, theme } = useApp();
  const t = {
    ru: { role: 'Роль', duration: 'Период', tools: 'Инструменты', results: 'Результаты', screens: 'Экраны', features: 'Ключевые фичи', back: '← Назад к проектам' },
    en: { role: 'Role', duration: 'Duration', tools: 'Tools', results: 'Results', screens: 'Screens', features: 'Key Features', back: '← Back to Projects' },
  }[locale];

  const lang = locale as 'ru' | 'en';

  return (
    <main className={styles.page} style={{ background: project.color }}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroName}>{project.name[lang]}</h1>
            <p className={styles.heroDesc}>{project.shortDesc[lang]}</p>

            {/* HERO META */}
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>{t.role}</div>
                <div className={styles.metaValue}>{project.role[lang]}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>{t.duration}</div>
                <div className={styles.metaValue}>{project.duration[lang]}</div>
              </div>
              {project.metrics && project.metrics.length > 0 && (
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Key Result</div>
                  <div className={styles.metaValue}>{project.metrics[0].value}</div>
                </div>
              )}
            </div>
          </div>

          {/* HERO METRICS */}
          {project.metrics && project.metrics.length > 0 && (
            <div className={styles.metricsGrid}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.metric}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label[lang]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTEXT */}
      {project.context && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Context</h2>
            </div>
            <p className={styles.sectionText}>{project.context[lang]}</p>
          </div>
        </section>
      )}

      {/* PROBLEM */}
      {project.problem && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Problem</h2>
            </div>
            <p className={styles.sectionText}>{project.problem[lang]}</p>
          </div>
        </section>
      )}

      {/* GOALS */}
      {project.goals && project.goals[lang]?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Goals</h2>
            </div>
            <ul className={styles.list}>
              {project.goals[lang].map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {project.process && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Process</h2>
            </div>
            <p className={styles.sectionText}>{project.process[lang]}</p>
          </div>
        </section>
      )}

      {/* TOOLS */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{t.tools}</h2>
          </div>
          <div className={styles.toolsGrid}>
            {project.tools.map((tool, i) => (
              <div key={i} className={styles.toolTag}>{tool}</div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      {project.keyFeatures && project.keyFeatures[lang]?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{t.features}</h2>
            </div>
            <ul className={styles.list}>
              {project.keyFeatures[lang].map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* UI DIRECTION */}
      {project.uiDirection && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>UI Direction</h2>
            </div>
            <p className={styles.sectionText}>{project.uiDirection[lang]}</p>
          </div>
        </section>
      )}

      {/* SCREENS */}
      {project.screens && project.screens.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{t.screens}</h2>
            </div>
            <div className={styles.screensGrid}>
              {project.screens.map((screen, i) => (
                <div key={i} className={styles.screenCard}>
                  <div className={styles.screenTitle}>{screen.title[lang]}</div>
                  {screen.desc && <div className={styles.screenDesc}>{screen.desc[lang]}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESULTS */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{t.results}</h2>
          </div>
          <ul className={styles.list}>
            {project.results[lang].map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONCLUSION */}
      {project.conclusion && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Conclusion</h2>
            </div>
            <p className={styles.sectionText}>{project.conclusion[lang]}</p>
          </div>
        </section>
      )}

      {/* BACK LINK */}
      <section className={styles.sectionBack}>
        <div className={styles.sectionInner}>
          <a href="/projects#projects" className={styles.backLink}>
            {t.back}
          </a>
        </div>
      </section>
    </main>
  );
}
