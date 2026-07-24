import React, { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '../src/providers/theme-provider';
import { useTheme } from '../src/hooks/use-theme';
import '../src/styles/globals.css';

// ─── Theme Sync Decorator ─────────────────────────────────────────────────────

/**
 * Inner component that syncs the Storybook toolbar `theme` global
 * into the ThemeProvider context. Must be rendered inside ThemeProvider.
 */
function ThemeSync({
  children,
  storybookTheme,
}: {
  children: React.ReactNode;
  storybookTheme: string;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (storybookTheme === 'light' || storybookTheme === 'dark' || storybookTheme === 'system') {
      setTheme(storybookTheme);
    }
  }, [storybookTheme, setTheme]);

  return <>{children}</>;
}

/**
 * Global decorator: wraps every story in ThemeProvider and syncs the
 * Storybook toolbar theme control with the live ThemeProvider.
 */
const withThemeProvider: Decorator = (Story, context) => {
  const storybookTheme = (context.globals.theme as string) ?? 'system';

  return (
    <ThemeProvider>
      <ThemeSync storybookTheme={storybookTheme}>
        <Story />
      </ThemeSync>
    </ThemeProvider>
  );
};

// ─── Preview Config ───────────────────────────────────────────────────────────

const preview: Preview = {
  // Global toolbar controls available in every story
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: '☀️  Light', right: 'Light mode' },
          { value: 'dark', title: '🌙  Dark', right: 'Dark mode' },
          { value: 'system', title: '💻  System', right: 'OS preference' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [withThemeProvider],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Remove the generic backgrounds panel — our ThemeProvider handles this
    backgrounds: { disable: true },
    // Show docs by default
    docs: {
      toc: true,
    },
  },
};

export default preview;
