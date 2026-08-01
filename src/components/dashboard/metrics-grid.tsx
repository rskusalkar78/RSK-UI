import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type MetricsGridColumns = 1 | 2 | 3 | 4 | 'auto';
export type MetricsGridGap = 'sm' | 'md' | 'lg' | 'xl';

export interface MetricsGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Column layout configuration */
  columns?: MetricsGridColumns;
  /** Gap size between grid items */
  gap?: MetricsGridGap;
  /** Section title header */
  title?: ReactNode;
  /** Section description */
  description?: ReactNode;
  /** Header right action node */
  action?: ReactNode;
  /** Grid items children */
  children: ReactNode;
}

const columnStyles: Record<MetricsGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const gapStyles: Record<MetricsGridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const MetricsGrid = forwardRef<HTMLDivElement, MetricsGridProps>(function MetricsGrid(
  { columns = 'auto', gap = 'md', title, description, action, children, className, ...props },
  ref
) {
  return (
    <section ref={ref} className={cn('space-y-4', className)} {...props}>
      {(title || description || action) && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            {title && <h2 className="text-lg font-bold text-foreground tracking-tight">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className={cn('grid', columnStyles[columns], gapStyles[gap])}>{children}</div>
    </section>
  );
});

MetricsGrid.displayName = 'MetricsGrid';
