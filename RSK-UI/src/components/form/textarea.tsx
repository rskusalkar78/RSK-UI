import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner/spinner';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Size variant */
  size?: TextareaSize;
  /** Error state flag */
  isError?: boolean;
  /** Loading spinner state */
  isLoading?: boolean;
  /** Resize behavior */
  resize?: TextareaResize;
  /** Show max character count counter */
  maxLength?: number;
  /** Stretch to full width of container */
  fullWidth?: boolean;
}

const sizeStyles: Record<TextareaSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs min-h-[70px]',
  md: 'px-3 py-2 text-sm min-h-[90px]',
  lg: 'px-3.5 py-2.5 text-base min-h-[120px]',
};

const resizeStyles: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

/**
 * Textarea — Accessible multi-line input element.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    size = 'md',
    isError = false,
    isLoading = false,
    resize = 'vertical',
    maxLength,
    fullWidth = false,
    disabled,
    className,
    value,
    defaultValue,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;
  const hasError = isError || ariaInvalid === true || ariaInvalid === 'true';

  const currentLength =
    typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0;

  return (
    <div className={cn('relative inline-flex flex-col', fullWidth ? 'w-full' : 'w-64')}>
      <textarea
        ref={ref}
        disabled={isDisabled}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={hasError ? true : undefined}
        aria-busy={isLoading ? true : undefined}
        className={cn(
          'w-full rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/70',
          'transition-all duration-150 ease-in-out focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/20',
          hasError &&
            'border-destructive text-destructive focus:border-destructive focus:ring-destructive/20',
          isDisabled && 'opacity-50 cursor-not-allowed bg-muted/30',
          sizeStyles[size],
          resizeStyles[resize],
          className
        )}
        {...props}
      />

      {(isLoading || maxLength !== undefined) && (
        <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>
            {isLoading && (
              <span className="inline-flex items-center gap-1.5">
                <Spinner size="xs" variant="current" label="Loading content" />
                <span>Loading…</span>
              </span>
            )}
          </div>
          {maxLength !== undefined && (
            <span className="ml-auto font-mono text-[11px]">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
