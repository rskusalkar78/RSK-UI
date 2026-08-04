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

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export function Tooltip({ children, content, className }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const triggerElement = isValidElement(children)
    ? cloneElement(
        children as ReactElement<{
          onMouseEnter?: () => void;
          onMouseLeave?: () => void;
          onFocus?: () => void;
          onBlur?: () => void;
          'aria-describedby'?: string;
        }>,
        {
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
          onFocus: () => setIsOpen(true),
          onBlur: () => setIsOpen(false),
          'aria-describedby': tooltipId,
        }
      )
    : children;

  return (
    <>
      <span ref={triggerRef} className="inline-flex">
        {triggerElement}
      </span>
      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              id={tooltipId}
              role="tooltip"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'fixed z-[var(--z-tooltip)] rounded-md bg-foreground px-3 py-2 text-xs text-background shadow-lg',
                className
              )}
            >
              {content}
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
