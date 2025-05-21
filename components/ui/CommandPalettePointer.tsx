'use client';

import React from 'react';

export function CommandPalettePointer() {
  return (
    <div className="absolute pointer-events-none">
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
          <path d="M12.5 27.5L12.5 7.5L27.5 17.5L12.5 27.5Z" fill="black" />
          <path d="M12.5 7.5L12.5 27.5L7.5 22.5L7.5 12.5L12.5 7.5Z" fill="black" stroke="white" strokeWidth="1" />
          <path d="M12.5 7.5L27.5 17.5L12.5 27.5" stroke="white" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
