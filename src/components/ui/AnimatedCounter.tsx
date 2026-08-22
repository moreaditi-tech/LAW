'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = '', className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(obj.val)}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
