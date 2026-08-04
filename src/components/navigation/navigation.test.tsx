import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CommandPalette, Dropdown, Tabs } from './index';

describe('navigation primitives', () => {
  it('changes the active tab with arrow keys', async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        defaultValue="overview"
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'analytics', label: 'Analytics' },
          { value: 'settings', label: 'Settings' },
        ]}
      />
    );

    const tabs = screen.getAllByRole('tab');
    const firstTab = tabs[0];
    if (firstTab) {
      firstTab.focus();
    }
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('aria-selected', 'true');
  });

  it('opens the dropdown from keyboard input', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        trigger={<button type="button">Open menu</button>}
        items={[
          { label: 'Profile', onSelect: vi.fn() },
          { label: 'Settings', onSelect: vi.fn() },
        ]}
      />
    );

    const trigger = screen.getByRole('button', { name: 'Open menu' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('supports keyboard selection in the command palette', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CommandPalette
        open
        onOpenChange={() => undefined}
        commands={[
          { id: 'home', label: 'Home', onSelect },
          { id: 'docs', label: 'Docs', onSelect },
        ]}
      />
    );

    const input = screen.getByPlaceholderText('Type a command or search…');
    input.focus();
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
