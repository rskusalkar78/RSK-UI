import type { Meta, StoryObj } from '@storybook/react';
import { BookOpen, Home, Inbox, LayoutDashboard, Settings, UserCircle2 } from 'lucide-react';
import { Breadcrumb, CommandPalette, Dropdown, Navbar, Pagination, Sidebar, Tabs } from './index';

const meta = {
  title: 'Components/Navigation',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Navigation primitives for headers, sidebars, tabs, breadcrumbs, pagination, dropdowns, and command palettes.',
      },
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;

export const Docs: StoryObj<typeof Navbar> = {
  name: 'Documentation',
  render: () => (
    <div className="space-y-4 rounded-lg border border-border bg-background p-6 text-foreground">
      <h2 className="text-xl font-semibold">Navigation primitives</h2>
      <p className="text-sm text-muted-foreground">
        Use the stories below to inspect navbar, sidebar, tabs, breadcrumb, pagination, dropdown,
        and command palette patterns.
      </p>
    </div>
  ),
};

export const NavbarStory: StoryObj = {
  render: () => (
    <Navbar
      brand={
        <>
          <span className="text-primary">RSK</span> UI
        </>
      }
      items={[
        { label: 'Overview', href: '#overview', active: true, icon: <Home size={16} /> },
        { label: 'Apps', href: '#apps', icon: <LayoutDashboard size={16} /> },
        { label: 'Settings', href: '#settings', icon: <Settings size={16} /> },
      ]}
      actions={
        <button type="button" className="rounded-md border border-border px-3 py-2 text-sm">
          Sign in
        </button>
      }
    />
  ),
};

export const SidebarStory: StoryObj = {
  render: () => (
    <div className="h-[24rem] w-full">
      <Sidebar
        title="Workspace"
        items={[
          { label: 'Home', href: '#home', active: true, icon: <Home size={16} /> },
          { label: 'Inbox', href: '#inbox', icon: <Inbox size={16} /> },
          { label: 'Settings', href: '#settings', icon: <Settings size={16} /> },
        ]}
        footer={<div className="text-sm text-muted-foreground">Need help?</div>}
      />
    </div>
  ),
};

export const TabsStory: StoryObj = {
  render: () => (
    <Tabs
      defaultValue="overview"
      items={[
        {
          value: 'overview',
          label: 'Overview',
          icon: <LayoutDashboard size={16} />,
          content: <div>Overview panel</div>,
        },
        {
          value: 'docs',
          label: 'Docs',
          icon: <BookOpen size={16} />,
          content: <div>Docs panel</div>,
        },
        {
          value: 'settings',
          label: 'Settings',
          icon: <Settings size={16} />,
          content: <div>Settings panel</div>,
        },
      ]}
    />
  ),
};

export const BreadcrumbStory: StoryObj = {
  render: () => (
    <Breadcrumb
      items={[{ label: 'Home', href: '#' }, { label: 'Products', href: '#' }, { label: 'Shoes' }]}
    />
  ),
};

export const PaginationStory: StoryObj = {
  render: () => <Pagination page={4} totalPages={10} onPageChange={() => undefined} />,
};

export const DropdownStory: StoryObj = {
  render: () => (
    <Dropdown
      trigger={
        <button type="button" className="rounded-md border border-border px-3 py-2 text-sm">
          Profile
        </button>
      }
      items={[
        { label: 'View profile', icon: <UserCircle2 size={14} /> },
        { label: 'Settings' },
        { label: 'Sign out' },
      ]}
    />
  ),
};

export const CommandPaletteStory: StoryObj = {
  render: () => (
    <CommandPalette
      open
      onOpenChange={() => undefined}
      commands={[
        { id: 'home', label: 'Go home', description: 'Jump to overview' },
        { id: 'settings', label: 'Open settings', description: 'Manage preferences' },
        { id: 'docs', label: 'Read docs', description: 'View documentation' },
      ]}
    />
  ),
};
