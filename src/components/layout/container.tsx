import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint of the container */
  size?: ContainerSize;
  /** Apply responsive horizontal padding (px-4 → sm:px-6 → lg:px-8) */
  padded?: boolean;
  /** Center the container horizontally via margin auto */
  centered?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Container — Responsive max-width wrapper.
 *
 * Constrains content to a maximum width and optionally centers it and adds
 * horizontal padding. Compose with `Section` for full-page layouts.
 *
 * @example
 * <Container size="xl" padded centered>
 *   <p>Content</p>
 * </Container>
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'xl', padded = true, centered = true, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'w-full',
        sizeStyles[size],
        padded && 'px-4 sm:px-6 lg:px-8',
        centered && 'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';
