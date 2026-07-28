import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './toast';

const meta = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'destructive'] },
    title: { control: 'text' },
    description: { control: 'text' },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: 'Saved',
    description: 'Your changes were saved successfully.',
    variant: 'success',
    open: true,
  },
};
