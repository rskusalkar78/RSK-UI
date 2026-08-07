import { describe, it, expect } from 'vitest';
import { getThemeScript, THEME_STORAGE_KEY, THEME_VALUES, themeScript } from './theme-script';

describe('theme-script — Constants', () => {
  it('THEME_STORAGE_KEY equals "rsk-ui-theme"', () => {
    expect(THEME_STORAGE_KEY).toBe('rsk-ui-theme');
  });

  it('THEME_VALUES contains ["light", "dark", "system"]', () => {
    expect(THEME_VALUES).toEqual(['light', 'dark', 'system']);
  });

  it('THEME_VALUES has exactly 3 entries', () => {
    expect(THEME_VALUES).toHaveLength(3);
  });

  it('themeScript constant is a non-empty string', () => {
    expect(typeof themeScript).toBe('string');
    expect(themeScript.length).toBeGreaterThan(0);
  });
});

describe('getThemeScript — Default arguments', () => {
  it('returns a string containing localStorage.getItem', () => {
    const script = getThemeScript();
    expect(script).toContain('localStorage.getItem');
  });

  it('returns a string containing matchMedia', () => {
    const script = getThemeScript();
    expect(script).toContain('matchMedia');
    expect(script).toContain('prefers-color-scheme');
  });

  it('returns a string containing classList.remove', () => {
    const script = getThemeScript();
    expect(script).toContain('classList.remove');
  });

  it('returns a string containing classList.add', () => {
    const script = getThemeScript();
    expect(script).toContain('classList.add');
  });

  it('removes both "light" and "dark" from classList', () => {
    const script = getThemeScript();
    expect(script).toContain("'light'");
    expect(script).toContain("'dark'");
  });

  it('contains color-scheme style assignment', () => {
    const script = getThemeScript();
    expect(script).toContain('colorScheme');
  });

  it('contains data-theme attribute assignment', () => {
    const script = getThemeScript();
    expect(script).toContain('data-theme');
  });

  it('is wrapped in an IIFE', () => {
    const script = getThemeScript();
    expect(script).toMatch(/^\(function\(\)\{/);
    expect(script).toMatch(/\}\)\(\);$/);
  });

  it('contains try/catch for safety', () => {
    const script = getThemeScript();
    expect(script).toContain('try');
    expect(script).toContain('catch');
  });

  it('includes default storageKey THEME_STORAGE_KEY in output', () => {
    const script = getThemeScript();
    expect(script).toContain('rsk-ui-theme');
  });
});

describe('getThemeScript — Custom storageKey', () => {
  it('custom storageKey appears in the generated script', () => {
    const customKey = 'my-app-theme-key';
    const script = getThemeScript(customKey);
    expect(script).toContain(customKey);
  });

  it('custom storageKey replaces default key', () => {
    const customKey = 'my-unique-key';
    const script = getThemeScript(customKey);
    expect(script).toContain(customKey);
    expect(script).not.toContain('rsk-ui-theme');
  });

  it('custom storageKey is JSON-encoded safely', () => {
    const script = getThemeScript('key with "quotes"');
    expect(script).toContain('key with \\"quotes\\"');
  });
});

describe('getThemeScript — Custom defaultTheme', () => {
  it("defaultTheme 'dark' appears in script when passed", () => {
    const script = getThemeScript(THEME_STORAGE_KEY, 'dark');
    expect(script).toContain('"dark"');
  });

  it("defaultTheme 'light' appears in script when passed", () => {
    const script = getThemeScript(THEME_STORAGE_KEY, 'light');
    expect(script).toContain('"light"');
  });

  it("defaultTheme 'system' appears in script when passed", () => {
    const script = getThemeScript(THEME_STORAGE_KEY, 'system');
    expect(script).toContain('"system"');
  });

  it('falls back to matchMedia when defaultTheme is system', () => {
    const script = getThemeScript(THEME_STORAGE_KEY, 'system');
    expect(script).toContain("'system'");
    expect(script).toContain('prefers-color-scheme: dark');
  });
});

describe('getThemeScript — Script structure', () => {
  it('returns a string (not undefined/null)', () => {
    expect(typeof getThemeScript()).toBe('string');
    expect(getThemeScript()).not.toBeNull();
  });

  it('returns non-empty string for all argument combinations', () => {
    expect(getThemeScript().length).toBeGreaterThan(0);
    expect(getThemeScript('custom').length).toBeGreaterThan(0);
    expect(getThemeScript('custom', 'dark').length).toBeGreaterThan(0);
    expect(getThemeScript(THEME_STORAGE_KEY, 'light').length).toBeGreaterThan(0);
  });

  it('accesses document.documentElement', () => {
    const script = getThemeScript();
    expect(script).toContain('document.documentElement');
  });
});
