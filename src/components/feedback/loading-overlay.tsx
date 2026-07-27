import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Spinner } from '../spinner/spinner';
import { cn } from '../../lib/utils';

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  label?: string;
  children?: ReactNode;
}

<<<<<<< HEAD
export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  function LoadingOverlay(
    { active = false, label = 'Loading...', className, children, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
        <AnimatePresence>
          {active ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-sm"
            >
              <div
                role="status"
                aria-label={label}
                className="flex items-center gap-3 rounded-md border border-border bg-background/95 px-4 py-3 shadow-lg"
              >
                <Spinner size="md" variant="primary" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);
=======
export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(function LoadingOverlay(
  { active = false, label = 'Loading...', className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-sm"
          >
            <div role="status" aria-label={label} className="flex items-center gap-3 rounded-md border border-border bg-background/95 px-4 py-3 shadow-lg">
              <Spinner size="md" variant="primary" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
});
>>>>>>> 461806c (feat: add Alert component stories for Storybook)

LoadingOverlay.displayName = 'LoadingOverlay';
