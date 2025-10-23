
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="w-20 h-20">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="rgba(199, 210, 254, 0.4)" fill="none" strokeWidth="10"></circle>
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="url(#gradient)" 
          fill="none" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeDasharray="100 283"
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from="0 50 50" 
            to="360 50 50" 
            dur="1s" 
            repeatCount="indefinite"
          />
        </circle>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
