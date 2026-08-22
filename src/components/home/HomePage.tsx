'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FIRM, ABOUT, PRACTICE_AREAS, COMMITMENTS } from '@/lib/constants';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import EmblemSymbol from '@/components/ui/EmblemSymbol';
import { emitSiteScroll } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'hero', label: 'Prime Law Bharat' },
  { id: 'about', label: 'About The Firm' },
  { id: 'practice', label: 'Expertise' },
  { id: 'strategy', label: 'Strategic Advocacy' },
  { id: 'commitments', label: 'Commitments' },
  { id: 'chambers', label: 'Chambers' },
  { id: 'contact', label: 'Get In Touch' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (index: number) => {
    const el = document.getElementById(SECTIONS[index].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      emitSiteScroll(container);
      const scrollPosition = container.scrollTop + window.innerHeight / 2;
      SECTIONS.forEach((s, index) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        if (scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({ scroller: container });

      const heroTitle = new SplitType('.hero-title', { types: 'chars,words' });
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .from('.hero-bg-img', { scale: 1.18, duration: 2.2 }, 0)
        .from('.hero-label', { opacity: 0, y: 20, duration: 0.6 }, 0.2);

      if (heroTitle.chars?.length) {
        heroTl.from(heroTitle.chars, { y: 80, opacity: 0, stagger: 0.018, duration: 0.7 }, 0.45);
      }

      heroTl
        .from('.hero-sub', { opacity: 0, y: 18, duration: 0.6 }, 0.9)
        .from('.hero-cta', { opacity: 0, y: 12, duration: 0.5 }, 1.05)
        .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, 1.2);

      gsap.to('.hero-bg-img', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el, i) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.img-clip').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(18% 18% 18% 18%)',
          scale: 1.12,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="snap-container relative bg-[#0F1B2D]">
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-center">
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end p-1.5 focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
            data-cursor="view"
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

      <section id="hero" className="snap-section relative flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background.png"
            alt="Prime Law Bharat Courtroom"
            fill
            priority
            className="hero-bg-img object-cover scale-105"
          />
        </div>
        <div className="section-overlay bg-[#0F1B2D]/60" />

        {/* Right-Side Transparent Law Emblem Logo (No circle, No text, 25-30% smaller) */}
        <div className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 hidden md:block">
          <div className="relative transition-all duration-700 hover:scale-105">
            <EmblemSymbol size={240} className="w-[190px] h-[190px] lg:w-[230px] lg:h-[230px] xl:w-[260px] xl:h-[260px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)]" />
          </div>
        </div>
        <div className="section-content">
          <div className="flex flex-col items-start pt-6 sm:pt-0">
            <p className="hero-label section-label">Advocates & Legal Consultants</p>
            <h1 className="hero-title section-title overflow-hidden">
              PRIME LAW <span className="tiranga-gradient">BHARAT</span>
            </h1>
            <p className="hero-sub section-desc">{FIRM.tagline}</p>
            <div className="hero-sub w-20 h-[2px] bg-[#8B2232] mb-6" />
            <p className="hero-sub text-xs sm:text-sm uppercase tracking-[0.25em] text-white/70 mb-10 font-body">
              {FIRM.states.join(' | ')}
            </p>
            <div className="hero-cta flex flex-wrap gap-4 items-center">
              <Link href="/contact" className="btn-khaitan-accent group" data-cursor="view">
                <span>Schedule a Consultation</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
              <Link href="/practice-areas" className="btn-khaitan group" data-cursor="view">
                <span>Explore Practice Areas</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection(1)}
          className="scroll-indicator cursor-pointer bg-transparent border-0"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-body">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-white/70" />
        </button>
      </section>

      <section
        id="about"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/corridor/corridor.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="section-label reveal-up">About The Firm</p>
              <h2 className="section-title reveal-up">Full-Service Practice Across Courts & Tribunals</h2>
              <p className="section-desc mb-6 reveal-up">{ABOUT.intro}</p>
              <p className="text-sm md:text-base text-white/60 font-body leading-relaxed mb-8 reveal-up">
                {ABOUT.foundation}
              </p>
              <div className="reveal-up">
                <Link href="/about" className="btn-khaitan group" data-cursor="view">
                  <span>Read Full Profile</span>
                  <ArrowRight className="btn-arrow w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="reveal-up p-6 bg-white/5 border border-white/10 rounded-sm">
                <p className="font-heading text-4xl font-bold text-[#8B2232] mb-1">
                  <AnimatedCounter value={5} />
                </p>
                <p className="text-xs uppercase tracking-widest text-white/90 font-medium">State Jurisdictions</p>
                <p className="text-xs text-white/50 mt-2 font-body">MH, KA, GJ, DL, HR</p>
              </div>
              <div className="reveal-up p-6 bg-white/5 border border-white/10 rounded-sm">
                <p className="font-heading text-4xl font-bold text-[#8B2232] mb-1">
                  <AnimatedCounter value={16} />
                </p>
                <p className="text-xs uppercase tracking-widest text-white/90 font-medium">Practice Domains</p>
                <p className="text-xs text-white/50 mt-2 font-body">Civil, Criminal, Corporate, RERA & more</p>
              </div>
              <div className="reveal-up p-6 bg-white/5 border border-white/10 rounded-sm sm:col-span-2">
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[#8B2232] mb-1">Trial to Supreme Court</p>
                <p className="text-xs uppercase tracking-widest text-white/90 font-medium">Multi-Forum Advocacy</p>
                <p className="text-xs text-white/50 mt-2 font-body">
                  District Courts, Tribunals, High Courts & Supreme Court of India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="practice"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/conference-room/conference-room-01.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="section-label reveal-up">Areas of Practice</p>
              <h2 className="section-title mb-0 reveal-up">Comprehensive Legal Solutions</h2>
            </div>
            <Link href="/practice-areas" className="btn-khaitan group flex-shrink-0 self-start md:self-auto reveal-up" data-cursor="view">
              <span>View All 16 Areas</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRACTICE_AREAS.slice(0, 3).map((area) => (
              <Link
                key={area.id}
                href="/practice-areas"
                data-cursor="view"
                className="practice-card group relative bg-white/5 border border-white/10 rounded-sm overflow-hidden p-6 hover:border-[#8B2232]/60 hover:bg-white/[0.08] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 w-full rounded-sm overflow-hidden mb-5 img-clip">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#0F1B2D]/40 group-hover:bg-[#0F1B2D]/20 transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl text-white mb-2">{area.title}</h3>
                  <p className="text-xs text-white/70 font-body leading-relaxed line-clamp-3">{area.shortDescription}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#8B2232] font-body uppercase tracking-wider font-semibold">
                  <span>Explore Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="strategy" className="snap-section bg-[#0A1220] flex items-center">
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="img-clip relative w-full max-w-sm sm:max-w-md aspect-[3/4] overflow-hidden rounded-sm border border-white/15 shadow-2xl group">
                <Image
                  src="/images/owner/owner.jpg"
                  alt="Prime Law Bharat Leadership"
                  fill
                  className="object-cover filter grayscale contrast-115 brightness-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="section-label reveal-up">Strategic Advocacy</p>
              <h2 className="section-title leading-[1.12] reveal-up">
                You Bring Us the Problem.
                <br className="hidden sm:inline" /> We Bring the Strategy.
              </h2>
              <p className="section-desc mb-8 reveal-up">{ABOUT.commitment}</p>
              <div className="border-l-2 border-[#8B2232] pl-6 py-2 mb-8 reveal-up">
                <blockquote className="font-heading text-lg sm:text-xl md:text-2xl text-white/90 italic leading-relaxed">
                  &ldquo;{FIRM.closingQuote}&rdquo;
                </blockquote>
              </div>
              <div className="reveal-up">
                <Link href="/about" className="btn-khaitan group" data-cursor="view">
                  <span>Meet Our Advocates</span>
                  <ArrowRight className="btn-arrow w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="commitments" className="snap-section bg-[#0F1B2D] flex flex-col justify-center">
        <InfiniteMarquee items={FIRM.forums.split(' • ')} />
        <div className="section-content">
          <p className="section-label reveal-up">How We Work</p>
          <h2 className="section-title reveal-up">Three Core Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {COMMITMENTS.map((item) => (
              <div
                key={item.title}
                className="reveal-up group p-8 border border-white/10 bg-white/[0.03] hover:border-[#8B2232]/50 hover:bg-white/[0.06] transition-all duration-500"
              >
                <div className="w-10 h-[2px] bg-[#8B2232] mb-6 transition-all duration-500 group-hover:w-16" />
                <h3 className="font-heading text-2xl mb-4">{item.title}</h3>
                <p className="font-body text-white/70 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="chambers"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/executive cabin/executive-cabin-04.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/80" />
        <div className="section-content">
          <p className="section-label reveal-up">Chambers & Environment</p>
          <h2 className="section-title max-w-4xl reveal-up">State-of-the-Art Legal Consultation Spaces</h2>
          <p className="section-desc reveal-up">
            Explore our professional conference chambers, client consultation suites, and research facilities located at{' '}
            {FIRM.address}.
          </p>
          <div className="flex flex-wrap gap-4 items-center reveal-up">
            <Link href="/gallery" className="btn-khaitan-accent group" data-cursor="view">
              <span>View Chambers Gallery</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-khaitan group" data-cursor="view">
              <span>Visit Our Office</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="snap-section"
        style={{ backgroundImage: "url('/images/workstation/workstation.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content flex flex-col justify-between min-h-[calc(100vh-0px)] py-28">
          <div>
            <p className="section-label reveal-up">Get In Touch</p>
            <h2 className="section-title max-w-4xl reveal-up">Schedule a Confidential Consultation</h2>
            <p className="section-desc reveal-up">{ABOUT.whereWePractice}</p>
            <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center reveal-up">
              <Link href="/contact" className="btn-khaitan-accent group justify-center" data-cursor="view">
                <span>Contact Senior Counsel</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
              <a href={`tel:${FIRM.phone1.replace(/\s+/g, '')}`} className="btn-khaitan group justify-center" data-cursor="view">
                <span>Call {FIRM.phone1}</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </a>
            </div>
          </div>
          <p className="mt-16 text-xs text-white/40 font-body tracking-wider">
            © {new Date().getFullYear()} {FIRM.name}
          </p>
        </div>
      </section>
    </div>
  );
}
