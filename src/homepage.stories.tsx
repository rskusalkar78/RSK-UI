import type { Meta, StoryObj } from '@storybook/react';
import { Homepage } from './homepage';

const meta = {
  title: 'Pages/Homepage',
  component: Homepage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Homepage>;

export default meta;
type Story = StoryObj<typeof Homepage>;

export const Default: Story = {};
