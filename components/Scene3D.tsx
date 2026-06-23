'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useApp } from './AppProvider';
import styles from './Scene3D.module.css';

/**
 * Сцена-фон на R3F: морфирующая сфера + частицы.
 *
 * Стейджи по скроллу:
 *   hero      — сфера справа, спокойная
 *   myself    — сфера → плоская рамка для фото (ring mode + squash)
 *   logos     — сфера исчезает, частицы взрываются
 *   featured  — частицы хаотично летят
 *   projects  — максимальный хаос частиц
 *   experience— частицы собираются обратно в сферу
 *   finalCta  — тихая сфера по центру (dim), хорошо читаемый текст
 *   footer    — маленький шар
 */

// ─────────────────────── MORPH SPHERE SHADERS ────────────────────────

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uMouseX;
  uniform float uMouseY;
  uniform float uExtra;
  uniform float uTwist;
  uniform float uSpikes;
  uniform vec3  uSquash;

  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDistort;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  vec3 twistY(vec3 p,float amount){
    float angle=p.y*amount;
    float c=cos(angle);float s=sin(angle);
    return vec3(c*p.x-s*p.z,p.y,s*p.x+c*p.z);
  }

  void main(){
    vNormal=normal;
    float t=uTime*0.32;
    vec3 basePos=position*uSquash;
    vec3 baseNormal=normalize(normal/max(uSquash,vec3(0.01)));
    if(uTwist!=0.0) basePos=twistY(basePos,uTwist);
    float n=snoise(basePos*1.4+vec3(t,t*0.7,t*0.5));
    float n2=snoise(basePos*2.6+vec3(-t*0.6,t*0.9,t*0.3));
    float n3=snoise(basePos*6.0+vec3(t*1.2,-t*0.5,t*0.8));
    float spikes=pow(max(n3,0.0),2.0)*uSpikes;
    float distort=(n+n2*0.5)*(0.18+uIntensity*0.55)+uExtra*(n2*0.3)+spikes;
    vec3 mouseDir=normalize(vec3(uMouseX,uMouseY,0.5));
    float pull=max(dot(normalize(basePos),mouseDir),0.0);
    distort+=pow(pull,4.0)*0.18*uIntensity;
    vec3 newPos=basePos+baseNormal*distort;
    vDistort=distort;
    vPos=newPos;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(newPos,1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;
  uniform float uTheme;
  uniform float uOpacity;
  uniform float uRingMode;   // 0=solid, 1=hollow ring (for photo-frame)

  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDistort;

  void main(){
    vec3 normal=normalize(vNormal);
    vec3 viewDir=normalize(cameraPosition-vPos);
    float fres=1.0-max(dot(normal,viewDir),0.0);
    fres=pow(fres,2.5);

    float mixA=smoothstep(-0.2,0.4,vDistort);
    float mixB=smoothstep(0.0,0.6,vDistort+sin(uTime*0.3)*0.1);
    vec3 color=mix(uColorA,uColorB,mixA);
    color=mix(color,uColorC,mixB*0.6);
    color+=fres*uColorC*1.4;
    float glow=pow(max(dot(normal,vec3(0.0,0.5,1.0)),0.0),2.0);
    color+=glow*0.15;

    if(uTheme>0.5){
      color*=0.6;
      color+=vec3(0.05,0.08,0.12)*(1.0-fres);
    }

    // Ring mode: hollow center → creates a glowing frame effect
    float ringAlpha=1.0;
    if(uRingMode>0.0){
      float edgeFactor=1.0-max(dot(normal,viewDir),0.0);
      edgeFactor=pow(edgeFactor,0.55);
      float hole=smoothstep(0.05,0.52,edgeFactor);
      ringAlpha=mix(1.0,hole,uRingMode);
      // Boost edge glow to make the ring sparkle
      color+=uColorC*(1.0-hole)*uRingMode*0.5;
    }

    float alpha=mix(0.85,0.98,fres)*uOpacity*ringAlpha;
    gl_FragColor=vec4(color,alpha);
  }
`;

// ───────────────── DYNAMIC PARTICLE SHADERS ──────────────────────────

const particleVertexShader = /* glsl */ `
  attribute vec3 aSpherePos;
  attribute vec3 aWildPos;
  attribute float aPhase;

  uniform float uExplodeT;   // 0 = on sphere, 1 = scattered
  uniform float uChaos;      // oscillation when scattered
  uniform float uTime;
  uniform vec3  uSphereOffset; // follows the sphere mesh position

  varying float vAlpha;
  varying float vT;

  void main(){
    // Per-particle stagger so they don't all move simultaneously
    float t=clamp(uExplodeT+(aPhase-0.5)*0.3,0.0,1.0);
    t=t*t*(3.0-2.0*t); // smoothstep
    vT=t;

    // Sphere-space origin follows the morph sphere position
    vec3 sphereWorld=aSpherePos+uSphereOffset*(1.0-t);
    vec3 pos=mix(sphereWorld,aWildPos,t);

    // Organic oscillation when airborne
    float cAmt=uChaos*t;
    pos+=vec3(
      sin(uTime*0.73+aPhase*6.2832)*cAmt*0.9,
      cos(uTime*0.51+aPhase*4.712 )*cAmt*0.7,
      sin(uTime*0.91+aPhase*2.094 )*cAmt*0.45
    );

    vec4 mvPos=modelViewMatrix*vec4(pos,1.0);
    gl_Position=projectionMatrix*mvPos;

    // Larger when clustered, tiny when spread
    float sz=mix(6.0,2.2,t);
    // Manual size attenuation (camera is at z=5, scene at z=0 → dist≈5)
    gl_PointSize=sz*(5.0/max(-mvPos.z,0.5));

    vAlpha=mix(0.9,0.5,t);
  }
`;

const particleFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform vec3  uColor;
  uniform float uTheme;

  varying float vAlpha;
  varying float vT;

  void main(){
    vec2 uv=gl_PointCoord-0.5;
    float r=length(uv);
    float a=smoothstep(0.5,0.1,r);

    vec3 col=uColor;
    if(uTheme>0.5) col=mix(col,vec3(0.3,0.4,0.7),0.35);

    gl_FragColor=vec4(col,a*uOpacity*vAlpha);
  }
`;

// ─────────────────────────── TYPES ───────────────────────────────────

type Vec3 = [number, number, number];

interface Preset {
  position:       Vec3;
  scale:          number;
  rotation:       Vec3;
  intensity:      number;
  extra:          number;
  twist:          number;
  spikes:         number;
  squash:         Vec3;
  ringMode:       number;  // 0=sphere, 1=ring/frame
  explosionT:     number;  // 0=particles on sphere, 1=scattered
  chaos:          number;  // oscillation amount for airborne particles
  opacity:        number;
  particleOpacity:number;  // background ambient particle opacity
  dynOpacity:     number;  // explosion particle opacity
  colorA:         string;
  colorB:         string;
  colorC:         string;
}

type SectionName =
  | 'hero'
  | 'myself'
  | 'logos'
  | 'featured'
  | 'projects'
  | 'tech-stack'
  | 'experience'
  | 'finalCta'
  | 'footer';

const SECTION_INDEX: Record<SectionName, number> = {
  hero:        0,
  myself:      1,
  logos:       2,
  featured:    3,
  projects:    4,
  'tech-stack':5,
  experience:  5,
  finalCta:    6,
  footer:      7,
};

// ─────────────────────────── PRESETS ─────────────────────────────────
//
// 8 пресетов (0=hero … 7=footer).
// explosionT: 0 = частицы на сфере, 1 = разлетелись
// ringMode:   0 = обычная сфера, 1 = кольцо/рамка
//
const PRESETS_DARK: Preset[] = [
  // 0: hero — центрированная сфера за заголовком
  {
    position: [0, 0.15, 0],
    scale: 0.9,
    rotation: [0.025, 0.12, 0],
    intensity: 0.5, extra: 0.0,
    twist: 0.0, spikes: 0.0,
    squash: [1, 1, 1],
    ringMode: 0.0,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.32, particleOpacity: 0.18, dynOpacity: 0.0,
    colorA: '#061828', colorB: '#60a5fa', colorC: '#bae6fd',
  },

  // 1: myself — рамка для фото. Сфера плоская (squash Z~0), кольцо видно
  {
    position: [2.3, 0.05, 0],
    scale: 0.72,
    rotation: [0.015, 0.06, 0.01],
    intensity: 1.1, extra: 0.18,
    twist: 0.0, spikes: 0.0,
    squash: [1.25, 1.55, 0.07],
    ringMode: 0.92,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.65, particleOpacity: 0.22, dynOpacity: 0.0,
    colorA: '#061828', colorB: '#60a5fa', colorC: '#93c5fd',
  },

  // 2: logos — сфера исчезает, частицы взрываются
  {
    position: [0, 0, 0],
    scale: 0.06,
    rotation: [0.02, 0.12, 0],
    intensity: 0.3, extra: 0.0,
    twist: 0.0, spikes: 0.0,
    squash: [1, 1, 1],
    ringMode: 0.0,
    explosionT: 0.88, chaos: 0.45,
    opacity: 0.0, particleOpacity: 0.0, dynOpacity: 0.6,
    colorA: '#0a1530', colorB: '#3a7ad9', colorC: '#7c4ad9',
  },

  // 3: featured — частицы хаотично летят
  {
    position: [-3.0, 0.0, -1],
    scale: 0.06,
    rotation: [0.01, 0.08, 0],
    intensity: 0.2, extra: 0.0,
    twist: 0.0, spikes: 0.0,
    squash: [1, 1, 1],
    ringMode: 0.0,
    explosionT: 0.92, chaos: 0.65,
    opacity: 0.0, particleOpacity: 0.0, dynOpacity: 0.58,
    colorA: '#061828', colorB: '#3b82f6', colorC: '#60a5fa',
  },

  // 4: projects — максимальный хаос
  {
    position: [3.0, -1.0, -1],
    scale: 0.06,
    rotation: [0.01, 0.06, 0],
    intensity: 0.2, extra: 0.0,
    twist: 0.0, spikes: 0.0,
    squash: [1, 1, 1],
    ringMode: 0.0,
    explosionT: 0.96, chaos: 0.9,
    opacity: 0.0, particleOpacity: 0.0, dynOpacity: 0.62,
    colorA: '#061828', colorB: '#2563eb', colorC: '#93c5fd',
  },

  // 5: experience / tech-stack — частицы собираются, сфера возрождается
  {
    position: [-2.8, 0.6, -1],
    scale: 0.58,
    rotation: [0.025, 0.12, 0],
    intensity: 0.75, extra: 0.0,
    twist: 0.0, spikes: 0.0,
    squash: [1.3, 0.65, 1.3],    // диск — как собирающийся сгусток
    ringMode: 0.0,
    explosionT: 0.18, chaos: 0.1,
    opacity: 0.52, particleOpacity: 0.18, dynOpacity: 0.32,
    colorA: '#0a1530', colorB: '#4f6cff', colorC: '#5a8edb',
  },

  // 6: finalCta — тихая сфера в центре, текст читается поверх
  {
    position: [0, 0, 0.3],
    scale: 0.88,
    rotation: [0.03, 0.14, 0.01],
    intensity: 0.55, extra: 0.05,
    twist: 0.0, spikes: 0.0,
    squash: [1, 1, 1],
    ringMode: 0.0,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.22,
    particleOpacity: 0.28, dynOpacity: 0.0,
    colorA: '#061828', colorB: '#4fa3ff', colorC: '#93c5fd',
  },

  // 7: footer — маленький свёрнутый шар
  {
    position: [0, -1.5, -1],
    scale: 0.45,
    rotation: [0.02, 0.10, 0],
    intensity: 0.45, extra: 0.0,
    twist: 0.0, spikes: 0.0,
    squash: [1, 1, 1],
    ringMode: 0.0,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.18, particleOpacity: 0.12, dynOpacity: 0.0,
    colorA: '#061828', colorB: '#3b82f6', colorC: '#60a5fa',
  },
];

const PRESETS_LIGHT: Preset[] = [
  // 0: hero — центрированная сфера за заголовком (светлая тема)
  {
    position: [0, 0.15, 0], scale: 0.85,
    rotation: [0.025, 0.12, 0],
    intensity: 0.45, extra: 0.0, twist: 0, spikes: 0,
    squash: [1, 1, 1], ringMode: 0.0,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.18, particleOpacity: 0.12, dynOpacity: 0.0,
    colorA: '#dbeafe', colorB: '#3b82f6', colorC: '#60a5fa',
  },
  // 1: myself — рамка для фото (светлая тема)
  {
    position: [2.3, 0.05, 0], scale: 0.72,
    rotation: [0.015, 0.06, 0.01],
    intensity: 1.0, extra: 0.15, twist: 0, spikes: 0,
    squash: [1.25, 1.55, 0.07], ringMode: 0.92,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.55, particleOpacity: 0.15, dynOpacity: 0.0,
    colorA: '#dbeafe', colorB: '#3b82f6', colorC: '#60a5fa',
  },
  // 2: logos
  {
    position: [0, 0, 0], scale: 0.06,
    rotation: [0.02, 0.12, 0],
    intensity: 0.3, extra: 0, twist: 0, spikes: 0,
    squash: [1, 1, 1], ringMode: 0,
    explosionT: 0.88, chaos: 0.45,
    opacity: 0.0, particleOpacity: 0.0, dynOpacity: 0.45,
    colorA: '#dbeafe', colorB: '#2563eb', colorC: '#60a5fa',
  },
  // 3: featured
  {
    position: [-3.0, 0.0, -1], scale: 0.06,
    rotation: [0.01, 0.08, 0],
    intensity: 0.2, extra: 0, twist: 0, spikes: 0,
    squash: [1, 1, 1], ringMode: 0,
    explosionT: 0.92, chaos: 0.65,
    opacity: 0.0, particleOpacity: 0.0, dynOpacity: 0.42,
    colorA: '#dbeafe', colorB: '#3b82f6', colorC: '#93c5fd',
  },
  // 4: projects
  {
    position: [3.0, -1.0, -1], scale: 0.06,
    rotation: [0.01, 0.06, 0],
    intensity: 0.2, extra: 0, twist: 0, spikes: 0,
    squash: [1, 1, 1], ringMode: 0,
    explosionT: 0.96, chaos: 0.9,
    opacity: 0.0, particleOpacity: 0.0, dynOpacity: 0.48,
    colorA: '#dbeafe', colorB: '#2563eb', colorC: '#60a5fa',
  },
  // 5: experience / tech-stack
  {
    position: [-2.8, 0.6, -1], scale: 0.58,
    rotation: [0.025, 0.12, 0],
    intensity: 0.7, extra: 0, twist: 0, spikes: 0,
    squash: [1.3, 0.65, 1.3], ringMode: 0,
    explosionT: 0.18, chaos: 0.1,
    opacity: 0.4, particleOpacity: 0.14, dynOpacity: 0.25,
    colorA: '#dbeafe', colorB: '#3b82f6', colorC: '#60a5fa',
  },
  // 6: finalCta — очень тусклая (светлая тема)
  {
    position: [0, 0, 0.3], scale: 0.88,
    rotation: [0.03, 0.14, 0.01],
    intensity: 0.45, extra: 0.05, twist: 0, spikes: 0,
    squash: [1, 1, 1], ringMode: 0,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.13,
    particleOpacity: 0.2, dynOpacity: 0.0,
    colorA: '#dbeafe', colorB: '#3b82f6', colorC: '#60a5fa',
  },
  // 7: footer
  {
    position: [0, -1.5, -1], scale: 0.45,
    rotation: [0.02, 0.10, 0],
    intensity: 0.4, extra: 0, twist: 0, spikes: 0,
    squash: [1, 1, 1], ringMode: 0,
    explosionT: 0.0, chaos: 0.0,
    opacity: 0.14, particleOpacity: 0.1, dynOpacity: 0.0,
    colorA: '#dbeafe', colorB: '#3b82f6', colorC: '#60a5fa',
  },
];

// Blur (px) по секциям — 0 = no blur
const BLUR_BY_SECTION = [0, 0, 24, 30, 32, 14, 4, 8];

const PRESET_PRELOAD: Preset = {
  position: [0, 0, 0], scale: 0.55,
  rotation: [0.03, 0.20, 0],
  intensity: 0.5, extra: 0.0,
  twist: 0.0, spikes: 0.0,
  squash: [1, 1, 1], ringMode: 0.0,
  explosionT: 0.0, chaos: 0.0,
  opacity: 0.85, particleOpacity: 0.5, dynOpacity: 0.0,
  colorA: '#0a1530', colorB: '#4fa3ff', colorC: '#a855f7',
};

// ───────────────────────── HELPERS ───────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpV3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0],b[0],t), lerp(a[1],b[1],t), lerp(a[2],b[2],t)];
}

interface SharedRefs {
  mouseRef:        React.MutableRefObject<{ x: number; y: number }>;
  themeRef:        React.MutableRefObject<number>;
  stageRef:        React.MutableRefObject<'preload' | 'hero'>;
  sectionFloatRef: React.MutableRefObject<number>;
  spherePosRef:    React.MutableRefObject<THREE.Vector3>;
  /** true когда мы на /projects/* — сфера barely visible */
  dissolveRef:     React.MutableRefObject<boolean>;
}

// Вычисляет интерполированный пресет для текущего sectionFloat
function getTargetPreset(
  sf: number,
  presets: Preset[],
): { target: Preset; ca: THREE.Color; cb: THREE.Color; cc: THREE.Color } {
  const clamped = Math.max(0, Math.min(presets.length - 1, sf));
  const i = Math.floor(clamped);
  const frac = clamped - i;
  const a = presets[i];
  const b = presets[Math.min(i + 1, presets.length - 1)];
  const target: Preset = {
    position:        lerpV3(a.position, b.position, frac),
    scale:           lerp(a.scale, b.scale, frac),
    rotation:        lerpV3(a.rotation, b.rotation, frac),
    intensity:       lerp(a.intensity, b.intensity, frac),
    extra:           lerp(a.extra, b.extra, frac),
    twist:           lerp(a.twist, b.twist, frac),
    spikes:          lerp(a.spikes, b.spikes, frac),
    squash:          lerpV3(a.squash, b.squash, frac),
    ringMode:        lerp(a.ringMode, b.ringMode, frac),
    explosionT:      lerp(a.explosionT, b.explosionT, frac),
    chaos:           lerp(a.chaos, b.chaos, frac),
    opacity:         lerp(a.opacity, b.opacity, frac),
    particleOpacity: lerp(a.particleOpacity, b.particleOpacity, frac),
    dynOpacity:      lerp(a.dynOpacity, b.dynOpacity, frac),
    colorA: a.colorA, colorB: a.colorB, colorC: a.colorC,
  };
  const ca = new THREE.Color(a.colorA).lerp(new THREE.Color(b.colorA), frac);
  const cb = new THREE.Color(a.colorB).lerp(new THREE.Color(b.colorB), frac);
  const cc = new THREE.Color(a.colorC).lerp(new THREE.Color(b.colorC), frac);
  return { target, ca, cb, cc };
}

// ─────────────────────── MORPH SPHERE ────────────────────────────────

function MorphSphere({ mouseRef, themeRef, stageRef, sectionFloatRef, spherePosRef, dissolveRef }: SharedRefs) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.ShaderMaterial>(null);
  const rotRef  = useRef({ x: 0, y: 0, z: 0 });

  const uniforms = useMemo(() => ({
    uTime:      { value: 0 },
    uIntensity: { value: 0 },
    uExtra:     { value: 0 },
    uMouseX:    { value: 0 },
    uMouseY:    { value: 0 },
    uOpacity:   { value: 0 },
    uTwist:     { value: 0 },
    uSpikes:    { value: 0 },
    uSquash:    { value: new THREE.Vector3(1, 1, 1) },
    uRingMode:  { value: 0 },
    uColorA:    { value: new THREE.Color('#0a1530') },
    uColorB:    { value: new THREE.Color('#4fa3ff') },
    uColorC:    { value: new THREE.Color('#a855f7') },
    uTheme:     { value: 0 },
  }), []);

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    const presets = themeRef.current > 0.5 ? PRESETS_LIGHT : PRESETS_DARK;
    let target: Preset, ca: THREE.Color, cb: THREE.Color, cc: THREE.Color;

    if (stageRef.current === 'preload') {
      target = PRESET_PRELOAD;
      ca = new THREE.Color(PRESET_PRELOAD.colorA);
      cb = new THREE.Color(PRESET_PRELOAD.colorB);
      cc = new THREE.Color(PRESET_PRELOAD.colorC);
    } else {
      ({ target, ca, cb, cc } = getTargetPreset(sectionFloatRef.current, presets));
    }

    const ease = (cur: number, t: number, spd = 2.4) =>
      cur + (t - cur) * Math.min(delta * spd, 0.2);

    // На странице проектов — сфера почти невидима, остаётся голубой
    if (dissolveRef.current) {
      u.uOpacity.value  += (0.002 - u.uOpacity.value) * Math.min(delta * 2.5, 0.2);
      u.uRingMode.value  = 0;
      // Держим голубой цвет (preset 0)
      const blueA = new THREE.Color('#061828');
      const blueB = new THREE.Color('#60a5fa');
      const blueC = new THREE.Color('#bae6fd');
      (u.uColorA.value as THREE.Color).lerp(blueA, Math.min(delta * 2, 0.15));
      (u.uColorB.value as THREE.Color).lerp(blueB, Math.min(delta * 2, 0.15));
      (u.uColorC.value as THREE.Color).lerp(blueC, Math.min(delta * 2, 0.15));
      spherePosRef.current.copy(meshRef.current.position);
      return;
    }

    u.uIntensity.value = ease(u.uIntensity.value, target.intensity);
    u.uExtra.value     = ease(u.uExtra.value,     target.extra);
    u.uOpacity.value   = ease(u.uOpacity.value,   target.opacity,   3.0);
    u.uTwist.value     = ease(u.uTwist.value,     target.twist,     1.6);
    u.uSpikes.value    = ease(u.uSpikes.value,     target.spikes,    1.6);
    u.uRingMode.value  = ease(u.uRingMode.value,   target.ringMode,  2.0);
    (u.uSquash.value as THREE.Vector3).lerp(
      new THREE.Vector3(target.squash[0], target.squash[1], target.squash[2]),
      Math.min(delta * 1.8, 0.12)
    );
    u.uMouseX.value = ease(u.uMouseX.value, mouseRef.current.x, 4);
    u.uMouseY.value = ease(u.uMouseY.value, mouseRef.current.y, 4);
    u.uTheme.value  = ease(u.uTheme.value,  themeRef.current,   3);

    (u.uColorA.value as THREE.Color).lerp(ca, Math.min(delta * 2.4, 0.18));
    (u.uColorB.value as THREE.Color).lerp(cb, Math.min(delta * 2.4, 0.18));
    (u.uColorC.value as THREE.Color).lerp(cc, Math.min(delta * 2.4, 0.18));

    const tPos = new THREE.Vector3(...target.position);
    meshRef.current.position.lerp(tPos, Math.min(delta * 1.8, 0.12));
    const s = target.scale;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), Math.min(delta * 1.8, 0.12));

    rotRef.current.x += (target.rotation[0] + mouseRef.current.y * 0.15) * delta;
    rotRef.current.y += target.rotation[1] * delta;
    rotRef.current.z += target.rotation[2] * delta;
    meshRef.current.rotation.set(rotRef.current.x, rotRef.current.y, rotRef.current.z);

    // Публикуем позицию для DynamicParticles
    spherePosRef.current.copy(meshRef.current.position);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.1, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ──────────────────── AMBIENT BACKGROUND PARTICLES ───────────────────

