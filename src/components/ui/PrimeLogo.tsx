'use client';

import React from 'react';

interface PrimeLogoProps {
  size?: number;
  className?: string;
  variant?: 'icon' | 'badge' | 'full';
  showText?: boolean;
}

export default function PrimeLogo({
  size = 44,
  className = '',
  variant = 'icon',
  showText = false,
}: PrimeLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* SVG Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Prime Law Bharat Logo"
      >
        <defs>
          {/* Deep Navy Gradient for Background */}
          <radialGradient id="plbNavyGrad" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1E3250" />
            <stop offset="70%" stopColor="#0F1B2D" />
            <stop offset="100%" stopColor="#080F1A" />
          </radialGradient>

          {/* Luxury Gold Gradients */}
          <linearGradient id="plbGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E29D" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#F3D17A" />
          </linearGradient>

          <linearGradient id="plbGoldLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2C6" />
            <stop offset="100%" stopColor="#C99827" />
          </linearGradient>

          {/* Saffron Gradient */}
          <linearGradient id="plbSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA64D" />
            <stop offset="100%" stopColor="#FF671F" />
          </linearGradient>

          {/* Green Gradient */}
          <linearGradient id="plbGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B8B48" />
            <stop offset="100%" stopColor="#046A38" />
          </linearGradient>

          {/* Subtle Glow Filter */}
          <filter id="plbEmblemGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 1. Base Outer Shield / Circular Emblem */}
        <circle cx="100" cy="100" r="94" fill="url(#plbNavyGrad)" stroke="url(#plbGoldGrad)" strokeWidth="3.5" filter="url(#plbEmblemGlow)" />
        <circle cx="100" cy="100" r="88" stroke="url(#plbGoldGrad)" strokeWidth="1" strokeDasharray="3 2" opacity="0.65" />

        {/* 2. Top Sunburst / Ashoka Chakra Motif */}
        <g transform="translate(100, 48)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="url(#plbGoldLight)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="url(#plbGoldLight)" />
          {/* 16 Radiating Rays */}
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-6"
              x2="0"
              y2="-13"
              stroke="url(#plbGoldLight)"
              strokeWidth="1.2"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* 3. Scales of Justice (Balance Beam & Pans) */}
        {/* Central Balance Beam */}
        <path
          d="M48 68 C72 65, 128 65, 152 68"
          stroke="url(#plbGoldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Beam Pivot Finial */}
        <circle cx="100" cy="67" r="3.5" fill="url(#plbGoldLight)" />
        <circle cx="48" cy="68" r="2.5" fill="url(#plbGoldLight)" />
        <circle cx="152" cy="68" r="2.5" fill="url(#plbGoldLight)" />

        {/* Left Scale Pan */}
        <line x1="48" y1="68" x2="35" y2="102" stroke="url(#plbGoldGrad)" strokeWidth="1" opacity="0.85" />
        <line x1="48" y1="68" x2="61" y2="102" stroke="url(#plbGoldGrad)" strokeWidth="1" opacity="0.85" />
        <path
          d="M32 102 C32 112, 64 112, 64 102 Z"
          fill="url(#plbGoldLight)"
          stroke="url(#plbGoldGrad)"
          strokeWidth="1.5"
        />

        {/* Right Scale Pan */}
        <line x1="152" y1="68" x2="139" y2="102" stroke="url(#plbGoldGrad)" strokeWidth="1" opacity="0.85" />
        <line x1="152" y1="68" x2="165" y2="102" stroke="url(#plbGoldGrad)" strokeWidth="1" opacity="0.85" />
        <path
          d="M136 102 C136 112, 168 112, 168 102 Z"
          fill="url(#plbGoldLight)"
          stroke="url(#plbGoldGrad)"
          strokeWidth="1.5"
        />

        {/* 4. Fountain Pen Nib (Center Pillar of Justice) */}
        <g id="fountain-pen-pillar">
          {/* Nib Body */}
          <path
            d="M100 68 L111 96 L107 142 L93 142 L89 96 Z"
            fill="url(#plbGoldLight)"
            stroke="url(#plbGoldGrad)"
            strokeWidth="1.5"
          />
          {/* Inner Accent Line & Breather Hole */}
          <line x1="100" y1="72" x2="100" y2="105" stroke="#0F1B2D" strokeWidth="1.5" />
          <circle cx="100" cy="106" r="2.5" fill="#0F1B2D" />
          {/* Nib Detail Inset */}
          <path
            d="M96 114 L100 120 L104 114"
            fill="none"
            stroke="#0F1B2D"
            strokeWidth="1.2"
          />
        </g>

        {/* 5. Open Book (Bottom Foundation) with Indian Tiranga Pages */}
        <g id="open-constitution-book">
          {/* Outer Book Cover/Binding */}
          <path
            d="M100 162 C120 152, 146 153, 164 158 L160 174 C142 168, 120 167, 100 176 C80 167, 58 168, 40 174 L36 158 C54 153, 80 152, 100 162 Z"
            fill="#080F1A"
            stroke="url(#plbGoldGrad)"
            strokeWidth="1.5"
          />

          {/* Left Page (Saffron - Courage & Dharma) */}
          <path
            d="M100 160 C80 150, 58 151, 40 156 L42 168 C60 163, 80 162, 100 171 Z"
            fill="url(#plbSaffron)"
            stroke="#FF9933"
            strokeWidth="0.8"
          />

          {/* Right Page (India Green - Growth & Prosperity) */}
          <path
            d="M100 160 C120 150, 142 151, 160 156 L158 168 C140 163, 120 162, 100 171 Z"
            fill="url(#plbGreen)"
            stroke="#138808"
            strokeWidth="0.8"
          />

          {/* Center Spine & White Page Layer (Truth & Peace) */}
          <path
            d="M97 159 C99 157, 101 157, 103 159 L101.5 174 C100.5 173.5, 99.5 173.5, 98.5 174 Z"
            fill="#FFFFFF"
          />
          <line x1="100" y1="158" x2="100" y2="175" stroke="url(#plbGoldLight)" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Optional Integrated Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-heading text-lg sm:text-xl font-bold tracking-wide text-white leading-tight">
            PRIME LAW <span className="tiranga-gradient">BHARAT</span>
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/60">
            Advocates & Legal Consultants
          </span>
        </div>
      )}
    </div>
  );
}
