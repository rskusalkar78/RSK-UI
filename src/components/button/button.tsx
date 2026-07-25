import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner/spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Shows a spinner and sets aria-busy. Prevents click events. */
  isLoading?: boolean;
  /** Label shown alongside spinner during loading state */
  loadingText?: string;
  /** Icon rendered before the children */
  leftIcon?: ReactNode;
  /** Icon rendered after the children */
  rightIcon?: ReactNode;
  /** Stretch button to fill its container */
  fullWidth?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const baseStyles = [
  'relative inline-flex items-center justify-center gap-2',
  'font-medium leading-none tracking-wide',
  'rounded-lg border',
  'cursor-pointer select-none',
  'transition-all duration-150 ease-in-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'disabled:pointer-events-none disabled:opacity-50',
  'motion-reduce:transition-none',
].join(' ');

const variantStyles: Record<ButtonVariant, string> = {
  solid: [
    'bg-primary text-primary-foreground border-transparent',
    'hover:bg-primary/90',
    'active:bg-primary/80 active:scale-[0.98]',
    'shadow-sm',
  ].join(' '),

  outline: [
    'bg-transparent text-foreground border-border',
    'hover:bg-muted hover:border-ring/50',
    'active:bg-muted/80 active:scale-[0.98]',
  ].join(' '),

  ghost: [
    'bg-transparent text-foreground border-transparent',
    'hover:bg-muted',
    'active:bg-muted/80 active:scale-[0.98]',
  ].join(' '),

  link: [
    'bg-transparent text-primary border-transparent',
    'underline-offset-4 hover:underline',
    'active:opacity-80',
    'px-0 h-auto',
  ].join(' '),

  destructive: [
    'bg-destructive text-destructive-foreground border-transparent',
    'hover:bg-destructive/90',
    'active:bg-destructive/80 active:scale-[0.98]',
    'shadow-sm',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7  px-2.5 text-xs  gap-1',
  sm: 'h-8  px-3   text-sm  gap-1.5',
  md: 'h-9  px-4   text-sm  gap-2',
  lg: 'h-10 px-5   text-base gap-2',
  xl: 'h-12 px-6   text-base gap-2.5',
};

// Spinner size mapping to button size
const spinnerSizeMap: Record<ButtonSize, 'xs' | 'sm' | 'sm' | 'sm' | 'md'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Button — Primary action element.
 *
 * @example
 * <Button variant="solid" size="md">Click me</Button>
 * <Button variant="outline" isLoading>Saving…</Button>
 * <Button variant="destructive" leftIcon={<Trash2 />}>Delete</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    size = 'md',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    children,
    onClick,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;

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
        fullWidth && 'w-full',
        isLoading && 'cursor-wait',
        className
      )}
      {...props}
    >
      {/* Loading state: spinner + optional loading text */}
      {isLoading ? (
        <>
          <Spinner
            size={spinnerSizeMap[size]}
            variant="current"
            label={loadingText ?? 'Loading…'}
          />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="inline-flex shrink-0 items-center" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="inline-flex shrink-0 items-center" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
