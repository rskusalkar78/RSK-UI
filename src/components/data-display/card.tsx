import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { EmptyState } from '../feedback/empty-state';
import { Skeleton } from '../feedback/skeleton';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  empty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    title,
    description,
    action,
    footer,
    loading = false,
    empty = false,
    emptyTitle = 'No data',
    emptyDescription = 'There is no content to show yet.',
    emptyAction,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="space-y-1">
            {title ? <div className="font-semibold text-foreground">{title}</div> : null}
            {description ? (
              <div className="text-sm text-muted-foreground">{description}</div>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}

      <div className="p-5">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : empty ? (
          <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
        ) : (
          children
        )}
      </div>

      {footer ? (
        <div className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </section>
  );
});

Card.displayName = 'Card';
