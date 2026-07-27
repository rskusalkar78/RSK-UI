import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

<<<<<<< HEAD
export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, ...props },
  ref
) {
=======
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, asChild = false, children, ...props },
  ref
) {
  if (asChild && children) {
    return (
      <div ref={ref} aria-hidden="true" className={cn('pointer-events-none animate-pulse rounded bg-neutral-200/80 dark:bg-neutral-800/80', className)}>
        {children}
      </div>
    );
  }

>>>>>>> 461806c (feat: add Alert component stories for Storybook)
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
