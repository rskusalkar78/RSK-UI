import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant =
  'primary' | 'secondary' | 'accent' | 'destructive' | 'neutral' | 'current';

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /** Visual size of the spinner */
  size?: SpinnerSize;
  /** Color variant — 'current' inherits from parent's CSS color */
  variant?: SpinnerVariant;
  /** Screen reader label (default: "Loading…") */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

// ─── Size map (px dimensions) ─────────────────────────────────────────────────

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 36,
};

const strokeMap: Record<SpinnerSize, number> = {
  xs: 2.5,
  sm: 2.5,
  md: 2,
  lg: 2,
  xl: 1.75,
};

// ─── Variant color map ────────────────────────────────────────────────────────

const variantMap: Record<SpinnerVariant, string> = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  accent: 'text-accent-500',
  destructive: 'text-destructive-500',
  neutral: 'text-neutral-500',
  current: 'text-current',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Spinner — Accessible loading indicator.
 *
 * Uses an SVG circle with a CSS stroke-dashoffset animation.
 * Respects `prefers-reduced-motion` — falls back to opacity pulse.
 *
 * @example
 * <Spinner size="md" variant="primary" />
 * <Spinner size="sm" label="Saving changes…" />
 */
export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  {
    size = 'md',
    variant = 'current',
    label = 'Loading…',
    className,
    'aria-label': ariaLabel,
    ...props
  },
  ref
) {
  const px = sizeMap[size];
  const stroke = strokeMap[size];
  const radius = (px - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      ref={ref}
      role="status"
      aria-label={ariaLabel ?? label}
      aria-live="polite"
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'inline-block shrink-0 animate-spin',
        'motion-reduce:animate-none motion-reduce:opacity-70',
        variantMap[variant],
        className
      )}
      {...props}
    >
      {/* Track circle */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        className="opacity-20"
      />
      {/* Spinning arc — roughly 75% of circumference visible */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.25}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  );
});

Spinner.displayName = 'Spinner';
