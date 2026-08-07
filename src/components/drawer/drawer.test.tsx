import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Drawer } from './drawer';

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

describe('Drawer — Render', () => {
  it('renders nothing when open is false', () => {
    render(
      <Drawer open={false} onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders children when open is true', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Drawer content</p>
      </Drawer>
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('renders as an aside element', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.tagName).toBe('ASIDE');
  });

  it('renders title when provided', () => {
    render(
      <Drawer open onOpenChange={() => undefined} title="Filters">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <Drawer open onOpenChange={() => undefined} description="Adjust your search filters">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByText('Adjust your search filters')).toBeInTheDocument();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('has aria-modal="true"', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});

describe('Drawer — open/close & onOpenChange', () => {
  it('calls onOpenChange(false) when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Drawer>
    );
    await user.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onOpenChange(false) when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Drawer>
    );
    const backdrop = document.querySelector('.bg-black\\/50') as HTMLElement;
    expect(backdrop).toBeInTheDocument();
    await user.click(backdrop);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not call onOpenChange when drawer content is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <button type="button">Inner action</button>
      </Drawer>
    );
    await user.click(screen.getByRole('button', { name: 'Inner action' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});

describe('Drawer — Side (left/right)', () => {
  it('defaults to right side', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    const drawer = screen.getByRole('dialog');
    expect(drawer.className).not.toContain('border-l-0');
    expect(drawer.className).toContain('border-l');
  });

  it('applies left side styles when side="left"', () => {
    render(
      <Drawer open onOpenChange={() => undefined} side="left">
        <p>Content</p>
      </Drawer>
    );
    const drawer = screen.getByRole('dialog');
    expect(drawer.className).toContain('border-l-0');
    expect(drawer.className).toContain('border-r');
  });

  it('uses justify-end flex container (implicitly right side by default)', () => {
    const { container } = render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    const flexContainer = document.querySelector('.flex.justify-end');
    expect(flexContainer).toBeInTheDocument();
    expect(container).toBeDefined();
  });
});

describe('Drawer — Sizes', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders size %s with correct class', (size) => {
    const { container } = render(
      <Drawer open onOpenChange={() => undefined} size={size}>
        <p>Content</p>
      </Drawer>
    );
    const drawer = screen.getByRole('dialog');
    const expectedClass = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    }[size];
    expect(drawer.className).toContain(expectedClass);
    expect(container).toBeDefined();
  });

  it('defaults to size md', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    const drawer = screen.getByRole('dialog');
    expect(drawer.className).toContain('max-w-md');
  });
});

describe('Drawer — Portal rendering', () => {
  it('renders drawer content into document.body via portal', () => {
    const { container } = render(
      <div data-testid="app-root">
        <Drawer open onOpenChange={() => undefined}>
          <p>Portaled drawer content</p>
        </Drawer>
      </div>
    );
    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).not.toContainElement(screen.getByRole('dialog'));
    expect(document.body).toContainElement(screen.getByRole('dialog'));
    expect(container).toBeDefined();
  });
});

describe('Drawer — Escape key close', () => {
  it('calls onOpenChange(false) when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <p>Content</p>
      </Drawer>
    );
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('Drawer — Lock body scroll', () => {
  it('sets body overflow to hidden when open', () => {
    expect(document.body.style.overflow).toBe('');
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow after closing', () => {
    document.body.style.overflow = 'scroll';
    const { rerender } = render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Drawer open={false} onOpenChange={() => undefined}>
        <p>Content</p>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe('scroll');
  });
});

describe('Drawer — Focus', () => {
  it('focuses first focusable element (close button) when opened', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <button type="button">First button</button>
        <button type="button">Second button</button>
      </Drawer>
    );
    expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveFocus();
  });

  it('focuses close button when no other focusable children', () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <p>Just text</p>
      </Drawer>
    );
    expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveFocus();
  });

  it('traps focus forward (Tab) cycling through all focusable elements', async () => {
    const user = userEvent.setup();
    render(
      <Drawer open onOpenChange={() => undefined}>
        <button type="button" data-testid="d-first">
          One
        </button>
        <button type="button" data-testid="d-second">
          Two
        </button>
        <button type="button" data-testid="d-third">
          Three
        </button>
      </Drawer>
    );
    const closeBtn = screen.getByRole('button', { name: 'Close drawer' });
    const first = screen.getByTestId('d-first');
    const second = screen.getByTestId('d-second');
    const third = screen.getByTestId('d-third');
    expect(closeBtn).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
    await user.tab();
    expect(second).toHaveFocus();
    await user.tab();
    expect(third).toHaveFocus();
    await user.tab();
    expect(closeBtn).toHaveFocus();
  });

  it('traps focus backward (Shift+Tab) from close button to last focusable', async () => {
    const user = userEvent.setup();
    render(
      <Drawer open onOpenChange={() => undefined}>
        <button type="button" data-testid="d-a">
          A
        </button>
        <button type="button" data-testid="d-b">
          B
        </button>
      </Drawer>
    );
    const closeBtn = screen.getByRole('button', { name: 'Close drawer' });
    const a = screen.getByTestId('d-a');
    const b = screen.getByTestId('d-b');
    expect(closeBtn).toHaveFocus();
    await user.tab({ shift: true });
    expect(b).toHaveFocus();
    await user.tab({ shift: true });
    expect(a).toHaveFocus();
    await user.tab({ shift: true });
    expect(closeBtn).toHaveFocus();
  });
});

describe('Drawer — className merging', () => {
  it('merges custom className on the drawer container', () => {
    render(
      <Drawer open onOpenChange={() => undefined} className="my-drawer-class">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('my-drawer-class');
  });
});
