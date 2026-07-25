import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'current'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { size: 'md', variant: 'primary' } };

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-6 p-6 bg-background">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Spinner size={s} variant="primary" />
          <span className="text-xs text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex items-center gap-6 p-6 bg-background">
      {(['primary', 'secondary', 'accent', 'destructive', 'neutral'] as const).map((v) => (
        <div key={v} className="flex flex-col items-center gap-2">
          <Spinner size="md" variant={v} />
          <span className="text-xs text-muted-foreground capitalize">{v}</span>
        </div>
      ))}
    </div>
  ),
};

export const InheritColor: Story = {
  name: 'Inherits Color',
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-background text-accent-500">
      <Spinner variant="current" size="md" />
      <span className="text-sm">Inherits parent color</span>
    </div>
  ),
};
