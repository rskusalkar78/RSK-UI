import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner/spinner';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Size variant */
  size?: SelectSize;
  /** Error state flag */
  isError?: boolean;
  /** Loading spinner state */
  isLoading?: boolean;
  /** Placeholder text shown when no value selected */
  placeholder?: string;
  /** Options array (or render via children `<option>`) */
  options?: (SelectOption | SelectOptionGroup)[];
  /** Stretch to full width of container */
  fullWidth?: boolean;
}

const sizeStyles: Record<SelectSize, { container: string; select: string; icon: string }> = {
  sm: {
    container: 'h-8 text-xs',
    select: 'pl-2.5 pr-7 py-1 text-xs',
    icon: 'right-2 w-3.5 h-3.5',
  },
  md: {
    container: 'h-9 text-sm',
    select: 'pl-3 pr-8 py-1.5 text-sm',
    icon: 'right-2.5 w-4 h-4',
  },
  lg: {
    container: 'h-10 text-base',
    select: 'pl-3.5 pr-9 py-2 text-base',
    icon: 'right-3 w-4 h-4',
  },
};

function isOptionGroup(item: SelectOption | SelectOptionGroup): item is SelectOptionGroup {
  return 'options' in item && Array.isArray(item.options);
}

/**
 * Select — Accessible dropdown select control component.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    size = 'md',
    isError = false,
    isLoading = false,
    placeholder,
    options,
    fullWidth = false,
    disabled,
    className,
    children,
    'aria-invalid': ariaInvalid,
    defaultValue,
    value,
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
      <select
        ref={ref}
        disabled={isDisabled}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={hasError ? true : undefined}
        aria-busy={isLoading ? true : undefined}
        className={cn(
          'w-full h-full appearance-none bg-transparent text-foreground cursor-pointer focus:outline-none disabled:cursor-not-allowed',
          sizes.select
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden={value !== '' && defaultValue !== ''}>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((item, idx) => {
              if (isOptionGroup(item)) {
                return (
                  <optgroup key={`${item.label}-${idx}`} label={item.label}>
                    {item.options.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                );
              }
              return (
                <option key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </option>
              );
            })
          : children}
      </select>

      <span
        className={cn(
          'absolute pointer-events-none inline-flex items-center justify-center text-muted-foreground shrink-0',
          sizes.icon
        )}
        aria-hidden="true"
      >
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'sm' : 'xs'} variant="current" label="Loading options" />
        ) : (
          <ChevronDown className="w-full h-full shrink-0" />
        )}
      </span>
    </div>
  );
});

Select.displayName = 'Select';
