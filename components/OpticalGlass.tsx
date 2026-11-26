'use client';

import { useEffect } from 'react';
import { useApp } from './AppProvider';

const SVG = 'http://www.w3.org/2000/svg';
const TARGET = '[data-optical-glass], .btn-secondary';
const SCALE = 18;

/** Rounded-rectangle signed distance. A convex edge bends light inward;
 * the central area remains undistorted for legibility. */
function distance(x:number,y:number,w:number,h:number,r:number) {
  const a=Math.abs(x-w/2)-w/2+r, b=Math.abs(y-h/2)-h/2+r;
  return Math.hypot(Math.max(a,0),Math.max(b,0))+Math.min(Math.max(a,b),0)-r;
}

function buildMap(w:number,h:number,r:number):string|null {
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(2,Math.ceil(w/2));canvas.height=Math.max(2,Math.ceil(h/2));
  const ctx=canvas.getContext('2d');if(!ctx)return null;
  const image=ctx.createImageData(canvas.width,canvas.height);
  const edge=Math.min(12,h*.28,w*.28);
  for(let y=0;y<canvas.height;y++) for(let x=0;x<canvas.width;x++){
    const px=(x+.5)*w/canvas.width,py=(y+.5)*h/canvas.height;
    const d=distance(px,py,w,h,r);
    const depth=Math.max(0,-d);
    const t=Math.min(1,depth/edge);
    const strength=(1-t)*(1-t)*.43;
    const dx=distance(px+.5,py,w,h,r)-distance(px-.5,py,w,h,r);
    const dy=distance(px,py+.5,w,h,r)-distance(px,py-.5,w,h,r);
    const n=Math.hypot(dx,dy)||1;
    const i=(y*canvas.width+x)*4;
    image.data[i]=Math.round(255*(.5-strength*dx/n));
    image.data[i+1]=Math.round(255*(.5-strength*dy/n));
    image.data[i+2]=128;image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);return canvas.toDataURL('image/png');
}

/** Edge refraction is optional: SVG backdrop filters are not interoperable.
 * Limit the enhancement to small controls, reuse maps and clean up on theme/route changes. */
export default function OpticalGlass(){
  const {theme}=useApp();
  useEffect(()=>{
    if(theme!=='dark'||!/(Chrome|Chromium|Edg)\//.test(navigator.userAgent)||/iP(hone|ad|od)/.test(navigator.userAgent)||!CSS.supports('backdrop-filter','url("#glass-test")'))return;
    const host=document.createElementNS(SVG,'svg');
    host.setAttribute('aria-hidden','true');
    host.style.cssText='position:absolute;width:0;height:0;pointer-events:none;overflow:hidden';
    const defs=document.createElementNS(SVG,'defs');host.append(defs);document.body.append(host);
    const maps=new Map<string,{id:string,node:SVGFilterElement,users:number}>();
    const assigned=new Map<HTMLElement,string>();
    let serial=0,raf=0;
    function release(el:HTMLElement){
      const key=assigned.get(el);if(!key)return;
      assigned.delete(el);el.removeAttribute('data-glass-lens');el.style.removeProperty('--glass-lens');
      const item=maps.get(key);if(item&&--item.users===0){item.node.remove();maps.delete(key);}
    }
    function update(el:HTMLElement){
      if(!el.isConnected)return;
      const w=el.offsetWidth,h=el.offsetHeight;
      if(w<12||h<12||w>720||h>150){release(el);return;}
      const raw=getComputedStyle(el).borderTopLeftRadius;
      const radius=Math.min(w/2,h/2,raw.includes('%')?Math.min(w,h)*parseFloat(raw)/100:parseFloat(raw)||0);
      const key=[w,h,radius].join(':');
      if(assigned.get(el)===key)return;
      release(el);
      let item=maps.get(key);
      if(!item){
        const data=buildMap(w,h,radius);if(!data)return;
        const id='optical-lens-'+ ++serial;
        const filter=document.createElementNS(SVG,'filter');
        filter.setAttribute('id',id);filter.setAttribute('x','0%');filter.setAttribute('y','0%');filter.setAttribute('width','100%');filter.setAttribute('height','100%');
        filter.setAttribute('color-interpolation-filters','sRGB');
        const map=document.createElementNS(SVG,'feImage');
        map.setAttribute('href',data);map.setAttribute('x','0');map.setAttribute('y','0');map.setAttribute('width',String(w));map.setAttribute('height',String(h));map.setAttribute('preserveAspectRatio','none');map.setAttribute('result','lens');
        const displacement=document.createElementNS(SVG,'feDisplacementMap');
        displacement.setAttribute('in','SourceGraphic');displacement.setAttribute('in2','lens');displacement.setAttribute('scale',String(SCALE));displacement.setAttribute('xChannelSelector','R');displacement.setAttribute('yChannelSelector','G');
        filter.append(map,displacement);defs.append(filter);
        item={id,node:filter,users:0};maps.set(key,item);
      }
      item.users++;assigned.set(el,key);
      el.style.setProperty('--glass-lens','url("#'+item.id+'")');el.setAttribute('data-glass-lens','');
    }
    const observed=new Set<HTMLElement>();
    const resize=new ResizeObserver(entries=>{for(const entry of entries)update(entry.target as HTMLElement);});
    const sync=()=>{
      raf=0;
      for(const el of observed)if(!el.isConnected||!el.matches(TARGET)){resize.unobserve(el);observed.delete(el);release(el);}
      for(const el of document.querySelectorAll<HTMLElement>(TARGET))if(!observed.has(el)){observed.add(el);resize.observe(el);update(el);}
    };
    const mutation=new MutationObserver(records=>{
      if(records.every(record=>host.contains(record.target)))return;
      if(!raf)raf=requestAnimationFrame(sync);
    });
    mutation.observe(document.body,{childList:true,subtree:true});sync();
    return()=>{mutation.disconnect();resize.disconnect();cancelAnimationFrame(raf);for(const el of assigned.keys())release(el);host.remove();};
  },[theme]);
  return null;
}
