'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Scene3DMount() {
  const [mobile, setMobile] = useState(false);
  const [visibleOnce, setVisibleOnce] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const viewport = window.matchMedia('(max-width: 768px)');
    const onResize = () => setMobile(viewport.matches);
    onResize(); viewport.addEventListener('change', onResize);
    const update = () => setMotionAllowed(!media.matches);
    const onVisibility = () => { if (!document.hidden) setVisibleOnce(true); };
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    update(); media.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); viewport.removeEventListener('change', onResize); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  if (!motionAllowed || !visibleOnce) return null;
  return <Scene3D dprLimit={mobile ? 1.5 : 1.75} />;
}
