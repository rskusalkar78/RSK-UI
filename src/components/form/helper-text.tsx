import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface HelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Disabled styling state */
  disabled?: boolean;
}

/**
 * HelperText — Renders helpful context or instructions below form fields.
 */
export const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>(function HelperText(
  { disabled = false, className, children, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn(
        'text-xs text-muted-foreground leading-normal',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

HelperText.displayName = 'HelperText';
