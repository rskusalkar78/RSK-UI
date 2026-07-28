import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, ...props },
  ref
) {
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
