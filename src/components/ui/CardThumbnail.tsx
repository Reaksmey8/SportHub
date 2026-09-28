"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface CardThumbnailProps {
  src: string;
  alt: string;
  sizes: string;
  className: string;
}

export function CardThumbnail({
  src,
  alt,
  sizes,
  className,
}: CardThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-zinc-800"
      >
        <div className="flex w-2/5 flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
          <ImageIcon className="h-8 w-8 text-slate-300 dark:text-zinc-600" />
          <div className="w-full space-y-2" aria-hidden="true">
            <div className="h-2 rounded-full bg-slate-200 dark:bg-zinc-700" />
            <div className="h-2 w-2/3 rounded-full bg-slate-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
