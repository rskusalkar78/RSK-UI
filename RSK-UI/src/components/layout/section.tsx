import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SectionBackground = 'none' | 'muted' | 'subtle' | 'emphasis' | 'card';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding scale */
  spacing?: SectionSpacing;
  /** Background color variant (theme-adaptive) */
  background?: SectionBackground;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const spacingStyles: Record<SectionSpacing, string> = {
  none: '',
  xs: 'py-4',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16 md:py-20',
  xl: 'py-20 md:py-24',
  '2xl': 'py-24 md:py-32',
};

const backgroundStyles: Record<SectionBackground, string> = {
  none: '',
  muted: 'bg-muted',
  subtle: 'bg-muted/50',
  emphasis: 'bg-primary/5',
  card: 'bg-card',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Section — Semantic `<section>` block with configurable vertical spacing.
 *
 * Use as the outermost layer for content sections, wrapping a `Container`
 * inside for width control.
 *
 * @example
 * <Section spacing="lg" background="muted" aria-label="Features">
 *   <Container>…</Container>
 * </Section>
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { spacing = 'md', background = 'none', className, children, ...props },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn(spacingStyles[spacing], backgroundStyles[background], className)}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';
