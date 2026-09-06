'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import { PRACTICE_AREAS, FIRM, type PracticeArea } from '@/lib/constants';
import PracticeAreaCard from '@/components/practice/PracticeAreaCard';
import SectionHeading from '@/components/ui/SectionHeading';

const CATEGORIES = [
  { id: 'all', label: 'All Practice Areas' },
  { id: 'civil-property', label: 'Civil & Property' },
  { id: 'corporate-commercial', label: 'Corporate & Commercial' },
  { id: 'criminal-regulatory', label: 'Criminal & Regulatory' },
  { id: 'appellate-tribunals', label: 'Tribunals & High Court' },
];

function PracticeAreasContent() {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredAreas = PRACTICE_AREAS.filter((area) => {
    if (selectedCat === 'all') return true;
    return area.category === selectedCat;
  });

  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] min-h-[340px] sm:min-h-[440px] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/conference-room/conference-room-02.jpg" 
            alt="Our Practice Areas" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C9A45C] font-semibold mb-4 font-body text-center ml-[0.35em]">
            Areas of Practice
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            Our Practice Areas
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed text-center">
            {FIRM.tagline}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <SectionHeading 
            title="Comprehensive Legal Solutions" 
            subtitle="Advocacy and strategic counsel across all key legal domains and appellate forums."
          />
        </div>

        {/* Category Filter Pills (Khaitan & Co style) */}
        <div className="flex gap-2 sm:gap-2.5 mb-8 sm:mb-12 pb-4 border-b border-white/10 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm font-body text-[11px] sm:text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                selectedCat === cat.id
                  ? 'bg-[#0B2A52] text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredAreas.map((area) => (
            <PracticeAreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function PracticeAreasPage() {
  return (
    <Suspense fallback={<div className="bg-[#0F1B2D] min-h-screen text-white flex items-center justify-center">Loading...</div>}>
      <PracticeAreasContent />
    </Suspense>
  );
}
