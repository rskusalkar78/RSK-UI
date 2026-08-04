import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label'
  | 'code'
  | 'overline';

export type TypographyAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'small'
  | 'strong'
  | 'em'
  | 'blockquote'
  | 'code'
  | 'pre'
  | 'abbr';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography scale variant — controls visual appearance */
  variant?: TypographyVariant;
  /** HTML element to render. Defaults to the semantic element for the variant. */
  as?: TypographyAs;
  /** Truncate text to single line with ellipsis */
  truncate?: boolean;
  /** Muted color (secondary text) */
  muted?: boolean;
}

// ─── Default element per variant ─────────────────────────────────────────────

const defaultElement: Record<TypographyVariant, TypographyAs> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'label',
  code: 'code',
  overline: 'span',
};

// ─── Variant styles ───────────────────────────────────────────────────────────

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight leading-tight',
  h2: 'scroll-m-20 text-3xl font-bold tracking-tight leading-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight leading-snug',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight leading-snug',
  h5: 'scroll-m-20 text-lg font-semibold leading-snug',
  h6: 'scroll-m-20 text-base font-semibold leading-normal',

  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
  label: 'text-sm font-medium leading-none',

  code: [
    'relative rounded px-1.5 py-0.5',
    'bg-muted text-foreground',
    'font-mono text-sm',
    'border border-border',
  ].join(' '),

  overline: 'text-xs font-semibold uppercase tracking-widest leading-none',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Typography — Polymorphic text component.
 *
 * Separates visual style (variant) from HTML semantics (as).
 *
 * @example
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="body" muted>Secondary text</Typography>
 * <Typography variant="h2" as="h1">Visually h2, semantically h1</Typography>
 * <Typography variant="code">const x = 1</Typography>
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  { variant = 'body', as, truncate = false, muted = false, className, children, ...props },
  ref
) {
  const Tag = (as ?? defaultElement[variant]) as ElementType;

  return (
    <Tag
      ref={ref}
      className={cn(
        variantStyles[variant],
        truncate && 'truncate',
        muted && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
});

Typography.displayName = 'Typography';
