import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button';
import { Drawer } from './drawer';

const meta = {
  title: 'Components/Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

function DrawerStory() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background p-6">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} title="Filters" description="Refine your view.">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This panel is responsive and supports keyboard dismissal.
          </p>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </div>
      </Drawer>
    </div>
  );
}

export const Default: Story = {
  render: () => <DrawerStory />,
};
