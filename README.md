# rsk-ui

A production-ready React 19 Design System and UI library built for speed, accessibility, scalability, and premier developer experience.

## Tech Stack & Architecture

- **React 19 & TypeScript**: Uses the latest features of React 19 under strict TypeScript compilation compiler settings.
- **Tailwind CSS v4**: CSS-first design engine utilizing `@import "tailwindcss";` in combination with modern HSL variables for color tokens.
- **Vite 6**: Highly optimized bundler configured for both local development workspaces and production library compilation.
- **Storybook 8**: Fully isolated, component-driven sandbox for designing, testing, and documenting component states.
- **Framer Motion**: Fluid, hardware-accelerated animations for smooth transitions and state shifts.
- **React Hook Form & Zod**: Form handling and strict schema-based input validations.
- **ESLint 9 & Prettier**: Configured using ESLint's Flat Config system (`eslint.config.js`) for static analysis integrated with formatting rules.
- **Husky & lint-staged**: Validates changes and runs pre-commit hooks to auto-format and lint staged files before code hits git.

---

## Directory Structure

```
RSK-UI/
├── .husky/                      # Git pre-commit hooks configuration
├── .storybook/                  # Storybook configuration files
│   ├── main.ts                  # Storybook core settings (addons, framework, paths)
│   └── preview.ts               # Storybook preview canvas (styles injection, parameters)
├── public/                      # Static assets
└── src/
    ├── components/              # Library React components (semantic split)
    │   ├── ui/                  # Atomic primitives / design system primitives (e.g. Button, Badge)
    │   ├── forms/               # Standard form controller/input wraps (e.g. Input, Checkbox)
    │   └── layout/              # Structural/scaffolding grids & stacks (e.g. Grid, Stack)
    ├── hooks/                   # Custom reusable utility hooks (e.g. useTheme, useMediaQuery)
    ├── lib/                     # Design system internals
    │   ├── utils.ts             # Tailwind class merges (cn helper)
    │   └── theme.ts             # Token/theme-specific definitions
    ├── providers/               # Context providers (e.g. ThemeProvider for dark/light mode)
    ├── styles/                  # Styling entry point
    │   └── globals.css          # Tailwind CSS v4 entry point & custom layer variables
    ├── types/                   # Shared TypeScript typings
    ├── index.ts                 # main library export entry point
    └── main.tsx                 # Dev mount point (App workspace)
```

---

## Key Configuration Decisions

### 1. CSS-First Design System (Tailwind CSS v4)

`rsk-ui` leverages the latest version of Tailwind CSS (v4). We avoid heavy JavaScript configuration files by defining all custom themes and color extensions directly inside the main CSS entry (`src/styles/globals.css`). The color palette uses semantic HSL variables that toggle between light and dark selectors natively.

### 2. Path Aliases (`@/*`)

To keep imports clean, we configure path mapping:

- TypeScript (`tsconfig.app.json`): `@/*` points to `src/*`
- Vite (`vite.config.ts`): Configured to resolve `@/*` to the absolute `src/` folder.
  _Example:_ `import { cn } from '@/lib/utils';`

### 3. Build & Packaging Pipeline

Vite is set up in library mode (`vite.config.ts`), exporting ESM (`es`) and UMD (`umd`) builds into the `/dist` directory. Externalized configurations prevent React and Framer Motion packages from being bloated into the build outputs.

---

## Getting Started

### Development Server

Starts the Vite workspace app to visually test provider state and styling:

```bash
npm run dev
```

### Storybook Sandbox

Starts the Storybook development server on [http://localhost:6006](http://localhost:6006):

```bash
npm run storybook
```

### Production Build

Checks typescript types (`tsc -b`) and runs Vite compiler:

```bash
npm run build
```

### Linting & Formatting

Lints files and reports issues:

```bash
npm run lint
```

Auto-formats files according to formatting standards:

```bash
npm run format
```
