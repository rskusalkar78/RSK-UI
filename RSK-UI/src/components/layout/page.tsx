import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID of the main content element.
   * Used as the target of the skip-to-content link.
   * @default 'main-content'
   */
  skipToContentId?: string;
  /** Header slot — renders inside a `<header>` landmark */
  header?: ReactNode;
  /** Footer slot — renders inside a `<footer>` landmark */
  footer?: ReactNode;
  /** Sidebar slot — renders inside an `<aside>` landmark */
  sidebar?: ReactNode;
  /** Position of the sidebar relative to the main content */
  sidebarPosition?: 'left' | 'right';
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Page — Full-page layout scaffold.
 *
 * Manages the overall page structure with named landmark slots (header, main,
 * footer, aside) and a skip-to-content link for keyboard accessibility.
 * Composes min-h-screen, flex-col, and provides a focus-managed `<main>`.
 *
 * @example
 * <Page
 *   header={<Navbar />}
 *   footer={<Footer />}
 *   sidebar={<Sidebar />}
 *   sidebarPosition="left"
 * >
 *   <Container>Page content</Container>
 * </Page>
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  {
    skipToContentId = 'main-content',
    header,
    footer,
    sidebar,
    sidebarPosition = 'left',
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex min-h-screen flex-col bg-background text-foreground', className)}
      {...props}
    >
      {/* ── Skip-to-content link (screen reader / keyboard users) ── */}
      <a
        href={`#${skipToContentId}`}
        className={cn(
          'sr-only focus-visible:not-sr-only',
          'fixed left-4 top-4 z-[9999]',
          'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
      >
        Skip to content
      </a>

      {/* ── Header ── */}
      {header && <header className="shrink-0">{header}</header>}

      {/* ── Body row: sidebar + main ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        {sidebar && sidebarPosition === 'left' && (
          <aside className="shrink-0 overflow-y-auto">{sidebar}</aside>
        )}

        {/* Main content */}
        <main
          id={skipToContentId}
          className="min-w-0 flex-1 overflow-y-auto focus:outline-none"
          tabIndex={-1}
        >
          {children}
        </main>

        {/* Right sidebar */}
        {sidebar && sidebarPosition === 'right' && (
          <aside className="shrink-0 overflow-y-auto">{sidebar}</aside>
        )}
      </div>

      {/* ── Footer ── */}
      {footer && <footer className="shrink-0">{footer}</footer>}
    </div>
  );
});

Page.displayName = 'Page';
