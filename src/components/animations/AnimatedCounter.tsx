"use client";

import React, { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  motion,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const rounded = useTransform(motionValue, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Smooth snappy sports curve
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value, duration]);

  return (
    <span ref={ref} className={cn("inline-block font-mono", className)}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
};

interface TickerBadgeProps {
  label: string;
  value?: string | number;
  isLive?: boolean;
  className?: string;
}

export const TickerBadge: React.FC<TickerBadgeProps> = ({
  label,
  value,
  isLive = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors",
        isLive
          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
          : "bg-emerald-500/10 text-emerald-700 dark:text-[#05f2af] border-emerald-500/30",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            isLive ? "bg-rose-500" : "bg-emerald-500 dark:bg-[#05f2af]"
          )}
        />
      </span>
      <span className="uppercase font-bold tracking-wider">{label}</span>
      {value !== undefined && (
        <>
          <span className="text-slate-300 dark:text-zinc-600">•</span>
          <span className="font-mono text-slate-800 dark:text-zinc-200">
            {value}
          </span>
        </>
      )}
    </div>
  );
};

