'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop / pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 14),
          y: mousePosition.y - (isHovered ? 24 : 14),
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(139, 34, 50, 0.2)' : 'transparent',
          borderColor: isHovered ? 'rgba(139, 34, 50, 0.8)' : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#8B2232]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
        }}
      />
    </div>
  );
}
