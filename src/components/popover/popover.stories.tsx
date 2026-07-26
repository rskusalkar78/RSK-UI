import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Popover } from './popover';

const meta = {
  title: 'Components/Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div className="bg-background p-6">
      <Popover trigger={<Button>Open popover</Button>} title="More actions">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Manage selected items with quick actions.</p>
          <Button size="sm">Confirm</Button>
        </div>
      </Popover>
    </div>
  ),
};
