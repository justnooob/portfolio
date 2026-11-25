'use client';
import { useApp } from '@/components/AppProvider';
import styles from './NevaTripTeaser.module.css';
export default function NevaTripTeaser() {
  const { locale } = useApp();
  return <section className={styles.section} aria-labelledby="nevatrip-title"><div className={styles.card}>
    <div className={styles.placeholder}><p>{locale === 'ru' ? 'Пока под NDA. Возможно, скоро покажу.' : 'Under NDA for now. Hopefully, I can share it soon.'}</p></div>
    <div className={styles.info}><h2 id="nevatrip-title">NevaTrip</h2><p className={styles.tags}>B2C · E-commerce · UX Optimization · 2026</p>
    <p>{locale === 'ru' ? 'Провёл UX-аудит страницы тура на основе более 4 000 обращений. Подготовил 4 итерации оптимизации и стратегию A/B-тестирования. Цели проекта заключаются в росте конверсии и снижении нагрузки на контакт-центр.' : 'Audited the tour page UX using 4,000+ requests. Prepared four optimization iterations and an A/B testing strategy. The goal is higher conversion and lower contact center workload.'}</p></div>
  </div></section>;
}
