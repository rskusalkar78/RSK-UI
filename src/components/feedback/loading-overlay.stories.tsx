import type { Meta, StoryObj } from '@storybook/react';
import { LoadingOverlay } from './loading-overlay';

const meta = {
  title: 'Components/Feedback/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    active: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof LoadingOverlay>;

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Default: Story = {
  args: {
    active: true,
    label: 'Loading dashboard',
    children: (
      <div className="h-56 rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Content behind the overlay.</p>
      </div>
    ),
  },
};
