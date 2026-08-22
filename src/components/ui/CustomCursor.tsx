'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest('a, button, [role="button"], .cursor-pointer, [data-cursor]');
      setIsHovered(Boolean(interactive));
      setLabel(interactive?.getAttribute('data-cursor') === 'view' ? 'View' : '');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden hidden md:block">
      <motion.div
        className="fixed top-0 left-0 rounded-full border mix-blend-difference flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 14),
          y: mousePosition.y - (isHovered ? 28 : 14),
          width: isHovered ? 56 : 28,
          height: isHovered ? 56 : 28,
          backgroundColor: isHovered ? 'rgba(139, 34, 50, 0.85)' : 'transparent',
          borderColor: isHovered ? 'rgba(139, 34, 50, 0.9)' : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280, mass: 0.45 }}
      >
        {label && isHovered && (
          <span className="text-[9px] uppercase tracking-[0.18em] text-white font-body">{label}</span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#8B2232]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />
    </div>
  );
}
