import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Mail, Phone, MapPin, User, ChevronRight, Star, Clock, MessageCircle } from 'lucide-react';
import { List, ListItem, type ListItemProps } from './list';
import { Avatar } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const basicItems: ListItemProps[] = [
  { id: '1', title: 'First Item', description: 'This is the first item' },
  { id: '2', title: 'Second Item', description: 'This is the second item' },
  { id: '3', title: 'Third Item', description: 'This is the third item' },
];

const contactItems: ListItemProps[] = [
  {
    id: '1',
    title: 'John Doe',
    description: 'john@example.com',
    avatar: <Avatar name="John Doe" size="md" />,
  },
  {
    id: '2',
    title: 'Jane Smith',
    description: 'jane@example.com',
    avatar: <Avatar name="Jane Smith" size="md" />,
  },
  {
    id: '3',
    title: 'Bob Johnson',
    description: 'bob@example.com',
    avatar: <Avatar name="Bob Johnson" size="md" />,
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Data Display/List',
  component: List,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: false },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    spacing: { control: 'select', options: ['compact', 'comfortable'] },
    divider: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    loading: { control: 'boolean' },
    empty: { control: 'boolean' },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithAvatars: Story = {
  name: 'With Avatars',
  args: {
    items: contactItems,
    divider: true,
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const items: ListItemProps[] = [
      {
        id: '1',
        title: 'Email',
        description: 'john@example.com',
        icon: <Mail size={20} />,
      },
      {
        id: '2',
        title: 'Phone',
        description: '+1 (555) 123-4567',
        icon: <Phone size={20} />,
      },
      {
        id: '3',
        title: 'Location',
        description: 'San Francisco, CA',
        icon: <MapPin size={20} />,
      },
    ];
    return <List items={items} divider />;
  },
};

export const WithActions: Story = {
  name: 'With Actions',
  render: () => {
    const items: ListItemProps[] = [
      {
        id: '1',
        title: 'Account Settings',
        description: 'Manage your account preferences',
        icon: <User size={20} />,
        action: <ChevronRight size={20} className="text-muted-foreground" />,
      },
      {
        id: '2',
        title: 'Notifications',
        description: 'Configure notification settings',
        icon: <MessageCircle size={20} />,
        action: <Badge color="destructive">5</Badge>,
      },
      {
        id: '3',
        title: 'Activity Log',
        description: 'View your recent activity',
        icon: <Clock size={20} />,
        action: (
          <Button size="xs" variant="ghost">
            View
          </Button>
        ),
      },
    ];
    return <List items={items} divider />;
  },
};

function SelectableListDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  const items: ListItemProps[] = basicItems.map((item) => ({
    ...item,
    selected: selected === item.id,
    onClick: () => setSelected(item.id),
  }));

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Selected: {selected || 'None'}</div>
      <List items={items} divider />
    </div>
  );
}

export const Selectable: Story = {
  name: 'Selectable Items',
  render: () => <SelectableListDemo />,
};

export const HorizontalLayout: Story = {
  name: 'Horizontal Layout',
  render: () => {
    const items: ListItemProps[] = [
      { id: '1', title: 'Overview', icon: <Star size={16} /> },
      { id: '2', title: 'Activity', icon: <Clock size={16} /> },
      { id: '3', title: 'Messages', icon: <MessageCircle size={16} /> },
    ];
    return <List items={items} orientation="horizontal" />;
  },
};

export const WithDividers: Story = {
  name: 'With Dividers',
  args: {
    items: contactItems,
    divider: true,
  },
};

export const CompactSpacing: Story = {
  name: 'Compact Spacing',
  args: {
    items: basicItems,
    spacing: 'compact',
    divider: true,
  },
};

