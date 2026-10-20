'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
export default function CursorMount() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(pointer.matches && !('ontouchstart' in window) && navigator.maxTouchPoints === 0);
    update(); pointer.addEventListener('change', update);
    return () => pointer.removeEventListener('change', update);
  }, []);
  return enabled ? <CustomCursor /> : null;
}
