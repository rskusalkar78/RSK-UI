import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button';
import { Modal } from './modal';

const meta = {
  title: 'Components/Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalStory() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background p-6">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Edit profile"
        description="Update account details."
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This overlay is keyboard accessible and focuses the first available control.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => setOpen(false)}>Save</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export const Default: Story = {
  render: () => <ModalStory />,
};
