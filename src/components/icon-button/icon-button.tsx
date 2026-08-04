import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner/spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

export type IconButtonVariant = 'solid' | 'outline' | 'ghost' | 'destructive';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconButtonShape = 'rounded' | 'circle' | 'square';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label — required for screen readers (no visible text on this button) */
  'aria-label': string;
  /** The icon element to render */
  icon?: ReactNode;
  /** Visual style */
  variant?: IconButtonVariant;
  /** Size of the button */
  size?: IconButtonSize;
  /** Border radius shape */
  shape?: IconButtonShape;
  /** Shows spinner and prevents click */
  isLoading?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const baseStyles = [
  'relative inline-flex items-center justify-center shrink-0',
  'border cursor-pointer select-none',
  'transition-all duration-150 ease-in-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'disabled:pointer-events-none disabled:opacity-50',
  'motion-reduce:transition-none',
].join(' ');

const variantStyles: Record<IconButtonVariant, string> = {
  solid:
    'bg-primary text-primary-foreground border-transparent hover:bg-primary/90 active:bg-primary/80 active:scale-95 shadow-sm',
  outline:
    'bg-transparent text-foreground border-border hover:bg-muted hover:border-ring/50 active:bg-muted/80 active:scale-95',
  ghost:
    'bg-transparent text-foreground border-transparent hover:bg-muted active:bg-muted/80 active:scale-95',
  destructive:
    'bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90 active:bg-destructive/80 active:scale-95 shadow-sm',
};

const sizeStyles: Record<IconButtonSize, string> = {
  xs: 'h-7  w-7  text-xs',
  sm: 'h-8  w-8  text-sm',
  md: 'h-9  w-9  text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-base',
};

const shapeStyles: Record<IconButtonShape, string> = {
  rounded: 'rounded-lg',
  circle: 'rounded-full',
  square: 'rounded-none',
};

const iconSizeMap: Record<IconButtonSize, number> = { xs: 14, sm: 15, md: 16, lg: 18, xl: 20 };
const spinnerSizeMap: Record<IconButtonSize, 'xs' | 'xs' | 'xs' | 'sm' | 'sm'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'xs',
  lg: 'sm',
  xl: 'sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * IconButton — Square button designed to hold a single icon.
 *
 * `aria-label` is required to describe the action for screen readers.
 *
 * @example
 * <IconButton aria-label="Close dialog" icon={<X />} />
 * <IconButton aria-label="Delete item" variant="destructive" icon={<Trash2 />} />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    variant = 'ghost',
    size = 'md',
    shape = 'rounded',
    isLoading = false,
    disabled,
    className,
    children,
    onClick,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;
  const px = iconSizeMap[size];

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      onClick={isLoading ? undefined : onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        shapeStyles[shape],
        isLoading && 'cursor-wait',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner size={spinnerSizeMap[size]} variant="current" />
      ) : (
        <span
          className="inline-flex items-center justify-center"
          aria-hidden="true"
          style={{ width: px, height: px }}
        >
          {icon ?? children}
        </span>
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';
