import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SpacerSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '32'
  | '40'
  | '48'
  | '64';

export type SpacerAxis = 'x' | 'y' | 'both';

export interface SpacerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Uniform spacing size applied to both axes (or per `axis`) */
  size?: SpacerSize;
  /** Explicit horizontal (width) spacing — overrides `size` for x-axis */
  x?: SpacerSize;
  /** Explicit vertical (height) spacing — overrides `size` for y-axis */
  y?: SpacerSize;
  /**
   * Which axis to apply `size` to.
   * @default 'both'
   */
  axis?: SpacerAxis;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const widthMap: Record<SpacerSize, string> = {
  '1': 'w-1',
  '2': 'w-2',
  '3': 'w-3',
  '4': 'w-4',
  '5': 'w-5',
  '6': 'w-6',
  '8': 'w-8',
  '10': 'w-10',
  '12': 'w-12',
  '16': 'w-16',
  '20': 'w-20',
  '24': 'w-24',
  '32': 'w-32',
  '40': 'w-40',
  '48': 'w-48',
  '64': 'w-64',
};

const heightMap: Record<SpacerSize, string> = {
  '1': 'h-1',
  '2': 'h-2',
  '3': 'h-3',
  '4': 'h-4',
  '5': 'h-5',
  '6': 'h-6',
  '8': 'h-8',
  '10': 'h-10',
  '12': 'h-12',
  '16': 'h-16',
  '20': 'h-20',
  '24': 'h-24',
  '32': 'h-32',
  '40': 'h-40',
  '48': 'h-48',
  '64': 'h-64',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Spacer — Invisible aria-hidden spacing element.
 *
 * Inserts empty space between layout elements without requiring margin
 * utilities on siblings. Useful inside `Stack`, `Flex`, or any layout
 * context where explicit whitespace gaps are needed.
 *
 * @example
 * // Vertical spacer of 8 units (2rem)
 * <Spacer size="8" axis="y" />
 *
 * // Horizontal spacer of 4 units
 * <Spacer size="4" axis="x" />
 *
 * // Square spacer using explicit axes
 * <Spacer x="6" y="6" />
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
  { size, x, y, axis = 'both', className, ...props },
  ref
) {
  // Resolve effective dimensions
  const effectiveX = x ?? (axis !== 'y' ? size : undefined);
  const effectiveY = y ?? (axis !== 'x' ? size : undefined);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      role="presentation"
      className={cn(
        'shrink-0',
        effectiveX ? widthMap[effectiveX] : 'w-0',
        effectiveY ? heightMap[effectiveY] : 'h-0',
        className
      )}
      {...props}
    />
  );
});

Spacer.displayName = 'Spacer';
