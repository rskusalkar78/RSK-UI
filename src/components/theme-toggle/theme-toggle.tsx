import { useId, useRef, useEffect, useState, type KeyboardEvent } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { cn } from '../../lib/utils';
import type { Theme } from '../../providers/theme-provider';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ThemeToggleVariant = 'icon' | 'cycle' | 'dropdown';
export type ThemeToggleSize = 'sm' | 'md' | 'lg';

export interface ThemeToggleProps {
  /**
   * - `icon`     — Single button, toggles between light ↔ dark only
   * - `cycle`    — Single button, cycles light → dark → system → light…
   * - `dropdown` — Button that opens a menu with explicit Light / Dark / System options
   */
  variant?: ThemeToggleVariant;
  /** Visual size of the toggle button */
  size?: ThemeToggleSize;
  /** Additional CSS classes for the root element */
  className?: string;
  /** Show a text label alongside the icon (icon variant only) */
  showLabel?: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MonitorIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function CheckIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ─── Size Config ──────────────────────────────────────────────────────────────

const sizeConfig = {
  sm: { button: 'h-8 w-8', icon: 14, text: 'text-xs' },
  md: { button: 'h-9 w-9', icon: 16, text: 'text-sm' },
  lg: { button: 'h-10 w-10', icon: 18, text: 'text-base' },
} as const;

// ─── Shared button base styles ────────────────────────────────────────────────

const buttonBase = [
  'relative inline-flex items-center justify-center',
  'rounded-lg border border-border',
  'bg-background text-foreground',
  'cursor-pointer select-none',
  'transition-all duration-150 ease-in-out',
  'hover:bg-muted hover:border-ring/50',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'active:scale-95',
  // Reduced motion: disable scale/animation
  'motion-reduce:transition-none motion-reduce:active:scale-100',
].join(' ');

// ─── Icon Toggle (light ↔ dark only) ─────────────────────────────────────────

function IconToggle({ size, className, showLabel }: Omit<ThemeToggleProps, 'variant'>) {
  const { resolvedTheme, setTheme } = useTheme();
  const cfg = sizeConfig[size ?? 'md'];
  const isDark = resolvedTheme === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(buttonBase, cfg.button, showLabel && 'w-auto gap-2 px-3', className)}
    >
      {/* Icon wrapper — animates on theme change */}
      <span
        className="flex items-center justify-center transition-transform duration-300 ease-spring motion-reduce:transition-none"
        style={{
          transform: isDark ? 'rotate(-20deg) scale(0.95)' : 'rotate(0deg) scale(1)',
        }}
      >
        {isDark ? <MoonIcon size={cfg.icon} /> : <SunIcon size={cfg.icon} />}
      </span>
      {showLabel && (
        <span className={cn(cfg.text, 'font-medium leading-none')} aria-hidden="true">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

// ─── Cycle Toggle (light → dark → system) ────────────────────────────────────

function CycleToggle({ size, className }: Omit<ThemeToggleProps, 'variant'>) {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const cfg = sizeConfig[size ?? 'md'];

  const themeLabels: Record<string, string> = {
    light: 'Switch to dark mode',
    dark: 'Switch to system mode',
    system: 'Switch to light mode',
  };

  const label = themeLabels[theme] ?? 'Toggle theme';

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className={cn(buttonBase, cfg.button, className)}
    >
      <span
        className="flex items-center justify-center transition-all duration-300 ease-spring motion-reduce:transition-none"
        style={{
          transform:
            theme === 'dark'
              ? 'rotate(-15deg)'
              : theme === 'system'
                ? 'rotate(10deg)'
                : 'rotate(0deg)',
        }}
      >
        {theme === 'light' && <SunIcon size={cfg.icon} />}
        {theme === 'dark' && <MoonIcon size={cfg.icon} />}
        {theme === 'system' && (
          <span className="relative">
            <MonitorIcon size={cfg.icon} />
            {/* Small indicator showing resolved system theme */}
            <span
              className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-background"
              style={{ background: resolvedTheme === 'dark' ? '#7c3aed' : '#f59e0b' }}
              aria-hidden="true"
            />
          </span>
        )}
      </span>
    </button>
  );
}

// ─── Dropdown Toggle (explicit menu) ─────────────────────────────────────────

const DROPDOWN_OPTIONS: { value: Theme; label: string; icon: (s: number) => JSX.Element }[] = [
  { value: 'light', label: 'Light', icon: (s) => <SunIcon size={s} /> },
  { value: 'dark', label: 'Dark', icon: (s) => <MoonIcon size={s} /> },
  { value: 'system', label: 'System', icon: (s) => <MonitorIcon size={s} /> },
];

function DropdownToggle({ size, className }: Omit<ThemeToggleProps, 'variant'>) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cfg = sizeConfig[size ?? 'md'];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape, handle arrow key navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      // Focus first menu item after render
      setTimeout(() => {
        const first = menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]');
        first?.focus();
      }, 10);
    }
  };

  const label = `Theme: ${theme}. Click to change`;

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        title={label}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleButtonKeyDown}
        className={cn(buttonBase, cfg.button)}
      >
        <span className="flex items-center justify-center transition-transform duration-200 motion-reduce:transition-none">
          {resolvedTheme === 'dark' ? <MoonIcon size={cfg.icon} /> : <SunIcon size={cfg.icon} />}
        </span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Theme selection"
          onKeyDown={handleKeyDown}
          className={cn(
            'absolute right-0 top-full z-[1500] mt-1.5',
            'min-w-[8rem] overflow-hidden rounded-lg',
            'border border-border bg-card shadow-lg shadow-black/10',
            'dark:shadow-black/40',
            // Enter animation
            'animate-in fade-in-0 zoom-in-95 duration-100',
            // Origin from top-right
            'origin-top-right'
          )}
        >
          <div className="p-1">
            {DROPDOWN_OPTIONS.map(({ value, label: optLabel, icon }) => {
              const isActive = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="menuitem"
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2',
                    cfg.text,
                    'font-medium',
                    'cursor-pointer select-none',
                    'transition-colors duration-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                  )}
                >
                  <span className="flex-shrink-0">{icon(cfg.icon - 2)}</span>
                  <span className="flex-1 text-left">{optLabel}</span>
                  {isActive && (
                    <span className="flex-shrink-0 text-primary">
                      <CheckIcon size={cfg.icon - 4} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * ThemeToggle — Accessible, animated theme switching component.
 *
 * @example
 * // Simple light/dark toggle
 * <ThemeToggle />
 *
 * // Cycle all three modes
 * <ThemeToggle variant="cycle" size="lg" />
 *
 * // Dropdown with explicit choices
 * <ThemeToggle variant="dropdown" />
 */
export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  className,
  showLabel = false,
}: ThemeToggleProps) {
  if (variant === 'cycle') {
    return <CycleToggle size={size} className={className} />;
  }
  if (variant === 'dropdown') {
    return <DropdownToggle size={size} className={className} />;
  }
  return <IconToggle size={size} className={className} showLabel={showLabel} />;
}
