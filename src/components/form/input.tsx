import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner/spinner';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: InputSize;
  /** Error state flag */
  isError?: boolean;
  /** Loading spinner state */
  isLoading?: boolean;
  /** Icon or element placed inside the left of the input */
  leftIcon?: ReactNode;
  /** Icon or element placed inside the right of the input */
  rightIcon?: ReactNode;
  /** Make input stretch full width of container */
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, { container: string; icon: string; input: string }> = {
  sm: {
    container: 'h-8 text-xs',
    icon: 'px-2 text-xs',
    input: 'px-2.5 py-1 text-xs',
  },
  md: {
    container: 'h-9 text-sm',
    icon: 'px-2.5 text-sm',
    input: 'px-3 py-1.5 text-sm',
  },
  lg: {
    container: 'h-10 text-base',
    icon: 'px-3 text-base',
    input: 'px-3.5 py-2 text-base',
  },
};

/**
 * Input — Flexible, accessible text input component.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    isError = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    id,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;
  const hasError = isError || ariaInvalid === true || ariaInvalid === 'true';

  const sizes = sizeStyles[size];

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-lg border border-border bg-background transition-all duration-150 ease-in-out',
        'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20',
        hasError &&
          'border-destructive text-destructive focus-within:border-destructive focus-within:ring-destructive/20',
        isDisabled && 'opacity-50 cursor-not-allowed bg-muted/30',
        fullWidth ? 'w-full' : 'w-64',
        sizes.container,
        className
      )}
    >
      {leftIcon && (
        <span
          className={cn(
            'inline-flex items-center justify-center text-muted-foreground shrink-0 select-none pointer-events-none',
            sizes.icon
          )}
          aria-hidden="true"
        >
          {leftIcon}
        </span>
      )}

      <input
        ref={ref}
        id={id}
        disabled={isDisabled}
        aria-invalid={hasError ? true : undefined}
        aria-busy={isLoading ? true : undefined}
        className={cn(
          'w-full h-full bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:cursor-not-allowed',
          sizes.input,
          leftIcon && 'pl-1',
          (rightIcon || isLoading) && 'pr-1'
        )}
        {...props}
      />

      {isLoading ? (
        <span
          className={cn(
            'inline-flex items-center justify-center shrink-0 text-muted-foreground',
            sizes.icon
          )}
        >
          <Spinner size={size === 'lg' ? 'sm' : 'xs'} variant="current" label="Loading input" />
        </span>
      ) : rightIcon ? (
        <span
          className={cn(
            'inline-flex items-center justify-center text-muted-foreground shrink-0 select-none pointer-events-none',
            sizes.icon
          )}
          aria-hidden="true"
        >
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
