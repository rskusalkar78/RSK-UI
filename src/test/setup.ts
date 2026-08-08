import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia for jsdom
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
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

// Mock MediaQueryListEvent for jsdom
if (typeof window !== 'undefined' && !window.MediaQueryListEvent) {
  class MediaQueryListEvent extends Event {
    matches: boolean;
    media: string;
    constructor(type: string, eventInitDict?: { matches?: boolean; media?: string }) {
      super(type, eventInitDict);
      this.matches = eventInitDict?.matches ?? false;
      this.media = eventInitDict?.media ?? '';
    }
  }
  (window as any).MediaQueryListEvent = MediaQueryListEvent;
}

// Mock ResizeObserver
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Mock IntersectionObserver
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

// Mock scrollTo
if (typeof window !== 'undefined' && !window.scrollTo) {
  window.scrollTo = vi.fn();
}
