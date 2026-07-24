/**
 * RSK-UI Design Tokens — TypeScript Module
 *
 * Strongly-typed design token constants that mirror the CSS custom properties
 * defined in `tokens.css`. Usable in component logic, style-in-JS, or testing.
 *
 * All values are expressed as their CSS variable references so they stay
 * in sync with the runtime theme (light/dark).
 *
 * @example
 * import { tokens } from 'rsk-ui'
 * // Use in style attribute
 * <div style={{ color: tokens.color.primary[500] }} />
 * // Read CSS var at runtime
 * tokens.utils.getCSSVar('--rsk-color-primary-500')
 */

// ─── Type Definitions ─────────────────────────────────────────────────────────

/** A CSS custom property reference (e.g., `var(--rsk-*)`) */
export type CSSVar = `var(--rsk-${string})`;

/** A raw CSS custom property name (e.g., `--rsk-*`) */
export type CSSVarName = `--rsk-${string}`;

/** Numeric color scale keys */
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** Color palette record with scale values */
export type ColorPalette = Record<ColorScale, string>;

/** Typography font size key */
export type FontSizeKey =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

/** Font weight key */
export type FontWeightKey =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

/** Spacing scale key */
export type SpacingKey =
  | 'px'
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96';

/** Border radius key */
export type RadiusKey = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

/** Shadow key */
export type ShadowKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';

/** Glow shadow color key */
export type GlowKey = 'primary' | 'secondary' | 'accent' | 'success' | 'destructive';

/** Breakpoint key */
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Z-index layer key */
export type ZIndexKey =
  | 'deep'
  | 'base'
  | 'docked'
  | 'dropdown'
  | 'sticky'
  | 'banner'
  | 'overlay'
  | 'modal'
  | 'popover'
  | 'toast'
  | 'tooltip'
  | 'max';

/** Animation duration key */
export type DurationKey =
  'fastest' | 'fast' | 'normal' | 'moderate' | 'slow' | 'slower' | 'slowest' | 'relaxed' | 'long';

/** Animation easing key */
export type EasingKey = 'linear' | 'in' | 'out' | 'in-out' | 'spring' | 'bounce' | 'smooth';

/** Opacity scale key */
export type OpacityKey =
  | '0'
  | '5'
  | '10'
  | '15'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '95'
  | '100';

// ─── Helper: CSS Variable Reference ──────────────────────────────────────────

/** Returns a `var(--rsk-*)` reference string */
const v = (name: string): string => `var(--rsk-${name})`;

// ─── Color Palette ────────────────────────────────────────────────────────────

/** Base color palette — all 11-stop scales as CSS variable references */
export const colorPalette = {
  neutral: {
    50: v('color-neutral-50'),
    100: v('color-neutral-100'),
    200: v('color-neutral-200'),
    300: v('color-neutral-300'),
    400: v('color-neutral-400'),
    500: v('color-neutral-500'),
    600: v('color-neutral-600'),
    700: v('color-neutral-700'),
    800: v('color-neutral-800'),
    900: v('color-neutral-900'),
    950: v('color-neutral-950'),
  },
  primary: {
    50: v('color-primary-50'),
    100: v('color-primary-100'),
    200: v('color-primary-200'),
    300: v('color-primary-300'),
    400: v('color-primary-400'),
    500: v('color-primary-500'),
    600: v('color-primary-600'),
    700: v('color-primary-700'),
    800: v('color-primary-800'),
    900: v('color-primary-900'),
    950: v('color-primary-950'),
  },
  secondary: {
    50: v('color-secondary-50'),
    100: v('color-secondary-100'),
    200: v('color-secondary-200'),
    300: v('color-secondary-300'),
    400: v('color-secondary-400'),
    500: v('color-secondary-500'),
    600: v('color-secondary-600'),
    700: v('color-secondary-700'),
    800: v('color-secondary-800'),
    900: v('color-secondary-900'),
    950: v('color-secondary-950'),
  },
  accent: {
    50: v('color-accent-50'),
    100: v('color-accent-100'),
    200: v('color-accent-200'),
    300: v('color-accent-300'),
    400: v('color-accent-400'),
    500: v('color-accent-500'),
    600: v('color-accent-600'),
    700: v('color-accent-700'),
    800: v('color-accent-800'),
    900: v('color-accent-900'),
    950: v('color-accent-950'),
  },
  destructive: {
    50: v('color-destructive-50'),
    100: v('color-destructive-100'),
    200: v('color-destructive-200'),
    300: v('color-destructive-300'),
    400: v('color-destructive-400'),
    500: v('color-destructive-500'),
    600: v('color-destructive-600'),
    700: v('color-destructive-700'),
    800: v('color-destructive-800'),
    900: v('color-destructive-900'),
    950: v('color-destructive-950'),
  },
  success: {
    50: v('color-success-50'),
    100: v('color-success-100'),
    200: v('color-success-200'),
    300: v('color-success-300'),
    400: v('color-success-400'),
    500: v('color-success-500'),
    600: v('color-success-600'),
    700: v('color-success-700'),
    800: v('color-success-800'),
    900: v('color-success-900'),
    950: v('color-success-950'),
  },
  warning: {
    50: v('color-warning-50'),
    100: v('color-warning-100'),
    200: v('color-warning-200'),
    300: v('color-warning-300'),
    400: v('color-warning-400'),
    500: v('color-warning-500'),
    600: v('color-warning-600'),
    700: v('color-warning-700'),
    800: v('color-warning-800'),
    900: v('color-warning-900'),
    950: v('color-warning-950'),
  },
  info: {
    50: v('color-info-50'),
    100: v('color-info-100'),
    200: v('color-info-200'),
    300: v('color-info-300'),
    400: v('color-info-400'),
    500: v('color-info-500'),
    600: v('color-info-600'),
    700: v('color-info-700'),
    800: v('color-info-800'),
    900: v('color-info-900'),
    950: v('color-info-950'),
  },
} as const satisfies Record<string, ColorPalette>;

