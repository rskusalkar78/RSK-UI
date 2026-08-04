import {
  forwardRef,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/utils';
import { Label } from './label';
import { HelperText } from './helper-text';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: RadioSize;
  /** Error state flag */
  isError?: boolean;
  /** Label text or custom element */
  label?: ReactNode;
  /** Helper/description text */
  helperText?: ReactNode;
}

const radioSizeStyles: Record<RadioSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const dotSizeStyles: Record<RadioSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

/**
 * Radio — Accessible single selection radio control.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
  const inputId = id ?? (label ? `radio-${Math.random().toString(36).substring(2, 9)}` : undefined);

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
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            aria-invalid={hasError ? true : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'rounded-full border border-border bg-background transition-all duration-150 ease-in-out inline-flex items-center justify-center',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
              'peer-checked:border-primary',
              hasError && 'border-destructive peer-checked:border-destructive',
              radioSizeStyles[size]
            )}
          >
            <span
              className={cn(
                'rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100',
                hasError && 'bg-destructive',
                dotSizeStyles[size]
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

Radio.displayName = 'Radio';

export interface RadioGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Legend title for the radio group */
  label?: ReactNode;
  /** Helper text for the entire group */
  helperText?: ReactNode;
  /** Orientation layout */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * RadioGroup — Accessible fieldset container grouping multiple radio controls.
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { label, helperText, orientation = 'vertical', className, children, ...props },
  ref
) {
  return (
    <fieldset
      ref={ref}
      className={cn('border-none p-0 m-0 flex flex-col gap-1.5', className)}
      {...props}
    >
      {label && <legend className="p-0 font-medium text-sm text-foreground mb-1">{label}</legend>}
      <div
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col items-start' : 'flex-row items-center flex-wrap'
        )}
      >
        {children}
      </div>
      {helperText && <HelperText className="mt-1">{helperText}</HelperText>}
    </fieldset>
  );
});

RadioGroup.displayName = 'RadioGroup';
