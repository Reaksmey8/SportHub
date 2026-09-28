import React from "react";

type CardSkeletonVariant = "sport" | "event" | "category";

interface CardGridSkeletonProps {
  variant: CardSkeletonVariant;
  count: number;
  className: string;
}

function CardSkeleton({ variant }: { variant: CardSkeletonVariant }) {
  const imageAspect = variant === "sport" ? "aspect-[16/9]" : "aspect-[16/10]";

  return (
    <article
      aria-hidden="true"
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <div className={`animate-pulse bg-slate-200 dark:bg-zinc-800 ${imageAspect}`} />
      <div className="flex-1 p-5">
        {variant === "event" && (
          <div className="mb-3 h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        )}
        <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        </div>
        {variant === "category" && (
          <div className="mt-4 flex gap-2">
            <div className="h-5 w-16 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-5 w-20 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 dark:border-zinc-800/60">
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
      </div>
    </article>
  );
}

export const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({
  variant,
  count,
  className,
}) => (
  <div
    role="status"
    aria-label={`Loading ${variant} cards`}
    className={className}
  >
    {Array.from({ length: count }, (_, index) => (
      <CardSkeleton key={`${variant}-${index}`} variant={variant} />
    ))}
  </div>
);
