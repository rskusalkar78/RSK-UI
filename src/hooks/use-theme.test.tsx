import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ReactNode } from 'react';
import { useTheme } from './use-theme';
import { ThemeProvider } from '../providers/theme-provider';
import { THEME_STORAGE_KEY } from '../lib/theme-script';

function createMatchMediaMock(matches: boolean = false) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];

  const mediaQueryList: MediaQueryList = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn((_event, listener) => {
      listeners.push(listener as (e: MediaQueryListEvent) => void);
    }),
    removeEventListener: vi.fn((_event, listener) => {
      const idx = listeners.indexOf(listener as (e: MediaQueryListEvent) => void);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    addListener: vi.fn((listener) => {
      listeners.push(listener as (e: MediaQueryListEvent) => void);
    }),
    removeListener: vi.fn((listener) => {
      const idx = listeners.indexOf(listener as (e: MediaQueryListEvent) => void);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    dispatchEvent: () => true,
  };

  return {
    mediaQueryList,
    triggerChange: (newMatches: boolean) => {
      const event = { matches: newMatches } as MediaQueryListEvent;
      listeners.forEach((l) => l(event));
    },
  };
}

describe('useTheme — Outside ThemeProvider', () => {
  it('throws when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a <ThemeProvider>');
  });
});

describe('useTheme — Inside ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns theme, resolvedTheme, systemTheme, setTheme, toggleTheme', () => {
    const { mediaQueryList } = createMatchMediaMock(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
    expect(result.current.systemTheme).toBe('light');
    expect(typeof result.current.setTheme).toBe('function');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('setTheme updates state and localStorage', () => {
    const { mediaQueryList } = createMatchMediaMock(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('toggleTheme cycles light -> dark -> system -> light', () => {
    const { mediaQueryList } = createMatchMediaMock(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('system');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
  });

  it('resolvedTheme responds to setTheme(system) using matchMedia', () => {
    const { mediaQueryList, triggerChange } = createMatchMediaMock(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.systemTheme).toBe('dark');

    act(() => {
      result.current.setTheme('system');
    });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');

    act(() => {
      triggerChange(false);
    });

    expect(result.current.systemTheme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
  });

  it('uses custom storageKey for localStorage', () => {
    const customKey = 'my-custom-theme-key';
    const { mediaQueryList } = createMatchMediaMock(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="light" storageKey={customKey}>
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(localStorage.getItem(customKey)).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();

    act(() => {
      result.current.setTheme('system');
    });

    expect(localStorage.getItem(customKey)).toBe('system');
  });

  it('resolvedTheme follows systemTheme when theme is system and matchMedia changes', () => {
    const { mediaQueryList, triggerChange } = createMatchMediaMock(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('light');

    act(() => {
      triggerChange(true);
    });

    expect(result.current.systemTheme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('applies theme class to document.documentElement', () => {
    const { mediaQueryList } = createMatchMediaMock(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    act(() => {
      result.current.setTheme('dark');
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });
});
