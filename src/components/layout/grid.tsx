import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6;
export type GridGap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
export type GridFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
export type GridColSpan = GridCols | 'full';
export type GridRowSpan = GridRows;

/** Responsive column definition — per-breakpoint column counts */
export type ResponsiveCols =
  | GridCols
  | {
      base?: GridCols;
      sm?: GridCols;
      md?: GridCols;
      lg?: GridCols;
      xl?: GridCols;
    };

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns. Accepts a number or a responsive object */
  cols?: ResponsiveCols;
  /** Number of explicit rows */
  rows?: GridRows;
  /** Uniform gap between cells */
  gap?: GridGap;
  /** Column (horizontal) gap only */
  colGap?: GridGap;
  /** Row (vertical) gap only */
  rowGap?: GridGap;
  /** Auto-placement flow direction */
  flow?: GridFlow;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const colsMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const rowsMap: Record<GridRows, string> = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
};

const gapMap: Record<GridGap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
};

const colGapMap: Record<GridGap, string> = {
  '0': 'gap-x-0',
  '1': 'gap-x-1',
  '2': 'gap-x-2',
  '3': 'gap-x-3',
  '4': 'gap-x-4',
  '5': 'gap-x-5',
  '6': 'gap-x-6',
  '8': 'gap-x-8',
  '10': 'gap-x-10',
  '12': 'gap-x-12',
  '16': 'gap-x-16',
};

const rowGapMap: Record<GridGap, string> = {
  '0': 'gap-y-0',
  '1': 'gap-y-1',
  '2': 'gap-y-2',
  '3': 'gap-y-3',
  '4': 'gap-y-4',
  '5': 'gap-y-5',
  '6': 'gap-y-6',
  '8': 'gap-y-8',
  '10': 'gap-y-10',
  '12': 'gap-y-12',
  '16': 'gap-y-16',
};

const flowMap: Record<GridFlow, string> = {
  row: 'grid-flow-row',
  col: 'grid-flow-col',
  dense: 'grid-flow-dense',
  'row-dense': 'grid-flow-row-dense',
  'col-dense': 'grid-flow-col-dense',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveResponsiveCols(cols: ResponsiveCols): string {
  if (typeof cols === 'number') return colsMap[cols];

  const classes: string[] = [];
  if (cols.base != null) classes.push(colsMap[cols.base]);
  if (cols.sm != null) classes.push(`sm:${colsMap[cols.sm]}`);
  if (cols.md != null) classes.push(`md:${colsMap[cols.md]}`);
  if (cols.lg != null) classes.push(`lg:${colsMap[cols.lg]}`);
  if (cols.xl != null) classes.push(`xl:${colsMap[cols.xl]}`);
  return classes.join(' ');
}

// ─── Grid Component ───────────────────────────────────────────────────────────

/**
 * Grid — CSS Grid container with full prop surface.
 *
 * Accepts a flat column count or a responsive object. Compose with `GridItem`
 * to control individual cell placement and spanning.
 *
 * @example
 * // Responsive: 1 col mobile, 2 col tablet, 3 col desktop
 * <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
 *   <GridItem colSpan={2}>Wide card</GridItem>
 *   <GridItem>Narrow card</GridItem>
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { cols = 1, rows, gap, colGap, rowGap, flow, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'grid',
        resolveResponsiveCols(cols),
        rows != null && rowsMap[rows],
        gap != null && gapMap[gap],
        colGap != null && colGapMap[colGap],
        rowGap != null && rowGapMap[rowGap],
        flow != null && flowMap[flow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

// ─── GridItem Types ───────────────────────────────────────────────────────────

const colSpanMap: Record<string, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  full: 'col-span-full',
};

const rowSpanMap: Record<GridRowSpan, string> = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
};

const colStartMap: Record<GridCols, string> = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
};

const rowStartMap: Record<GridRows, string> = {
  1: 'row-start-1',
  2: 'row-start-2',
  3: 'row-start-3',
  4: 'row-start-4',
  5: 'row-start-5',
  6: 'row-start-6',
};

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns this item spans */
  colSpan?: GridColSpan;
  /** Number of rows this item spans */
  rowSpan?: GridRowSpan;
  /** Explicit column start line */
  colStart?: GridCols;
  /** Explicit row start line */
  rowStart?: GridRows;
}

// ─── GridItem Component ───────────────────────────────────────────────────────

/**
 * GridItem — Grid cell with placement and spanning control.
 *
 * Must be a direct child of `Grid`. Exposes `colSpan`, `rowSpan`,
 * `colStart`, and `rowStart` for precise grid placement.
 *
 * @example
 * <GridItem colSpan={2} rowSpan={1}>
 *   Featured card
 * </GridItem>
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { colSpan, rowSpan, colStart, rowStart, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        colSpan != null && colSpanMap[String(colSpan)],
        rowSpan != null && rowSpanMap[rowSpan],
        colStart != null && colStartMap[colStart],
        rowStart != null && rowStartMap[rowStart],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

GridItem.displayName = 'GridItem';
