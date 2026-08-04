import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Optional icon override or hide icon when explicit null */
  icon?: ReactNode | null;
}

/**
 * ErrorMessage — Renders accessible error messages with role="alert".
 */
export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  function ErrorMessage({ icon, className, children, ...props }, ref) {
    if (!children) return null;

    const renderIcon =
      icon === undefined ? (
        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
      ) : (
        icon
      );

    return (
      <p
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          'text-xs font-medium text-destructive inline-flex items-start gap-1.5 leading-normal',
          className
        )}
        {...props}
      >
        {renderIcon}
        <span>{children}</span>
      </p>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';
