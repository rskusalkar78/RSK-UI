// Import global styles to be bundled with the design system library
import './styles/globals.css';

// Core utilities
export * from './lib/utils';

// Theme script — no-flash inline script for SSR / index.html injection
export { getThemeScript, themeScript, THEME_STORAGE_KEY, THEME_VALUES } from './lib/theme-script';
export type { Theme, ResolvedTheme } from './lib/theme-script';

// Theme engine — provider, context, and types
export * from './providers/theme-provider';

// Theme hooks
export * from './hooks/use-theme';

// Design tokens — CSS variable references, raw values, type definitions
export * from './tokens';
export { default as tokens } from './tokens';

// Components
export * from './components';
