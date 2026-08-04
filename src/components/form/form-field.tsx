import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/utils';
import { Label, type LabelSize } from './label';
import { HelperText } from './helper-text';
import { ErrorMessage } from './error-message';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Label for the form control */
  label?: ReactNode;
  /** Size variant */
  size?: LabelSize;
  /** Helper instruction text */
  helperText?: ReactNode;
  /** Error message string or node */
  error?: ReactNode;
  /** Required field indicator */
  isRequired?: boolean;
  /** Optional field badge/text */
  optionalText?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Full width field layout */
  fullWidth?: boolean;
  /** Custom ID for control */
  id?: string;
  /** The child input component */
  children: ReactNode;
}

/**
 * FormField — High-level wrapper connecting Label, Input, HelperText, and ErrorMessage with automatic ARIA wiring.
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    label,
    size = 'md',
    helperText,
    error,
    isRequired = false,
    optionalText,
    disabled = false,
    fullWidth = false,
    id: customId,
    className,
    children,
    ...props
  },
  ref
) {
  const autoId = useId();
  const fieldId = customId ?? autoId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  const ariaDescribedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  const renderChild = () => {
    if (isValidElement(children)) {
      const child = children as ReactElement<{
        id?: string;
        'aria-describedby'?: string;
        isError?: boolean;
        'aria-invalid'?: boolean;
        disabled?: boolean;
        fullWidth?: boolean;
        size?: LabelSize;
      }>;

      return cloneElement(child, {
        id: child.props.id ?? fieldId,
        'aria-describedby': child.props['aria-describedby'] ?? ariaDescribedBy,
        isError: child.props.isError ?? Boolean(error),
        'aria-invalid': Boolean(error),
        disabled: child.props.disabled ?? disabled,
        fullWidth: child.props.fullWidth ?? fullWidth,
        size: child.props.size ?? size,
      });
    }
    return children;
  };

  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-64', className)}
      {...props}
    >
      {label && (
        <Label
          htmlFor={fieldId}
          size={size}
          isRequired={isRequired}
          optionalText={optionalText}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      {renderChild()}

      {helperText && !error && (
        <HelperText id={helperId} disabled={disabled}>
          {helperText}
        </HelperText>
      )}

      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </div>
  );
});

FormField.displayName = 'FormField';
