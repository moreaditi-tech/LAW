'use client';

import React from 'react';

interface EmblemSymbolProps {
  size?: number;
  className?: string;
}

export default function EmblemSymbol({ size = 220, className = '' }: EmblemSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Prime Law Bharat Legal Emblem"
    >
      <defs>
        {/* Saffron Gradient */}
        <linearGradient id="embSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA64D" />
          <stop offset="100%" stopColor="#FF671F" />
        </linearGradient>

        {/* Green Gradient */}
        <linearGradient id="embGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA455" />
          <stop offset="100%" stopColor="#046A38" />
        </linearGradient>

        {/* Subtle drop shadow filter for floating overlay depth */}
        <filter id="embShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#embShadow)">
        {/* 1. Ashoka Chakra / Sunburst Motif (Top) */}
        <g transform="translate(80, 24)">
          <circle cx="0" cy="0" r="13" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
          {/* Radiating Spokes */}
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-5.5"
              x2="0"
              y2="-12"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* 2. Scales of Justice (Balance Beam & Pans) */}
        {/* Central Balance Beam */}
        <path
          d="M28 46 C54 43, 106 43, 132 46"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Beam Pivot Points */}
        <circle cx="80" cy="45" r="3.5" fill="#FFFFFF" />
        <circle cx="28" cy="46" r="2.5" fill="#FFFFFF" />
        <circle cx="132" cy="46" r="2.5" fill="#FFFFFF" />

        {/* Left Scale Pan & Chains */}
        <line x1="28" y1="46" x2="12" y2="88" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.95" />
        <line x1="28" y1="46" x2="44" y2="88" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.95" />
        <path
          d="M10 88 C10 102, 46 102, 46 88 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* Right Scale Pan & Chains */}
        <line x1="132" y1="46" x2="116" y2="88" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.95" />
        <line x1="132" y1="46" x2="148" y2="88" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.95" />
        <path
          d="M114 88 C114 102, 150 102, 150 88 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* 3. Fountain Pen Nib (Central Vertical Pillar of Justice) */}
        <g id="pen-nib-pillar">
          <path
            d="M80 46 L92 78 L88 126 L72 126 L68 78 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
          {/* Inner Accent Line & Breather Hole */}
          <line x1="80" y1="52" x2="80" y2="88" stroke="#111A29" strokeWidth="1.6" />
          <circle cx="80" cy="89" r="2.8" fill="#111A29" />
          {/* Nib Detail Inset */}
          <path
            d="M75 98 L80 105 L85 98"
            fill="none"
            stroke="#111A29"
            strokeWidth="1.4"
          />
        </g>

        {/* 4. Open Constitution Book (Bedrock Foundation with Tricolour Pages) */}
        <g id="tricolour-open-book">
          {/* Outer Book Frame / Border */}
          <path
            d="M80 134 C100 124, 126 125, 146 130 L142 148 C122 142, 100 141, 80 151 C60 141, 38 142, 18 148 L14 130 C34 125, 60 124, 80 134 Z"
            fill="#0F1B2D"
            stroke="#FFFFFF"
            strokeWidth="1.6"
          />

          {/* Left Page (Saffron - Courage & Dharma) */}
          <path
            d="M80 132 C60 122, 38 123, 18 128 L20 142 C40 137, 60 136, 80 145 Z"
            fill="url(#embSaffron)"
            stroke="#FFA64D"
            strokeWidth="0.8"
          />

          {/* Right Page (India Green - Growth & Prosperity) */}
          <path
            d="M80 132 C100 122, 122 123, 142 128 L140 142 C120 137, 100 136, 80 145 Z"
            fill="url(#embGreen)"
            stroke="#0EA455"
            strokeWidth="0.8"
          />

          {/* Center Spine & White Highlight Layer */}
          <path
            d="M77 131 C79 129, 81 129, 83 131 L81.5 148 C80.5 147.5, 79.5 147.5, 78.5 148 Z"
            fill="#FFFFFF"
          />
          <line x1="80" y1="130" x2="80" y2="150" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}
