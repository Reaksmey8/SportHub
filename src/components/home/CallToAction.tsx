import React from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const CallToAction: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-zinc-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 border border-slate-200 dark:border-zinc-800 p-8 sm:p-14 lg:p-16 text-center shadow-xl dark:shadow-2xl transition-colors">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <Flame className="w-3.5 h-3.5 fill-emerald-600 dark:fill-emerald-400" />
              <span>Join The Sports Community</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
              Stay Connected With The World of Sports
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed transition-colors">
              Explore sports, follow competitive events, and discover categories from around the sports world.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                href="#sports"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Explore Sports
              </Button>
              <Button
                href="#events"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
