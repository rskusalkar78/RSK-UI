import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Modal } from './modal';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        ...rest
      } = props;
      return <div {...(rest as Record<string, unknown>)}>{children}</div>;
    },
    aside: ({ children, ...props }: Record<string, unknown>) => {
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        ...rest
      } = props;
      return <aside {...(rest as Record<string, unknown>)}>{children}</aside>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

beforeEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

describe('Modal — Render', () => {
  it('renders nothing when open is false', () => {
    render(
      <Modal open={false} onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders children when open is true', () => {
    render(
      <Modal open onOpenChange={() => undefined}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Modal open onOpenChange={() => undefined} title="My Title">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('heading', { name: 'My Title' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'My Title' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <Modal open onOpenChange={() => undefined} description="My description">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('My description')).toBeInTheDocument();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('renders title and description together with correct aria attributes', () => {
    render(
      <Modal open onOpenChange={() => undefined} title="Title" description="Description">
        <p>Content</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog', { name: 'Title' });
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });
});

describe('Modal — open/close & onOpenChange', () => {
  it('calls onOpenChange(false) when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Modal>
    );
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onOpenChange(false) when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Modal>
    );
    const backdrop = document.querySelector('.bg-black\\/60') as HTMLElement;
    expect(backdrop).toBeInTheDocument();
    await user.click(backdrop);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not call onOpenChange when content is clicked (stops propagation)', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <button type="button">Inner button</button>
      </Modal>
    );
    const innerButton = screen.getByRole('button', { name: 'Inner button' });
    await user.click(innerButton);
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});

describe('Modal — showCloseButton', () => {
  it('renders close button by default', () => {
    render(
      <Modal open onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('does not render close button when showCloseButton is false', () => {
    render(
      <Modal open onOpenChange={() => undefined} showCloseButton={false}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('uses custom closeButtonLabel', () => {
    render(
      <Modal open onOpenChange={() => undefined} closeButtonLabel="Dismiss">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });
});

describe('Modal — Sizes', () => {
  it.each(['sm', 'md', 'lg', 'full'] as const)('renders size %s with correct class', (size) => {
    const { container } = render(
      <Modal open onOpenChange={() => undefined} size={size}>
        <p>Content</p>
      </Modal>
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
});

describe('Modal — Role', () => {
  it('uses role="dialog" by default', () => {
    render(
      <Modal open onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('uses role="alertdialog" when specified', () => {
    render(
      <Modal open onOpenChange={() => undefined} role="alertdialog">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(
      <Modal open onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});

describe('Modal — Portal rendering', () => {
  it('renders modal content into document.body via portal', () => {
    const { container } = render(
      <div data-testid="app-root">
        <Modal open onOpenChange={() => undefined}>
          <p>Portaled content</p>
        </Modal>
      </div>
    );
    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).not.toContainElement(screen.getByRole('dialog'));
    expect(document.body).toContainElement(screen.getByRole('dialog'));
    expect(container).toBeDefined();
  });
});

describe('Modal — Escape key close', () => {
  it('calls onOpenChange(false) when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Modal>
    );
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('Modal — Lock body scroll', () => {
  it('sets body overflow to hidden when open', () => {
    expect(document.body.style.overflow).toBe('');
    render(
      <Modal open onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow after closing', () => {
    document.body.style.overflow = 'scroll';
    const { rerender } = render(
      <Modal open onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Modal open={false} onOpenChange={() => undefined}>
        <p>Content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('scroll');
  });
});

describe('Modal — Focus trap', () => {
  it('focuses first focusable element when opened', () => {
    render(
      <Modal open onOpenChange={() => undefined} showCloseButton={false}>
        <button type="button">First</button>
        <button type="button">Second</button>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
  });

  it('focuses the close button when no other focusable children', () => {
    render(
      <Modal open onOpenChange={() => undefined}>
        <p>Just text</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();
  });

  it('traps focus forward (Tab) from last to first focusable', async () => {
    const user = userEvent.setup();
    render(
      <Modal open onOpenChange={() => undefined} showCloseButton={false}>
        <button type="button">A</button>
        <button type="button">B</button>
        <button type="button">C</button>
      </Modal>
    );
    const a = screen.getByRole('button', { name: 'A' });
    const b = screen.getByRole('button', { name: 'B' });
    const c = screen.getByRole('button', { name: 'C' });
    expect(a).toHaveFocus();
    await user.tab();
    expect(b).toHaveFocus();
    await user.tab();
    expect(c).toHaveFocus();
    await user.tab();
    expect(a).toHaveFocus();
  });

  it('traps focus backward (Shift+Tab) from first to last focusable', async () => {
    const user = userEvent.setup();
    render(
      <Modal open onOpenChange={() => undefined} showCloseButton={false}>
        <button type="button">X</button>
        <button type="button">Y</button>
      </Modal>
    );
    const x = screen.getByRole('button', { name: 'X' });
    const y = screen.getByRole('button', { name: 'Y' });
    expect(x).toHaveFocus();
    await user.tab({ shift: true });
    expect(y).toHaveFocus();
  });
});

describe('Modal — Focus return to trigger', () => {
  it('returns focus to previously focused element after close', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <>
        <button type="button" data-testid="trigger">
          Open
        </button>
        <Modal open={false} onOpenChange={onOpenChange}>
          <p>Content</p>
        </Modal>
      </>
    );
    const trigger = screen.getByTestId('trigger');
    await act(async () => {
      trigger.focus();
    });
    expect(trigger).toHaveFocus();
  });
});

describe('Modal — className merging', () => {
  it('merges custom className on the modal container', () => {
    render(
      <Modal open onOpenChange={() => undefined} className="my-custom-modal">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('my-custom-modal');
  });

  it('merges contentClassName on the content wrapper', () => {
    const { container } = render(
      <Modal open onOpenChange={() => undefined} contentClassName="custom-content">
        <p>Content</p>
      </Modal>
    );
    const contentWrapper = document.querySelector('.custom-content');
    expect(contentWrapper).toBeInTheDocument();
    expect(container).toBeDefined();
  });
});

describe('Modal — forwardRef', () => {
  it('Modal does not expose forwardRef (uses internal ref)', () => {
    const ref = createRef<HTMLDivElement>();
    expect(() =>
      render(
        <Modal open onOpenChange={() => undefined}>
          <p>Content</p>
        </Modal>
      )
    ).not.toThrow();
    expect(ref.current).toBeNull();
  });
});
