/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric Octopus Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-xl bg-[#101C2D] border border-[#19B99A]/30 shadow-sm"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Central Core */}
          <circle cx="16" cy="16" r="4.5" fill="#19B99A" />
          
          {/* 8 Connected Nodes/Tentacles (Radial Symmetry) */}
          <circle cx="16" cy="5" r="2.2" fill="#07856D" />
          <circle cx="23.8" cy="8.2" r="2.2" fill="#19B99A" />
          <circle cx="27" cy="16" r="2.2" fill="#07856D" />
          <circle cx="23.8" cy="23.8" r="2.2" fill="#19B99A" />
          <circle cx="16" cy="27" r="2.2" fill="#07856D" />
          <circle cx="8.2" cy="23.8" r="2.2" fill="#19B99A" />
          <circle cx="5" cy="16" r="2.2" fill="#07856D" />
          <circle cx="8.2" cy="8.2" r="2.2" fill="#19B99A" />

          {/* Clean Vector Connectors */}
          <path
            d="M16 9.5V11.5M16 20.5V22.5M9.5 16H11.5M20.5 16H22.5M11.4 11.4L12.8 12.8M19.2 19.2L20.6 20.6M11.4 20.6L12.8 19.2M19.2 12.8L20.6 11.4"
            stroke="#19B99A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-tight ${textSize} ${
            theme === 'dark' ? 'text-white' : 'text-[#101C2D]'
          }`}
        >
          Octopus <span className="hidden sm:inline text-[#07856D] font-extrabold">Organizer</span>
        </span>
        <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-semibold text-[#637184] mt-0.5">
          Financial OS
        </span>
      </div>
    </div>
  );
};
