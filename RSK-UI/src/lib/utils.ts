import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple Tailwind CSS classes dynamically, resolving overrides and merging them cleanly.
 *
 * @param inputs - An array of class values, objects, or arrays of classes.
 * @returns A consolidated string of merged Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
