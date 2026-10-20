'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import HomeAnchors from '@/components/HomeAnchors';
import Hero from '@/components/Hero';
import Myself from '@/components/Myself';
import Logos from '@/components/Logos';
import FeaturedProducts from '@/components/FeaturedProducts';
import Experience from '@/components/Experience';
import TechStack from '@/components/TechStack';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

let introShown = false;

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(true);
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false);

  const finishPreloader = useCallback(() => setPreloaderDone(true), []);
  useEffect(() => {
    let alreadyShown = introShown;
    try {
      alreadyShown ||= sessionStorage.getItem('preloader_shown') === 'true';
      sessionStorage.setItem('preloader_shown', 'true');
    } catch { /* Storage can be unavailable in private/restricted contexts. */ }
    introShown = true;
    if (!alreadyShown && !window.location.hash &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShouldShowPreloader(true);
      setPreloaderDone(false);
    }
  }, []);

  return (
    <>
        {shouldShowPreloader && !preloaderDone && (
          <Preloader onDone={finishPreloader} />
        )}
      <motion.main
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <HomeAnchors ready={preloaderDone} />
        <Nav />
        <Hero />
        <Myself />
        <Logos />
        <FeaturedProducts />
        <Experience />
        <TechStack />
        <FinalCta />
        <Footer />
      </motion.main>
    </>
  );
}
