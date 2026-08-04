import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Label } from './label';
import { HelperText } from './helper-text';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: SwitchSize;
  /** Error state flag */
  isError?: boolean;
  /** Label text or custom element */
  label?: ReactNode;
  /** Helper/description text */
  helperText?: ReactNode;
}

const trackSizeStyles: Record<SwitchSize, string> = {
  sm: 'w-7 h-4 p-0.5',
  md: 'w-9 h-5 p-0.5',
  lg: 'w-11 h-6 p-1',
};

const thumbSizeStyles: Record<SwitchSize, { size: string; translate: string }> = {
  sm: { size: 'w-3 h-3', translate: 'peer-checked:translate-x-3' },
  md: { size: 'w-4 h-4', translate: 'peer-checked:translate-x-4' },
  lg: { size: 'w-4 h-4', translate: 'peer-checked:translate-x-5' },
};

/**
 * Switch — Accessible toggle switch component.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = 'md',
    isError = false,
    label,
    helperText,
    disabled = false,
    className,
    id,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref
) {
  const hasError = isError || ariaInvalid === true || ariaInvalid === 'true';
  const inputId =
    id ?? (label ? `switch-${Math.random().toString(36).substring(2, 9)}` : undefined);

  const thumb = thumbSizeStyles[size];

  return (
    <div className={cn('inline-flex flex-col gap-0.5', className)}>
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-start gap-2.5 select-none cursor-pointer group',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative inline-flex items-center shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            aria-invalid={hasError ? true : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'rounded-full border border-transparent bg-muted transition-colors duration-200 ease-in-out inline-flex items-center',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
              'peer-checked:bg-primary',
              hasError && 'bg-destructive/30 peer-checked:bg-destructive',
              trackSizeStyles[size]
            )}
          >
            <span
              className={cn(
                'rounded-full bg-background shadow-md transition-transform duration-200 ease-in-out',
                thumb.size,
                thumb.translate
              )}
            />
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

Switch.displayName = 'Switch';
