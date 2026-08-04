import { forwardRef, type LabelHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type LabelSize = 'sm' | 'md' | 'lg';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Size variant for the label */
  size?: LabelSize;
  /** Whether the field is required (displays a red asterisk) */
  isRequired?: boolean;
  /** Disabled styling state */
  disabled?: boolean;
  /** Custom element or text to display next to label */
  optionalText?: ReactNode;
}

const sizeStyles: Record<LabelSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * Label — Accessible label for form controls.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    size = 'md',
    isRequired = false,
    disabled = false,
    optionalText,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <label
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 font-medium leading-none select-none text-foreground',
        sizeStyles[size],
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isRequired && (
        <span className="text-destructive font-semibold" aria-hidden="true" title="Required">
          *
        </span>
      )}
      {optionalText && (
        <span className="text-muted-foreground text-xs font-normal ml-0.5">{optionalText}</span>
      )}
    </label>
  );
});

Label.displayName = 'Label';
