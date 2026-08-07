import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './tooltip';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      id,
      role,
      ..._props
    }: React.HTMLAttributes<HTMLDivElement> & {
      className?: string;
      id?: string;
      role?: string;
    }) => (
      <div className={className} id={id} role={role}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const triggerButton = <button type="button">Trigger</button>;

describe('Tooltip — Render', () => {
  it('renders the trigger element', () => {
    render(<Tooltip content="Tooltip content">{triggerButton}</Tooltip>);
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('does not render the tooltip content initially', () => {
    render(<Tooltip content="Hidden tip">{triggerButton}</Tooltip>);
    expect(screen.queryByText('Hidden tip')).not.toBeInTheDocument();
  });
});

describe('Tooltip — Hover', () => {
  it('shows the tooltip on mouse enter', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Hover tip">{triggerButton}</Tooltip>);

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByText('Hover tip')).toBeInTheDocument();
  });

  it('hides the tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Hover tip">{triggerButton}</Tooltip>);

    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await user.hover(trigger);
    expect(screen.getByText('Hover tip')).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByText('Hover tip')).not.toBeInTheDocument();
  });
});

describe('Tooltip — Focus', () => {
  it('shows the tooltip when trigger receives focus', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Focus tip">{triggerButton}</Tooltip>);

    await user.tab();
    expect(screen.getByText('Focus tip')).toBeInTheDocument();
  });

  it('hides the tooltip when trigger loses focus (blur)', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Tooltip content="Focus tip">{triggerButton}</Tooltip>
        <button type="button" data-testid="other">
          Other
        </button>
      </div>
    );

    await user.tab();
    expect(screen.getByText('Focus tip')).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByText('Focus tip')).not.toBeInTheDocument();
  });
});

describe('Tooltip — Escape Key', () => {
  it('closes the tooltip on Escape key press', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Escape tip">{triggerButton}</Tooltip>);

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByText('Escape tip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Escape tip')).not.toBeInTheDocument();
  });

  it('closes the tooltip on Escape when opened via focus', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Focus escape tip">{triggerButton}</Tooltip>);

    await user.tab();
    expect(screen.getByText('Focus escape tip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Focus escape tip')).not.toBeInTheDocument();
  });
});

describe('Tooltip — aria-describedby', () => {
  it('sets aria-describedby on the trigger element', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Aria tip">{triggerButton}</Tooltip>);

    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const describedBy = trigger.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();

    await user.hover(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.id).toBe(describedBy);
  });
});

describe('Tooltip — Portal Render', () => {
  it('renders the tooltip content into document.body via a portal', async () => {
    const user = userEvent.setup();
    const { container } = render(<Tooltip content="Portaled tip">{triggerButton}</Tooltip>);

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));

    const content = screen.getByText('Portaled tip');
    expect(document.body.contains(content)).toBe(true);
    expect(container.contains(content)).toBe(false);
  });
});

describe('Tooltip — Content Render', () => {
  it('renders string content', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Simple string tip">{triggerButton}</Tooltip>);

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByText('Simple string tip')).toBeInTheDocument();
  });

  it('renders JSX content', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip
        content={
          <div>
            <strong>Bold</strong> <em>tip</em>
          </div>
        }
      >
        {triggerButton}
      </Tooltip>
    );

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('tip')).toBeInTheDocument();
  });

  it('renders the tooltip with role="tooltip"', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Role check tip">{triggerButton}</Tooltip>);

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
