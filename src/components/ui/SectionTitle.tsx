import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
  align?: "left" | "center";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  action,
  align = "left",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10",
        align === "center" && "text-center md:items-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            {badge}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans transition-colors">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed transition-colors">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 group shrink-0 transition-colors"
        >
          <span>{action.label}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

