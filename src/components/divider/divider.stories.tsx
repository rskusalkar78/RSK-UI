import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    label: { control: 'text' },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = { args: { orientation: 'horizontal', variant: 'solid' } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="space-y-6 p-6 bg-background w-80">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Solid</span>
        <Divider variant="solid" />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Dashed</span>
        <Divider variant="dashed" />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground">Dotted</span>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  name: 'With Label',
  args: { label: 'OR', variant: 'solid' },
};

export const Vertical: Story = {
  name: 'Vertical',
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-background h-16">
      <span className="text-sm text-foreground">Left</span>
      <Divider orientation="vertical" className="h-full" />
      <span className="text-sm text-foreground">Right</span>
    </div>
  ),
};

export const InContext: Story = {
  name: 'In Context',
  render: () => (
    <div className="p-6 bg-background max-w-sm space-y-4 rounded-xl border border-border">
      <p className="text-sm text-foreground">Section A content here.</p>
      <Divider label="MORE" />
      <p className="text-sm text-foreground">Section B content here.</p>
      <Divider variant="dashed" />
      <p className="text-sm text-muted-foreground">Footer note text.</p>
    </div>
  ),
};
