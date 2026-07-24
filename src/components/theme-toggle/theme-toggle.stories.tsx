import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../providers/theme-provider';
import { ThemeToggle } from './theme-toggle';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Theme Engine/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A fully accessible theme-switching component with three variants:

- **\`icon\`** — Binary toggle (light ↔ dark). Uses \`role="switch"\` + \`aria-checked\`.
- **\`cycle\`** — Cycles through light → dark → system. Indicates current mode via icon.
- **\`dropdown\`** — Opens a menu with all three options. Full keyboard navigation.

All variants:
- Describe the *action* in \`aria-label\` (not the current state)
- Support keyboard (Enter, Space, Arrow keys, Escape)
- Show visible focus rings in both themes
- Respect \`prefers-reduced-motion\`
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="flex min-h-16 items-center justify-center p-8 bg-background">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['icon', 'cycle', 'dropdown'],
      description: 'Toggle interaction pattern',
      table: { defaultValue: { summary: 'icon' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Visual size of the button',
      table: { defaultValue: { summary: 'md' } },
    },
    showLabel: {
      control: 'boolean',
      description: 'Show text label alongside icon (icon variant only)',
      table: { defaultValue: { summary: false } },
    },
    className: { control: false },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default icon toggle — binary light ↔ dark switch */
export const Default: Story = {
  args: {
    variant: 'icon',
    size: 'md',
  },
};

/** Icon toggle with visible text label */
export const WithLabel: Story = {
  name: 'Icon — With Label',
  args: {
    variant: 'icon',
    size: 'md',
    showLabel: true,
  },
};

/** Cycles through all three modes: light → dark → system */
export const Cycle: Story = {
  name: 'Cycle (3-way)',
  args: {
    variant: 'cycle',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click repeatedly to cycle: Light → Dark → System → Light…  \nWhen in System mode, a small dot indicates the resolved theme.',
      },
    },
  },
};

/** Dropdown menu with explicit Light / Dark / System options */
export const Dropdown: Story = {
  name: 'Dropdown Menu',
  args: {
    variant: 'dropdown',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Opens a menu. Keyboard: **ArrowDown** to open, **Escape** to close, **Enter/Space** to select.',
      },
    },
  },
};

/** All sizes side by side */
export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <ThemeProvider>
      <div className="flex items-center gap-4 p-6 bg-background">
        <ThemeToggle size="sm" />
        <ThemeToggle size="md" />
        <ThemeToggle size="lg" />
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: { story: 'Small (32px), Medium (36px), Large (40px).' },
    },
  },
};

/** All variants side by side */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <ThemeProvider>
      <div className="flex items-center gap-4 p-6 bg-background rounded-xl border border-border">
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle variant="icon" />
          <span className="text-xs text-muted-foreground font-medium">Icon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle variant="cycle" />
          <span className="text-xs text-muted-foreground font-medium">Cycle</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle variant="dropdown" />
          <span className="text-xs text-muted-foreground font-medium">Dropdown</span>
        </div>
      </div>
    </ThemeProvider>
  ),
};

/** Small size variant */
export const Small: Story = {
  args: { variant: 'icon', size: 'sm' },
  name: 'Size — Small',
};

/** Large size variant */
export const Large: Story = {
  args: { variant: 'icon', size: 'lg' },
  name: 'Size — Large',
};
