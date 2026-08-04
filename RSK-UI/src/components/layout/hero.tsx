import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroAlign = 'left' | 'center' | 'right';
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeroGradient = boolean | 'primary' | 'accent' | 'secondary';

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  /** Text alignment for heading content */
  align?: HeroAlign;
  /** Vertical size / padding scale */
  size?: HeroSize;
  /**
   * Background gradient style.
   * - `true` — subtle radial glow from primary and accent
   * - `'primary' | 'accent' | 'secondary'` — directional gradient
   * - `false` — no gradient
   */
  gradient?: HeroGradient;
  /** Small eyebrow label above the heading (e.g. "New in v2.0") */
  eyebrow?: ReactNode;
  /** Primary heading content — typically an `<h1>` */
  heading?: ReactNode;
  /** Supporting subheading / description */
  subheading?: ReactNode;
  /** CTA row — buttons, links, etc. */
  actions?: ReactNode;
  /** Media slot — illustration, screenshot, or video (appears beside text on wide screens) */
  media?: ReactNode;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const alignTextStyles: Record<HeroAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const alignItemsStyles: Record<HeroAlign, string> = {
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
};

const alignActionsStyles: Record<HeroAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const sizeStyles: Record<HeroSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
};

const gradientStyles: Record<string, string> = {
  true: 'bg-gradient-to-br from-primary/10 via-background to-accent/5',
  primary: 'bg-gradient-to-br from-primary/20 via-primary/5 to-background',
  accent: 'bg-gradient-to-br from-accent/20 via-accent/5 to-background',
  secondary: 'bg-gradient-to-br from-secondary/20 via-secondary/5 to-background',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Hero — Above-the-fold section component.
 *
 * Provides named content slots (`eyebrow`, `heading`, `subheading`, `actions`,
 * `media`) with alignment, size, and gradient background controls. When a
 * `media` slot is provided, the layout switches to a two-column design on
 * `lg` and wider viewports.
 *
 * @example
 * <Hero
 *   size="lg"
 *   gradient="primary"
 *   align="center"
 *   eyebrow="Introducing RSK-UI v2"
 *   heading={<h1>Build beautiful interfaces faster</h1>}
 *   subheading="A production-ready design system for React."
 *   actions={
 *     <>
 *       <Button variant="solid">Get started</Button>
 *       <Button variant="outline">View docs</Button>
 *     </>
 *   }
 * />
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    align = 'center',
    size = 'lg',
    gradient = false,
    eyebrow,
    heading,
    subheading,
    actions,
    media,
    className,
    children,
    ...props
  },
  ref
) {
  const hasMedia = Boolean(media);
  const gradientClass = gradient !== false ? gradientStyles[String(gradient)] : '';

  return (
    <section
      ref={ref}
      className={cn('relative w-full overflow-hidden', sizeStyles[size], gradientClass, className)}
      {...props}
    >
      {/* Decorative radial glow — only when gradient is enabled */}
      {gradient !== false && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
      )}

      <div
        className={cn(
          'relative mx-auto flex w-full max-w-screen-xl px-4 sm:px-6 lg:px-8',
          hasMedia
            ? 'flex-col gap-12 lg:flex-row lg:items-center lg:gap-16'
            : cn('flex-col gap-8', alignItemsStyles[align])
        )}
      >
        {/* ── Text content ── */}
        <div
          className={cn(
            'flex flex-col gap-6',
            hasMedia ? 'flex-1' : 'w-full',
            alignItemsStyles[align],
            alignTextStyles[align]
          )}
        >
          {eyebrow && (
            <span
              className={cn(
                'inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1',
                'text-xs font-semibold uppercase tracking-wider text-primary'
              )}
            >
              {eyebrow}
            </span>
          )}

          {heading && (
            <div className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {heading}
            </div>
          )}

          {subheading && (
            <div
              className={cn(
                'text-lg leading-relaxed text-muted-foreground',
                !hasMedia && 'max-w-2xl',
                align === 'center' && !hasMedia && 'mx-auto'
              )}
            >
              {subheading}
            </div>
          )}

          {actions && (
            <div
              className={cn(
                'flex flex-wrap gap-4 pt-2',
                alignActionsStyles[hasMedia ? 'left' : align]
              )}
            >
              {actions}
            </div>
          )}

          {children}
        </div>

        {/* ── Media slot ── */}
        {hasMedia && <div className="flex flex-1 items-center justify-center">{media}</div>}
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
