'use client';

import { useEffect, useRef } from 'react';
import { useApp } from './AppProvider';

/** Shared, low-cost star field in document coordinates across Hero and About. */
export default function AmbientParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stars = Array.from({length: 240}, () => ({
      x:Math.random(), y:Math.random(), r:.45 + Math.random()*1.05,
      speed:3+Math.random()*9, phase:Math.random()*Math.PI*2, alpha:.15+Math.random()*.45,
    }));
    let width=0, height=0, frame=0, last=0, elapsed=0, intersecting=true;
    const stop = () => { cancelAnimationFrame(frame); frame=0; last=0; };
    const paint = (now:number) => {
      frame=0;
      if (document.hidden || reduced.matches || !intersecting) return;
      elapsed += last ? Math.min((now-last)/1000,.05) : 0;
      last=now;
      ctx.clearRect(0,0,width,height);
      const dark=themeRef.current==='dark';
      const count=width<768 ? 115 : stars.length;
      for(let i=0;i<count;i++){
        const s=stars[i];
        const x=((s.x*width+Math.sin(elapsed*.16+s.phase)*13)%width+width)%width;
        const y=((s.y*height-elapsed*s.speed)%height+height)%height;
        const edge=Math.min(1, y/50, (height-y)/130);
        const a=s.alpha*(.72+.28*Math.sin(elapsed*.65+s.phase))*edge*(dark?.72:.53);
        ctx.fillStyle=dark ? `rgba(173,207,255,${a})` : `rgba(66,100,156,${a})`;
        ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fill();
      }
      frame=requestAnimationFrame(paint);
    };
    const sync=()=>{if(document.hidden||reduced.matches||!intersecting){stop();ctx.clearRect(0,0,width,height);}else if(!frame&&width&&height){frame=requestAnimationFrame(paint);}};
    const resize=()=>{
      const r=canvas.getBoundingClientRect();
      width=r.width;height=r.height;
      const dpr=Math.min(window.devicePixelRatio||1,1.5);
      canvas.width=Math.max(1,Math.round(width*dpr));canvas.height=Math.max(1,Math.round(height*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0);sync();
    };
    const observer=new IntersectionObserver(([entry])=>{intersecting=entry.isIntersecting;sync();});
    observer.observe(canvas);
    const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
    document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',resize);
    return()=>{stop();ro.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',resize);};
  },[]);
  return <canvas ref={ref} className="hero-about-particles" aria-hidden="true" />;
}
