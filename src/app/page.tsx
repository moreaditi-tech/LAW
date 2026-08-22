'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FIRM, ABOUT } from '@/lib/constants';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'hero', label: 'Prime Law Bharat' },
    { id: 'about', label: 'About The Firm' },
    { id: 'practice', label: 'Expertise' },
    { id: 'strategy', label: 'Our Strategy' },
    { id: 'contact', label: 'Get In Touch' },
  ];

  const scrollToSection = (index: number) => {
    const el = document.getElementById(sections[index].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + window.innerHeight / 2;
      const sectionElements = sections.map((s) => document.getElementById(s.id));

      sectionElements.forEach((el, index) => {
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(index);
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div ref={containerRef} className="snap-container relative">
      {/* Right Side Section Navigation Dots (Khaitan & Co style) */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5 items-center">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end p-1.5 focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Tooltip on hover */}
            <span className="absolute right-7 px-2.5 py-1 text-[11px] font-body uppercase tracking-wider text-white bg-[#0F1B2D]/90 border border-white/20 rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {sec.label}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === idx
                  ? 'w-3 h-3 bg-[#8B2232] scale-125 ring-4 ring-[#8B2232]/30'
                  : 'w-2 h-2 bg-white/40 group-hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────
          SECTION 1 — HERO
          ───────────────────────────────────────────── */}
      <section
        id="hero"
        className="snap-section"
        style={{ backgroundImage: "url('/images/hero/hero-law-office.jpg')" }}
      >
        <div className="section-overlay" />
        <div className="section-content">
          <div className="mb-6 rounded-full overflow-hidden border border-white/40 w-16 h-16 relative bg-white/10 backdrop-blur-sm p-1">
            <Image
              src="/images/logo/logo.jpeg"
              alt="Prime Law Bharat Logo"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>

          <p className="section-label">
            Advocates & Legal Consultants
          </p>

          <h1 className="section-title">
            PRIME LAW BHARAT
          </h1>

          <p className="section-desc">
            {FIRM.tagline}
          </p>

          <div className="w-20 h-[2px] bg-[#8B2232] mb-6" />

          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/70 mb-10 font-body">
            Maharashtra | Karnataka | Gujarat | Delhi | Haryana
          </p>

          <div>
            <Link href="/contact" className="btn-khaitan-accent group">
              <span>Schedule a Consultation</span>
              <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={() => scrollToSection(1)}
          className="scroll-indicator cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-body">Explore</span>
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — ABOUT / OUR FIRM
          ───────────────────────────────────────────── */}
      <section
        id="about"
        className="snap-section"
        style={{ backgroundImage: "url('/images/corridor/corridor.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/80" />
        <div className="section-content">
          <p className="section-label">
            About The Firm
          </p>

          <h2 className="section-title max-w-4xl">
            Full-Service Practice Across Courts & Tribunals
          </h2>

          <p className="section-desc">
            {ABOUT.intro}
          </p>

          <div>
            <Link href="/about" className="btn-khaitan group">
              <span>Explore Our Practice</span>
              <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — PRACTICE AREAS
          ───────────────────────────────────────────── */}
      <section
        id="practice"
        className="snap-section"
        style={{ backgroundImage: "url('/images/conference-room/conference-room-01.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/80" />
        <div className="section-content">
          <p className="section-label">
            Areas of Practice
          </p>

          <h2 className="section-title max-w-4xl">
            Comprehensive Legal Solutions
          </h2>

          <p className="section-desc leading-relaxed">
            {FIRM.forums}
          </p>

          <div>
            <Link href="/practice-areas" className="btn-khaitan group">
              <span>View All Practice Areas</span>
              <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4 — STRATEGIC ADVOCACY & LEADERSHIP
          (Strict Editorial Layout with Black & White Photo)
          ───────────────────────────────────────────── */}
      <section
        id="strategy"
        className="snap-section bg-[#0A1220]"
      >
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Single B&W Owner Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] overflow-hidden rounded-sm border border-white/15 shadow-2xl group">
                <Image
                  src="/images/owner/owner.jpg"
                  alt="Prime Law Bharat Leadership"
                  fill
                  className="object-cover filter grayscale contrast-115 brightness-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="section-label">
                Strategic Advocacy
              </p>

              <h2 className="section-title leading-[1.12]">
                You Bring Us the Problem.<br className="hidden sm:inline" /> We Bring the Strategy.
              </h2>

              <p className="section-desc mb-8">
                {ABOUT.commitment}
              </p>

              <div className="border-l-2 border-[#8B2232] pl-6 py-2">
                <blockquote className="font-heading text-lg sm:text-xl md:text-2xl text-white/90 italic leading-relaxed">
                  &ldquo;{FIRM.closingQuote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5 — CONTACT & PRESENCE
          ───────────────────────────────────────────── */}
      <section
        id="contact"
        className="snap-section"
        style={{ backgroundImage: "url('/images/workstation/workstation.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/80" />
        <div className="section-content">
          <p className="section-label">
            Get In Touch
          </p>

          <h2 className="section-title max-w-4xl">
            Schedule a Consultation
          </h2>

          <p className="section-desc">
            {ABOUT.whereWePractice}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">
            <Link href="/contact" className="btn-khaitan-accent group justify-center">
              <span>Contact Us</span>
              <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link href="/gallery" className="btn-khaitan group justify-center">
              <span>View Office Gallery</span>
              <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
