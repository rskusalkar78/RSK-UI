import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  closeButtonLabel?: string;
  showCloseButton?: boolean;
  role?: 'dialog' | 'alertdialog';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeStyles: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'w-full max-w-3xl',
};

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled'));
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  contentClassName,
  closeButtonLabel = 'Close dialog',
  showCloseButton = true,
  role = 'dialog',
  size = 'md',
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key === 'Tab' && containerRef.current) {
        const focusable = getFocusableElements(containerRef.current);
        if (focusable.length === 0) {
          event.preventDefault();
          containerRef.current.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const focusableElements = getFocusableElements(containerRef.current);
    const firstElement = focusableElements[0] ?? containerRef.current;
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[var(--z-modal)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            ref={containerRef}
            role={role}
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'relative w-full rounded-2xl border border-border bg-card text-card-foreground shadow-2xl',
              sizeStyles[size],
              className
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={cn('p-6', contentClassName)}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  {title ? (
                    <h2 id={titleId} className="text-lg font-semibold text-foreground">
                      {title}
                    </h2>
                  ) : null}
                  {description ? (
                    <p id={descriptionId} className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  ) : null}
                </div>
                {showCloseButton ? (
                  <button
                    type="button"
                    className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground transition hover:bg-muted"
                    onClick={() => onOpenChange(false)}
                    aria-label={closeButtonLabel}
                  >
                    ×
                  </button>
                ) : null}
              </div>
              <div className="mt-5 text-sm text-foreground">{children}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
