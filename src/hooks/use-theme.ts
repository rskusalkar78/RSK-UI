import { useCallback, useContext } from 'react';
import { ThemeProviderContext, type Theme } from '../providers/theme-provider';

/**
 * useTheme — Access and control the active theme.
 *
 * Must be used inside a `<ThemeProvider>`.
 *
 * @returns {object}
 *   - `theme`         — User's stored preference: 'light' | 'dark' | 'system'
 *   - `resolvedTheme` — Actual theme applied to DOM: 'light' | 'dark'
 *   - `systemTheme`   — OS color scheme preference: 'light' | 'dark'
 *   - `setTheme`      — Set and persist a theme preference
 *   - `toggleTheme`   — Cycle through light → dark → system
 *
 * @example
 * const { resolvedTheme, toggleTheme } = useTheme();
 * const isDark = resolvedTheme === 'dark';
 */
export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }

  const { theme, setTheme } = context;

  /**
   * Cycle through all three theme modes in order: light → dark → system → light...
   * Useful for a single-button toggle that covers all states.
   */
  const toggleTheme = useCallback(() => {
    const cycle: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = cycle.indexOf(theme);
    const nextTheme = cycle[(currentIndex + 1) % cycle.length];
    setTheme(nextTheme as Theme);
  }, [theme, setTheme]);

  return {
    ...context,
    toggleTheme,
  };
}
