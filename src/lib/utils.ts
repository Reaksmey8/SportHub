import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names cleanly with tailwind-merge to avoid conflict.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

