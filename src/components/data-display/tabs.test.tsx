import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, type Tab } from './tabs';

// ─── Test Data ────────────────────────────────────────────────────────────────

const mockTabs: Tab[] = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

// ─── Render ───────────────────────────────────────────────────────────────────

describe('Tabs — Render', () => {
  it('renders tabs and content', () => {
    render(<Tabs tabs={mockTabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
  });

  it('renders first tab as active by default', () => {
    render(<Tabs tabs={mockTabs} />);
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('renders with icons and badges', () => {
    const tabsWithExtras: Tab[] = [
      {
        id: 'tab1',
        label: 'Tab 1',
        icon: <span>🏠</span>,
        badge: <span>3</span>,
        content: <div>Content</div>,
      },
    ];
    render(<Tabs tabs={tabsWithExtras} />);
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

// ─── Tab Switching ────────────────────────────────────────────────────────────

describe('Tabs — Tab Switching', () => {
  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('calls onChange callback when tab changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Tabs tabs={mockTabs} onChange={handleChange} />);

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('updates aria-selected when switching tabs', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');

    await user.click(tab2);

    expect(tab1).toHaveAttribute('aria-selected', 'false');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
  });
});

// ─── Controlled Mode ──────────────────────────────────────────────────────────

describe('Tabs — Controlled Mode', () => {
  it('respects activeTab prop (controlled)', () => {
    render(<Tabs tabs={mockTabs} activeTab="tab2" />);
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('updates when activeTab prop changes', () => {
    const { rerender } = render(<Tabs tabs={mockTabs} activeTab="tab1" />);
    expect(screen.getByText('Content 1')).toBeVisible();

    rerender(<Tabs tabs={mockTabs} activeTab="tab2" />);
    expect(screen.getByText('Content 2')).toBeVisible();
  });
});

// ─── Uncontrolled Mode ────────────────────────────────────────────────────────

describe('Tabs — Uncontrolled Mode', () => {
  it('uses defaultTab for initial state', () => {
    render(<Tabs tabs={mockTabs} defaultTab="tab2" />);
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('manages internal state when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    expect(screen.getByText('Content 1')).toBeVisible();

    await user.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(screen.getByText('Content 3')).toBeVisible();
  });
});

// ─── Keyboard Navigation ──────────────────────────────────────────────────────

describe('Tabs — Keyboard Navigation', () => {
  it('navigates with Arrow Right (horizontal)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('navigates with Arrow Left (horizontal)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} defaultTab="tab2" />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    tab2.focus();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('wraps around at the end (ArrowRight)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} defaultTab="tab3" />);

    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
    tab3.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('wraps around at the start (ArrowLeft)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Content 3')).toBeVisible();
  });

  it('navigates with Home key', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} defaultTab="tab3" />);

    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
    tab3.focus();

    await user.keyboard('{Home}');
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('navigates with End key', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();

    await user.keyboard('{End}');
    expect(screen.getByText('Content 3')).toBeVisible();
  });

  it('navigates with Arrow Down (vertical)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} orientation="vertical" />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('navigates with Arrow Up (vertical)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} orientation="vertical" defaultTab="tab2" />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    tab2.focus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('Content 1')).toBeVisible();
  });
});

// ─── Disabled Tabs ────────────────────────────────────────────────────────────

describe('Tabs — Disabled Tabs', () => {
  it('renders disabled tabs', () => {
    const tabsWithDisabled: Tab[] = [
      { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ];
    render(<Tabs tabs={tabsWithDisabled} />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    expect(tab2).toHaveAttribute('aria-disabled', 'true');
    expect(tab2).toBeDisabled();
  });

  it('cannot click disabled tabs', async () => {
    const user = userEvent.setup();
    const tabsWithDisabled: Tab[] = [
      { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ];
    render(<Tabs tabs={tabsWithDisabled} />);

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).not.toBeVisible();
  });

  it('skips disabled tabs in keyboard navigation', async () => {
    const user = userEvent.setup();
    const tabsWithDisabled: Tab[] = [
      { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
      { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
    ];
    render(<Tabs tabs={tabsWithDisabled} />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Content 3')).toBeVisible();
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe('Tabs — Variants', () => {
  it('renders line variant', () => {
    const { container } = render(<Tabs tabs={mockTabs} variant="line" />);
    expect(container.querySelector('[role="tablist"]')).toHaveClass('border-b');
  });

  it('renders enclosed variant', () => {
    const { container } = render(<Tabs tabs={mockTabs} variant="enclosed" />);
    expect(container.querySelector('[role="tablist"]')).toHaveClass('border-b');
  });

  it('renders pills variant', () => {
    const { container } = render(<Tabs tabs={mockTabs} variant="pills" />);
    expect(container.querySelector('[role="tablist"]')).toHaveClass('bg-muted/50');
  });
});

// ─── Orientation ──────────────────────────────────────────────────────────────

describe('Tabs — Orientation', () => {
  it('renders horizontal orientation by default', () => {
    const { container } = render(<Tabs tabs={mockTabs} />);
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders vertical orientation', () => {
    const { container } = render(<Tabs tabs={mockTabs} orientation="vertical" />);
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
  });
});

// ─── Lazy Loading ─────────────────────────────────────────────────────────────

describe('Tabs — Lazy Loading', () => {
  it('only renders active tab content when lazy is true', () => {
    render(<Tabs tabs={mockTabs} lazy />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('mounts tab content when visited (lazy mode)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} lazy />);

    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Tab 1' }));
    // Content 2 should still be mounted, just hidden
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('renders all content when lazy is false', () => {
    render(<Tabs tabs={mockTabs} lazy={false} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });
});

// ─── Sizes ────────────────────────────────────────────────────────────────────

describe('Tabs — Sizes', () => {
  it('renders small size', () => {
    const { container } = render(<Tabs tabs={mockTabs} size="sm" />);
    const tab = container.querySelector('[role="tab"]');
    expect(tab).toHaveClass('text-xs');
  });

  it('renders medium size (default)', () => {
    const { container } = render(<Tabs tabs={mockTabs} size="md" />);
    const tab = container.querySelector('[role="tab"]');
    expect(tab).toHaveClass('text-sm');
  });

  it('renders large size', () => {
    const { container } = render(<Tabs tabs={mockTabs} size="lg" />);
    const tab = container.querySelector('[role="tab"]');
    expect(tab).toHaveClass('text-base');
  });
});

// ─── Full Width ───────────────────────────────────────────────────────────────

describe('Tabs — Full Width', () => {
  it('applies full width styling', () => {
    const { container } = render(<Tabs tabs={mockTabs} fullWidth />);
    const tabs = container.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      expect(tab).toHaveClass('flex-1');
    });
  });
});

// ─── forwardRef ───────────────────────────────────────────────────────────────

describe('Tabs — forwardRef', () => {
  it('forwards ref to the wrapper div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Tabs ref={ref} tabs={mockTabs} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('Tabs — Accessibility', () => {
  it('has proper ARIA roles', () => {
    render(<Tabs tabs={mockTabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(3);
  });

  it('connects tabs to panels with aria-controls', () => {
    render(<Tabs tabs={mockTabs} />);
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab1).toHaveAttribute('aria-controls', 'panel-tab1');
  });

  it('sets tabIndex correctly', () => {
    render(<Tabs tabs={mockTabs} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabIndex', '0'); // Active tab
    expect(tabs[1]).toHaveAttribute('tabIndex', '-1'); // Inactive tabs
    expect(tabs[2]).toHaveAttribute('tabIndex', '-1');
  });
});
