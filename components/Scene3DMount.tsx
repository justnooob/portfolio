'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Scene3DMount() {
  const pathname = usePathname();
  const dissolved = pathname.startsWith('/projects/');
  return <Scene3D dissolved={dissolved} />;
}
