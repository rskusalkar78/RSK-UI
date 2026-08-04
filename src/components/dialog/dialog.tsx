import type { ReactNode } from 'react';
import { Modal } from '../modal/modal';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  contentClassName,
  size = 'md',
}: DialogProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      className={className}
      contentClassName={contentClassName}
      size={size}
      role="dialog"
    >
      {children}
    </Modal>
  );
}
