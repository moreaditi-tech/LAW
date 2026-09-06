import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRACTICE_AREAS } from '@/lib/constants';

interface PracticeAreaDetailPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return PRACTICE_AREAS.map((area) => ({
    id: area.id,
  }));
}

export function generateMetadata({ params }: PracticeAreaDetailPageProps) {
  const area = PRACTICE_AREAS.find((a) => a.id === params.id);
  if (!area) return { title: 'Practice Area Not Found' };
  return {
    title: `${area.title} | Prime Law Bharat`,
    description: area.shortDescription,
  };
}

export default function PracticeAreaDetailPage({ params }: PracticeAreaDetailPageProps) {
  const area = PRACTICE_AREAS.find((a) => a.id === params.id);

  if (!area) {
    notFound();
  }

  // Split fullDescription by double newlines into paragraphs
  const paragraphs = area.fullDescription.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] min-h-[340px] sm:min-h-[440px] w-full flex items-end pt-20">
        <div className="absolute inset-0 z-0">
          {area.image ? (
            <Image
              src={area.image}
              alt={area.title}
              fill
              className="object-cover"
              style={{ objectPosition: (area as any).imagePosition || 'center' }}
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[#14233A]" />
          )}
          <div className="absolute inset-0 bg-[#0F1B2D]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/60 to-transparent" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 pb-10 sm:pb-14 max-w-5xl">
          <Link
            href="/practice-areas"
            className="inline-flex items-center gap-2 text-[#C9A45C] text-xs sm:text-sm uppercase tracking-[0.2em] font-body font-semibold mb-4 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Practice Areas
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {area.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        {/* Short Description - highlighted */}
        <p className="font-body text-lg sm:text-xl text-white/90 leading-relaxed mb-8 border-l-4 border-[#C9A45C] pl-6 text-left">
          {area.shortDescription}
        </p>

        {/* Full Description */}
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-body text-base sm:text-lg text-white/75 leading-relaxed"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C9A45C] text-[#0F1B2D] font-body font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-[#d4b06a] transition-colors"
          >
            Consult Now
          </Link>
          <Link
            href="/practice-areas"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white font-body font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-white/5 transition-colors"
          >
            View All Practice Areas
          </Link>
        </div>
      </section>
    </div>
  );
}
