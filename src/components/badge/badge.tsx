import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant = 'solid' | 'outline' | 'subtle';
export type BadgeColor =
  'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style of the badge */
  variant?: BadgeVariant;
  /** Semantic color of the badge */
  color?: BadgeColor;
  /** Size of the badge */
  size?: BadgeSize;
  /** Show a small colored dot before the label */
  dot?: boolean;
}

// ─── Color Maps ───────────────────────────────────────────────────────────────

const solidColors: Record<BadgeColor, string> = {
  primary: 'bg-primary-500 text-white border-transparent',
  secondary: 'bg-secondary-500 text-white border-transparent',
  accent: 'bg-accent-500 text-white border-transparent',
  success: 'bg-success-500 text-white border-transparent',
  warning: 'bg-warning-400 text-neutral-900 border-transparent',
  destructive: 'bg-destructive-500 text-white border-transparent',
  info: 'bg-info-500 text-white border-transparent',
  neutral: 'bg-neutral-600 text-white border-transparent',
};

const outlineColors: Record<BadgeColor, string> = {
  primary:
    'bg-transparent text-primary-600 border-primary-300 dark:text-primary-400 dark:border-primary-700',
  secondary:
    'bg-transparent text-secondary-600 border-secondary-300 dark:text-secondary-400 dark:border-secondary-700',
  accent:
    'bg-transparent text-accent-600 border-accent-300 dark:text-accent-400 dark:border-accent-700',
  success:
    'bg-transparent text-success-600 border-success-300 dark:text-success-400 dark:border-success-700',
  warning:
    'bg-transparent text-warning-600 border-warning-300 dark:text-warning-400 dark:border-warning-700',
  destructive:
    'bg-transparent text-destructive-600 border-destructive-300 dark:text-destructive-400 dark:border-destructive-700',
  info: 'bg-transparent text-info-600 border-info-300 dark:text-info-400 dark:border-info-700',
  neutral:
    'bg-transparent text-neutral-600 border-neutral-300 dark:text-neutral-400 dark:border-neutral-600',
};

const subtleColors: Record<BadgeColor, string> = {
  primary:
    'bg-primary-100 text-primary-800 border-transparent dark:bg-primary-950 dark:text-primary-300',
  secondary:
    'bg-secondary-100 text-secondary-800 border-transparent dark:bg-secondary-950 dark:text-secondary-300',
  accent:
    'bg-accent-100 text-accent-800 border-transparent dark:bg-accent-950 dark:text-accent-300',
  success:
    'bg-success-100 text-success-800 border-transparent dark:bg-success-950 dark:text-success-300',
  warning:
    'bg-warning-100 text-warning-800 border-transparent dark:bg-warning-950 dark:text-warning-300',
  destructive:
    'bg-destructive-100 text-destructive-800 border-transparent dark:bg-destructive-950 dark:text-destructive-300',
  info: 'bg-info-100 text-info-800 border-transparent dark:bg-info-950 dark:text-info-300',
  neutral:
    'bg-neutral-100 text-neutral-700 border-transparent dark:bg-neutral-800 dark:text-neutral-300',
};

const dotColors: Record<BadgeColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  accent: 'bg-accent-500',
  success: 'bg-success-500',
  warning: 'bg-warning-400',
  destructive: 'bg-destructive-500',
  info: 'bg-info-500',
  neutral: 'bg-neutral-500',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] leading-none px-1.5 py-0.5 gap-1',
  md: 'text-xs leading-none px-2 py-1 gap-1.5',
  lg: 'text-sm leading-none px-2.5 py-1.5 gap-2',
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2 w-2',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Badge — Inline status label or category tag.
 *
 * @example
 * <Badge color="success">Active</Badge>
 * <Badge variant="outline" color="destructive">Error</Badge>
 * <Badge variant="subtle" color="warning" dot>Pending</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'subtle',
    color = 'neutral',
    size = 'md',
    dot = false,
    className,
    children,
    ...props
  },
  ref
) {
  const colorMap = {
    solid: solidColors,
    outline: outlineColors,
    subtle: subtleColors,
  }[variant];

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        'whitespace-nowrap shrink-0',
        sizeStyles[size],
        colorMap[color],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('rounded-full shrink-0', dotSizeStyles[size], dotColors[color])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
