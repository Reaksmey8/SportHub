import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Unable to load data",
  message = "A network error occurred while connecting to the server. Please try again.",
  onRetry,
  className = "py-12",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-rose-500/5 border border-rose-500/20 max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-sm mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          iconPosition="left"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

