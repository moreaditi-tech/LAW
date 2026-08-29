'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let currentLabel = '';
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '1';
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], .cursor-pointer, [data-cursor]');
      isHovered = Boolean(interactive);
      currentLabel = interactive?.getAttribute('data-cursor') === 'view' ? 'View' : '';

      if (ringRef.current) {
        if (isHovered) {
          ringRef.current.style.width = '52px';
          ringRef.current.style.height = '52px';
          ringRef.current.style.backgroundColor = 'rgba(201, 164, 92, 0.85)';
          ringRef.current.style.borderColor = 'rgba(201, 164, 92, 0.9)';
        } else {
          ringRef.current.style.width = '28px';
          ringRef.current.style.height = '28px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        }
      }

      if (labelRef.current) {
        labelRef.current.textContent = currentLabel;
        labelRef.current.style.display = isHovered && currentLabel ? 'block' : 'none';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = isHovered
          ? `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0) scale(0)`
          : `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0) scale(1)`;
      }
    };

    const loop = () => {
      const offset = isHovered ? 26 : 14;
      ringX += (mouseX - offset - ringX) * 0.2;
      ringY += (mouseY - offset - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    animFrameId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden hidden md:block">
      {/* Magnetic Outer Ring with smooth hardware transform */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border mix-blend-difference flex items-center justify-center will-change-transform opacity-0 pointer-events-none transition-[width,height,background-color,border-color] duration-200"
        style={{
          width: '28px',
          height: '28px',
          borderColor: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        <span
          ref={labelRef}
          className="text-[9px] uppercase tracking-[0.18em] text-white font-body hidden select-none"
        />
      </div>

      {/* Center Dot with instant transform */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C9A45C] will-change-transform opacity-0 pointer-events-none transition-transform duration-100"
      />
    </div>
  );
}
