import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadingOverlay } from './loading-overlay';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ref, ...props }: any) => (
        <div ref={ref} {...props}>
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

vi.mock('../spinner/spinner', async () => {
  const actual = await vi.importActual<typeof import('../spinner/spinner')>('../spinner/spinner');
  return {
    ...actual,
    Spinner: ({ className, ...props }: any) => (
      <span data-testid="mocked-spinner" className={className} {...props} />
    ),
  };
});

describe('LoadingOverlay — active vs inactive', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render overlay when active is false (default)', () => {
    render(<LoadingOverlay label="Loading" />);
    expect(screen.queryByRole('status', { name: 'Loading' })).not.toBeInTheDocument();
  });

  it('does not render overlay when active is explicitly false', () => {
    render(<LoadingOverlay active={false} label="Loading" />);
    expect(screen.queryByRole('status', { name: 'Loading' })).not.toBeInTheDocument();
  });

  it('renders overlay when active is true', () => {
    render(<LoadingOverlay active label="Loading data" />);
    expect(screen.getByRole('status', { name: 'Loading data' })).toBeInTheDocument();
  });

  it('renders overlay backdrop div when active', () => {
    render(<LoadingOverlay active />);
    const backdrop = screen.getByRole('status').closest('.absolute.inset-0');
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass('z-10');
    expect(backdrop).toHaveClass('bg-background/70');
  });

  it('does not render backdrop when inactive', () => {
    const { container } = render(<LoadingOverlay />);
    const backdrops = container.querySelectorAll('.absolute.inset-0');
    expect(backdrops).toHaveLength(0);
  });
});

describe('LoadingOverlay — Label', () => {
  it('uses custom label as aria-label and visible text', () => {
    render(<LoadingOverlay active label="Saving your changes" />);
    expect(screen.getByRole('status', { name: 'Saving your changes' })).toBeInTheDocument();
    expect(screen.getByText('Saving your changes')).toBeInTheDocument();
  });

  it('uses default label "Loading..." when none provided', () => {
    render(<LoadingOverlay active />);
    expect(screen.getByRole('status', { name: 'Loading...' })).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('LoadingOverlay — role/status accessibility', () => {
  it('inner status card has role="status"', () => {
    render(<LoadingOverlay active label="Working" />);
    const statusEl = screen.getByRole('status', { name: 'Working' });
    expect(statusEl).toBeInTheDocument();
  });

  it('status card has correct classes for container styling', () => {
    render(<LoadingOverlay active label="Working" />);
    const statusEl = screen.getByRole('status', { name: 'Working' });
    expect(statusEl).toHaveClass('flex');
    expect(statusEl).toHaveClass('items-center');
    expect(statusEl).toHaveClass('gap-3');
    expect(statusEl).toHaveClass('rounded-md');
    expect(statusEl).toHaveClass('shadow-lg');
  });
});

describe('LoadingOverlay — Spinner shows', () => {
  it('renders the Spinner component inside the status card when active', () => {
    render(<LoadingOverlay active label="Loading" />);
    const spinner = screen.getByTestId('mocked-spinner');
    expect(spinner).toBeInTheDocument();
    const statusEl = screen.getByRole('status', { name: 'Loading' });
    expect(statusEl).toContainElement(spinner);
  });

  it('does not render Spinner when overlay is inactive', () => {
    render(<LoadingOverlay active={false} />);
    expect(screen.queryByTestId('mocked-spinner')).not.toBeInTheDocument();
  });
});

describe('LoadingOverlay — Children render', () => {
  it('renders children inside the outer wrapper even when inactive', () => {
    render(
      <LoadingOverlay>
        <div data-testid="child-content">My real content</div>
      </LoadingOverlay>
    );
    const child = screen.getByTestId('child-content');
    expect(child).toBeInTheDocument();
    expect(screen.getByText('My real content')).toBeInTheDocument();
  });

  it('renders children inside the outer wrapper when active', () => {
    render(
      <LoadingOverlay active label="Loading">
        <button data-testid="child-btn">Submit</button>
      </LoadingOverlay>
    );
    expect(screen.getByTestId('child-btn')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <LoadingOverlay>
        <h2 data-testid="h">Header</h2>
        <p data-testid="p">Paragraph</p>
        <button data-testid="b">Go</button>
      </LoadingOverlay>
    );
    expect(screen.getByTestId('h')).toBeInTheDocument();
    expect(screen.getByTestId('p')).toBeInTheDocument();
    expect(screen.getByTestId('b')).toBeInTheDocument();
  });
});

describe('LoadingOverlay — forwardRef + className', () => {
  it('forwards ref to the outer relative wrapper', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <LoadingOverlay ref={ref} active>
        <span>child</span>
      </LoadingOverlay>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('relative');
  });

  it('merges custom className onto the outer relative wrapper', () => {
    const { container } = render(<LoadingOverlay className="my-overlay custom-wrapper" />);
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass('my-overlay');
    expect(firstChild).toHaveClass('custom-wrapper');
    expect(firstChild).toHaveClass('relative');
  });
});
