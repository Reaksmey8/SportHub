import React from "react";
import { ArrowRight, Trophy, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroTitleAnimation } from "@/components/animations/HeroTitleAnimation";
import { AnimatedCounter, TickerBadge } from "@/components/animations/AnimatedCounter";
import { SportsPitchBackdrop } from "@/components/vectors/SportsPitchBackdrop";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-36 bg-slate-50 dark:bg-[#090d16] transition-colors duration-300">
      {/* Dynamic Sports Pitch Backdrop SVG */}
      <SportsPitchBackdrop
        className="text-emerald-500 dark:text-[#05f2af]"
        opacity={0.06}
      />

      {/* Dynamic Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top radial ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent dark:from-emerald-500/15 dark:via-teal-500/5 blur-3xl opacity-80" />

        {/* Floating subtle side glows */}
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Live Ticker Badge */}
          <div className="flex justify-center">
            <TickerBadge
              label="Live API Connected"
              value="v1.0 Ready"
              isLive
              className="shadow-sm dark:shadow-[0_0_15px_rgba(5,242,175,0.15)]"
            />
          </div>

          {/* Framer Motion Staggered Title & Subtitle */}
          <HeroTitleAnimation
            title="Your World of Sports, All in One Place."
            highlightWords={["All", "in", "One", "Place."]}
            subtitle="Discover sports, live events, categories, and matches from premier leagues across the kingdom and beyond."
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href="#sports"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-lg shadow-emerald-500/20"
            >
              Explore Sports
            </Button>
            <Button
              href="#events"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              View Events
            </Button>
          </div>

          {/* Platform Stats Counter Bar */}
          <div className="pt-12 sm:pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-200 dark:border-zinc-800/80 mt-12 sm:mt-16 transition-colors">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#12161a]/80 border border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm text-center shadow-sm dark:shadow-none hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-[#05f2af] mb-1">
                <Trophy className="w-4 h-4 shrink-0" />
                <AnimatedCounter
                  value={24}
                  suffix="+"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Active Sports</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#12161a]/80 border border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm text-center shadow-sm dark:shadow-none hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-[#05f2af] mb-1">
                <Globe className="w-4 h-4 shrink-0" />
                <AnimatedCounter
                  value={150}
                  suffix="+"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Events & Venues</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#12161a]/80 border border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm text-center shadow-sm dark:shadow-none hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-[#05f2af] mb-1">
                <Zap className="w-4 h-4 shrink-0" />
                <AnimatedCounter
                  value={8}
                  suffix=" Types"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Categories</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#12161a]/80 border border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm text-center shadow-sm dark:shadow-none hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-[#05f2af] mb-1">
                <Shield className="w-4 h-4 shrink-0" />
                <AnimatedCounter
                  value={99.9}
                  decimals={1}
                  suffix="%"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">API Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
