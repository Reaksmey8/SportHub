"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  type: "sport" | "event";
  uuid: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  type,
  uuid,
  size = "md",
  className,
  showLabel = false,
}) => {
  const {
    isSportFavorited,
    isEventFavorited,
    toggleSportFavorite,
    toggleEventFavorite,
  } = useFavorites();

  const [isAnimating, setIsAnimating] = useState(false);

  const isFavorited =
    type === "sport" ? isSportFavorited(uuid) : isEventFavorited(uuid);

  const handleClick = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (type === "sport") {
      await toggleSportFavorite(uuid);
    } else {
      await toggleEventFavorite(uuid);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4.5 h-4.5",
    lg: "w-5 h-5",
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={
        isFavorited
          ? `Remove ${type} from favorites`
          : `Add ${type} to favorites`
      }
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e);
        }
      }}
      className={cn(
        "cursor-pointer select-none inline-flex items-center justify-center transition-all duration-200 outline-none",
        showLabel
          ? "px-4 py-2 rounded-xl gap-2 font-medium text-xs sm:text-sm border shadow-sm backdrop-blur-md"
          : cn("rounded-full border shadow-md backdrop-blur-md", sizeClasses[size]),
        isFavorited
          ? "bg-rose-500/15 border-rose-500/40 text-rose-500 dark:bg-rose-950/40 dark:border-rose-500/40 hover:bg-rose-500/25"
          : "bg-white/90 dark:bg-zinc-900/90 border-white/20 dark:border-zinc-700/60 text-slate-500 dark:text-zinc-400 hover:text-rose-500 hover:border-rose-500/30 hover:scale-105",
        isAnimating && "scale-125 duration-150",
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          "transition-all duration-200",
          isFavorited
            ? "fill-rose-500 text-rose-500 stroke-rose-500"
            : "hover:scale-110",
          isAnimating && "scale-125"
        )}
      />
      {showLabel && (
        <span className="font-semibold">
          {isFavorited ? "Saved to Favorites" : "Add to Favorites"}
        </span>
      )}
    </div>
  );
};
