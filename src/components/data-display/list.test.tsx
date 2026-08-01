import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { List, ListItem, type ListItemProps } from './list';

// ─── Test Data ────────────────────────────────────────────────────────────────

const mockItems: ListItemProps[] = [
  { id: '1', title: 'Item 1', description: 'Description 1' },
  { id: '2', title: 'Item 2', description: 'Description 2' },
  { id: '3', title: 'Item 3', description: 'Description 3' },
];

// ─── List — Render ────────────────────────────────────────────────────────────

describe('List — Render', () => {
  it('renders list with items', () => {
    render(<List items={mockItems} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders as a <ul> element', () => {
    const { container } = render(<List items={mockItems} />);
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<List items={mockItems} />);
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('renders with children instead of items', () => {
    render(
      <List>
        <ListItem title="Custom Item 1" />
        <ListItem title="Custom Item 2" />
      </List>
    );
    expect(screen.getByText('Custom Item 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Item 2')).toBeInTheDocument();
  });
});

// ─── List — Orientation ──────────────────────────────────────────────────────

describe('List — Orientation', () => {
  it('renders vertical layout by default', () => {
    const { container } = render(<List items={mockItems} />);
    const list = container.querySelector('ul');
    expect(list).not.toHaveClass('flex');
  });

  it('renders horizontal layout', () => {
    const { container } = render(<List items={mockItems} orientation="horizontal" />);
    const list = container.querySelector('ul');
    expect(list).toHaveClass('flex');
  });
});

// ─── List — Dividers ──────────────────────────────────────────────────────────

describe('List — Dividers', () => {
  it('renders dividers when divider is true', () => {
    const { container } = render(<List items={mockItems} divider />);
    const list = container.querySelector('ul');
    expect(list).toHaveClass('divide-y');
  });

  it('does not render dividers by default', () => {
    const { container } = render(<List items={mockItems} />);
    const list = container.querySelector('ul');
    expect(list).not.toHaveClass('divide-y');
  });
});

// ─── List — Spacing ───────────────────────────────────────────────────────────

describe('List — Spacing', () => {
  it('applies comfortable spacing by default', () => {
    const { container } = render(<List items={mockItems} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems[0]).toHaveClass('py-3');
  });

  it('applies compact spacing', () => {
    const { container } = render(<List items={mockItems} spacing="compact" />);
    const listItems = container.querySelectorAll('li');
    expect(listItems[0]).toHaveClass('py-2');
  });
});

// ─── List — Empty State ───────────────────────────────────────────────────────

describe('List — Empty State', () => {
  it('renders empty state when items array is empty', () => {
    render(<List items={[]} />);
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('There are no items to display.')).toBeInTheDocument();
  });

  it('renders empty state when empty prop is true', () => {
    render(<List items={mockItems} empty />);
    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  it('renders custom empty state text', () => {
    render(<List items={[]} emptyTitle="No results" emptyDescription="Try a different search" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try a different search')).toBeInTheDocument();
  });
});

// ─── List — Loading State ─────────────────────────────────────────────────────

describe('List — Loading State', () => {
  it('renders loading state with skeletons', () => {
    const { container } = render(<List items={mockItems} loading />);
    // Should not render actual items
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    // Should have skeleton items
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
  });

  it('renders custom loading count', () => {
    const { container } = render(<List items={mockItems} loading loadingCount={3} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });
});

// ─── List — forwardRef ────────────────────────────────────────────────────────

describe('List — forwardRef', () => {
  it('forwards ref to the ul element', () => {
    const ref = createRef<HTMLUListElement>();
    render(<List ref={ref} items={mockItems} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });
});

// ─── List — className ─────────────────────────────────────────────────────────

describe('List — className', () => {
  it('merges custom className', () => {
    const { container } = render(<List items={mockItems} className="custom-class" />);
    const list = container.querySelector('ul');
    expect(list).toHaveClass('custom-class');
  });
});

// ─── ListItem — Render ────────────────────────────────────────────────────────

describe('ListItem — Render', () => {
  it('renders title', () => {
    render(<ListItem title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ListItem title="Title" description="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    render(<ListItem title="Title" avatar={<div data-testid="avatar">A</div>} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<ListItem title="Title" icon={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<ListItem title="Title" action={<button data-testid="action">Action</button>} />);
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });
});

// ─── ListItem — Interaction ───────────────────────────────────────────────────

describe('ListItem — Interaction', () => {
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ListItem title="Clickable" onClick={handleClick} />);

    await user.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has button role when interactive', () => {
    const handleClick = vi.fn();
    render(<ListItem title="Clickable" onClick={handleClick} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('is keyboard accessible (Enter key)', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ListItem title="Clickable" onClick={handleClick} />);

    const item = screen.getByRole('button');
    item.focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible (Space key)', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ListItem title="Clickable" onClick={handleClick} />);

    const item = screen.getByRole('button');
    item.focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ListItem title="Disabled" onClick={handleClick} disabled />);

    await user.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

// ─── ListItem — States ────────────────────────────────────────────────────────

describe('ListItem — States', () => {
  it('shows selected state', () => {
    const { container } = render(<ListItem title="Selected" selected />);
    const item = container.querySelector('li');
    expect(item).toHaveClass('bg-primary/10');
  });

  it('shows disabled state', () => {
    const { container } = render(<ListItem title="Disabled" disabled onClick={vi.fn()} />);
    const item = container.querySelector('li');
    expect(item).toHaveClass('opacity-50');
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });
});

// ─── ListItem — forwardRef ────────────────────────────────────────────────────

describe('ListItem — forwardRef', () => {
  it('forwards ref to the li element', () => {
    const ref = createRef<HTMLLIElement>();
    render(<ListItem ref={ref} title="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

// ─── ListItem — Accessibility ─────────────────────────────────────────────────

describe('ListItem — Accessibility', () => {
  it('has aria-selected when selected', () => {
    const { container } = render(<ListItem title="Selected" selected onClick={vi.fn()} />);
    const item = container.querySelector('li');
    expect(item).toHaveAttribute('aria-selected', 'true');
  });

  it('has aria-disabled when disabled', () => {
    const { container } = render(<ListItem title="Disabled" disabled onClick={vi.fn()} />);
    const item = container.querySelector('li');
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });

  it('has tabIndex when interactive', () => {
    const { container } = render(<ListItem title="Interactive" onClick={vi.fn()} />);
    const item = container.querySelector('li');
    expect(item).toHaveAttribute('tabIndex', '0');
  });

  it('does not have tabIndex when not interactive', () => {
    const { container } = render(<ListItem title="Static" />);
    const item = container.querySelector('li');
    expect(item).not.toHaveAttribute('tabIndex');
  });
});
