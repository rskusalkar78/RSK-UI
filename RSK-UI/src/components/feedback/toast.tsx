import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export type ToastVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface ToastProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragEnd' | 'onDragStart'
> {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  open?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
}

const variantStyles: Record<ToastVariant, string> = {
  info: 'border-info-300 bg-info-50 text-info-900 dark:border-info-800 dark:bg-info-950/40 dark:text-info-100',
  success:
    'border-success-300 bg-success-50 text-success-900 dark:border-success-800 dark:bg-success-950/40 dark:text-success-100',
  warning:
    'border-warning-300 bg-warning-50 text-warning-900 dark:border-warning-800 dark:bg-warning-950/40 dark:text-warning-100',
  destructive:
    'border-destructive-300 bg-destructive-50 text-destructive-900 dark:border-destructive-800 dark:bg-destructive-950/40 dark:text-destructive-100',
};

const icons: Record<ToastVariant, ReactNode> = {
  info: <Info className="h-4 w-4" aria-hidden="true" />,
  success: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
  warning: <CircleAlert className="h-4 w-4" aria-hidden="true" />,
  destructive: <CircleAlert className="h-4 w-4" aria-hidden="true" />,
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    title,
    description,
    variant = 'info',
    open = true,
    onClose,
    closeLabel = 'Dismiss notification',
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={ref}
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className={cn(
            'flex w-full max-w-md items-start gap-3 rounded-lg border px-4 py-3 shadow-lg',
            variantStyles[variant],
            className
          )}
          {...props}
        >
          <div className="mt-0.5 shrink-0">{icons[variant]}</div>
          <div className="min-w-0 flex-1 space-y-1">
            {title ? <div className="font-medium">{title}</div> : null}
            {description ? <div className="text-sm opacity-90">{description}</div> : null}
            {children}
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded p-1 text-current/70 transition hover:text-current"
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

Toast.displayName = 'Toast';