export const ComfortableSpacing: Story = {
  name: 'Comfortable Spacing',
  args: {
    items: basicItems,
    spacing: 'comfortable',
    divider: true,
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    items: basicItems,
    loading: true,
    loadingCount: 5,
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    items: [],
    emptyTitle: 'No contacts',
    emptyDescription: 'Add a contact to get started.',
    emptyAction: <Button size="sm">Add Contact</Button>,
  },
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => (
    <List divider>
      <ListItem
        title="Featured Item"
        description="This item has custom styling"
        icon={<Star size={20} className="text-yellow-500" />}
        action={<Badge color="warning">New</Badge>}
        className="bg-yellow-500/5"
      />
      <ListItem title="Regular Item" description="This is a standard item" />
      <ListItem
        title="Disabled Item"
        description="This item is disabled"
        disabled
        onClick={() => console.log('clicked')}
      />
    </List>
  ),
};

export const InteractiveList: Story = {
  name: 'Interactive List',
  render: () => {
    const handleClick = (id: string) => {
      alert(`Clicked item: ${id}`);
    };

    const items: ListItemProps[] = contactItems.map((item) => ({
      ...item,
      onClick: () => handleClick(item.id!),
      action: <ChevronRight size={20} className="text-muted-foreground" />,
    }));

    return <List items={items} divider hoverable />;
  },
};

export const MixedContent: Story = {
  name: 'Mixed Content',
  render: () => (
    <List divider>
      <ListItem
        title="User Profile"
        description="john@example.com"
        avatar={<Avatar name="John Doe" size="md" />}
        action={<Badge color="primary">Admin</Badge>}
      />
      <ListItem
        title="Recent Activity"
        description="Last active 5 minutes ago"
        icon={<Clock size={20} />}
        action={<ChevronRight size={20} className="text-muted-foreground" />}
        onClick={() => console.log('Activity clicked')}
      />
      <ListItem
        title="Messages"
        description="You have 3 unread messages"
        icon={<MessageCircle size={20} />}
        action={<Badge color="destructive">3</Badge>}
        onClick={() => console.log('Messages clicked')}
      />
    </List>
  ),
};

export const LongContent: Story = {
  name: 'Long Content (Truncated)',
  render: () => {
    const items: ListItemProps[] = [
      {
        id: '1',
        title:
          'This is a very long title that should be truncated when it exceeds the available space',
        description:
          'This is a very long description that should also be truncated to prevent overflow and maintain layout integrity',
        avatar: <Avatar name="User 1" size="md" />,
      },
      {
        id: '2',
        title: 'Short Title',
        description: 'Short description',
        avatar: <Avatar name="User 2" size="md" />,
      },
    ];
    return <List items={items} divider />;
  },
};

export const StatusList: Story = {
  name: 'Status List',
  render: () => {
    const items: ListItemProps[] = [
      {
        id: '1',
        title: 'Server Online',
        description: 'All systems operational',
        icon: <div className="h-2 w-2 rounded-full bg-green-500" />,
        action: <Badge color="success">Active</Badge>,
      },
      {
        id: '2',
        title: 'Database Connection',
        description: 'Connected to primary database',
        icon: <div className="h-2 w-2 rounded-full bg-green-500" />,
        action: <Badge color="success">Connected</Badge>,
      },
      {
        id: '3',
        title: 'API Service',
        description: 'Experiencing delays',
        icon: <div className="h-2 w-2 rounded-full bg-yellow-500" />,
        action: <Badge color="warning">Degraded</Badge>,
      },
      {
        id: '4',
        title: 'Email Service',
        description: 'Service unavailable',
        icon: <div className="h-2 w-2 rounded-full bg-red-500" />,
        action: <Badge color="destructive">Offline</Badge>,
      },
    ];
    return <List items={items} divider />;
  },
};

function NavigationListDemo() {
  const [active, setActive] = useState('home');

  const navItems: ListItemProps[] = [
    { id: 'home', title: 'Home', icon: <Star size={20} /> },
    { id: 'activity', title: 'Activity', icon: <Clock size={20} /> },
    {
      id: 'messages',
      title: 'Messages',
      icon: <MessageCircle size={20} />,
      action: <Badge color="primary">3</Badge>,
    },
    { id: 'settings', title: 'Settings', icon: <User size={20} /> },
  ].map((item) => ({
    ...item,
    selected: active === item.id,
    onClick: () => setActive(item.id),
  }));

  return <List items={navItems} spacing="compact" />;
}

export const NavigationList: Story = {
  name: 'Navigation List',
  render: () => <NavigationListDemo />,
};
