import { useEffect } from 'react';
import { useTheme } from '../hooks/use-theme';

export function StorybookThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const toolbarTheme = window.localStorage.getItem('storybookjs/preview') ?? '';
    if (toolbarTheme.includes('dark')) setTheme('dark');
    if (toolbarTheme.includes('light')) setTheme('light');
  }, [setTheme]);

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm">
      <span className="text-muted-foreground">Theme:</span>
      <button
        className="rounded-full px-2 py-1 hover:bg-muted"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light' || resolvedTheme === 'light'}
      >
        Light
      </button>
      <button
        className="rounded-full px-2 py-1 hover:bg-muted"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark' || resolvedTheme === 'dark'}
      >
        Dark
      </button>
      <button
        className="rounded-full px-2 py-1 hover:bg-muted"
        onClick={() => setTheme('system')}
        aria-pressed={theme === 'system'}
      >
        System
      </button>
    </div>
  );
}