/** Semantic colors — auto-adapt between light and dark themes */
export const colorSemantic = {
  bg: {
    base: v('bg-base'),
    subtle: v('bg-subtle'),
    muted: v('bg-muted'),
    emphasis: v('bg-emphasis'),
  },
  surface: {
    base: v('surface-base'),
    raised: v('surface-raised'),
    sunken: v('surface-sunken'),
  },
  text: {
    base: v('text-base'),
    muted: v('text-muted'),
    subtle: v('text-subtle'),
    disabled: v('text-disabled'),
    inverse: v('text-inverse'),
  },
  primary: {
    DEFAULT: v('primary'),
    hover: v('primary-hover'),
    active: v('primary-active'),
    subtle: v('primary-subtle'),
    muted: v('primary-muted'),
    emphasis: v('primary-emphasis'),
    foreground: v('primary-foreground'),
  },
  secondary: {
    DEFAULT: v('secondary'),
    hover: v('secondary-hover'),
    active: v('secondary-active'),
    subtle: v('secondary-subtle'),
    muted: v('secondary-muted'),
    foreground: v('secondary-foreground'),
  },
  accent: {
    DEFAULT: v('accent'),
    hover: v('accent-hover'),
    subtle: v('accent-subtle'),
    muted: v('accent-muted'),
    foreground: v('accent-foreground'),
  },
  destructive: {
    DEFAULT: v('destructive'),
    hover: v('destructive-hover'),
    subtle: v('destructive-subtle'),
    muted: v('destructive-muted'),
    foreground: v('destructive-foreground'),
  },
  success: {
    DEFAULT: v('success'),
    hover: v('success-hover'),
    subtle: v('success-subtle'),
    muted: v('success-muted'),
    foreground: v('success-foreground'),
  },
  warning: {
    DEFAULT: v('warning'),
    hover: v('warning-hover'),
    subtle: v('warning-subtle'),
    muted: v('warning-muted'),
    foreground: v('warning-foreground'),
  },
  info: {
    DEFAULT: v('info'),
    hover: v('info-hover'),
    subtle: v('info-subtle'),
    muted: v('info-muted'),
    foreground: v('info-foreground'),
  },
  border: {
    subtle: v('border-subtle'),
    base: v('border-base'),
    strong: v('border-strong'),
    focus: v('border-focus'),
  },
  input: {
    bg: v('input-bg'),
    border: v('input-border'),
    ring: v('input-ring'),
    text: v('input-text'),
    placeholder: v('input-placeholder'),
  },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

/** Font family tokens */
export const fontFamily = {
  sans: v('font-sans'),
  mono: v('font-mono'),
  display: v('font-display'),
} as const;

/** Font size tokens with CSS variable references */
export const fontSize: Record<FontSizeKey, string> = {
  '2xs': v('text-2xs'),
  xs: v('text-xs'),
  sm: v('text-sm'),
  base: v('text-base'),
  lg: v('text-lg'),
  xl: v('text-xl'),
  '2xl': v('text-2xl'),
  '3xl': v('text-3xl'),
  '4xl': v('text-4xl'),
  '5xl': v('text-5xl'),
  '6xl': v('text-6xl'),
  '7xl': v('text-7xl'),
  '8xl': v('text-8xl'),
  '9xl': v('text-9xl'),
} as const;

/** Raw pixel/rem values for font sizes (for non-CSS contexts) */
export const fontSizeRaw: Record<FontSizeKey, string> = {
  '2xs': '0.625rem',
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
} as const;

/** Line height tokens */
export const lineHeight = {
  none: v('leading-none'),
  tight: v('leading-tight'),
  snug: v('leading-snug'),
  normal: v('leading-normal'),
  relaxed: v('leading-relaxed'),
  loose: v('leading-loose'),
} as const;

/** Letter spacing tokens */
export const letterSpacing = {
  tighter: v('tracking-tighter'),
  tight: v('tracking-tight'),
  normal: v('tracking-normal'),
  wide: v('tracking-wide'),
  wider: v('tracking-wider'),
  widest: v('tracking-widest'),
} as const;

// ─── Font Weights ─────────────────────────────────────────────────────────────

/** Font weight tokens */
export const fontWeight: Record<FontWeightKey, string> = {
  thin: v('font-weight-thin'),
  extralight: v('font-weight-extralight'),
  light: v('font-weight-light'),
  normal: v('font-weight-normal'),
  medium: v('font-weight-medium'),
  semibold: v('font-weight-semibold'),
  bold: v('font-weight-bold'),
  extrabold: v('font-weight-extrabold'),
  black: v('font-weight-black'),
} as const;

/** Raw numeric font weight values */
export const fontWeightRaw: Record<FontWeightKey, number> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

/** Spacing scale tokens (4px grid) */
export const spacing: Record<SpacingKey, string> = {
  px: v('space-px'),
  '0': v('space-0'),
  '0.5': v('space-0-5'),
  '1': v('space-1'),
  '1.5': v('space-1-5'),
  '2': v('space-2'),
  '2.5': v('space-2-5'),
  '3': v('space-3'),
  '3.5': v('space-3-5'),
  '4': v('space-4'),
  '5': v('space-5'),
  '6': v('space-6'),
  '7': v('space-7'),
  '8': v('space-8'),
  '9': v('space-9'),
  '10': v('space-10'),
  '11': v('space-11'),
  '12': v('space-12'),
  '14': v('space-14'),
  '16': v('space-16'),
  '20': v('space-20'),
  '24': v('space-24'),
  '28': v('space-28'),
  '32': v('space-32'),
  '36': v('space-36'),
  '40': v('space-40'),
  '44': v('space-44'),
  '48': v('space-48'),
  '52': v('space-52'),
  '56': v('space-56'),
  '60': v('space-60'),
  '64': v('space-64'),
  '72': v('space-72'),
  '80': v('space-80'),
  '96': v('space-96'),
} as const;

/** Raw rem values for spacing */
export const spacingRaw: Record<SpacingKey, string> = {
  px: '1px',
  '0': '0rem',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

/** Border radius tokens */
export const borderRadius: Record<RadiusKey, string> = {
  none: v('radius-none'),
  xs: v('radius-xs'),
  sm: v('radius-sm'),
  md: v('radius-md'),
  lg: v('radius-lg'),
  xl: v('radius-xl'),
  '2xl': v('radius-2xl'),
  '3xl': v('radius-3xl'),
  '4xl': v('radius-4xl'),
  full: v('radius-full'),
} as const;

/** Raw rem values for border radius */
export const borderRadiusRaw: Record<RadiusKey, string> = {
  none: '0px',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
  full: '9999px',
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

/** Box shadow tokens (theme-adaptive) */
export const shadow: Record<ShadowKey, string> = {
  xs: v('shadow-xs'),
  sm: v('shadow-sm'),
  md: v('shadow-md'),
  lg: v('shadow-lg'),
  xl: v('shadow-xl'),
  '2xl': v('shadow-2xl'),
  inner: v('shadow-inner'),
  none: v('shadow-none'),
} as const;

/** Glow shadow tokens (themed color elevation) */
export const shadowGlow: Record<GlowKey, string> = {
  primary: v('shadow-glow-primary'),
  secondary: v('shadow-glow-secondary'),
  accent: v('shadow-glow-accent'),
  success: v('shadow-glow-success'),
  destructive: v('shadow-glow-destructive'),
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

/** Breakpoint values (mobile-first, used in media queries) */
export const breakpoint: Record<BreakpointKey, string> = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/** Breakpoint media query strings */
export const mediaQuery: Record<BreakpointKey, string> = {
  xs: '(min-width: 320px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────

/** Z-index layer tokens */
export const zIndex: Record<ZIndexKey, string> = {
  deep: v('z-deep'),
  base: v('z-base'),
  docked: v('z-docked'),
  dropdown: v('z-dropdown'),
  sticky: v('z-sticky'),
  banner: v('z-banner'),
  overlay: v('z-overlay'),
  modal: v('z-modal'),
  popover: v('z-popover'),
  toast: v('z-toast'),
  tooltip: v('z-tooltip'),
  max: v('z-max'),
} as const;

/** Raw z-index numeric values */
export const zIndexRaw: Record<ZIndexKey, number> = {
  deep: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1700,
  tooltip: 1800,
  max: 9999,
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

/** Animation duration tokens */
export const duration: Record<DurationKey, string> = {
  fastest: v('duration-fastest'),
  fast: v('duration-fast'),
  normal: v('duration-normal'),
  moderate: v('duration-moderate'),
  slow: v('duration-slow'),
  slower: v('duration-slower'),
  slowest: v('duration-slowest'),
  relaxed: v('duration-relaxed'),
  long: v('duration-long'),
} as const;

/** Raw animation duration values (ms) */
export const durationRaw: Record<DurationKey, number> = {
  fastest: 75,
  fast: 100,
  normal: 150,
  moderate: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
  relaxed: 700,
  long: 1000,
} as const;

/** Animation easing tokens */
export const easing: Record<EasingKey, string> = {
  linear: v('ease-linear'),
  in: v('ease-in'),
  out: v('ease-out'),
  'in-out': v('ease-in-out'),
  spring: v('ease-spring'),
  bounce: v('ease-bounce'),
  smooth: v('ease-smooth'),
} as const;

/** Raw animation easing cubic-bezier values */
export const easingRaw: Record<EasingKey, string> = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

// ─── Opacity ──────────────────────────────────────────────────────────────────

/** Opacity tokens */
export const opacity: Record<OpacityKey, string> = {
  '0': v('opacity-0'),
  '5': v('opacity-5'),
  '10': v('opacity-10'),
  '15': v('opacity-15'),
  '20': v('opacity-20'),
  '25': v('opacity-25'),
  '30': v('opacity-30'),
  '40': v('opacity-40'),
  '50': v('opacity-50'),
  '60': v('opacity-60'),
  '70': v('opacity-70'),
  '75': v('opacity-75'),
  '80': v('opacity-80'),
  '90': v('opacity-90'),
  '95': v('opacity-95'),
  '100': v('opacity-100'),
} as const;

/** Raw opacity numeric values */
export const opacityRaw: Record<OpacityKey, number> = {
  '0': 0,
  '5': 0.05,
  '10': 0.1,
  '15': 0.15,
  '20': 0.2,
  '25': 0.25,
  '30': 0.3,
  '40': 0.4,
  '50': 0.5,
  '60': 0.6,
  '70': 0.7,
  '75': 0.75,
  '80': 0.8,
  '90': 0.9,
  '95': 0.95,
  '100': 1,
} as const;

// ─── Runtime Utilities ────────────────────────────────────────────────────────

/** Utility helpers for reading/applying CSS custom properties at runtime */
export const utils = {
  /**
   * Read a CSS custom property value from the document root at runtime.
   * Only works in browser environments.
   *
   * @example
   * utils.getCSSVar('--rsk-color-primary-500') // → '262 83% 58%'
   */
  getCSSVar(name: CSSVarName): string {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  },

  /**
   * Set a CSS custom property on the document root at runtime.
   * Useful for programmatic theme overrides.
   *
   * @example
   * utils.setCSSVar('--rsk-color-primary-500', '200 90% 50%')
   */
  setCSSVar(name: CSSVarName, value: string): void {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty(name, value);
  },

  /**
   * Check whether the current theme is dark mode.
   * Works by checking for the `.dark` class on `<html>`.
   */
  isDarkMode(): boolean {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  },
} as const;

// ─── Aggregated Token Object ──────────────────────────────────────────────────

/**
 * Complete RSK-UI design token collection.
 * Import this for convenient access to all token categories.
 *
 * @example
 * import { tokens } from 'rsk-ui'
 * const color = tokens.color.primary[500]
 * const space = tokens.spacing['4']
 */
export const tokens = {
  color: {
    ...colorPalette,
    semantic: colorSemantic,
  },
  fontFamily,
  fontSize,
  fontSizeRaw,
  lineHeight,
  letterSpacing,
  fontWeight,
  fontWeightRaw,
  spacing,
  spacingRaw,
  borderRadius,
  borderRadiusRaw,
  shadow,
  shadowGlow,
  breakpoint,
  mediaQuery,
  zIndex,
  zIndexRaw,
  duration,
  durationRaw,
  easing,
  easingRaw,
  opacity,
  opacityRaw,
  utils,
} as const;

export default tokens;
