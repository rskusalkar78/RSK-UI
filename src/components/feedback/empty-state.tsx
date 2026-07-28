import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, action, icon, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background/60 px-8 py-12 text-center shadow-sm',
        className
      )}
      {...props}
    >
      {icon ? <div className="mb-4">{icon}</div> : null}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
      {children}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
