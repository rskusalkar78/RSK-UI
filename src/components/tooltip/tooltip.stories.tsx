import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Tooltip } from './tooltip';

const meta = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div className="bg-background p-6">
      <Tooltip content="Helpful guidance">
        <Button>Hover or focus</Button>
      </Tooltip>
    </div>
  ),
};
