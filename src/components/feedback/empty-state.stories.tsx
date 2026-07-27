import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './empty-state';

const meta = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No projects yet',
    description: 'Create your first project to start organizing work.',
<<<<<<< HEAD
    action: (
      <button className="rounded-md bg-primary-500 px-4 py-2 text-sm text-white">
        Create project
      </button>
    ),
=======
    action: <button className="rounded-md bg-primary-500 px-4 py-2 text-sm text-white">Create project</button>,
>>>>>>> 461806c (feat: add Alert component stories for Storybook)
  },
};
