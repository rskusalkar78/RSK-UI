import { forwardRef, Children, Fragment, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StackGap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between stacked children (design-token step) */
  gap?: StackGap;
  /** Cross-axis (horizontal) alignment of children */
  align?: StackAlign;
  /** Main-axis (vertical) justification of children */
  justify?: StackJustify;
  /** Render a `<hr>` divider between each child */
  dividers?: boolean;
  /** Allow children to wrap to multiple lines */
  wrap?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const gapStyles: Record<StackGap, string> = {
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

const alignStyles: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyStyles: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Stack — Vertical Flexbox column layout with configurable spacing.
 *
 * Optionally renders a `<hr>` divider between each child. Use inside a
 * `Container` or `Section` for content grouping.
 *
 * @example
 * <Stack gap="6" align="start">
 *   <Card />
 *   <Card />
 * </Stack>
 *
 * <Stack gap="4" dividers>
 *   <ListItem />
 *   <ListItem />
 * </Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    gap = '4',
    align = 'stretch',
    justify = 'start',
    dividers = false,
    wrap = false,
    className,
    children,
    ...props
  },
  ref
) {
  const items = Children.toArray(children);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col',
        gapStyles[gap],
        alignStyles[align],
        justifyStyles[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {dividers
        ? items.map((child, i) => (
            <Fragment key={i}>
              {child}
              {i < items.length - 1 && (
                <hr className="w-full border-t border-border" aria-hidden="true" />
              )}
            </Fragment>
          ))
        : children}
    </div>
  );
});

Stack.displayName = 'Stack';
