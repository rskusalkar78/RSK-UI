import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction of the dividing line */
  orientation?: DividerOrientation;
  /** Line style */
  variant?: DividerVariant;
  /** Optional label text centered on the divider (horizontal only) */
  label?: string;
  /** Decorative dividers are hidden from screen readers */
  decorative?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantBorderStyle: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Divider — Separates content sections.
 *
 * @example
 * <Divider />
 * <Divider orientation="vertical" className="h-6" />
 * <Divider label="OR" />
 * <Divider variant="dashed" />
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', variant = 'solid', label, decorative = true, className, ...props },
  ref
) {
  const isHorizontal = orientation === 'horizontal';

  // Vertical divider — simple line element
  if (!isHorizontal) {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : 'vertical'}
        data-orientation="vertical"
        className={cn(
          'inline-block self-stretch',
          'border-l border-border',
          variantBorderStyle[variant],
          className
        )}
        {...props}
      />
    );
  }

  // Horizontal with label
  if (label) {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : 'horizontal'}
        data-orientation="horizontal"
        className={cn('flex items-center gap-3 w-full', className)}
        {...props}
      >
        <div className={cn('flex-1 border-t border-border', variantBorderStyle[variant])} />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap px-1">
          {label}
        </span>
        <div className={cn('flex-1 border-t border-border', variantBorderStyle[variant])} />
      </div>
    );
  }

  // Plain horizontal divider
  return (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : 'horizontal'}
      data-orientation="horizontal"
      className={cn('w-full border-t border-border', variantBorderStyle[variant], className)}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
