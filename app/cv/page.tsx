import type { Metadata } from 'next';
import CvContent from './CvContent';

export const metadata: Metadata = {
  title: 'Резюме Product Designer',
  description: 'Резюме Максима Сорокина. Продуктовый дизайнер с опытом более 7 лет. NevaTrip, Hobbist, OKK.PRO, SaaS, B2B и B2C. Опыт, образование, навыки и контакты.',
  alternates: { canonical: '/cv/' },
  openGraph: { title: 'Максим Сорокин. Product Designer', description: 'Опыт работы, образование, навыки и контакты продуктового дизайнера.', url: 'https://soromax.ru/cv/', type: 'profile', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Максим Сорокин, Product Designer' }] },
};
export default function CvPage() { return <CvContent />; }
