import { useContext } from 'react';
import { ThemeProviderContext } from '../providers/theme-provider';

/**
 * Access the active theme and function to toggle/update it.
 * Must be used inside a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
