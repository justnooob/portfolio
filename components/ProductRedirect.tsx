'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Продукты (okk-pro, hobbist, smetter) не имеют отдельной страницы —
 * их кейсы живут на главной/в /projects. Старые URL вида /projects/<product>/
 * мягко перенаправляем на /projects (клиентский редирект для статического экспорта).
 */
export default function ProductRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/projects');
  }, [router]);

  return null;
}
