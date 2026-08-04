import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './icon-button';

const TestIcon = () => <svg data-testid="icon" />;

describe('IconButton — Render', () => {
  it('renders without crashing', () => {
    render(<IconButton aria-label="Search" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<IconButton aria-label="Search" icon={<TestIcon />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

describe('IconButton — Accessibility', () => {
  it('has accessible name from aria-label', () => {
    render(<IconButton aria-label="Delete item" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Delete item' })).toBeInTheDocument();
  });
});

describe('IconButton — Variants', () => {
  it.each(['solid', 'outline', 'ghost', 'destructive'] as const)(
    'renders %s variant',
    (variant) => {
      render(<IconButton aria-label="Test" variant={variant} icon={<TestIcon />} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    }
  );
});

describe('IconButton — Sizes', () => {
  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders %s size', (size) => {
    render(<IconButton aria-label="Test" size={size} icon={<TestIcon />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('IconButton — Shapes', () => {
  it.each(['rounded', 'circle', 'square'] as const)('renders %s shape', (shape) => {
    render(<IconButton aria-label="Test" shape={shape} icon={<TestIcon />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('IconButton — Disabled', () => {
  it('is disabled when disabled prop is true', () => {
    render(<IconButton aria-label="Test" disabled icon={<TestIcon />} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<IconButton aria-label="Test" disabled onClick={handleClick} icon={<TestIcon />} />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe('IconButton — Loading', () => {
  it('shows spinner when loading', () => {
    render(<IconButton aria-label="Test" isLoading icon={<TestIcon />} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<IconButton aria-label="Test" isLoading icon={<TestIcon />} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when loading', () => {
    const handleClick = vi.fn();
    render(<IconButton aria-label="Test" isLoading onClick={handleClick} icon={<TestIcon />} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe('IconButton — Keyboard', () => {
  it('is focusable via Tab', async () => {
    const user = userEvent.setup();
    render(<IconButton aria-label="Test" icon={<TestIcon />} />);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('fires onClick on Enter', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<IconButton aria-label="Test" onClick={handleClick} icon={<TestIcon />} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('IconButton — forwardRef', () => {
  it('forwards ref to button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton aria-label="Test" ref={ref} icon={<TestIcon />} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
