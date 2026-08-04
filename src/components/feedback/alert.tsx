import { forwardRef, type HTMLAttributes } from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  icon?: React.ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'border-info-300 bg-info-50 text-info-900 dark:border-info-800 dark:bg-info-950/40 dark:text-info-100',
  success:
    'border-success-300 bg-success-50 text-success-900 dark:border-success-800 dark:bg-success-950/40 dark:text-success-100',
  warning:
    'border-warning-300 bg-warning-50 text-warning-900 dark:border-warning-800 dark:bg-warning-950/40 dark:text-warning-100',
  destructive:
    'border-destructive-300 bg-destructive-50 text-destructive-900 dark:border-destructive-800 dark:bg-destructive-950/40 dark:text-destructive-100',
};

const iconMap: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="h-4 w-4" aria-hidden="true" />,
  success: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
  warning: <TriangleAlert className="h-4 w-4" aria-hidden="true" />,
  destructive: <AlertCircle className="h-4 w-4" aria-hidden="true" />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { title, description, variant = 'info', icon, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3 shadow-sm motion-safe:transition-all',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="mt-0.5 shrink-0">{icon ?? iconMap[variant]}</div>
      <div className="min-w-0 flex-1 space-y-1">
        {title ? <div className="font-medium">{title}</div> : null}
        {description ? <div className="text-sm opacity-90">{description}</div> : null}
        {children}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';
