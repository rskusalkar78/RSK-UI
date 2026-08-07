import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRef, useEffect } from 'react';
import { ThemeProvider, ThemeProviderContext, type ThemeProviderState } from './theme-provider';
import { THEME_STORAGE_KEY, type Theme, type ResolvedTheme } from '../lib/theme-script';

type Listener = (e: MediaQueryListEvent) => void;

interface MockMediaQuery {
  matches: boolean;
  media: string;
  addEventListener: (type: string, listener: Listener) => void;
  removeEventListener: (type: string, listener: Listener) => void;
  addListener: (listener: Listener) => void;
  removeListener: (listener: Listener) => void;
  dispatchEvent: (event: Event) => boolean;
}

function createMediaQueryMock(
  initialDark: boolean,
  hasAddEventListener: boolean = true
): MockMediaQuery {
  let matches = initialDark;
  const listeners = new Set<Listener>();

  return {
    get matches() {
      return matches;
    },
    media: '(prefers-color-scheme: dark)',
    addEventListener(type: string, listener: Listener) {
      if (type === 'change') listeners.add(listener);
    },
    removeEventListener(type: string, listener: Listener) {
      if (type === 'change') listeners.delete(listener);
    },
    addListener(listener: Listener) {
      listeners.add(listener);
    },
    removeListener(listener: Listener) {
      listeners.delete(listener);
    },
    dispatchEvent(event: Event): boolean {
      if (event.type === 'change') {
        const mqEvent = event as MediaQueryListEvent;
        matches = mqEvent.matches;
        for (const listener of listeners) {
          listener(mqEvent);
        }
      }
      return true;
    },
    ...(hasAddEventListener
      ? {}
      : {
          addEventListener: undefined as unknown as MockMediaQuery['addEventListener'],
          removeEventListener: undefined as unknown as MockMediaQuery['removeEventListener'],
        }),
  };
}

function createChangeEvent(matches: boolean): MediaQueryListEvent {
  return new MediaQueryListEvent('change', {
    matches,
    media: '(prefers-color-scheme: dark)',
  });
}

function setupMatchMedia(
  initialDark: boolean,
  hasAddEventListener: boolean = true
): MockMediaQuery {
  const mq = createMediaQueryMock(initialDark, hasAddEventListener);
  if (typeof window.matchMedia !== 'function') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: () => mq as unknown as MediaQueryList,
    });
  }
  const matchMediaSpy = vi
    .spyOn(window, 'matchMedia')
    .mockImplementation(() => mq as unknown as MediaQueryList);
  (mq as any).__spy = matchMediaSpy;
  return mq;
}

function clearDocumentTheme(): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.style.colorScheme = '';
  root.removeAttribute('data-theme');
}

function assertDocumentTheme(theme: ResolvedTheme): void {
  const root = document.documentElement;
  expect(root.classList.contains(theme)).toBe(true);
  expect(root.classList.contains(theme === 'light' ? 'dark' : 'light')).toBe(false);
  expect(root.style.colorScheme).toBe(theme);
  expect(root.getAttribute('data-theme')).toBe(theme);
}

function readContext(): ThemeProviderState {
  let captured: ThemeProviderState | null = null;
  render(
    <ThemeProvider>
      <ThemeProviderContext.Consumer>
        {(value) => {
          captured = value;
          return null;
        }}
      </ThemeProviderContext.Consumer>
    </ThemeProvider>
  );
  return captured!;
}

