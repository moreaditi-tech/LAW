'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PracticeArea } from '@/lib/constants';

interface PracticeAreaCardProps {
  area: PracticeArea;
  defaultExpanded?: boolean;
}

export default function PracticeAreaCard({ area }: PracticeAreaCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link
      href={`/practice-areas/${area.id}`}
      id={area.id}
      className="relative bg-white/5 border border-white/10 rounded-sm overflow-hidden flex flex-col group hover:border-[#0B2A52]/60 hover:bg-white/[0.08] transition-all duration-500 cursor-pointer shadow-subtle hover:shadow-elevated hover:-translate-y-1"
    >
      <div className="relative h-52 w-full overflow-hidden">
        {area.image ? (
          <div className="w-full h-full relative bg-[#14233A]" style={{ transform: (area as any).imageScale ? `scale(${(area as any).imageScale})` : undefined }}>
            <Image 
              src={area.image} 
              alt={area.title}
              fill
              style={{ objectPosition: (area as any).imagePosition || 'center' }}
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#14233A]" />
        )}
        <div className="absolute inset-0 bg-[#0F1B2D]/50 group-hover:bg-[#0F1B2D]/30 transition-colors duration-300" />
      </div>
      
      <div className="px-5 py-5 sm:px-6 sm:py-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl text-white mb-2 group-hover:text-white transition-colors">
            {area.title}
          </h3>
          
          <p className="font-body text-white/70 text-sm leading-relaxed mb-3">
            {area.shortDescription}
          </p>
          
          <div 
            className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100 mb-3' : 'grid-rows-[0fr] opacity-0'}`}
          >
            <div className="overflow-hidden">
              <p className="font-body text-white/60 text-xs sm:text-sm leading-relaxed whitespace-pre-line pt-2 border-t border-white/10">
                {area.fullDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-widest text-[#C9A45C] font-body font-semibold mt-1">
          <span>{expanded ? 'Show Less' : 'Read Full Scope'}</span>
          <svg 
            className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
