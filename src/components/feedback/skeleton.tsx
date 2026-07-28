import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, asChild = false, children, ...props },
  ref
) {
  if (asChild && children) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'pointer-events-none animate-pulse rounded bg-neutral-200/80 dark:bg-neutral-800/80',
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-testid="skeleton"
      aria-hidden="true"
      className={cn('animate-pulse rounded bg-neutral-200/80 dark:bg-neutral-800/80', className)}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';
