import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

// ─── Render ───────────────────────────────────────────────────────────────────

describe('Button — Render', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as a <button> element', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
  });

  it('has type="button" by default', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe('Button — Variants', () => {
  it.each(['solid', 'outline', 'ghost', 'link', 'destructive'] as const)(
    'renders %s variant without crashing',
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    }
  );
});

// ─── Sizes ────────────────────────────────────────────────────────────────────

describe('Button — Sizes', () => {
  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders %s size without crashing', (size) => {
    render(<Button size={size}>Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

// ─── Disabled ─────────────────────────────────────────────────────────────────

describe('Button — Disabled', () => {
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has aria-disabled="true" when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

// ─── Loading ──────────────────────────────────────────────────────────────────

describe('Button — Loading', () => {
  it('renders spinner when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('sets aria-busy when loading', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Submit
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loadingText when provided', () => {
    render(
      <Button isLoading loadingText="Saving…">
        Submit
      </Button>
    );
    expect(screen.getByText('Saving…')).toBeInTheDocument();
  });
});

// ─── Keyboard ─────────────────────────────────────────────────────────────────

describe('Button — Keyboard', () => {
  it('fires onClick on Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick on Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is focusable via Tab', async () => {
    const user = userEvent.setup();
    render(<Button>Focus me</Button>);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });
});

// ─── forwardRef ───────────────────────────────────────────────────────────────

describe('Button — forwardRef', () => {
  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

// ─── className ────────────────────────────────────────────────────────────────

describe('Button — className', () => {
  it('merges custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});

// ─── Icons ────────────────────────────────────────────────────────────────────

describe('Button — Icons', () => {
  it('renders leftIcon', () => {
    render(<Button leftIcon={<span data-testid="left-icon" />}>With icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightIcon', () => {
    render(<Button rightIcon={<span data-testid="right-icon" />}>With icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
