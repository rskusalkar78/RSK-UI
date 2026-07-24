import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  THEME_STORAGE_KEY,
  THEME_VALUES,
  type Theme,
  type ResolvedTheme,
} from '../lib/theme-script';

// ─── Types ────────────────────────────────────────────────────────────────────

export type { Theme, ResolvedTheme };
export { THEME_VALUES };

export interface ThemeProviderState {
  /** The user's stored theme preference: 'light' | 'dark' | 'system' */
  theme: Theme;
  /** The actual theme currently applied to the DOM: 'light' | 'dark' */
  resolvedTheme: ResolvedTheme;
  /** The OS/system color scheme preference: 'light' | 'dark' */
  systemTheme: ResolvedTheme;
  /** Set the theme preference and persist it to localStorage */
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme if no stored preference found (default: 'system') */
  defaultTheme?: Theme;
  /** localStorage key for persistence (default: 'rsk-ui-theme') */
  storageKey?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Safely read from localStorage (guards against SSR + restricted environments) */
function getStoredTheme(key: string): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(key);
    if (stored && (THEME_VALUES as readonly string[]).includes(stored)) {
      return stored as Theme;
    }
  } catch {
    // localStorage may be blocked (private mode, extensions, etc.)
  }
  return null;
}

/** Safely write to localStorage */
function setStoredTheme(key: string, value: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silently ignore write failures
  }
}

/** Get the current OS color scheme preference */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply a resolved theme class to the document root.
 * Sets: class, color-scheme CSS property, and data-theme attribute.
 */
function applyTheme(resolved: ResolvedTheme): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  root.setAttribute('data-theme', resolved);
}

// ─── Context ──────────────────────────────────────────────────────────────────

const defaultState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: 'light',
  systemTheme: 'light',
  setTheme: () => undefined,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(defaultState);
ThemeProviderContext.displayName = 'ThemeContext';

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * ThemeProvider — Production-ready theme engine for rsk-ui.
 *
 * Features:
 *  - Light / Dark / System preference modes
 *  - Real-time OS preference tracking via matchMedia listener
 *  - Atomic DOM updates (class + color-scheme + data-theme)
 *  - localStorage persistence with safe error handling
 *  - SSR-safe (no window/localStorage access during static render)
 *  - Exposes resolvedTheme so components never need to handle 'system' logic
 *
 * @example
 * <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  // Initialize from localStorage on mount, or fall back to defaultTheme
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme(storageKey) ?? defaultTheme);

  // Track OS preference independently — updated by matchMedia listener
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  // Derived: the theme actually rendered in the DOM
  const resolvedTheme = useMemo<ResolvedTheme>(
    () => (theme === 'system' ? systemTheme : theme),
    [theme, systemTheme]
  );

  // Apply the resolved theme to the DOM whenever it changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for real-time OS preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: ResolvedTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    // Modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Legacy API fallback (Safari < 14)
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Stable setter — persists to localStorage and updates state atomically
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setStoredTheme(storageKey, newTheme);
      setThemeState(newTheme);
    },
    [storageKey]
  );

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      setTheme,
    }),
    [theme, resolvedTheme, systemTheme, setTheme]
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}
