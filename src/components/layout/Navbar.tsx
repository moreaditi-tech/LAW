'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, FIRM } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-[#0F1B2D]/80 via-[#0F1B2D]/40 to-transparent">
        <Link href="/" className="flex items-center gap-3.5 z-50 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30 bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo/logo.jpeg"
              alt="Prime Law Bharat Logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-heading text-xl md:text-2xl font-bold tracking-wide transition-colors group-hover:text-white/90">
            Prime Law Bharat
          </span>
        </Link>

        {/* Hamburger Icon */}
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
      </header>

      {/* Full Screen Overlay Menu (Khaitan & Co Style) */}
      <div
        className={`fixed inset-0 bg-[#0F1B2D]/98 backdrop-blur-md z-[60] flex flex-col justify-between items-center py-16 px-6 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="w-full max-w-6xl flex justify-start items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-body">
            Navigation Menu
          </span>
        </div>

        <nav className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full max-w-lg">
          {NAV_LINKS.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-heading text-3xl sm:text-4xl md:text-5xl transition-all duration-300 text-center transform ${
                  isActive ? 'text-[#8B2232]' : 'text-white hover:text-[#8B2232]'
                } ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 80 + 100}ms` }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Contact Info at bottom */}
        <div 
          className={`flex flex-col items-center gap-3 text-white/70 font-body text-sm md:text-base transform transition-all duration-500 delay-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Direct Inquiries</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center text-white/90">
            <a href={`tel:${FIRM.phone1.replace(/\s+/g, '')}`} className="hover:text-[#8B2232] transition-colors">
              {FIRM.phone1}
            </a>
            <span className="hidden md:block text-white/20">|</span>
            <a href={`tel:${FIRM.phone2.replace(/\s+/g, '')}`} className="hover:text-[#8B2232] transition-colors">
              {FIRM.phone2}
            </a>
          </div>
          <p className="text-xs text-white/40">{FIRM.address}</p>
        </div>
      </div>
    </>
  );
}
