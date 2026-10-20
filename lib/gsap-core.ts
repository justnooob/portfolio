'use client';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP);
export { gsap, useGSAP };

export const EASE = {
  out: 'power3.out',
  outSoft: 'power2.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
