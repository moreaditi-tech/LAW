import { PRACTICE_AREAS, FIRM } from '@/lib/constants';
import PracticeAreaCard from '@/components/practice/PracticeAreaCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';

export default function PracticeAreasPage() {
  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[420px] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/conference-room/conference-room-02.jpg" 
            alt="Our Practice Areas" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#8B2232] font-semibold mb-4 font-body">
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
        <div className="mb-16">
          <SectionHeading 
            title="Comprehensive Legal Solutions" 
            subtitle="Advocacy and strategic counsel across all key legal domains and appellate forums."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRACTICE_AREAS.map((area, index) => (
            <PracticeAreaCard key={index} area={area} />
          ))}
        </div>
      </section>
    </div>
  );
}
