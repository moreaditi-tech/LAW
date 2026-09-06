'use client';

import { WHY_CHOOSE_US } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 bg-[#14233A]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Why Clients Choose Prime Law Bharat" center />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div 
              key={index} 
              className="p-5 sm:p-8 md:p-10 border border-white/10 rounded-sm bg-white/5 hover:border-[#0B2A52]/50 transition-all duration-300 flex flex-col justify-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-heading text-3xl font-bold text-[#C9A45C]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-white">{item.title}</h3>
              </div>
              <p className="font-body text-white/70 text-sm sm:text-base leading-relaxed text-left">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
