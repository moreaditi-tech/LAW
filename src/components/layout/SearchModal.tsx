'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Scale, User, MapPin, ArrowRight } from 'lucide-react';
import { PRACTICE_AREAS, TEAM, FIRM } from '@/lib/constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'practice' | 'team' | 'states'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search calculations
  const lowerQ = query.toLowerCase().trim();

  const matchingPractice = PRACTICE_AREAS.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQ) ||
      p.shortDescription.toLowerCase().includes(lowerQ) ||
      p.fullDescription.toLowerCase().includes(lowerQ)
  );

  const matchingTeam = TEAM.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQ) ||
      t.role.toLowerCase().includes(lowerQ) ||
      t.bio.toLowerCase().includes(lowerQ) ||
      t.expertise.some((e) => e.toLowerCase().includes(lowerQ))
  );

  const matchingStates = FIRM.states.filter((s) => s.toLowerCase().includes(lowerQ));

  const totalResults =
    (filter === 'all' || filter === 'practice' ? matchingPractice.length : 0) +
    (filter === 'all' || filter === 'team' ? matchingTeam.length : 0) +
    (filter === 'all' || filter === 'states' ? matchingStates.length : 0);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F1B2D]/90 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-[#0F1B2D] border border-white/20 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-5 border-b border-white/10 gap-4">
              <Search className="w-6 h-6 text-[#8B2232] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search practice areas, advocates, jurisdictions, forums..."
                className="w-full bg-transparent text-white placeholder-white/40 font-body text-base md:text-lg focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-widest text-white/50 hover:text-white px-2 py-1 border border-white/10 rounded-sm"
              >
                ESC
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 bg-white/[0.02] overflow-x-auto text-xs uppercase tracking-wider font-body">
              <span className="text-white/40 mr-2">Filter:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  filter === 'all' ? 'bg-[#8B2232] text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('practice')}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  filter === 'practice' ? 'bg-[#8B2232] text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                Practice Areas ({matchingPractice.length})
              </button>
              <button
                onClick={() => setFilter('team')}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  filter === 'team' ? 'bg-[#8B2232] text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                Advocates ({matchingTeam.length})
              </button>
              <button
                onClick={() => setFilter('states')}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  filter === 'states' ? 'bg-[#8B2232] text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                Jurisdictions ({matchingStates.length})
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-6 space-y-6 flex-grow">
              {query.trim() === '' ? (
                <div className="py-8 text-center">
                  <p className="font-heading text-xl text-white/80 mb-2">Explore Prime Law Bharat</p>
                  <p className="text-sm text-white/50 font-body">
                    Type a keyword to discover our 16 practice domains, senior advocates, or jurisdictional presence.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {PRACTICE_AREAS.slice(0, 6).map((pa) => (
                      <button
                        key={pa.id}
                        onClick={() => setQuery(pa.title.split(' ')[0])}
                        className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-3 py-1.5 rounded-sm transition-colors"
                      >
                        {pa.title}
                      </button>
                    ))}
                  </div>
                </div>
              ) : totalResults === 0 ? (
                <div className="py-12 text-center text-white/60">
                  <p className="font-heading text-lg mb-2">No matching records found</p>
                  <p className="text-xs text-white/40">Try searching for terms like "Criminal", "Corporate", "RERA", or "Advocate".</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Practice Areas */}
                  {(filter === 'all' || filter === 'practice') && matchingPractice.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-[#8B2232] font-semibold mb-3 flex items-center gap-2">
                        <Scale className="w-4 h-4" /> Practice Areas
                      </h4>
                      <div className="space-y-2">
                        {matchingPractice.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => handleSelect('/practice-areas')}
                            className="group p-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B2232]/50 transition-all duration-200 cursor-pointer flex items-start justify-between"
                          >
                            <div>
                              <p className="font-heading text-base text-white group-hover:text-white transition-colors">
                                {p.title}
                              </p>
                              <p className="text-xs text-white/60 font-body mt-1 line-clamp-1">
                                {p.shortDescription}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#8B2232] transition-colors mt-1 flex-shrink-0 ml-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Members */}
                  {(filter === 'all' || filter === 'team') && matchingTeam.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-[#8B2232] font-semibold mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" /> Senior Counsel & Advocates
                      </h4>
                      <div className="space-y-2">
                        {matchingTeam.map((t, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelect('/about')}
                            className="group p-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B2232]/50 transition-all duration-200 cursor-pointer flex items-start justify-between"
                          >
                            <div>
                              <p className="font-heading text-base text-white">{t.name}</p>
                              <p className="text-xs text-[#8B2232] font-medium mt-0.5">{t.role}</p>
                              <p className="text-xs text-white/60 font-body mt-1 line-clamp-1">{t.bio}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#8B2232] transition-colors mt-1 flex-shrink-0 ml-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Jurisdictions */}
                  {(filter === 'all' || filter === 'states') && matchingStates.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-[#8B2232] font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Jurisdictions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {matchingStates.map((st, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelect('/contact')}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-xs rounded-sm font-body transition-colors"
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-white/40 font-body">
              <span>Prime Law Bharat Search Engine</span>
              <span>Use <strong>ESC</strong> to dismiss</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
