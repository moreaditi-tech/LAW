'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GALLERY_IMAGES } from '@/lib/constants';

interface GalleryGridProps {
  filter?: 'all' | 'cabin' | 'conference' | 'workstation' | 'outside';
}

export default function GalleryGrid({ filter = 'all' }: GalleryGridProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (filter === 'all') return true;
    if (filter === 'cabin') return img.src.includes('executive cabin');
    if (filter === 'conference') return img.src.includes('conference-room');
    if (filter === 'workstation') return img.src.includes('workstation') || img.src.includes('corridor') || img.src.includes('gallery');
    if (filter === 'outside') return img.src.includes('Outside');
    return true;
  });

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {filteredImages.map((image, index) => (
          <div 
            key={index} 
            className="group cursor-pointer overflow-hidden rounded-sm border border-white/10 hover:border-[#0B2A52]/50 transition-all duration-300 shadow-subtle hover:shadow-elevated relative bg-white/5"
            onClick={() => setSelectedIdx(index)}
            data-cursor="view"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image 
                src={encodeURI(image.src)} 
                alt={image.alt}
                fill
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#0F1B2D]/40 group-hover:bg-[#0F1B2D]/10 transition-colors duration-300 flex items-end p-4 sm:p-6">
                <span className="text-white font-body text-[10px] sm:text-xs uppercase tracking-widest bg-[#0F1B2D]/80 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-white/20">
                  {image.alt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIdx !== null && filteredImages[selectedIdx] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/95 p-4 md:p-10 backdrop-blur-md"
          onClick={() => setSelectedIdx(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 p-3 rounded-full transition-all"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 p-3 rounded-full transition-all"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image 
                src={encodeURI(filteredImages[selectedIdx].src)} 
                alt={filteredImages[selectedIdx].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <p className="text-white/90 font-heading text-lg mt-4 text-center">
              {filteredImages[selectedIdx].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
