'use client';

import { useEffect } from 'react';

const targets = new Set(['okk-pro', 'hobbist']);

/** Keep native links and history while coordinating anchor jumps with Lenis. */
export default function HomeAnchors({ ready }: { ready: boolean }) {
  useEffect(() => {
    if (!ready) return;
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    const scrollToTarget = (id: string, immediate = false) => {
      const target = document.getElementById(id);
      if (!target) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - 84);
      if (window.lenis) window.lenis.scrollTo(top, { immediate: immediate || reduce, force: true });
      else window.scrollTo({ top, behavior: immediate || reduce ? 'auto' : 'smooth' });
      target.focus({ preventScroll: true });
    };
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (!targets.has(id)) return;
      clearTimeout(timer);
      timer = setTimeout(() => scrollToTarget(id, true), 180);
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const url = new URL(link.href);
      const id = url.hash.slice(1);
      if (url.origin !== window.location.origin || url.pathname !== '/' || !targets.has(id)) return;
      event.preventDefault();
      window.history.pushState(null, '', `/#${id}`);
      scrollToTarget(id);
    };
    document.addEventListener('click', click);
    window.addEventListener('hashchange', fromHash);
    window.addEventListener('popstate', fromHash);
    // Fonts and the home preloader can move the target after the initial render.
    document.fonts.ready.then(() => { if (!disposed) fromHash(); });
    return () => {
      disposed = true;
      clearTimeout(timer);
      document.removeEventListener('click', click);
      window.removeEventListener('hashchange', fromHash);
      window.removeEventListener('popstate', fromHash);
    };
  }, [ready]);
  return null;
}
