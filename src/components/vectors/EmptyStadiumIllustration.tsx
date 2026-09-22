import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStadiumIllustrationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const EmptyStadiumIllustration: React.FC<EmptyStadiumIllustrationProps> = ({
  className,
  width = 240,
  height = 160,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-slate-400 dark:text-zinc-600", className)}
      aria-hidden="true"
    >
      <defs>
        {/* Floodlight Beam Glow */}
        <linearGradient id="beam-left" x1="40" y1="20" x2="120" y2="150">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-right" x1="280" y1="20" x2="200" y2="150">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Left & Right Floodlight Beams */}
      <polygon points="40,20 10,160 140,160" fill="url(#beam-left)" opacity="0.4" />
      <polygon points="280,20 180,160 310,160" fill="url(#beam-right)" opacity="0.4" />

      {/* Floodlight Towers */}
      {/* Left Tower */}
      <line x1="40" y1="20" x2="35" y2="140" stroke="currentColor" strokeWidth="2.5" />
      <line x1="40" y1="20" x2="45" y2="140" stroke="currentColor" strokeWidth="2.5" />
      <line x1="36" y1="60" x2="44" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="37" y1="100" x2="43" y2="100" stroke="currentColor" strokeWidth="1.5" />
      <rect x="30" y="12" width="20" height="8" rx="2" fill="currentColor" opacity="0.9" />

      {/* Right Tower */}
      <line x1="280" y1="20" x2="275" y2="140" stroke="currentColor" strokeWidth="2.5" />
      <line x1="280" y1="20" x2="285" y2="140" stroke="currentColor" strokeWidth="2.5" />
      <line x1="276" y1="60" x2="284" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="277" y1="100" x2="283" y2="100" stroke="currentColor" strokeWidth="1.5" />
      <rect x="270" y="12" width="20" height="8" rx="2" fill="currentColor" opacity="0.9" />

      {/* Stadium Seating Silhouette (Curved Benches) */}
      <path
        d="M 60 130 Q 160 105 260 130"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 50 142 Q 160 115 270 142"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 40 155 Q 160 125 280 155"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.5"
      />

      {/* Athletic Running Track Curves */}
      <ellipse cx="160" cy="165" rx="100" ry="25" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
      <ellipse cx="160" cy="165" rx="85" ry="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.5" />

      {/* Center Field Pitch Lines */}
      <rect x="110" y="152" width="100" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <line x1="160" y1="152" x2="160" y2="178" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <circle cx="160" cy="165" r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />

      {/* Empty Bench / Goalpost Silhouette */}
      <path d="M 100 158 L 100 172 M 100 158 L 106 158 M 100 172 L 106 172" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 220 158 L 220 172 M 220 158 L 214 158 M 220 172 L 214 172" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

