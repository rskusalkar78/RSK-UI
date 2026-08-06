import type { Meta, StoryObj } from '@storybook/react';

const catalog = [
  {
    name: 'Button',
    category: 'Actions',
    description: 'Primary action trigger with variants and loading states.',
  },
  {
    name: 'IconButton',
    category: 'Actions',
    description: 'Compact icon-only action for toolbars and headers.',
  },
  {
    name: 'Badge',
    category: 'Data Display',
    description: 'Status and count indicator for UI metadata.',
  },
  {
    name: 'Dialog',
    category: 'Overlay',
    description: 'Modal-style layered experience for focused tasks.',
  },
  {
    name: 'Drawer',
    category: 'Overlay',
    description: 'Off-canvas panel for navigation and supplementary content.',
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed interface for organizing content sections.',
  },
  {
    name: 'Typography',
    category: 'Layout',
    description: 'Text primitives for headings, body, and captions.',
  },
];

const meta = {
  title: 'Documentation/Component Catalog',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Browse the component library by category and quickly find the right pattern.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Catalog: Story = {
  render: () => (
    <div className="space-y-4 rounded-lg border border-border bg-background p-6 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Component categories</h2>
          <p className="text-sm text-muted-foreground">
            Use this index to discover components grouped by their role in the UI.
          </p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {catalog.map((item) => (
          <div key={item.name} className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm font-medium text-primary">{item.category}</div>
            <div className="mt-1 font-semibold">{item.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};
