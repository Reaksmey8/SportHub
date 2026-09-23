import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Layers } from "lucide-react";
import { SportCategory } from "@/types/category";
import {
  getCategoryMeta,
  getCategoryCoverImage,
  getCategoryCleanDescription,
} from "@/lib/categoryMeta";

interface CategoryCardProps {
  category: SportCategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const sportsList = Array.isArray(category.sports) ? category.sports : [];
  const sportsCount = sportsList.length > 0
    ? sportsList.length
    : typeof category.sports === "number"
    ? category.sports
    : 0;

  const meta = getCategoryMeta(category.name);
  const coverImage = getCategoryCoverImage(category);
  const cleanDesc = getCategoryCleanDescription(category);

  return (
    <Link
      href={`/categories/${category.uuid}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-zinc-800/80 hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer shadow-sm dark:shadow-none"
    >
      <div>
        {/* Cover Image Banner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
          <Image
            src={coverImage}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Contrast gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 dark:from-zinc-950/90 dark:via-black/30" />

          {/* Badges on Banner */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Emoji and category tag pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-zinc-900/90 text-slate-900 dark:text-zinc-100 shadow-md backdrop-blur-md border border-white/20">
              <span className="text-sm">{meta.emoji}</span>
              <span>{meta.tag}</span>
            </span>

            {/* Sport count pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md backdrop-blur-md font-mono">
              {sportsCount} {sportsCount === 1 ? "Sport" : "Sports"}
            </span>
          </div>

          {/* Category Title overlaid on image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl font-bold text-white drop-shadow-md group-hover:text-emerald-400 transition-colors">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {cleanDesc}
          </p>

          {/* Child sports preview tags */}
          {sportsList.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {sportsList.slice(0, 2).map((sport) => (
                <span
                  key={sport.uuid || sport.id}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/90 text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700/50 max-w-[130px] truncate"
                >
                  {sport.name}
                </span>
              ))}
              {sportsList.length > 2 && (
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  +{sportsList.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-4 pt-3 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
          <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400/80" />
          <span className="font-medium">Category</span>
        </div>
        <div className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
          <span>Explore</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
