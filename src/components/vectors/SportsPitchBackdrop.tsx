import React from "react";
import { cn } from "@/lib/utils";

interface SportsPitchBackdropProps {
  className?: string;
  opacity?: number;
}

export const SportsPitchBackdrop: React.FC<SportsPitchBackdropProps> = ({
  className,
  opacity = 0.08,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none flex items-center justify-center",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle Gradient for Speed Lines */}
          <linearGradient
            id="pitch-line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
          </linearGradient>

          {/* Radial Center Glow Mask */}
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center Pitch Circle & Dot */}
        <circle
          cx="720"
          cy="450"
          r="140"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <circle cx="720" cy="450" r="180" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="720" cy="450" r="8" fill="currentColor" />

        {/* Halfway Line */}
        <line
          x1="720"
          y1="80"
          x2="720"
          y2="820"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Outer Field Boundary */}
        <rect
          x="120"
          y="80"
          width="1200"
          height="740"
          rx="24"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Left Penalty Box & Goal Arc */}
        <rect
          x="120"
          y="250"
          width="240"
          height="400"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="120"
          y="340"
          width="90"
          height="220"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 360 380 A 90 90 0 0 1 360 520"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="280" cy="450" r="5" fill="currentColor" />

        {/* Right Penalty Box & Goal Arc */}
        <rect
          x="1080"
          y="250"
          width="240"
          height="400"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="1230"
          y="340"
          width="90"
          height="220"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 1080 380 A 90 90 0 0 0 1080 520"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="1160" cy="450" r="5" fill="currentColor" />

        {/* Corner Arcs */}
        <path d="M 120 120 A 40 40 0 0 0 160 80" stroke="currentColor" strokeWidth="2" />
        <path d="M 120 780 A 40 40 0 0 1 160 820" stroke="currentColor" strokeWidth="2" />
        <path d="M 1320 120 A 40 40 0 0 1 1280 80" stroke="currentColor" strokeWidth="2" />
        <path d="M 1320 780 A 40 40 0 0 0 1280 820" stroke="currentColor" strokeWidth="2" />

        {/* Dynamic Athletic Speed Vectors */}
        <g stroke="url(#pitch-line-gradient)" strokeWidth="1.5" opacity="0.6">
          <line x1="0" y1="200" x2="400" y2="0" />
          <line x1="0" y1="260" x2="520" y2="0" />
          <line x1="0" y1="320" x2="640" y2="0" />
          <line x1="1040" y1="900" x2="1440" y2="700" />
          <line x1="920" y1="900" x2="1440" y2="640" />
          <line x1="800" y1="900" x2="1440" y2="580" />
        </g>
      </svg>
    </div>
  );
};

