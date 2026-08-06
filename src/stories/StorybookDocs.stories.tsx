import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Documentation/Storybook Guide',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'This guide highlights the documentation, accessibility, controls, dark mode, source preview, and playground features available in Storybook.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="space-y-4 rounded-lg border border-border bg-background p-6 text-foreground">
      <h2 className="text-xl font-semibold">Storybook experience</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use the Controls panel to adjust props interactively.</li>
        <li>Open the Accessibility addon to inspect common issues.</li>
        <li>Switch between light, dark, and system themes from the toolbar.</li>
        <li>Inspect generated source code from the Docs panel.</li>
        <li>Try the interactive playground for rapid component experimentation.</li>
      </ul>
    </div>
  ),
};
