import { forwardRef, type HTMLAttributes } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Current page size */
  pageSize?: number;
  /** Callback when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Total number of items (for info display) */
  totalItems?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Show info text (e.g., "1-10 of 100 items") */
  showInfo?: boolean;
  /** Number of page buttons to show on each side of current page */
  siblingCount?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function generatePageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipsis

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    currentPage,
    totalPages,
    onPageChange,
    pageSize = 10,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50, 100],
    totalItems,
    showFirstLast = false,
    showPageSize = false,
    showInfo = false,
    siblingCount = 1,
    size = 'md',
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const pages = generatePageRange(currentPage, totalPages, siblingCount);

  const handlePageChange = (page: number) => {
    if (disabled) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;
    onPageChange(page);
  };

  const handlePageSizeChange = (newSize: number) => {
    if (disabled || !onPageSizeChange) return;
    onPageSizeChange(newSize);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const sizeClasses = {
    sm: {
      button: 'h-8 w-8 text-xs',
      nav: 'gap-1',
    },
    md: {
      button: 'h-9 w-9 text-sm',
      nav: 'gap-1',
    },
    lg: {
      button: 'h-10 w-10 text-base',
      nav: 'gap-2',
    },
  };

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      {/* Info text */}
      {showInfo && totalItems !== undefined && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems}</span> items
        </div>
      )}

      {/* Pagination controls */}
      <div className={cn('flex items-center', sizeClasses[size].nav)}>
        {/* First page button */}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={disabled || isFirstPage}
            aria-label="Go to first page"
            className={cn(
              'inline-flex items-center justify-center rounded-md border border-border bg-card transition-colors',
              'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card',
              sizeClasses[size].button
            )}
          >
            <ChevronsLeft size={16} />
          </button>
        )}

        {/* Previous button */}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || isFirstPage}
          aria-label="Go to previous page"
          className={cn(
            'inline-flex items-center justify-center rounded-md border border-border bg-card transition-colors',
            'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card',
            sizeClasses[size].button
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        <div className={cn('flex items-center', sizeClasses[size].nav)}>
          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={cn(
                    'inline-flex items-center justify-center text-muted-foreground',
                    sizeClasses[size].button
                  )}
                  aria-hidden="true"
                >
                  <MoreHorizontal size={16} />
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center justify-center rounded-md border transition-colors font-medium',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:bg-muted',
                  sizeClasses[size].button
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || isLastPage}
          aria-label="Go to next page"
          className={cn(
            'inline-flex items-center justify-center rounded-md border border-border bg-card transition-colors',
            'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card',
            sizeClasses[size].button
          )}
        >
          <ChevronRight size={16} />
        </button>

        {/* Last page button */}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || isLastPage}
            aria-label="Go to last page"
            className={cn(
              'inline-flex items-center justify-center rounded-md border border-border bg-card transition-colors',
              'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card',
              sizeClasses[size].button
            )}
          >
            <ChevronsRight size={16} />
          </button>
        )}
      </div>

      {/* Page size selector */}
      {showPageSize && onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            disabled={disabled}
            className={cn(
              'rounded-md border border-border bg-card px-2 py-1 text-sm transition-colors',
              'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            aria-label="Items per page"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">per page</span>
        </div>
      )}
    </nav>
  );
});

Pagination.displayName = 'Pagination';
