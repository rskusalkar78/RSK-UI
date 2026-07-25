import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'destructive',
  'info',
  'neutral',
] as const;
const VARIANTS = ['solid', 'outline', 'subtle'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Badge', color: 'primary', variant: 'subtle' },
};

export const AllColors: Story = {
  name: 'All Colors — Subtle',
  render: () => (
    <div className="flex flex-wrap gap-2 p-6 bg-background">
      {COLORS.map((c) => (
        <Badge key={c} color={c} variant="subtle" className="capitalize">
          {c}
        </Badge>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants — Primary',
  render: () => (
    <div className="flex flex-wrap gap-2 p-6 bg-background">
      {VARIANTS.map((v) => (
        <Badge key={v} color="primary" variant={v} className="capitalize">
          {v}
        </Badge>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-6 bg-background">
      {SIZES.map((s) => (
        <Badge key={s} size={s} color="primary">
          Size {s}
        </Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  name: 'With Dot Indicator',
  render: () => (
    <div className="flex flex-wrap gap-2 p-6 bg-background">
      <Badge color="success" dot>
        Active
      </Badge>
      <Badge color="destructive" dot>
        Error
      </Badge>
      <Badge color="warning" dot>
        Pending
      </Badge>
      <Badge color="neutral" dot>
        Offline
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  name: 'Status Badges',
  render: () => (
    <div className="flex flex-wrap gap-2 p-6 bg-background">
      <Badge variant="subtle" color="success">
        Active
      </Badge>
      <Badge variant="subtle" color="warning">
        Pending
      </Badge>
      <Badge variant="subtle" color="destructive">
        Failed
      </Badge>
      <Badge variant="subtle" color="info">
        Draft
      </Badge>
      <Badge variant="subtle" color="neutral">
        Archived
      </Badge>
    </div>
  ),
};

export const SolidColorMatrix: Story = {
  name: 'Solid — All Colors',
  render: () => (
    <div className="flex flex-wrap gap-2 p-6 bg-background">
      {COLORS.map((c) => (
        <Badge key={c} color={c} variant="solid" className="capitalize">
          {c}
        </Badge>
      ))}
    </div>
  ),
};
