'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Scale, Shield, Compass, MapPin, Building, ChevronDown } from 'lucide-react';
import { FIRM, ABOUT, PRACTICE_AREAS, COMMITMENTS } from '@/lib/constants';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'hero', label: 'Prime Law Bharat' },
    { id: 'about', label: 'About The Firm' },
    { id: 'practice', label: 'Expertise' },
    { id: 'strategy', label: 'Strategic Advocacy' },
    { id: 'chambers', label: 'Chambers' },
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
    <div ref={containerRef} className="snap-container relative bg-[#0F1B2D]">
      {/* Right Side Section Navigation Dots (Khaitan & Co style) */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-center">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end p-1.5 focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
          >
            <span className="absolute right-8 px-2.5 py-1 text-[11px] font-body uppercase tracking-wider text-white bg-[#0F1B2D]/95 border border-white/20 rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
              {sec.label}
            </span>
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
          SECTION 1 — HERO (Khaitan & Co 100vh)
          ───────────────────────────────────────────── */}
      <section
        id="hero"
        className="snap-section relative flex items-center justify-start"
        style={{ backgroundImage: "url('/images/hero/hero-law-office.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/75" />
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
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

            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/contact" className="btn-khaitan-accent group">
                <span>Schedule a Consultation</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
              <Link href="/practice-areas" className="btn-khaitan group">
                <span>Explore Practice Areas</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => scrollToSection(1)}
          className="scroll-indicator cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-body">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-white/70 animate-bounce" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — ABOUT THE FIRM & TRUTH-BASED METRICS
          ───────────────────────────────────────────── */}
      <section
        id="about"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/corridor/corridor.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="section-label">
                About The Firm
              </p>

              <h2 className="section-title">
                Full-Service Practice Across Courts & Tribunals
              </h2>

              <p className="section-desc mb-6">
                {ABOUT.intro}
              </p>

              <p className="text-sm md:text-base text-white/60 font-body leading-relaxed mb-8">
                {ABOUT.foundation}
              </p>

              <div>
                <Link href="/about" className="btn-khaitan group">
                  <span>Read Full Profile</span>
                  <ArrowRight className="btn-arrow w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Statistics / Structure Sidebar */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                <p className="font-heading text-4xl font-bold text-[#8B2232] mb-1">5</p>
                <p className="text-xs uppercase tracking-widest text-white/90 font-medium">State Jurisdictions</p>
                <p className="text-xs text-white/50 mt-2 font-body">MH, KA, GJ, DL, HR</p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                <p className="font-heading text-4xl font-bold text-[#8B2232] mb-1">16</p>
                <p className="text-xs uppercase tracking-widest text-white/90 font-medium">Practice Domains</p>
                <p className="text-xs text-white/50 mt-2 font-body">Civil, Criminal, Corporate, RERA & more</p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-sm sm:col-span-2">
                <p className="font-heading text-4xl font-bold text-[#8B2232] mb-1">Trial to Supreme Court</p>
                <p className="text-xs uppercase tracking-widest text-white/90 font-medium">Multi-Forum Advocacy</p>
                <p className="text-xs text-white/50 mt-2 font-body">District Courts, Tribunals, High Courts & Supreme Court of India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — EXPERTISE / PRACTICE SPOTLIGHT
          ───────────────────────────────────────────── */}
      <section
        id="practice"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/conference-room/conference-room-01.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="section-label">
                Areas of Practice
              </p>
              <h2 className="section-title mb-0">
                Comprehensive Legal Solutions
              </h2>
            </div>
            <Link href="/practice-areas" className="btn-khaitan group flex-shrink-0 self-start md:self-auto">
              <span>View All 16 Areas</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
          </div>

          {/* Practice Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRACTICE_AREAS.slice(0, 3).map((area) => (
              <Link
                key={area.id}
                href="/practice-areas"
                className="group relative bg-white/5 border border-white/10 rounded-sm overflow-hidden p-6 hover:border-[#8B2232]/60 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 w-full rounded-sm overflow-hidden mb-5">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0F1B2D]/40 group-hover:bg-[#0F1B2D]/20 transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl text-white mb-2 group-hover:text-white">
                    {area.title}
                  </h3>
                  <p className="text-xs text-white/70 font-body leading-relaxed line-clamp-3">
                    {area.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#8B2232] font-body uppercase tracking-wider font-semibold">
                  <span>Explore Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4 — STRATEGIC ADVOCACY & LEADERSHIP
          (Strict Editorial Layout with Single Black & White Photo)
          ───────────────────────────────────────────── */}
      <section
        id="strategy"
        className="snap-section bg-[#0A1220] flex items-center"
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

            {/* Editorial Content */}
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

              <div className="border-l-2 border-[#8B2232] pl-6 py-2 mb-8">
                <blockquote className="font-heading text-lg sm:text-xl md:text-2xl text-white/90 italic leading-relaxed">
                  &ldquo;{FIRM.closingQuote}&rdquo;
                </blockquote>
              </div>

              <div>
                <Link href="/about" className="btn-khaitan group">
                  <span>Meet Our Advocates</span>
                  <ArrowRight className="btn-arrow w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5 — CHAMBERS & ENVIRONMENT
          ───────────────────────────────────────────── */}
      <section
        id="chambers"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/executive cabin/executive-cabin-04.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/80" />
        <div className="section-content">
          <p className="section-label">
            Chambers & Environment
          </p>

          <h2 className="section-title max-w-4xl">
            State-of-the-Art Legal Consultation Spaces
          </h2>

          <p className="section-desc">
            Explore our professional conference chambers, client consultation suites, and research facilities located at {FIRM.address}.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/gallery" className="btn-khaitan-accent group">
              <span>View Chambers Gallery</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-khaitan group">
              <span>Visit Our Office</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 6 — CONTACT & INQUIRIES
          ───────────────────────────────────────────── */}
      <section
        id="contact"
        className="snap-section"
        style={{ backgroundImage: "url('/images/workstation/workstation.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content">
          <p className="section-label">
            Get In Touch
          </p>

          <h2 className="section-title max-w-4xl">
            Schedule a Confidential Consultation
          </h2>

          <p className="section-desc">
            {ABOUT.whereWePractice}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">
            <Link href="/contact" className="btn-khaitan-accent group justify-center">
              <span>Contact Senior Counsel</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
            <a href={`tel:${FIRM.phone1.replace(/\s+/g, '')}`} className="btn-khaitan group justify-center">
              <span>Call {FIRM.phone1}</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
