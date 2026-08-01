import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../feedback/skeleton';
import { EmptyState } from '../feedback/empty-state';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Unique identifier */
  id?: string;
  /** Primary text content */
  title: ReactNode;
  /** Secondary descriptive text */
  description?: ReactNode;
  /** Avatar or profile image */
  avatar?: ReactNode;
  /** Icon element */
  icon?: ReactNode;
  /** Action button or element */
  action?: ReactNode;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Array of list items */
  items?: ListItemProps[];
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';
  /** Show dividers between items */
  divider?: boolean;
  /** Spacing between items */
  spacing?: 'compact' | 'comfortable';
  /** Enable hover effects */
  hoverable?: boolean;
  /** Show loading state with skeletons */
  loading?: boolean;
  /** Number of skeleton items to show when loading */
  loadingCount?: number;
  /** Show empty state */
  empty?: boolean;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Empty state action */
  emptyAction?: ReactNode;
  /** Children (for custom ListItem composition) */
  children?: ReactNode;
}

// ─── ListItem Component ───────────────────────────────────────────────────────

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  {
    id: _id,
    title,
    description,
    avatar,
    icon,
    action,
    selected = false,
    disabled = false,
    className,
    onClick,
    ...props
  },
  ref
) {
  const isInteractive = Boolean(onClick);

  return (
    <li
      ref={ref}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      aria-selected={selected ? 'true' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (isInteractive && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>);
        }
      }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 transition-colors',
        isInteractive && !disabled && 'cursor-pointer hover:bg-muted/50',
        isInteractive &&
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        selected && 'bg-primary/10',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      {icon && <div className="flex-shrink-0 text-muted-foreground">{icon}</div>}

      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate">{title}</div>
        {description && <div className="text-sm text-muted-foreground truncate">{description}</div>}
      </div>

      {action && <div className="flex-shrink-0 ml-auto">{action}</div>}
    </li>
  );
});

ListItem.displayName = 'ListItem';

// ─── List Component ───────────────────────────────────────────────────────────

export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  {
    items,
    orientation = 'vertical',
    divider = false,
    spacing = 'comfortable',
    hoverable = true,
    loading = false,
    loadingCount = 5,
    empty = false,
    emptyTitle = 'No items',
    emptyDescription = 'There are no items to display.',
    emptyAction,
    className,
    children,
    ...props
  },
  ref
) {
  // Loading state
  if (loading) {
    return (
      <ul
        ref={ref}
        className={cn(
          'rounded-lg border border-border bg-card',
          orientation === 'horizontal' ? 'flex' : 'divide-y divide-border',
          className
        )}
        {...props}
      >
        {Array.from({ length: loadingCount }).map((_, index) => (
          <li
            key={index}
            className={cn('flex items-center gap-3 px-4', spacing === 'compact' ? 'py-2' : 'py-3')}
          >
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  // Empty state
  if (empty || (items && items.length === 0 && !children)) {
    return (
      <div
        ref={ref as unknown as React.Ref<HTMLDivElement>}
        className={cn('rounded-lg border border-border bg-card p-8', className)}
      >
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      </div>
    );
  }

  return (
    <ul
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-card',
        orientation === 'horizontal' ? 'flex overflow-x-auto' : '',
        divider && orientation === 'vertical' && 'divide-y divide-border',
        className
      )}
      {...props}
    >
      {children ||
        items?.map((item, index) => (
          <ListItem
            key={item.id || index}
            {...item}
            className={cn(
              spacing === 'compact' ? 'py-2' : 'py-3',
              hoverable && item.onClick && 'hover:bg-muted/50',
              item.className
            )}
          />
        ))}
    </ul>
  );
});

List.displayName = 'List';
