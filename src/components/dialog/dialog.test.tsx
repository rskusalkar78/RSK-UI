import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dialog } from './dialog';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const { initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...rest } =
        props;
      return <div {...(rest as Record<string, unknown>)}>{children}</div>;
    },
    aside: ({ children, ...props }: Record<string, unknown>) => {
      const { initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...rest } =
        props;
      return <aside {...(rest as Record<string, unknown>)}>{children}</aside>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

beforeEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

describe('Dialog — Render', () => {
  it('renders nothing when open is false', () => {
    render(
      <Dialog open={false} onOpenChange={() => undefined}>
        <p>Content</p>
      </Dialog>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders children when open is true', () => {
    render(
      <Dialog open onOpenChange={() => undefined}>
        <p>Dialog content</p>
      </Dialog>
    );
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Dialog open onOpenChange={() => undefined} title="Confirm action">
        <p>Content</p>
      </Dialog>
    );
    expect(screen.getByRole('heading', { name: 'Confirm action' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Confirm action' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <Dialog open onOpenChange={() => undefined} description="This action is permanent.">
        <p>Content</p>
      </Dialog>
    );
    expect(screen.getByText('This action is permanent.')).toBeInTheDocument();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('renders with role="dialog" (not alertdialog)', () => {
    render(
      <Dialog open onOpenChange={() => undefined} title="Title">
        <p>Content</p>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(
      <Dialog open onOpenChange={() => undefined}>
        <p>Content</p>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});

describe('Dialog — open/close & onOpenChange', () => {
  it('calls onOpenChange(false) when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Dialog>
    );
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onOpenChange(false) when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Dialog>
    );
    const backdrop = document.querySelector('.bg-black\\/60') as HTMLElement;
    expect(backdrop).toBeInTheDocument();
    await user.click(backdrop);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('Dialog — Sizes', () => {
  it.each(['sm', 'md', 'lg', 'full'] as const)('renders size %s with correct class', (size) => {
    const { container } = render(
      <Dialog open onOpenChange={() => undefined} size={size}>
        <p>Content</p>
      </Dialog>
    );
    const dialog = screen.getByRole('dialog');
    const expectedClass = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      full: 'w-full',
    }[size];
    expect(dialog.className).toContain(expectedClass);
    expect(container).toBeDefined();
  });

  it('defaults to size md', () => {
    render(
      <Dialog open onOpenChange={() => undefined}>
        <p>Content</p>
      </Dialog>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('max-w-lg');
  });
});

describe('Dialog — Portal rendering', () => {
  it('renders dialog content into document.body via portal', () => {
    const { container } = render(
      <div data-testid="app-root">
        <Dialog open onOpenChange={() => undefined}>
          <p>Portaled content</p>
        </Dialog>
      </div>
    );
    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).not.toContainElement(screen.getByRole('dialog'));
    expect(document.body).toContainElement(screen.getByRole('dialog'));
    expect(container).toBeDefined();
  });
});

describe('Dialog — Escape key close', () => {
  it('calls onOpenChange(false) when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Dialog>
    );
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('Dialog — Lock body scroll', () => {
  it('sets body overflow to hidden when open', () => {
    expect(document.body.style.overflow).toBe('');
    render(
      <Dialog open onOpenChange={() => undefined}>
        <p>Content</p>
      </Dialog>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow after closing', () => {
    document.body.style.overflow = 'auto';
    const { rerender } = render(
      <Dialog open onOpenChange={() => undefined}>
        <p>Content</p>
      </Dialog>
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Dialog open={false} onOpenChange={() => undefined}>
        <p>Content</p>
      </Dialog>
    );
    expect(document.body.style.overflow).toBe('auto');
  });
});

describe('Dialog — Focus', () => {
  it('focuses first focusable element (close button) when opened', () => {
    render(
      <Dialog open onOpenChange={() => undefined}>
        <button type="button">First</button>
        <button type="button">Second</button>
      </Dialog>
    );
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();
  });

  it('traps focus forward (Tab) cycling through all focusable elements', async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onOpenChange={() => undefined}>
        <button type="button" data-testid="first">
          A
        </button>
        <button type="button" data-testid="second">
          B
        </button>
      </Dialog>
    );
    const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
    const first = screen.getByTestId('first');
    const second = screen.getByTestId('second');
    expect(closeBtn).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
    await user.tab();
    expect(second).toHaveFocus();
    await user.tab();
    expect(closeBtn).toHaveFocus();
  });
});

describe('Dialog — className merging', () => {
  it('merges custom className on the dialog container', () => {
    render(
      <Dialog open onOpenChange={() => undefined} className="custom-dialog">
        <p>Content</p>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-dialog');
  });

  it('merges contentClassName on the content wrapper', () => {
    const { container } = render(
      <Dialog open onOpenChange={() => undefined} contentClassName="custom-content">
        <p>Content</p>
      </Dialog>
    );
    const contentWrapper = document.querySelector('.custom-content');
    expect(contentWrapper).toBeInTheDocument();
    expect(container).toBeDefined();
  });
});
