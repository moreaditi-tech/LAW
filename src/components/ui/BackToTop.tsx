'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollRootTo, type ScrollPayload } from '@/lib/scroll';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = (e: Event) => {
      let y = 0;
      if (e.type === 'plb-scroll') {
        y = (e as CustomEvent<ScrollPayload>).detail?.y ?? 0;
      } else if (document.querySelector('.snap-container')) {
        return;
      } else {
        y = window.scrollY;
      }
      setIsVisible(y > 400);
    };

    window.addEventListener('plb-scroll', toggleVisibility as EventListener);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('plb-scroll', toggleVisibility as EventListener);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => scrollRootTo(0)}
          className="fixed bottom-8 right-8 z-40 p-3.5 rounded-full bg-[#0F1B2D]/90 hover:bg-[#0B2A52] text-white border border-white/20 hover:border-[#0B2A52] shadow-xl backdrop-blur-md transition-colors duration-300 group focus:outline-none"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
