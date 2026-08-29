'use client';

import { useEffect, useState } from 'react';
import type { ScrollPayload } from '@/lib/scroll';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const detail = (e as CustomEvent<ScrollPayload>).detail;
      if (!detail) return;
      setProgress(detail.max > 0 ? detail.y / detail.max : 0);
    };
    window.addEventListener('plb-scroll', onScroll as EventListener);
    return () => window.removeEventListener('plb-scroll', onScroll as EventListener);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] h-[2px] pointer-events-none">
      <div
        className="h-full bg-[#C9A45C] origin-left transition-[width] duration-150 ease-out"
        style={{ width: `${Math.min(100, progress * 100)}%` }}
      />
    </div>
  );
}
