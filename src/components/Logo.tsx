import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width="200" 
        height="60" 
        viewBox="0 0 200 60" 
        className="h-12 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bird mascot */}
        <g transform="translate(45, 15)">
          {/* Bird body (blue) */}
          <circle cx="0" cy="15" r="12" fill="#3B82F6" />
          {/* Bird head (orange/yellow) */}
          <circle cx="-8" cy="8" r="10" fill="#F59E0B" />
          {/* Bird eye */}
          <circle cx="-12" cy="5" r="3" fill="white" />
          <circle cx="-12" cy="5" r="2" fill="black" />
          {/* Bird beak (red) */}
          <polygon points="-20,8 -25,5 -20,12" fill="#EF4444" />
        </g>
        
        {/* BOARDUP text */}
        <text x="70" y="35" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif" fill="black">
          B
        </text>
        <text x="85" y="35" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#F59E0B">
          O
        </text>
        <text x="100" y="35" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif" fill="black">
          ARD
        </text>
        <text x="140" y="35" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif" fill="black">
          U
        </text>
        <text x="155" y="35" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif" fill="black">
          P
        </text>
        
        {/* Tagline */}
        <text x="20" y="50" fontSize="8" fontFamily="Arial, sans-serif" fill="#666" letterSpacing="1">
          AI-POWERED BOARD EXAM PREPARATION PLATFORM
        </text>
      </svg>
    </div>
  );
};