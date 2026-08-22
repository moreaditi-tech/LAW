'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransition() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setShow(true);
    const hide = window.setTimeout(() => setShow(false), 700);
    return () => window.clearTimeout(hide);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname}
          className="fixed inset-0 z-[110] pointer-events-none flex items-center justify-center bg-[#050A13]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#0F1B2D]"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-heading text-sm tracking-[0.35em] uppercase text-white/80">
              Prime Law <span className="tiranga-gradient">Bharat</span>
            </span>
            <span className="block h-[2px] w-32 overflow-hidden bg-white/15">
              <motion.span
                className="block h-full w-full bg-[#8B2232]"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
