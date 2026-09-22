"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroTitleAnimationProps {
  title?: string;
  highlightWords?: string[];
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export const HeroTitleAnimation: React.FC<HeroTitleAnimationProps> = ({
  title = "Your World of Sports, All in One Place.",
  highlightWords = ["All", "in", "One", "Place."],
  subtitle,
  className,
  align = "center",
}) => {
  const words = title.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: words.length * 0.08 + 0.1,
      },
    },
  };

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("max-w-4xl", alignmentClasses[align], className)}>
      {/* Animated Title */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans leading-[1.1] flex flex-wrap gap-x-3 gap-y-2 justify-center"
      >
        {words.map((word, index) => {
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === word.toLowerCase()
          );

          return (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className={cn(
                "inline-block",
                isHighlighted
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-[#05f2af] dark:via-teal-300 dark:to-cyan-400 drop-shadow-sm dark:drop-shadow-[0_0_25px_rgba(5,242,175,0.25)]"
                  : "text-slate-900 dark:text-white"
              )}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.h1>

      {/* Animated Subtitle */}
      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

