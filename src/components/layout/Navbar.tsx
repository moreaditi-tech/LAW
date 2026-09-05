'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import { NAV_LINKS, FIRM, PRACTICE_AREAS } from '@/lib/constants';
import type { ScrollPayload } from '@/lib/scroll';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = (e: Event) => {
      let y = 0;
      if (e.type === 'plb-scroll') {
        y = (e as CustomEvent<ScrollPayload>).detail?.y ?? 0;
      } else if (document.querySelector('.snap-container')) {
        return;
      } else {
        y = window.scrollY;
      }
      setScrolled(y > 40);
      lastY.current = y;
    };
    window.addEventListener('plb-scroll', handleScroll as EventListener);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('plb-scroll', handleScroll as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-5 md:px-12 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'bg-[#0F1B2D]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3 sm:py-4'
            : 'bg-transparent'
        }`}
      >
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3.5 sm:gap-4 z-50 group">
          {/* Prominent Gold-Framed Official Emblem */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-br from-[#F9E29D] via-[#D4AF37] to-[#C9A45C] shadow-[0_2px_16px_rgba(212,175,55,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_24px_rgba(212,175,55,0.5)] flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0F1B2D] border border-white/20 relative flex items-center justify-center">
              <Image
                src="/images/logo/logo-1.png"
                alt="Prime Law Bharat Official Logo"
                fill
                sizes="40px"
                className="object-cover rounded-full filter contrast-[1.12] brightness-[1.06] saturate-[1.18]"
                priority
              />
            </div>
          </div>

          {/* Two-tier Luxury Law Firm Typography Lockup */}
          <div className="flex flex-col">
            <span className="text-white font-heading text-lg sm:text-2xl md:text-[26px] font-bold tracking-tight leading-tight transition-colors group-hover:text-white/95">
              PRIME LAW <span className="tiranga-gradient">BHARAT</span>
            </span>
            <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-white/70 font-medium">
              ADVOCATES
            </span>
          </div>
        </Link>

        {/* Right Navigation Controls (Hamburger) */}
        <div className="flex items-center gap-3 md:gap-4 z-50">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[70] flex flex-col justify-center items-center w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 transition-all duration-300 group focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center items-center space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 translate-y-2 bg-white' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                  isOpen ? '-rotate-45 -translate-y-2 bg-white' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Mega Menu Overlay (Khaitan & Co Architecture) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#0F1B2D]/98 backdrop-blur-xl z-[60] flex flex-col justify-between py-20 sm:py-24 px-4 sm:px-6 md:px-16 lg:px-24 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
              {/* Primary Navigation Links */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[#C9A45C] font-semibold font-body">
                  Navigation
                </p>
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  {NAV_LINKS.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
                      >
                        <Link
                          href={link.href}
                          className={`group inline-flex items-center gap-3 sm:gap-4 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-[#C9A45C]' : 'text-white hover:text-[#C9A45C]'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C9A45C]" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mega Menu Spotlight: Practice Areas & Direct Contacts */}
              <div className="lg:col-span-6 flex flex-col space-y-8 lg:border-l lg:border-white/10 lg:pl-16">
                {/* Practice Highlights */}
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50 font-semibold font-body mb-4">
                    Key Practice Areas
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRACTICE_AREAS.slice(0, 6).map((area) => (
                      <Link
                        key={area.id}
                        href="/practice-areas"
                        className="text-xs text-white/70 hover:text-white hover:translate-x-1 font-body transition-all flex items-center gap-2 py-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#C9A45C]" />
                        <span className="line-clamp-1">{area.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/practice-areas"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] hover:text-white font-medium mt-4 transition-colors"
                  >
                    <span>View all practice areas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Direct Consultation Contacts */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50 font-semibold font-body mb-3">
                    Chambers & Direct Inquiries
                  </p>
                  <div className="space-y-2 text-sm text-white/80 font-body">
                    <p className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                      <span>{FIRM.address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                      <a href={`tel:${FIRM.phone1.replace(/\s+/g, '')}`} className="hover:text-white">
                        {FIRM.phone1}
                      </a>
                      <span className="text-white/30">|</span>
                      <a href={`tel:${FIRM.phone2.replace(/\s+/g, '')}`} className="hover:text-white">
                        {FIRM.phone2}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 font-body gap-2">
              <p>{FIRM.tagline}</p>
              <p>&copy; {new Date().getFullYear()} Prime Law Bharat</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
