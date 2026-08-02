import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../feedback/skeleton';
import { EmptyState } from '../feedback/empty-state';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Column<T> {
  key: string;
  header: ReactNode;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Array of data to display */
  data: T[];
  /** Column configuration */
  columns: Column<T>[];
  /** Show loading state with skeletons */
  loading?: boolean;
  /** Show empty state */
  empty?: boolean;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Empty state action */
  emptyAction?: ReactNode;
  /** Apply striped row styling */
  striped?: boolean;
  /** Enable hover effects on rows */
  hoverable?: boolean;
  /** Make header sticky on scroll */
  stickyHeader?: boolean;
  /** Enable row selection */
  selectable?: boolean;
  /** Set of selected row IDs */
  selectedRows?: Set<string>;
  /** Callback when a row is selected */
  onRowSelect?: (rowId: string) => void;
  /** Callback when select all is toggled */
  onSelectAll?: (selected: boolean) => void;
  /** Callback when sort is triggered */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /** Function to get unique ID for each row */
  getRowId?: (row: T, index: number) => string;
  /** Current sort configuration */
  sortBy?: { key: string; direction: 'asc' | 'desc' };
}

// ─── Component ────────────────────────────────────────────────────────────────

function TableInner<T>(
  {
    data,
    columns,
    loading = false,
    empty = false,
    emptyTitle = 'No data',
    emptyDescription = 'There are no records to display.',
    emptyAction,
    striped = false,
    hoverable = true,
    stickyHeader = false,
    selectable = false,
    selectedRows = new Set(),
    onRowSelect,
    onSelectAll,
    onSort,
    getRowId = (_, index) => String(index),
    sortBy,
    className,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [internalSort, setInternalSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const currentSort = sortBy || internalSort;

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    const newDirection =
      currentSort?.key === columnKey && currentSort.direction === 'asc' ? 'desc' : 'asc';

    const newSort: { key: string; direction: 'asc' | 'desc' } = {
      key: columnKey,
      direction: newDirection,
    };

    if (onSort) {
      onSort(columnKey, newDirection);
    } else {
      setInternalSort(newSort);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectAll) {
      onSelectAll(checked);
    }
  };

  const handleRowSelect = (rowId: string) => {
    if (onRowSelect) {
      onRowSelect(rowId);
    }
  };

  const allSelected =
    data.length > 0 && data.every((row, index) => selectedRows.has(getRowId(row, index)));
  const someSelected =
    data.some((row, index) => selectedRows.has(getRowId(row, index))) && !allSelected;

  // Loading state
  if (loading) {
    return (
      <div
        ref={ref}
        className={cn('w-full overflow-x-auto rounded-lg border border-border', className)}
        {...props}
      >
        <table className="w-full border-collapse">
          <thead className={cn('bg-muted/50', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {selectable && (
                <th className="w-12 border-b border-border px-4 py-3 text-left">
                  <Skeleton className="h-4 w-4" />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-border px-4 py-3 text-left text-sm font-semibold text-foreground"
                  style={{ width: column.width }}
                >
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b border-border">
                {selectable && (
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-4" />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (empty || data.length === 0) {
    return (
      <div
        ref={ref}
        className={cn('w-full rounded-lg border border-border p-8', className)}
        {...props}
      >
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('w-full overflow-x-auto rounded-lg border border-border', className)}
      {...props}
    >
      <table className="w-full border-collapse">
        <thead
          className={cn(
            'bg-muted/50',
            stickyHeader && 'sticky top-0 z-10 bg-muted/95 backdrop-blur-sm'
          )}
        >
          <tr>
            {selectable && (
              <th className="w-12 border-b border-border px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = someSelected;
                    }
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => {
              const isSorted = currentSort?.key === column.key;
              const sortDirection = isSorted ? currentSort.direction : null;

              return (
                <th
                  key={column.key}
                  className={cn(
                    'border-b border-border px-4 py-3 text-sm font-semibold text-foreground',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && 'cursor-pointer select-none hover:bg-muted/80'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSort(column.key);
                    }
                  }}
                  tabIndex={column.sortable ? 0 : undefined}
                  role={column.sortable ? 'button' : undefined}
                  aria-sort={
                    isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="inline-flex text-muted-foreground">
                        {!isSorted && <ChevronsUpDown size={14} />}
                        {sortDirection === 'asc' && <ArrowUp size={14} />}
                        {sortDirection === 'desc' && <ArrowDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowId = getRowId(row, rowIndex);
            const isSelected = selectedRows.has(rowId);

            return (
              <tr
                key={rowId}
                className={cn(
                  'border-b border-border transition-colors',
                  hoverable && 'hover:bg-muted/50',
                  striped && rowIndex % 2 === 1 && 'bg-muted/20',
                  isSelected && 'bg-primary/5'
                )}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelect(rowId)}
                      className="h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-sm text-foreground',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right'
                    )}
                  >
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Table — Display structured data in rows and columns.
 *
 * @example
 * <Table
 *   data={users}
 *   columns={[
 *     { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
 *     { key: 'email', header: 'Email', accessor: (user) => user.email },
 *   ]}
 * />
 */
export const Table = forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof TableInner>;

(Table as any).displayName = 'Table';
