import React from 'react';
import { WHY_CHOOSE_US } from '@/lib/constants';

export const metadata = {
  title: 'Why Choose Us | Prime Law Bharat',
  description: 'Why clients choose Prime Law Bharat for strategic legal representation across jurisdictions.',
};

export default function WhyChooseUsPage() {
  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-4">Why Choose Us</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-8">
            Why Clients Choose <br className="hidden sm:block" /> Prime Law Bharat
          </h1>
          <div className="w-20 h-[2px] bg-[#C9A45C] mx-auto" />
        </div>

        {/* Content */}
        <div className="space-y-16">
          {WHY_CHOOSE_US.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-12 border-l border-white/10 group">
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-[#C9A45C] transition-all duration-500 group-hover:h-full -translate-x-[2px]" />
              <div className="absolute top-0 left-[-6px] w-3 h-3 rounded-full bg-[#C9A45C] border-2 border-[#0F1B2D]" />
              
              <h2 className="text-2xl sm:text-3xl font-heading text-white mb-4">
                {index + 1}. {item.title}
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-body leading-relaxed text-justify">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
