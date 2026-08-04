import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'normal';
export type FlexGap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: FlexDirection;
  /** Flex wrap behaviour */
  wrap?: FlexWrap;
  /** Gap between children */
  gap?: FlexGap;
  /** Cross-axis alignment */
  align?: FlexAlign;
  /** Main-axis justification */
  justify?: FlexJustify;
  /** Render as `inline-flex` instead of `flex` */
  inline?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const directionStyles: Record<FlexDirection, string> = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

const wrapStyles: Record<FlexWrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const alignStyles: Record<FlexAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyStyles: Record<FlexJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  normal: 'justify-normal',
};

const gapStyles: Record<FlexGap, string> = {
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

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Flex — Full-surface Flexbox container.
 *
 * Exposes every major flexbox property as a typed prop. Prefer `Stack` for
 * simple vertical lists; use `Flex` when you need bi-directional or more
 * complex flex arrangements.
 *
 * @example
 * <Flex direction="row" align="center" justify="between" gap="4">
 *   <Logo />
 *   <NavLinks />
 * </Flex>
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    direction = 'row',
    wrap = 'nowrap',
    gap = '0',
    align = 'stretch',
    justify = 'start',
    inline = false,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        inline ? 'inline-flex' : 'flex',
        directionStyles[direction],
        wrapStyles[wrap],
        gapStyles[gap],
        alignStyles[align],
        justifyStyles[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';
