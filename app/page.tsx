'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Myself from '@/components/Myself';
import Logos from '@/components/Logos';
import FeaturedProducts from '@/components/FeaturedProducts';
import Experience from '@/components/Experience';
import TechStack from '@/components/TechStack';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(true);
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('preloader_shown');
    if (!alreadyShown) {
      setShouldShowPreloader(true);
      setPreloaderDone(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {shouldShowPreloader && !preloaderDone && (
          <Preloader onDone={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>
      <motion.main
        initial={false}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
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
