import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import type { ReactElement } from 'react';
import { ThemeToggle } from './theme-toggle';
import { ThemeProvider, type Theme } from '../../providers/theme-provider';

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: () => (props: unknown) => props as ReactElement,
    }
  ),
  AnimatePresence: ({ children }: { children: unknown }) => children,
}));

function createMatchMediaMock(matches: boolean = false): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

beforeAll(() => {
  createMatchMediaMock(false);
});

beforeEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function renderWithTheme(
  ui: ReactElement,
  defaultTheme: Theme = 'light'
): ReturnType<typeof render> {
  return render(
    <ThemeProvider defaultTheme={defaultTheme} storageKey="test-theme">
      {ui}
    </ThemeProvider>
  );
}

describe('ThemeToggle — Icon Variant', () => {
  it('renders with role="switch"', () => {
    renderWithTheme(<ThemeToggle variant="icon" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('sets aria-checked="false" for light theme', () => {
    renderWithTheme(<ThemeToggle variant="icon" />, 'light');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('sets aria-checked="true" for dark theme', () => {
    renderWithTheme(<ThemeToggle variant="icon" />, 'dark');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles between light and dark on click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="icon" />, 'light');
    const btn = screen.getByRole('switch');

    expect(btn).toHaveAttribute('aria-checked', 'false');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-checked', 'true');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-checked', 'false');
  });

  it('shows label text when showLabel is true', () => {
    renderWithTheme(<ThemeToggle variant="icon" showLabel />, 'light');
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('shows dark label text when theme is dark', () => {
    renderWithTheme(<ThemeToggle variant="icon" showLabel />, 'dark');
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('does not show label text when showLabel is false (default)', () => {
    renderWithTheme(<ThemeToggle variant="icon" />, 'light');
    expect(screen.queryByText('Light')).not.toBeInTheDocument();
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
  });
});

describe('ThemeToggle — Cycle Variant', () => {
  it('cycles light -> dark -> system -> light on successive clicks', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="cycle" />, 'light');
    const btn = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(btn).toBeInTheDocument();

    await user.click(btn);
    expect(screen.getByRole('button', { name: /switch to system mode/i })).toBeInTheDocument();

    await user.click(btn);
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();

    await user.click(btn);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });
});

describe('ThemeToggle — Dropdown Variant', () => {
  it('opens menu on click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(btn);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('sets aria-expanded correctly', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes menu on Escape key press', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    await user.click(btn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    menu.focus();
    fireEvent.keyDown(menu, { key: 'Escape', bubbles: true });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes menu on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <span data-testid="outside">Outside</span>
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      </div>
    );
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });
    const outside = screen.getByTestId('outside');

    await user.click(btn);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(outside);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not close menu when clicking inside menu', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    await user.click(btn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    await act(async () => {
      const evt = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      menu.dispatchEvent(evt);
    });
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders Light, Dark, and System menu items', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    await user.click(btn);
    expect(screen.getByRole('menuitem', { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /system/i })).toBeInTheDocument();
  });

  it('selects light theme from menu', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />, 'dark');
    const btn = screen.getByRole('button', { name: /theme: dark\. Click to change/i });

    await user.click(btn);
    await user.click(screen.getByRole('menuitem', { name: /light/i }));
    expect(
      screen.getByRole('button', { name: /theme: light\. Click to change/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('selects dark theme from menu', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />, 'light');
    const btn = screen.getByRole('button', { name: /theme: light\. Click to change/i });

    await user.click(btn);
    await user.click(screen.getByRole('menuitem', { name: /dark/i }));
    expect(
      screen.getByRole('button', { name: /theme: dark\. Click to change/i })
    ).toBeInTheDocument();
  });

  it('selects system theme from menu', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle variant="dropdown" />, 'light');
    const btn = screen.getByRole('button', { name: /theme: light\. Click to change/i });

    await user.click(btn);
    await user.click(screen.getByRole('menuitem', { name: /system/i }));
    expect(
      screen.getByRole('button', { name: /theme: system\. Click to change/i })
    ).toBeInTheDocument();
  });

  it('opens dropdown on ArrowDown and focuses first menuitem', () => {
    vi.useFakeTimers();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    btn.focus();
    fireEvent.keyDown(btn, { key: 'ArrowDown', bubbles: true });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.getByRole('menu')).toBeInTheDocument();
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveFocus();
    vi.useRealTimers();
  });

  it('opens dropdown on Enter key and focuses first menuitem', () => {
    vi.useFakeTimers();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    btn.focus();
    fireEvent.keyDown(btn, { key: 'Enter', bubbles: true });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.getByRole('menu')).toBeInTheDocument();
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveFocus();
    vi.useRealTimers();
  });

  it('opens dropdown on Space key and focuses first menuitem', () => {
    vi.useFakeTimers();
    renderWithTheme(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByRole('button', { name: /theme:.*click to change/i });

    btn.focus();
    fireEvent.keyDown(btn, { key: ' ', bubbles: true });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.getByRole('menu')).toBeInTheDocument();
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveFocus();
    vi.useRealTimers();
  });
});

describe('ThemeToggle — Sizes', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders %s size without crashing', (size) => {
    renderWithTheme(<ThemeToggle variant="icon" size={size} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders cycle variant with %s size', (size) => {
    renderWithTheme(<ThemeToggle variant="cycle" size={size} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders dropdown variant with %s size', (size) => {
    renderWithTheme(<ThemeToggle variant="dropdown" size={size} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('ThemeToggle — className', () => {
  it('merges custom className on icon variant', () => {
    renderWithTheme(<ThemeToggle variant="icon" className="custom-test-class" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-test-class');
  });

  it('merges custom className on cycle variant', () => {
    renderWithTheme(<ThemeToggle variant="cycle" className="cycle-custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('cycle-custom-class');
  });

  it('merges custom className on dropdown variant', () => {
    renderWithTheme(<ThemeToggle variant="dropdown" className="dropdown-custom-class" />);
    const wrapper = screen.getByRole('button', { name: /theme:.*click to change/i }).parentElement;
    expect(wrapper).toHaveClass('dropdown-custom-class');
  });
});
