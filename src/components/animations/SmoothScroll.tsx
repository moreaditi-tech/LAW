'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { emitSiteScroll } from '@/lib/scroll';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onScroll = () => emitSiteScroll(window);
    lenis.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
