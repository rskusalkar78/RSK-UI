import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'destructive'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Heads up',
    description: 'This is a helpful alert with a friendly message.',
    variant: 'info',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <Alert title="Information" description="Helpful context for the user." variant="info" />
      <Alert title="Success" description="Everything completed without issues." variant="success" />
      <Alert
        title="Warning"
        description="Please review this before continuing."
        variant="warning"
      />
      <Alert
        title="Error"
        description="Something went wrong and requires attention."
        variant="destructive"
      />
    </div>
  ),
};
