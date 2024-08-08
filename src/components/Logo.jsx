import React from 'react';

const Logo = () => {
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular Shape - Half Purple, Half Black */}
      <defs>
        <linearGradient id="halfPurpleHalfBlack" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" style={{ stopColor: 'purple', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: 'black', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        cx="40"
        cy="30"
        r="20"
        stroke="url(#halfPurpleHalfBlack)"
        strokeWidth="4"
        fill="none"
      />
      {/* Swift Symbol - Half Purple, Half Black */}
      <path
        d="M30,30 L50,20 L40,40 L60,30"
        stroke="url(#halfPurpleHalfBlack)"
        strokeWidth="4"
        fill="none"
      />
      {/* PaySwift Text - Half Purple, Half Black */}
      <text
        x="70"
        y="35"
        fontFamily="Arial, sans-serif"
        fontSize="25"
        fill="url(#halfPurpleHalfBlack)"
      >
        PaySwift
      </text>
    </svg>
  );
};

export default Logo;
