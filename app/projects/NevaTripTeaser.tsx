'use client';
import { useApp } from '@/components/AppProvider';
import styles from './NevaTripTeaser.module.css';
export default function NevaTripTeaser() {
  const { locale } = useApp();
  return <section className={styles.section} aria-labelledby="nevatrip-title"><div className={styles.card}>
    <div className={styles.placeholder}><p>{locale === 'ru' ? 'Пока под NDA. Возможно, скоро покажу.' : 'Under NDA for now. Hopefully, I can share it soon.'}</p></div>
    <div className={styles.info}><h2 id="nevatrip-title">NevaTrip</h2><p className={styles.tags}>B2C · E-commerce · UX Optimization · 2026</p>
    <p>{locale === 'ru' ? 'UX-оптимизация страницы тура. Исследования, улучшение сценариев покупки и поэтапное A/B-тестирование.' : 'Tour page UX optimization. Research, improved purchase journeys and phased A/B testing.'}</p></div>
  </div></section>;
}
