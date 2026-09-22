import React from "react";
import { Button } from "./Button";
import { EmptyStadiumIllustration } from "@/components/vectors/EmptyStadiumIllustration";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  message = "There is currently no data available in this section.",
  actionLabel,
  actionHref,
  onAction,
  className = "py-16",
  icon,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/60 dark:bg-[#12161a]/60 border border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm ${className}`}
    >
      {icon ? (
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 flex items-center justify-center mb-4">
          {icon}
        </div>
      ) : (
        <EmptyStadiumIllustration className="w-48 h-32 mb-3 text-slate-300 dark:text-zinc-700" />
      )}
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-sm mb-5 leading-relaxed">
        {message}
      </p>
      {actionLabel && (actionHref || onAction) && (
        <Button
          variant="secondary"
          size="sm"
          href={actionHref}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

