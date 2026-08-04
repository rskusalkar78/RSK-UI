import type { Config } from 'tailwindcss';

/**
 * RSK-UI Tailwind CSS Configuration
 *
 * This configuration maps all RSK-UI design token CSS variables to Tailwind
 * theme extensions. It can be used as a preset in consuming applications.
 *
 * Usage as a preset in a consumer app (tailwind.config.ts):
 * ```ts
 * import rskPreset from 'rsk-ui/tailwind.config'
 * export default { presets: [rskPreset], content: ['...'] }
 * ```
 *
 * Note: For Tailwind CSS v4 projects, design tokens are already mapped via
 * the `@theme` directive in `globals.css`. This file is provided for
 * Tailwind v3 compatibility and programmatic config access.
 */

/** Helper to reference a CSS custom property */
const cssVar = (name: string): string => `var(--rsk-${name})`;

/** Helper to reference a CSS custom property as an HSL color */
const hslVar = (name: string): string => `hsl(var(--rsk-${name}))`;

const rskUIConfig: Config = {
  darkMode: ['class'],
  content: [],
  theme: {
    extend: {
      // ─── Colors ──────────────────────────────────────────────────────────

      colors: {
        // Semantic colors (theme-adaptive)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: cssVar('primary-hover'),
          active: cssVar('primary-active'),
          subtle: cssVar('primary-subtle'),
          muted: cssVar('primary-muted'),
          emphasis: cssVar('primary-emphasis'),
          50: hslVar('color-primary-50'),
          100: hslVar('color-primary-100'),
          200: hslVar('color-primary-200'),
          300: hslVar('color-primary-300'),
          400: hslVar('color-primary-400'),
          500: hslVar('color-primary-500'),
          600: hslVar('color-primary-600'),
          700: hslVar('color-primary-700'),
          800: hslVar('color-primary-800'),
          900: hslVar('color-primary-900'),
          950: hslVar('color-primary-950'),
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: cssVar('secondary-hover'),
          active: cssVar('secondary-active'),
          subtle: cssVar('secondary-subtle'),
          muted: cssVar('secondary-muted'),
          50: hslVar('color-secondary-50'),
          100: hslVar('color-secondary-100'),
          200: hslVar('color-secondary-200'),
          300: hslVar('color-secondary-300'),
          400: hslVar('color-secondary-400'),
          500: hslVar('color-secondary-500'),
          600: hslVar('color-secondary-600'),
          700: hslVar('color-secondary-700'),
          800: hslVar('color-secondary-800'),
          900: hslVar('color-secondary-900'),
          950: hslVar('color-secondary-950'),
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hover: cssVar('accent-hover'),
          subtle: cssVar('accent-subtle'),
          muted: cssVar('accent-muted'),
          50: hslVar('color-accent-50'),
          100: hslVar('color-accent-100'),
          200: hslVar('color-accent-200'),
          300: hslVar('color-accent-300'),
          400: hslVar('color-accent-400'),
          500: hslVar('color-accent-500'),
          600: hslVar('color-accent-600'),
          700: hslVar('color-accent-700'),
          800: hslVar('color-accent-800'),
          900: hslVar('color-accent-900'),
          950: hslVar('color-accent-950'),
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          hover: cssVar('destructive-hover'),
          subtle: cssVar('destructive-subtle'),
          muted: cssVar('destructive-muted'),
          50: hslVar('color-destructive-50'),
          100: hslVar('color-destructive-100'),
          200: hslVar('color-destructive-200'),
          300: hslVar('color-destructive-300'),
          400: hslVar('color-destructive-400'),
          500: hslVar('color-destructive-500'),
          600: hslVar('color-destructive-600'),
          700: hslVar('color-destructive-700'),
          800: hslVar('color-destructive-800'),
          900: hslVar('color-destructive-900'),
          950: hslVar('color-destructive-950'),
        },
        success: {
          DEFAULT: cssVar('success'),
          foreground: cssVar('success-foreground'),
          hover: cssVar('success-hover'),
          subtle: cssVar('success-subtle'),
          muted: cssVar('success-muted'),
          50: hslVar('color-success-50'),
          100: hslVar('color-success-100'),
          200: hslVar('color-success-200'),
          300: hslVar('color-success-300'),
          400: hslVar('color-success-400'),
          500: hslVar('color-success-500'),
          600: hslVar('color-success-600'),
          700: hslVar('color-success-700'),
          800: hslVar('color-success-800'),
          900: hslVar('color-success-900'),
          950: hslVar('color-success-950'),
        },
        warning: {
          DEFAULT: cssVar('warning'),
          foreground: cssVar('warning-foreground'),
          hover: cssVar('warning-hover'),
          subtle: cssVar('warning-subtle'),
          muted: cssVar('warning-muted'),
          50: hslVar('color-warning-50'),
          100: hslVar('color-warning-100'),
          200: hslVar('color-warning-200'),
          300: hslVar('color-warning-300'),
          400: hslVar('color-warning-400'),
          500: hslVar('color-warning-500'),
          600: hslVar('color-warning-600'),
          700: hslVar('color-warning-700'),
          800: hslVar('color-warning-800'),
          900: hslVar('color-warning-900'),
          950: hslVar('color-warning-950'),
        },
        info: {
          DEFAULT: cssVar('info'),
          foreground: cssVar('info-foreground'),
          hover: cssVar('info-hover'),
          subtle: cssVar('info-subtle'),
          muted: cssVar('info-muted'),
          50: hslVar('color-info-50'),
          100: hslVar('color-info-100'),
          200: hslVar('color-info-200'),
          300: hslVar('color-info-300'),
          400: hslVar('color-info-400'),
          500: hslVar('color-info-500'),
          600: hslVar('color-info-600'),
          700: hslVar('color-info-700'),
          800: hslVar('color-info-800'),
          900: hslVar('color-info-900'),
          950: hslVar('color-info-950'),
        },
        neutral: {
          50: hslVar('color-neutral-50'),
          100: hslVar('color-neutral-100'),
          200: hslVar('color-neutral-200'),
          300: hslVar('color-neutral-300'),
          400: hslVar('color-neutral-400'),
          500: hslVar('color-neutral-500'),
          600: hslVar('color-neutral-600'),
          700: hslVar('color-neutral-700'),
          800: hslVar('color-neutral-800'),
          900: hslVar('color-neutral-900'),
          950: hslVar('color-neutral-950'),
        },
      },

      // ─── Typography ───────────────────────────────────────────────────────

      fontFamily: {
        sans: [cssVar('font-sans')],
        mono: [cssVar('font-mono')],
        display: [cssVar('font-display')],
      },

      fontSize: {
        '2xs': [cssVar('text-2xs'), { lineHeight: '1rem' }],
        xs: [cssVar('text-xs'), { lineHeight: '1rem' }],
        sm: [cssVar('text-sm'), { lineHeight: '1.25rem' }],
        base: [cssVar('text-base'), { lineHeight: '1.5rem' }],
        lg: [cssVar('text-lg'), { lineHeight: '1.75rem' }],
        xl: [cssVar('text-xl'), { lineHeight: '1.75rem' }],
        '2xl': [cssVar('text-2xl'), { lineHeight: '2rem' }],
        '3xl': [cssVar('text-3xl'), { lineHeight: '2.25rem' }],
        '4xl': [cssVar('text-4xl'), { lineHeight: '2.5rem' }],
        '5xl': [cssVar('text-5xl'), { lineHeight: '1' }],
        '6xl': [cssVar('text-6xl'), { lineHeight: '1' }],
        '7xl': [cssVar('text-7xl'), { lineHeight: '1' }],
        '8xl': [cssVar('text-8xl'), { lineHeight: '1' }],
        '9xl': [cssVar('text-9xl'), { lineHeight: '1' }],
      },

      fontWeight: {
        thin: cssVar('font-weight-thin'),
        extralight: cssVar('font-weight-extralight'),
        light: cssVar('font-weight-light'),
        normal: cssVar('font-weight-normal'),
        medium: cssVar('font-weight-medium'),
        semibold: cssVar('font-weight-semibold'),
        bold: cssVar('font-weight-bold'),
        extrabold: cssVar('font-weight-extrabold'),
        black: cssVar('font-weight-black'),
      },

      letterSpacing: {
        tighter: cssVar('tracking-tighter'),
        tight: cssVar('tracking-tight'),
        normal: cssVar('tracking-normal'),
        wide: cssVar('tracking-wide'),
        wider: cssVar('tracking-wider'),
        widest: cssVar('tracking-widest'),
      },

      lineHeight: {
        none: cssVar('leading-none'),
        tight: cssVar('leading-tight'),
        snug: cssVar('leading-snug'),
        normal: cssVar('leading-normal'),
        relaxed: cssVar('leading-relaxed'),
        loose: cssVar('leading-loose'),
      },

      // ─── Spacing ──────────────────────────────────────────────────────────

      spacing: {
        px: cssVar('space-px'),
        '0': cssVar('space-0'),
        '0.5': cssVar('space-0-5'),
        '1': cssVar('space-1'),
        '1.5': cssVar('space-1-5'),
        '2': cssVar('space-2'),
        '2.5': cssVar('space-2-5'),
        '3': cssVar('space-3'),
        '3.5': cssVar('space-3-5'),
        '4': cssVar('space-4'),
        '5': cssVar('space-5'),
        '6': cssVar('space-6'),
        '7': cssVar('space-7'),
        '8': cssVar('space-8'),
        '9': cssVar('space-9'),
        '10': cssVar('space-10'),
        '11': cssVar('space-11'),
        '12': cssVar('space-12'),
        '14': cssVar('space-14'),
        '16': cssVar('space-16'),
        '20': cssVar('space-20'),
        '24': cssVar('space-24'),
        '28': cssVar('space-28'),
        '32': cssVar('space-32'),
        '36': cssVar('space-36'),
        '40': cssVar('space-40'),
        '44': cssVar('space-44'),
        '48': cssVar('space-48'),
        '52': cssVar('space-52'),
        '56': cssVar('space-56'),
        '60': cssVar('space-60'),
        '64': cssVar('space-64'),
        '72': cssVar('space-72'),
        '80': cssVar('space-80'),
        '96': cssVar('space-96'),
      },

      // ─── Border Radius ────────────────────────────────────────────────────

      borderRadius: {
        none: cssVar('radius-none'),
        xs: cssVar('radius-xs'),
        sm: cssVar('radius-sm'),
        md: cssVar('radius-md'),
        lg: cssVar('radius-lg'),
        xl: cssVar('radius-xl'),
        '2xl': cssVar('radius-2xl'),
        '3xl': cssVar('radius-3xl'),
        '4xl': cssVar('radius-4xl'),
        full: cssVar('radius-full'),
      },

      // ─── Shadows ──────────────────────────────────────────────────────────

      boxShadow: {
        xs: cssVar('shadow-xs'),
        sm: cssVar('shadow-sm'),
        md: cssVar('shadow-md'),
        lg: cssVar('shadow-lg'),
        xl: cssVar('shadow-xl'),
        '2xl': cssVar('shadow-2xl'),
        inner: cssVar('shadow-inner'),
        none: 'none',
        'glow-primary': cssVar('shadow-glow-primary'),
        'glow-secondary': cssVar('shadow-glow-secondary'),
        'glow-accent': cssVar('shadow-glow-accent'),
        'glow-success': cssVar('shadow-glow-success'),
        'glow-destructive': cssVar('shadow-glow-destructive'),
      },

      // ─── Breakpoints ──────────────────────────────────────────────────────

      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      // ─── Z-Index ──────────────────────────────────────────────────────────

      zIndex: {
        deep: cssVar('z-deep'),
        base: cssVar('z-base'),
        docked: cssVar('z-docked'),
        dropdown: cssVar('z-dropdown'),
        sticky: cssVar('z-sticky'),
        banner: cssVar('z-banner'),
        overlay: cssVar('z-overlay'),
        modal: cssVar('z-modal'),
        popover: cssVar('z-popover'),
        toast: cssVar('z-toast'),
        tooltip: cssVar('z-tooltip'),
        max: cssVar('z-max'),
      },

      // ─── Animation Durations ──────────────────────────────────────────────

      transitionDuration: {
        fastest: '75ms',
        fast: '100ms',
        normal: '150ms',
        moderate: '200ms',
        slow: '300ms',
        slower: '400ms',
        slowest: '500ms',
        relaxed: '700ms',
        long: '1000ms',
      },

      animationDuration: {
        fastest: '75ms',
        fast: '100ms',
        normal: '150ms',
        moderate: '200ms',
        slow: '300ms',
        slower: '400ms',
        slowest: '500ms',
        relaxed: '700ms',
        long: '1000ms',
      },

      // ─── Animation Easings ────────────────────────────────────────────────

      transitionTimingFunction: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ─── Opacity ──────────────────────────────────────────────────────────

      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.10',
        '15': '0.15',
        '20': '0.20',
        '25': '0.25',
        '30': '0.30',
        '40': '0.40',
        '50': '0.50',
        '60': '0.60',
        '70': '0.70',
        '75': '0.75',
        '80': '0.80',
        '90': '0.90',
        '95': '0.95',
        '100': '1',
      },

      // ─── Accordion Keyframes (legacy) ─────────────────────────────────────

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default rskUIConfig;
