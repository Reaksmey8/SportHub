import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  className = "py-16",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/50 dark:bg-zinc-900/30 border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-sm ${className}`}
    >
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
        {message}
      </p>
    </div>
  );
};