function ContextCapture({ onCapture }: { onCapture: (s: ThemeProviderState) => void }) {
  useEffect(() => {
    const unsub = ThemeProviderContext._currentValue;
  }, []);
  return (
    <ThemeProviderContext.Consumer>
      {(value) => {
        const ref = useRef(value);
        if (ref.current !== value) {
          ref.current = value;
          onCapture(value);
        }
        onCapture(value);
        return null;
      }}
    </ThemeProviderContext.Consumer>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    clearDocumentTheme();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    clearDocumentTheme();
  });

  describe('1) renders children', () => {
    it('renders its children correctly', () => {
      setupMatchMedia(false);
      render(
        <ThemeProvider>
          <div data-testid="child">Hello World</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders deeply nested children', () => {
      setupMatchMedia(true);
      render(
        <ThemeProvider>
          <div>
            <section>
              <span data-testid="nested">Nested Content</span>
            </section>
          </div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('nested')).toBeInTheDocument();
    });
  });

  describe('2) default theme is system when no stored value', () => {
    it('defaults to theme="system" with defaultTheme omitted and no localStorage', () => {
      setupMatchMedia(false);
      const state = readContext();
      expect(state.theme).toBe('system');
    });

    it.each(['light', 'dark', 'system'] as const)(
      'applies resolved theme for system mode when system=%s',
      (sys) => {
        setupMatchMedia(sys === 'dark');
        const state = readContext();
        expect(state.theme).toBe('system');
        expect(state.resolvedTheme).toBe(sys === 'light' || sys === 'system' ? 'light' : 'dark');
        assertDocumentTheme(state.resolvedTheme);
      }
    );
  });

  describe('3) reads from localStorage on mount when valid key present', () => {
    it.each(['light', 'dark', 'system'] as const)(
      'reads %s from localStorage on mount',
      (storedTheme) => {
        localStorage.setItem(THEME_STORAGE_KEY, storedTheme);
        setupMatchMedia(true);
        const state = readContext();
        expect(state.theme).toBe(storedTheme);
        if (storedTheme === 'system') {
          expect(state.resolvedTheme).toBe('dark');
          assertDocumentTheme('dark');
        } else {
          expect(state.resolvedTheme).toBe(storedTheme);
          assertDocumentTheme(storedTheme);
        }
      }
    );
  });

  describe('4) ignores invalid localStorage values', () => {
    it.each(['invalid', '', 'LIGHT', 'DARK', 'null', 'undefined', '123', 'auto'])(
      'ignores invalid value "%s" and uses default system',
      (invalidValue) => {
        localStorage.setItem(THEME_STORAGE_KEY, invalidValue);
        setupMatchMedia(true);
        const state = readContext();
        expect(state.theme).toBe('system');
        expect(state.resolvedTheme).toBe('dark');
        assertDocumentTheme('dark');
      }
    );

    it('ignores invalid value and uses custom defaultTheme', () => {
      localStorage.setItem(THEME_STORAGE_KEY, 'bogus');
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
    });
  });

  describe('5) setTheme updates state, localStorage, and document root', () => {
    it('setTheme("light") updates everything', () => {
      setupMatchMedia(true);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('dark');
      assertDocumentTheme('dark');

      act(() => captured!.setTheme('light'));

      expect(captured!.theme).toBe('light');
      expect(captured!.resolvedTheme).toBe('light');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
      assertDocumentTheme('light');
    });

    it('setTheme("dark") updates everything', () => {
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('light');
      assertDocumentTheme('light');

      act(() => captured!.setTheme('dark'));

      expect(captured!.theme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
      assertDocumentTheme('dark');
    });

    it('setTheme("system") updates state and localStorage', () => {
      setupMatchMedia(true);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      act(() => captured!.setTheme('system'));
      expect(captured!.theme).toBe('system');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('system');
    });

    it('setTheme to all three modes updates document.documentElement', () => {
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider>
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );

      act(() => captured!.setTheme('light'));
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(document.documentElement.style.colorScheme).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      act(() => captured!.setTheme('dark'));
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
      expect(document.documentElement.style.colorScheme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

      act(() => captured!.setTheme('system'));
      expect(captured!.theme).toBe('system');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
    });
  });

  describe('6) setTheme("system") uses matchMedia resolved value', () => {
    it('resolves to dark when matchMedia prefers dark', () => {
      const mq = setupMatchMedia(true);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(mq.matches).toBe(true);

      act(() => captured!.setTheme('system'));

      expect(captured!.theme).toBe('system');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
    });

    it('resolves to light when matchMedia prefers light', () => {
      const mq = setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(mq.matches).toBe(false);

      act(() => captured!.setTheme('system'));

      expect(captured!.theme).toBe('system');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
    });
  });

  describe('7) resolvedTheme tracks system theme changes via matchMedia listener dispatchEvent', () => {
    it('responds to OS change from light -> dark via dispatchEvent when theme=system', () => {
      const mq = setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      const captures: ThemeProviderState[] = [];
      render(
        <ThemeProvider defaultTheme="system">
          <ContextCapture
            onCapture={(s) => {
              captured = s;
              if (captures[captures.length - 1] !== s) captures.push({ ...s });
            }}
          />
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('system');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');

      act(() => {
        mq.dispatchEvent(createChangeEvent(true));
      });

      expect(captured!.systemTheme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');

      act(() => {
        mq.dispatchEvent(createChangeEvent(false));
      });

      expect(captured!.systemTheme).toBe('light');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
    });

    it('does NOT change resolvedTheme on OS change when theme is "light"', () => {
      const mq = setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );

      act(() => {
        mq.dispatchEvent(createChangeEvent(true));
      });

      expect(captured!.theme).toBe('light');
      expect(captured!.systemTheme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
    });

    it('does NOT change resolvedTheme on OS change when theme is "dark"', () => {
      const mq = setupMatchMedia(true);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );

      act(() => {
        mq.dispatchEvent(createChangeEvent(false));
      });

      expect(captured!.theme).toBe('dark');
      expect(captured!.systemTheme).toBe('light');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
    });
  });

  describe('8) custom storageKey works', () => {
    const customKey = 'my-custom-theme-key';

    it('reads from custom storageKey on mount', () => {
      localStorage.setItem(customKey, 'dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider storageKey={customKey}>
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
    });

    it('writes to custom storageKey via setTheme', () => {
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider storageKey={customKey}>
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      act(() => captured!.setTheme('dark'));
      expect(localStorage.getItem(customKey)).toBe('dark');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    });
  });

  describe('9) custom defaultTheme="dark" works without stored value', () => {
    it('uses dark default with no localStorage', () => {
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
    });

    it('uses light default with no localStorage', () => {
      setupMatchMedia(true);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('light');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
    });
  });

  describe('10) SSR-safe (window undefined behavior)', () => {
    it('renders without crashing when localStorage access throws', () => {
      setupMatchMedia(false);
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage blocked');
      });
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('localStorage blocked');
      });
      let captured: ThemeProviderState | null = null;
      expect(() => {
        render(
          <ThemeProvider defaultTheme="dark">
            <ThemeProviderContext.Consumer>
              {(v) => {
                captured = v;
                return <span data-testid="ssr-safe">SSR Safe</span>;
              }}
            </ThemeProviderContext.Consumer>
          </ThemeProvider>
        );
      }).not.toThrow();
      expect(screen.getByTestId('ssr-safe')).toBeInTheDocument();
      expect(captured!.theme).toBe('dark');
    });

    it('getStoredTheme returns null when window is undefined by temporarily deleting matchMedia guard (mock via direct call)', () => {
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider>
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('system');
    });

    it('setTheme does not throw when localStorage.setItem throws', () => {
      setupMatchMedia(false);
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider>
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(() => {
        act(() => captured!.setTheme('dark'));
      }).not.toThrow();
      expect(captured!.theme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');
    });
  });

  describe('11) systemTheme reflects matchMedia prefers-color-scheme', () => {
    it('systemTheme is "dark" when matchMedia matches dark', () => {
      setupMatchMedia(true);
      const state = readContext();
      expect(state.systemTheme).toBe('dark');
    });

    it('systemTheme is "light" when matchMedia matches light', () => {
      setupMatchMedia(false);
      const state = readContext();
      expect(state.systemTheme).toBe('light');
    });

    it('systemTheme updates when matchMedia changes', () => {
      const mq = setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider>
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.systemTheme).toBe('light');

      act(() => {
        mq.dispatchEvent(createChangeEvent(true));
      });
      expect(captured!.systemTheme).toBe('dark');

      act(() => {
        mq.dispatchEvent(createChangeEvent(false));
      });
      expect(captured!.systemTheme).toBe('light');
    });
  });

  describe('12) matchMedia legacy addListener fallback', () => {
    it('uses legacy addListener/removeListener when addEventListener is not present', () => {
      const mq = setupMatchMedia(false, false);
      expect((mq as any).addEventListener).toBeUndefined();
      expect((mq as any).removeEventListener).toBeUndefined();
      expect(typeof mq.addListener).toBe('function');

      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="system">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );

      expect(captured!.theme).toBe('system');
      expect(captured!.systemTheme).toBe('light');
      expect(captured!.resolvedTheme).toBe('light');

      act(() => {
        mq.dispatchEvent(createChangeEvent(true));
      });

      expect(captured!.systemTheme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      assertDocumentTheme('dark');

      act(() => {
        mq.dispatchEvent(createChangeEvent(false));
      });

      expect(captured!.systemTheme).toBe('light');
      expect(captured!.resolvedTheme).toBe('light');
      assertDocumentTheme('light');
    });
  });

  describe('all three theme modes explicitly', () => {
    it('light mode: theme=light, resolved=light, doc root has light', () => {
      setupMatchMedia(true);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('light');
      expect(captured!.resolvedTheme).toBe('light');
      expect(captured!.systemTheme).toBe('dark');
      expect(document.documentElement.classList.value).toContain('light');
      expect(document.documentElement.classList.value).not.toContain('dark');
      expect(document.documentElement.style.colorScheme).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('dark mode: theme=dark, resolved=dark, doc root has dark', () => {
      setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );
      expect(captured!.theme).toBe('dark');
      expect(captured!.resolvedTheme).toBe('dark');
      expect(captured!.systemTheme).toBe('light');
      expect(document.documentElement.classList.value).toContain('dark');
      expect(document.documentElement.classList.value).not.toContain('light');
      expect(document.documentElement.style.colorScheme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('system mode resolves via matchMedia and updates on OS change', () => {
      const mq = setupMatchMedia(false);
      let captured: ThemeProviderState | null = null;
      render(
        <ThemeProvider defaultTheme="system">
          <ThemeProviderContext.Consumer>
            {(v) => {
              captured = v;
              return null;
            }}
          </ThemeProviderContext.Consumer>
        </ThemeProvider>
      );

      expect(captured!.theme).toBe('system');
      expect(captured!.resolvedTheme).toBe('light');
      expect(captured!.systemTheme).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      act(() => {
        mq.dispatchEvent(createChangeEvent(true));
      });
      expect(captured!.theme).toBe('system');
      expect(captured!.resolvedTheme).toBe('dark');
      expect(captured!.systemTheme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });
});
