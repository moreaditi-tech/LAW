'use client';

import { useState } from 'react';
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

export default function PracticeAreasPage() {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredAreas = PRACTICE_AREAS.filter((area) => {
    if (selectedCat === 'all') return true;
    if (selectedCat === 'civil-property') {
      return ['civil-litigation', 'matrimonial-divorce', 'property-real-estate', 'consumer-protection'].includes(area.id);
    }
    if (selectedCat === 'corporate-commercial') {
      return ['corporate-law', 'commercial-contracts', 'franchise-law', 'multi-state-cooperative'].includes(area.id);
    }
    if (selectedCat === 'criminal-regulatory') {
      return ['criminal-law', 'sebi', 'mpid', 'ed-pmla'].includes(area.id);
    }
    if (selectedCat === 'appellate-tribunals') {
      return ['rera', 'drt-drat', 'appellate-tribunal', 'high-court-supreme-court'].includes(area.id);
    }
    return true;
  });

  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[440px] w-full flex items-center justify-center pt-20">
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
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8B2232] font-semibold mb-4 font-body">
            Areas of Practice
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            Our Practice Areas
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {FIRM.tagline}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading 
            title="Comprehensive Legal Solutions" 
            subtitle="Advocacy and strategic counsel across all key legal domains and appellate forums."
          />
        </div>

        {/* Category Filter Pills (Khaitan & Co style) */}
        <div className="flex flex-wrap gap-2.5 mb-12 pb-4 border-b border-white/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-5 py-2.5 rounded-sm font-body text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ${
                selectedCat === cat.id
                  ? 'bg-[#8B2232] text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAreas.map((area) => (
            <PracticeAreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>
    </div>
  );
}
