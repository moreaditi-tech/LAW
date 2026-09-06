'use client';

import { useState, useEffect } from 'react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged disclaimer in this session
    const acknowledged = sessionStorage.getItem('plb_disclaimer_acknowledged');
    if (!acknowledged) {
      setIsOpen(true);
    }
  }, []);

  const handleProceed = () => {
    if (!accepted) return;
    sessionStorage.setItem('plb_disclaimer_acknowledged', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-box rounded-sm shadow-2xl border border-white/20 animate-[fadeIn_0.5s_ease]">
        <div className="mb-6 border-b border-white/10 pb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-1">
            Official Compliance
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-white font-bold">
            Disclaimer
          </h2>
        </div>

        <div className="space-y-4 text-white/80 font-body text-xs md:text-sm leading-relaxed mb-8">
          <p className="text-left sm:text-justify">
            The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
          </p>
          <p className="text-left sm:text-justify">
            By accessing this website, <strong className="text-white break-all sm:break-normal">www.primelawbharat.com</strong>, you acknowledge and confirm that you are seeking information relating to Prime Law <span className="tiranga-gradient font-semibold">Bharat</span> of your own accord and that there has been no form of solicitation, advertisement, or inducement by Prime Law <span className="tiranga-gradient font-semibold">Bharat</span> or its members.
          </p>
          <p className="text-left sm:text-justify">
            The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material or information provided on this website should be construed as legal advice.
          </p>
        </div>

        <div className="flex items-start gap-3 mb-8 cursor-pointer select-none" onClick={() => setAccepted(!accepted)}>
          <input 
            type="checkbox" 
            id="disclaimer-check" 
            checked={accepted} 
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-4 h-4 accent-[#C9A45C] rounded cursor-pointer mt-0.5"
          />
          <label htmlFor="disclaimer-check" className="text-xs md:text-sm text-white/90 font-medium cursor-pointer">
            I understand and accept the above terms
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleProceed}
            disabled={!accepted}
            className={`px-8 py-3.5 text-xs md:text-sm uppercase tracking-widest font-medium transition-all duration-300 ${
              accepted 
                ? 'bg-[#0B2A52] hover:bg-[#071D3A] text-white cursor-pointer' 
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Proceed to Website
          </button>
        </div>
      </div>
    </div>
  );
}
