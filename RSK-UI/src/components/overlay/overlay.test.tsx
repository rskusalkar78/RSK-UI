import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dialog } from '../dialog/dialog';
import { Drawer } from '../drawer/drawer';
import { Modal } from '../modal/modal';
import { Popover } from '../popover/popover';
import { Tooltip } from '../tooltip/tooltip';

describe('overlay components', () => {
  it('renders a modal dialog with accessible semantics when open', () => {
    render(
      <Modal open onOpenChange={() => undefined} title="Edit profile">
        <p>Profile body</p>
      </Modal>
    );

    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument();
    expect(screen.getByText('Profile body')).toBeInTheDocument();
  });

  it('closes a dialog on Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={onOpenChange} title="Confirm action">
        <p>Are you sure?</p>
      </Dialog>
    );

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders a drawer with responsive layout semantics', () => {
    render(
      <Drawer open onOpenChange={() => undefined} title="Filters">
        <p>Drawer content</p>
      </Drawer>
    );

    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('toggles a popover from a trigger', async () => {
    const user = userEvent.setup();

    render(
      <Popover trigger={<button type="button">Open popover</button>} title="More actions">
        <p>Popover body</p>
      </Popover>
    );

    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open popover' }));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('shows a tooltip on focus', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Helpful text">
        <button type="button">Hover target</button>
      </Tooltip>
    );

    expect(screen.queryByText('Helpful text')).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByText('Helpful text')).toBeInTheDocument();
  });
});
