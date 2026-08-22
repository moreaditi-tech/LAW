'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PracticeArea } from '@/lib/constants';

interface PracticeAreaCardProps {
  area: PracticeArea;
}

export default function PracticeAreaCard({ area }: PracticeAreaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="bg-white/5 border border-white/10 rounded-sm overflow-hidden flex flex-col group hover:border-[#8B2232]/60 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer shadow-subtle hover:shadow-elevated"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="relative h-52 w-full overflow-hidden">
        {area.image ? (
          <Image 
            src={area.image} 
            alt={area.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#14233A]" />
        )}
        <div className="absolute inset-0 bg-[#0F1B2D]/50 group-hover:bg-[#0F1B2D]/30 transition-colors duration-300" />
      </div>
      
      <div className="p-7 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl text-white mb-3 group-hover:text-white transition-colors">
            {area.title}
          </h3>
          
          <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
            {area.shortDescription}
          </p>
          
          <div 
            className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}
          >
            <div className="overflow-hidden">
              <p className="font-body text-white/60 text-xs sm:text-sm leading-relaxed whitespace-pre-line pt-3 border-t border-white/10">
                {area.fullDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-widest text-[#8B2232] font-body font-semibold">
          <span>{expanded ? 'Show Less' : 'Read Full Scope'}</span>
          <svg 
            className={`w-5 h-5 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
