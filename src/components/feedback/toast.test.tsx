import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Toast } from './toast';

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

describe('Toast — Variants', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(['info', 'success', 'warning', 'destructive'] as const)(
    'renders %s variant',
    (variant) => {
      render(<Toast variant={variant} title="Title" description="Desc" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    }
  );

  it.each([
    ['info', 'border-info-300'],
    ['success', 'border-success-300'],
    ['warning', 'border-warning-300'],
    ['destructive', 'border-destructive-300'],
  ] as const)('applies correct style classes for %s variant', (variant, expectedClass) => {
    render(<Toast variant={variant} title="Test" />);
    expect(screen.getByRole('status')).toHaveClass(expectedClass);
  });

  it('uses info as default variant', () => {
    render(<Toast title="Default" />);
    expect(screen.getByRole('status')).toHaveClass('border-info-300');
  });
});

describe('Toast — open prop', () => {
  it('renders when open is true (default)', () => {
    render(<Toast title="Visible" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders when open is explicitly true', () => {
    render(<Toast open title="Visible" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<Toast open={false} title="Hidden" />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

describe('Toast — onClose', () => {
  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast title="Close me" onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when onClose is not provided', () => {
    render(<Toast title="No close" />);
    expect(screen.queryByRole('button', { name: 'Dismiss notification' })).not.toBeInTheDocument();
  });

  it('uses custom closeLabel when provided', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast title="Close" onClose={onClose} closeLabel="Close toast" />);
    const button = screen.getByRole('button', { name: 'Close toast' });
    await user.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Toast — title + description', () => {
  it('renders title when provided', () => {
    render(<Toast title="Toast title" />);
    expect(screen.getByText('Toast title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Toast title="T" description="Toast description" />);
    expect(screen.getByText('Toast description')).toBeInTheDocument();
  });

  it('renders both title and description', () => {
    render(<Toast title="Saved!" description="Your data was saved successfully." />);
    expect(screen.getByText('Saved!')).toBeInTheDocument();
    expect(screen.getByText('Your data was saved successfully.')).toBeInTheDocument();
  });
});

describe('Toast — Accessibility', () => {
  it('has role="status"', () => {
    render(<Toast title="Accessible" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('Toast — forwardRef', () => {
  it('forwards ref to the container div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Toast ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByRole('status'));
  });
});
