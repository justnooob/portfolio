'use client';

import { useApp } from './AppProvider';
import { useStaggerReveal } from '@/lib/useReveal';
import { translations, experiences } from '@/lib/data';
import { useEffect, useState } from 'react';
import styles from './Logos.module.css';

function ProductIcon({ name }: { name: string }) {
  // ... (без изменений, оставьте как есть)
}

export default function Logos() {
  const { locale } = useApp();
  const t = translations[locale];
  const { ref, visible } = useStaggerReveal<HTMLDivElement>(70);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    // Определяем текущую тему по атрибуту data-theme или классу на html
    const checkTheme = () => {
      const html = document.documentElement;
      const theme = html.getAttribute('data-theme') || 
                    (html.classList.contains('light') ? 'light' : 'dark');
      setIsLightTheme(theme === 'light');
    };

    checkTheme();

    // Наблюдаем за изменениями атрибута data-theme (если тема меняется через JS)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>{t.logos.label}</div>
        <div ref={ref} className={`${styles.row} reveal-stagger ${visible ? 'visible' : ''}`}>
          {experiences.map((exp) => (
            <div key={exp.id} className={styles.item}>
              {/* ✨ Исправление: выбираем нужный логотип в зависимости от темы ✨ */}
              {(isLightTheme && exp.logoSrcLight) ? (
                <img
                  src={exp.logoSrcLight}
                  alt={exp.company[locale]}
                  className={styles.logo}
                />
              ) : (exp.logoSrc ? (
                <img
                  src={exp.logoSrc}
                  alt={exp.company[locale]}
                  className={styles.logo}
                />
              ) : (
                <div className={styles.logoFallback} style={{ background: exp.logoColor }}>
                  {exp.logo}
                </div>
              ))}

              <div className={styles.tip}>
                <div className={styles.tipRole}>{exp.role[locale]}</div>
                <div className={styles.tipPeriod}>{exp.period[locale]}</div>
                <div className={styles.tipLbl}>{t.logos.workedOn}</div>
                {exp.products.map((p, i) => (
                  <div key={i} className={styles.tipProduct}>
                    <div className={styles.tipProductIco} style={{ background: p.iconColor, color: '#fff' }}>
                      <ProductIcon name={p.icon} />
                    </div>
                    <div>
                      <div className={styles.tipPn}>{p.name}</div>
                      <div className={styles.tipPd}>{p.desc[locale]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}