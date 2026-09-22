import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

  const variants = {
    primary:
      "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700/60 shadow-sm hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "bg-transparent hover:bg-slate-100 text-slate-800 border border-slate-300 hover:border-slate-400 dark:hover:bg-white/5 dark:text-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500 active:bg-slate-200 dark:active:bg-white/10",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 dark:hover:bg-zinc-800/60 dark:text-zinc-300 dark:hover:text-white active:bg-slate-200 dark:active:bg-zinc-800",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const combinedClass = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {content}
    </button>
  );
};

