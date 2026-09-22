import React from "react";
import Link from "next/link";
import { Folder, ChevronRight, Activity } from "lucide-react";
import { SportCategory } from "@/types/category";

interface CategoryCardProps {
  category: SportCategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const sportsCount = Array.isArray(category.sports)
    ? category.sports.length
    : typeof category.sports === "number"
    ? category.sports
    : 0;

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900/50 hover:bg-slate-50/80 dark:hover:bg-zinc-900/90 border border-slate-200/90 dark:border-zinc-800 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-emerald-500/5 shadow-sm dark:shadow-none">
      <div>
        {/* Top Info */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800/90 border border-slate-200 dark:border-zinc-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform shadow-inner">
            <Activity className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            {sportsCount} {sportsCount === 1 ? "Sport" : "Sports"}
          </span>
        </div>

        {/* Category Name & Description */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {category.name}
        </h3>

        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {category.description || "Explore sports organized under this category."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-zinc-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
          <Folder className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400/80" />
          <span className="font-medium">Category</span>
        </div>
        <Link
          href="#categories"
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors group-hover:translate-x-0.5"
        >
          <span>Explore</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

