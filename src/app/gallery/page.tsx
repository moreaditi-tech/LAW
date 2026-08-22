import SectionHeading from '@/components/ui/SectionHeading';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Image from 'next/image';

export default function GalleryPage() {
  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[420px] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/executive cabin/executive-cabin-05.jpg" 
            alt="Our Chambers" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#8B2232] font-semibold mb-4 font-body">
            Chambers & Facilities
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            Our Chambers
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            A glimpse into our professional workspace and consultation facilities.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-14">
          <SectionHeading 
            title="Firm Environment" 
            subtitle="Professional conference rooms, private executive chambers, and research facilities."
          />
        </div>
        
        <GalleryGrid />
      </section>
    </div>
  );
}
