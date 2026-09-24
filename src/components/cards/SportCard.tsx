"use client";
// import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Trophy, Flame, Heart } from "lucide-react";
import { Sport } from "@/types/sport";
// import React, {useState} from "react"
import React, { useEffect, useState } from "react";

interface SportCardProps {
  sport: Sport;
}

export const SportCard: React.FC<SportCardProps> = ({ sport }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteKey = `favorite-sport-${sport.uuid}`;
  const imageUrl = sport.imageUrls?.[0];
  const categoryName = sport.category?.name || "General";

  useEffect(() => {
    const saved = localStorage.getItem(favoriteKey);
    setIsFavorite(saved === "true");
  }, [favoriteKey]);

  return (
    <Link
      href={`/sports/${sport.uuid}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900/50 hover:bg-slate-50/80 dark:hover:bg-zinc-900/90 border border-slate-200/90 dark:border-zinc-800/80 hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer shadow-sm dark:shadow-none overflow-hidden"
    >
      <div>
        {/* Optional Image Banner if present */}
        {imageUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
            <Image
              src={imageUrl}
              alt={sport.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-zinc-950/80" />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-emerald-500/90 text-black backdrop-blur-md shadow-sm">
                {categoryName}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 pb-0 flex items-center justify-between gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform duration-300 shadow-inner">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/40">
              {categoryName}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {sport.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {sport.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-4 pt-3 border-t border-slate-200 dark:border-zinc-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
          <Trophy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400/80" />
          <span className="font-medium truncate max-w-[140px]">
            {categoryName}
          </span>
        </div>

        {/* Take the favorite Icon on the top in Image */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault;
            e.stopPropagation;
            setIsFavorite(!isFavorite);
            const newValue = !isFavorite;
            setIsFavorite(newValue);
            localStorage.setItem(favoriteKey, String(newValue));
          }}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-slate-600 shadow-md hover:text-red-500 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-slate-400"} `}
          />
        </button>

        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
          <span>Explore</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
