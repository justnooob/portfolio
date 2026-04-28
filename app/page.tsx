'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Logos from '@/components/Logos';
import Featured from '@/components/Featured';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(true); // по умолчанию скрыт
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false);

  // На клиенте — проверяем sessionStorage и показываем лоудер только первый раз
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('preloader_shown');
    if (!alreadyShown) {
      setShouldShowPreloader(true);
      setPreloaderDone(false);
    }
  }, []);

  return (
    <>
      {shouldShowPreloader && !preloaderDone && (
        <Preloader onDone={() => setPreloaderDone(true)} />
      )}
      <main style={{
        opacity: preloaderDone ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <Nav />
        <Hero />
        <Logos />
        <Featured />
        <Projects />
        <Experience />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
