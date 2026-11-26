'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import type { Locale } from './data';

type HighlightSet = { add(range: Range): void };
type HighlightRegistry = { set(name: string, value: HighlightSet): void; delete(name: string): void };
const NAME = 'locale-typing-hidden';

function textNodes(): Text[] {
  const walk=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes:Text[]=[];
  for(let n=walk.nextNode();n;n=walk.nextNode()){
    const t=n as Text,p=t.parentElement;
    if(!p||!t.data.trim()||p.closest('script,style,noscript,svg,canvas,[aria-hidden="true"],[data-locale-typing="off"]')) continue;
    nodes.push(t);
  }
  return nodes;
}

function visible(t:Text):boolean {
  const r=document.createRange();r.selectNodeContents(t);
  const b=r.getBoundingClientRect();
  return b.width>0&&b.height>0&&b.bottom>0&&b.top<window.innerHeight&&b.right>0&&b.left<window.innerWidth;
}

/** Animate translated visible glyphs without modifying React/GSAP-owned DOM. */
export function useLocaleTyping(locale:Locale, update:(l:Locale)=>void) {
  const requested=useRef(locale);
  const previous=useRef<Map<Text,string>|null>(null);
  const raf=useRef(0);
  const fallback=useRef<Animation[]>([]);
  const cancel=useCallback(()=>{
    cancelAnimationFrame(raf.current);raf.current=0;
    const css=window.CSS as typeof CSS & {highlights?:HighlightRegistry};
    css?.highlights?.delete(NAME);
    fallback.current.forEach(a=>a.cancel());fallback.current=[];
  },[]);
  const setLocale=useCallback((next:Locale)=>{
    if(next===requested.current)return;
    requested.current=next;
    cancel();
    previous.current=window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? null : new Map(textNodes().map(t=>[t,t.data]));
    update(next);
  },[cancel,update]);
  useLayoutEffect(()=>{
    requested.current=locale;
    const snapshot=previous.current;previous.current=null;
    if(!snapshot)return;
    const changed=textNodes().filter(t=>snapshot.get(t)!==t.data&&visible(t));
    if(!changed.length)return;
    const css=window.CSS as typeof CSS & {highlights?:HighlightRegistry};
    const H=(window as unknown as {Highlight?:new()=>HighlightSet}).Highlight;
    if(!css?.highlights||!H){
      // Older browsers: a lightweight reveal without hiding interactive controls.
      const leaves=new Set(changed.map(t=>t.parentElement).filter((p):p is HTMLElement=>p instanceof HTMLElement && p.children.length===0));
      fallback.current=Array.from(leaves).map(el=>el.animate([{opacity:.35},{opacity:1}],{duration:280,easing:'ease-out'}));
      return cancel;
    }
    const registry=css.highlights;
    // Group split-letter headings so the glyphs appear in reading order.
    const groups=new Map<Element,Text[]>();
    for(const t of changed){
      const p=t.parentElement!;
      const group=p.closest('h1,h2,h3,h4,h5,h6,p,li,button,a,label')??p;
      const arr=groups.get(group)??[];arr.push(t);groups.set(group,arr);
    }
    const runs=Array.from(groups.values()).map(nodes=>{
      let offset=0;
      const parts=nodes.map(node=>{
        const boundaries=[0];for(const ch of Array.from(node.data))boundaries.push(boundaries[boundaries.length-1]+ch.length);
        const part={node,boundaries,offset};offset+=boundaries.length-1;return part;
      });
      return {parts,total:offset,duration:Math.max(180,Math.min(620,offset*22))};
    });
    const start=performance.now();
    const draw=(now:number)=>{
      const highlight=new H();let pending=false;
      for(const run of runs){
        const progress=Math.min(1,Math.max(0,(now-start)/run.duration));
        const count=Math.floor(run.total*progress);
        if(progress<1)pending=true;
        for(const part of run.parts){
          if(!part.node.isConnected)continue;
          const pos=Math.max(0,Math.min(part.boundaries.length-1,count-part.offset));
          const from=part.boundaries[pos];
          if(from>=part.node.length)continue;
          const r=document.createRange();r.setStart(part.node,from);r.setEnd(part.node,part.node.length);highlight.add(r);
        }
      }
      if(pending){registry.set(NAME,highlight);raf.current=requestAnimationFrame(draw);}
      else{registry.delete(NAME);raf.current=0;}
    };
    draw(start);
    return cancel;
  },[locale,cancel]);
  useLayoutEffect(()=>()=>cancel(),[cancel]);
  return setLocale;
}
