import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
        <Flame className="w-8 h-8 fill-emerald-600 dark:fill-emerald-400" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors">
        About SportsHub
      </h1>
      <p className="text-slate-600 dark:text-zinc-400 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed transition-colors">
        SportsHub is a modern sports platform dedicated to providing sports fans with real-time match tracking,
        comprehensive league data, and engaging sports journalism. Built with Next.js, React, and Tailwind CSS.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-emerald-400 dark:border-zinc-800 text-sm font-medium transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}

