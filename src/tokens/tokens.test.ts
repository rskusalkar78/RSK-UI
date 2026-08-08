import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { tokens } from './index';

describe('Design Tokens', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
  });

  it('exports valid token values and structure', () => {
    expect(tokens.color.primary[500]).toBeDefined();
    expect(tokens.fontFamily.sans).toContain('var(--rsk-font-sans');
    expect(tokens.spacing['4']).toBe('var(--rsk-space-4)');
    expect(tokens.borderRadius.md).toBe('var(--rsk-radius-md)');
    expect(tokens.zIndex.modal).toBe('var(--rsk-z-modal)');
  });

  describe('tokens.utils', () => {
    it('getCSSVar retrieves CSS variable value from document', () => {
      document.documentElement.style.setProperty('--rsk-test-var', '#123456');
      // Mock getPropertyValue on getComputedStyle
      const origGetComputedStyle = window.getComputedStyle;
      vi.spyOn(window, 'getComputedStyle').mockImplementation((elt) => {
        const style = origGetComputedStyle(elt);
        return {
          ...style,
          getPropertyValue: (prop: string) => (prop === '--rsk-test-var' ? '#123456' : ''),
        } as any;
      });

      expect(tokens.utils.getCSSVar('--rsk-test-var' as any)).toBe('#123456');
    });

    it('setCSSVar sets CSS variable on document.documentElement', () => {
      tokens.utils.setCSSVar('--rsk-color-primary-500' as any, '#00ff00');
      expect(document.documentElement.style.getPropertyValue('--rsk-color-primary-500')).toBe('#00ff00');
    });

    it('isDarkMode checks for dark class on documentElement', () => {
      expect(tokens.utils.isDarkMode()).toBe(false);
      document.documentElement.classList.add('dark');
      expect(tokens.utils.isDarkMode()).toBe(true);
    });
  });
});
