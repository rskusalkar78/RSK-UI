import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Label } from './label';
import { HelperText } from './helper-text';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: CheckboxSize;
  /** Indeterminate state */
  isIndeterminate?: boolean;
  /** Error state flag */
  isError?: boolean;
  /** Label text or custom element */
  label?: ReactNode;
  /** Helper/description text */
  helperText?: ReactNode;
}

const boxSizeStyles: Record<CheckboxSize, string> = {
  sm: 'w-4 h-4 rounded',
  md: 'w-5 h-5 rounded-md',
  lg: 'w-6 h-6 rounded-md',
};

const iconSizeStyles: Record<CheckboxSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

/**
 * Checkbox — Accessible checkbox control supporting label, indeterminate state & error states.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = 'md',
    isIndeterminate = false,
    isError = false,
    label,
    helperText,
    disabled = false,
    className,
    id,
    checked,
    defaultChecked,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const combinedRef = (node: HTMLInputElement) => {
    (internalRef as { current: HTMLInputElement | null }).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLInputElement | null }).current = node;
  };

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const hasError = isError || ariaInvalid === true || ariaInvalid === 'true';
  const inputId =
    id ?? (label ? `checkbox-${Math.random().toString(36).substring(2, 9)}` : undefined);

  return (
    <div className={cn('inline-flex flex-col gap-0.5', className)}>
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-start gap-2.5 select-none cursor-pointer group',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative inline-flex items-center justify-center shrink-0 mt-0.5">
          <input
            ref={combinedRef}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-invalid={hasError ? true : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'inline-flex items-center justify-center border border-border bg-background transition-all duration-150 ease-in-out text-primary-foreground',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
              'peer-checked:bg-primary peer-checked:border-primary',
              isIndeterminate && 'bg-primary border-primary',
              hasError &&
                'border-destructive peer-checked:bg-destructive peer-checked:border-destructive',
              boxSizeStyles[size]
            )}
          >
            {isIndeterminate ? (
              <Minus className={cn('stroke-[3]', iconSizeStyles[size])} aria-hidden="true" />
            ) : (
              <Check
                className={cn(
                  'stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity',
                  iconSizeStyles[size]
                )}
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {label && (
          <span className="flex flex-col">
            <Label size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} disabled={disabled}>
              {label}
            </Label>
            {helperText && (
              <HelperText disabled={disabled} className="mt-0.5">
                {helperText}
              </HelperText>
            )}
          </span>
        )}
      </label>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
