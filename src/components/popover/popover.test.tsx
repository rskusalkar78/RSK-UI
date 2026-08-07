import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Popover } from './popover';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ref,
      className,
      id,
      role,
      'aria-label': ariaLabel,
      ..._props
    }: React.HTMLAttributes<HTMLDivElement> & {
      ref?: React.Ref<HTMLDivElement>;
      className?: string;
      id?: string;
      role?: string;
      'aria-label'?: string;
    }) => (
      <div ref={ref} className={className} id={id} role={role} aria-label={ariaLabel}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const triggerButton = <button type="button">Toggle</button>;

describe('Popover — Render', () => {
  it('renders the trigger element', () => {
    render(
      <Popover trigger={triggerButton} title="Title">
        Content
      </Popover>
    );
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
  });

  it('does not render the popover content initially', () => {
    render(
      <Popover trigger={triggerButton}>
        <p>Hidden content</p>
      </Popover>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });
});

describe('Popover — Trigger Click Toggle', () => {
  it('opens the popover when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton}>
        <p>Popover content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('closes the popover when trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton}>
        <p>Popover content</p>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });
    await user.click(trigger);
    expect(screen.getByText('Popover content')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });
});

describe('Popover — Title', () => {
  it('renders the title when provided', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton} title="My Popover Title">
        <p>Content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('My Popover Title')).toBeInTheDocument();
  });

  it('sets aria-label on the dialog to the title', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton} title="Accessible Title">
        <p>Content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByRole('dialog', { name: 'Accessible Title' })).toBeInTheDocument();
  });
});

describe('Popover — Outside Click Closes', () => {
  it('closes the popover when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover trigger={triggerButton}>
          <p>Inside content</p>
        </Popover>
        <button type="button" data-testid="outside-btn">
          Outside
        </button>
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Inside content')).toBeInTheDocument();

    await user.click(screen.getByTestId('outside-btn'));
    expect(screen.queryByText('Inside content')).not.toBeInTheDocument();
  });

  it('does not close when clicking inside the popover panel', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton}>
        <button type="button" data-testid="inside-btn">
          Inside
        </button>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByTestId('inside-btn')).toBeInTheDocument();

    await user.click(screen.getByTestId('inside-btn'));
    expect(screen.getByTestId('inside-btn')).toBeInTheDocument();
  });
});

describe('Popover — defaultOpen', () => {
  it('renders the popover open by default when defaultOpen is true', () => {
    render(
      <Popover trigger={triggerButton} defaultOpen>
        <p>Initially open</p>
      </Popover>
    );
    expect(screen.getByText('Initially open')).toBeInTheDocument();
  });

  it('remains closed when defaultOpen is false (default)', () => {
    render(
      <Popover trigger={triggerButton} defaultOpen={false}>
        <p>Initially closed</p>
      </Popover>
    );
    expect(screen.queryByText('Initially closed')).not.toBeInTheDocument();
  });
});

describe('Popover — Controlled / Uncontrolled', () => {
  it('is controlled when open prop is provided (stays closed)', () => {
    render(
      <Popover trigger={triggerButton} open={false}>
        <p>Controlled closed</p>
      </Popover>
    );
    expect(screen.queryByText('Controlled closed')).not.toBeInTheDocument();
  });

  it('is controlled when open prop is provided (stays open)', () => {
    render(
      <Popover trigger={triggerButton} open>
        <p>Controlled open</p>
      </Popover>
    );
    expect(screen.getByText('Controlled open')).toBeInTheDocument();
  });

  it('does not toggle via trigger click when controlled (open=false)', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton} open={false}>
        <p>Should not appear</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
  });

  it('does not toggle via trigger click when controlled (open=true)', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton} open>
        <p>Should stay</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Should stay')).toBeInTheDocument();
  });
});

describe('Popover — Side Variations', () => {
  it.each(['top', 'bottom', 'left', 'right'] as const)(
    'renders with side=%s without crashing',
    async (side) => {
      const user = userEvent.setup();
      render(
        <Popover trigger={triggerButton} side={side} defaultOpen>
          <p>Side: {side}</p>
        </Popover>
      );
      expect(screen.getByText(`Side: ${side}`)).toBeInTheDocument();
    }
  );
});

describe('Popover — onOpenChange Callback', () => {
  it('calls onOpenChange with true when opening via trigger click', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={triggerButton} onOpenChange={onOpenChange}>
        <p>Content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('calls onOpenChange with false when closing via trigger click', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={triggerButton} defaultOpen onOpenChange={onOpenChange}>
        <p>Content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onOpenChange when clicking outside', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <div>
        <Popover trigger={triggerButton} defaultOpen onOpenChange={onOpenChange}>
          <p>Content</p>
        </Popover>
        <button type="button" data-testid="outside">
          Outside
        </button>
      </div>
    );

    await user.click(screen.getByTestId('outside'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onOpenChange even when controlled', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={triggerButton} open={false} onOpenChange={onOpenChange}>
        <p>Content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

describe('Popover — Portal Render', () => {
  it('renders the popover content into document.body via a portal', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover trigger={triggerButton}>
        <p>Portaled content</p>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));

    const content = screen.getByText('Portaled content');
    expect(document.body.contains(content)).toBe(true);
    expect(container.contains(content)).toBe(false);
  });
});

describe('Popover — ARIA Attributes (expanded)', () => {
  it('sets aria-expanded="false" on trigger when closed', () => {
    render(
      <Popover trigger={triggerButton}>
        <p>Content</p>
      </Popover>
    );
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded="true" on trigger when open', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton}>
        <p>Content</p>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-haspopup="dialog" on the trigger', () => {
    render(
      <Popover trigger={triggerButton}>
        <p>Content</p>
      </Popover>
    );
    expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute(
      'aria-haspopup',
      'dialog'
    );
  });

  it('sets aria-controls on trigger matching the dialog id', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={triggerButton}>
        <p>Content</p>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });
    await user.click(trigger);
    const controlsId = trigger.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(screen.getByRole('dialog').id).toBe(controlsId);
  });
});
