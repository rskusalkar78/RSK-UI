import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button';
import { Dialog } from './dialog';

const meta = {
  title: 'Components/Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

function DialogStory() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background p-6">
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        description="This is destructive. Continue?"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Press Escape to dismiss it.</p>
          <div className="flex gap-2">
            <Button onClick={() => setOpen(false)}>Continue</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export const Default: Story = {
  render: () => <DialogStory />,
};
