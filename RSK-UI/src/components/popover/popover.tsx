import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Popover({
  trigger,
  children,
  title,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  side = 'bottom',
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const contentId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const handleToggle = () => setOpen(!isOpen);

  const triggerElement = isValidElement(trigger)
    ? cloneElement(
        trigger as ReactElement<{
          onClick?: (event: React.MouseEvent<HTMLElement>) => void;
          'aria-expanded'?: boolean;
          'aria-controls'?: string;
          'aria-haspopup'?: string;
        }>,
        {
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            handleToggle();
          },
          'aria-expanded': isOpen,
          'aria-controls': contentId,
          'aria-haspopup': 'dialog',
        }
      )
    : trigger;

  return (
    <>
      <span ref={triggerRef} className="inline-flex">
        {triggerElement}
      </span>
      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              ref={panelRef}
              id={contentId}
              role="dialog"
              aria-label={title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              className={cn(
                'fixed z-[var(--z-popover)] rounded-xl border border-border bg-popover p-4 text-sm text-popover-foreground shadow-lg',
                side === 'top' && 'bottom-4 left-1/2 -translate-x-1/2',
                side === 'bottom' && 'top-4 left-1/2 -translate-x-1/2',
                side === 'left' && 'right-4 top-1/2 -translate-y-1/2',
                side === 'right' && 'left-4 top-1/2 -translate-y-1/2',
                className
              )}
            >
              {title ? <div className="mb-2 font-semibold text-foreground">{title}</div> : null}
              <div>{children}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