function BackgroundParticles({ themeRef, stageRef, sectionFloatRef, dissolveRef }: Omit<SharedRefs,'mouseRef'|'spherePosRef'>) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi) - 2;
    }
    return { positions, count };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.016;
    pointsRef.current.rotation.x += delta * 0.004;

    const mat = pointsRef.current.material as THREE.PointsMaterial;

    // На странице проектов — частицы полностью скрыты
    if (dissolveRef.current) {
      mat.opacity = 0;
      return;
    }

    const presets = themeRef.current > 0.5 ? PRESETS_LIGHT : PRESETS_DARK;
    let targetOp = 0.4;
    if (stageRef.current !== 'preload') {
      const { target } = getTargetPreset(sectionFloatRef.current, presets);
      targetOp = target.particleOpacity;
    }

    const tc = themeRef.current > 0.5 ? '#5566aa' : '#aabbff';
    mat.color.lerp(new THREE.Color(tc), Math.min(delta * 2, 0.12));
    mat.opacity += (targetOp - mat.opacity) * Math.min(delta * 2, 0.12);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#aabbff" transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ──────────────────── DYNAMIC EXPLOSION PARTICLES ────────────────────

const COUNT_DYN = 480;

function DynamicParticles({ themeRef, stageRef, sectionFloatRef, spherePosRef, dissolveRef }: Omit<SharedRefs,'mouseRef'>) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { spherePositions, wildPositions, phases } = useMemo(() => {
    const sp = new Float32Array(COUNT_DYN * 3);
    const wp = new Float32Array(COUNT_DYN * 3);
    const ph = new Float32Array(COUNT_DYN);
    for (let i = 0; i < COUNT_DYN; i++) {
      // На поверхности сферы
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 1.0 + Math.random() * 0.22;
      sp[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      sp[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      sp[i*3+2] = r * Math.cos(phi);
      // В разлёте по сцене
      wp[i*3]   = (Math.random() - 0.5) * 16;
      wp[i*3+1] = (Math.random() - 0.5) * 10;
      wp[i*3+2] = (Math.random() - 0.5) * 8 - 2;
      ph[i] = Math.random();
    }
    return { spherePositions: sp, wildPositions: wp, phases: ph };
  }, []);

  const uniforms = useMemo(() => ({
    uExplodeT:     { value: 0 },
    uChaos:        { value: 0 },
    uTime:         { value: 0 },
    uSphereOffset: { value: new THREE.Vector3() },
    uOpacity:      { value: 0 },
    uColor:        { value: new THREE.Color('#88aaff') },
    uTheme:        { value: 0 },
  }), []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uTheme.value += (themeRef.current - u.uTheme.value) * Math.min(delta * 3, 0.2);

    const presets = themeRef.current > 0.5 ? PRESETS_LIGHT : PRESETS_DARK;
    let tET = 0, tChaos = 0, tOp = 0;

    if (dissolveRef.current) {
      // Страница проектов — dynamic particles скрыты
      u.uOpacity.value  = 0;
      u.uExplodeT.value = 0;
      return;
    } else if (stageRef.current !== 'preload') {
      const { target } = getTargetPreset(sectionFloatRef.current, presets);
      tET    = target.explosionT;
      tChaos = target.chaos;
      tOp    = target.dynOpacity;
    }

    // Взрыв — быстро, сборка — медленно
    const etCur = u.uExplodeT.value as number;
    const etSpd = tET > etCur ? 4.0 : 1.6;
    let etNext = etCur + (tET - etCur) * Math.min(delta * etSpd, 0.25);

    // В режиме хаоса (logos/featured/projects на главной) → медленный цикл "собираются/распадаются"
    // Синус с периодом ~22 секунды даёт 0..1 волну. Частицы осциллируют между
    // (tET - 0.28) — «сгусток» — и tET — «максимальный разлёт».
    if (!dissolveRef.current && tET > 0.6) {
      const cycle = Math.sin(state.clock.elapsedTime * 0.285) * 0.5 + 0.5;
      const gatherTarget = (tET - 0.28) + 0.28 * cycle;
      etNext += (gatherTarget - etNext) * Math.min(delta * 0.45, 0.035);
    }

    u.uExplodeT.value = etNext;
    u.uChaos.value   += (tChaos - (u.uChaos.value as number)) * Math.min(delta * 2, 0.15);
    // При dissolve используем быструю скорость затухания
    const opSpd = dissolveRef.current ? 3.5 : 2.0;
    u.uOpacity.value += (tOp - (u.uOpacity.value as number)) * Math.min(delta * opSpd, 0.2);

    // Следим за позицией сферы
    (u.uSphereOffset.value as THREE.Vector3).lerp(spherePosRef.current, Math.min(delta * 1.8, 0.12));

    const tc = themeRef.current > 0.5 ? '#3355bb' : '#99bbff';
    (u.uColor.value as THREE.Color).lerp(new THREE.Color(tc), Math.min(delta * 2, 0.12));
  });

  return (
    // frustumCulled=false: частицы летят за пределы bounding sphere
    <points frustumCulled={false}>
      <bufferGeometry>
        {/* position = wildPositions даёт большой bounding sphere для culling */}
        <bufferAttribute attach="attributes-position"   args={[wildPositions,   3]} />
        <bufferAttribute attach="attributes-aSpherePos" args={[spherePositions, 3]} />
        <bufferAttribute attach="attributes-aWildPos"   args={[wildPositions,   3]} />
        <bufferAttribute attach="attributes-aPhase"     args={[phases,          1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ──────────────────── BLUR / DPR CONTROLLER ──────────────────────────

function ResponsivePerf() {
  const { gl } = useThree();
  useEffect(() => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.75)); }, [gl]);
  return null;
}

function SceneBlurController({
  sectionFloatRef,
  stageRef,
  dissolveRef,
}: {
  sectionFloatRef: React.MutableRefObject<number>;
  stageRef: React.MutableRefObject<'preload' | 'hero'>;
  dissolveRef: React.MutableRefObject<boolean>;
}) {
  const currentBlur = useRef(0);
  useFrame((_, delta) => {
    let target = 0;
    if (!dissolveRef.current && stageRef.current !== 'preload') {
      const sf = Math.max(0, Math.min(BLUR_BY_SECTION.length - 1, sectionFloatRef.current));
      const i = Math.floor(sf);
      const frac = sf - i;
      target = lerp(
        BLUR_BY_SECTION[i],
        BLUR_BY_SECTION[Math.min(i + 1, BLUR_BY_SECTION.length - 1)],
        frac
      );
    }
    currentBlur.current += (target - currentBlur.current) * Math.min(delta * 2, 0.12);
    document.documentElement.style.setProperty('--scene-blur', `${currentBlur.current.toFixed(1)}px`);
  });
  return null;
}

// ──────────────────── ROOT COMPONENT ─────────────────────────────────

export default function Scene3D({ dissolved = false }: { dissolved?: boolean }) {
  const { theme } = useApp();

  const mouseRef        = useRef({ x: 0, y: 0 });
  const themeRef        = useRef(theme === 'light' ? 1 : 0);
  const stageRef        = useRef<'preload' | 'hero'>('hero');
  const sectionFloatRef = useRef(0);
  const spherePosRef    = useRef(new THREE.Vector3(2, 0.4, 0));
  const dissolveRef     = useRef(dissolved);

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  useEffect(() => { themeRef.current = theme === 'light' ? 1 : 0; }, [theme]);

  useEffect(() => { dissolveRef.current = dissolved; }, [dissolved]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const update = () => {
      const v = document.documentElement.dataset.sceneStage;
      stageRef.current = v === 'preload' ? 'preload' : 'hero';
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-scene-stage'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      if (nodes.length === 0) return;

      const items = nodes.map((el) => ({
        name: (el.dataset.section || 'hero') as SectionName,
        rect: el.getBoundingClientRect(),
      }));

      const vc = window.innerHeight * 0.5;
      let activeI = 0, bestDist = Infinity;
      for (let i = 0; i < items.length; i++) {
        const r = items[i].rect;
        const dist = Math.abs(r.top + r.height / 2 - vc);
        if (dist < bestDist) { bestDist = dist; activeI = i; }
      }

      const cur = items[activeI];
      const curCenter = cur.rect.top + cur.rect.height / 2;
      let frac = 0, nbrI = activeI;

      if (curCenter < vc && activeI + 1 < items.length) {
        nbrI = activeI + 1;
        const nb = items[nbrI];
        const span = (nb.rect.top + nb.rect.height / 2) - curCenter || 1;
        frac = (vc - curCenter) / span;
      } else if (curCenter > vc && activeI - 1 >= 0) {
        nbrI = activeI - 1;
        const nb = items[nbrI];
        const span = curCenter - (nb.rect.top + nb.rect.height / 2) || 1;
        frac = -(curCenter - vc) / span;
      }
      frac = Math.max(-0.999, Math.min(0.999, frac));

      const curPreset = SECTION_INDEX[cur.name] ?? 0;
      const nbrPreset = SECTION_INDEX[items[nbrI].name] ?? curPreset;
      sectionFloatRef.current = curPreset + (nbrPreset - curPreset) * Math.abs(frac);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    const t = setTimeout(onScroll, 200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t);
    };
  }, []);

  if (reduceMotion) return null;

  return (
    <div className={styles.scene} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <ResponsivePerf />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <MorphSphere
          mouseRef={mouseRef}
          themeRef={themeRef}
          stageRef={stageRef}
          sectionFloatRef={sectionFloatRef}
          spherePosRef={spherePosRef}
          dissolveRef={dissolveRef}
        />
        <BackgroundParticles
          themeRef={themeRef}
          stageRef={stageRef}
          sectionFloatRef={sectionFloatRef}
          dissolveRef={dissolveRef}
        />
        <DynamicParticles
          themeRef={themeRef}
          stageRef={stageRef}
          dissolveRef={dissolveRef}
          sectionFloatRef={sectionFloatRef}
          spherePosRef={spherePosRef}
        />
        <SceneBlurController sectionFloatRef={sectionFloatRef} stageRef={stageRef} dissolveRef={dissolveRef} />
      </Canvas>
    </div>
  );
}
