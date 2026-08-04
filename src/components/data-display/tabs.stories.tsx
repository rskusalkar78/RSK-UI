import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { User, Settings, Bell, Lock, Mail, CreditCard } from 'lucide-react';
import { Tabs, type Tab } from './tabs';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const basicTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-muted-foreground">
          This is the overview tab content. It provides a high-level summary of the information.
        </p>
      </div>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <p className="text-muted-foreground">
          This tab contains detailed information and specifications.
        </p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <p className="text-muted-foreground">Configure your preferences and options here.</p>
      </div>
    ),
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    tabs: { control: false },
    variant: { control: 'select', options: ['line', 'enclosed', 'pills'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    lazy: { control: 'boolean' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    tabs: basicTabs,
  },
};

export const LineVariant: Story = {
  name: 'Line Variant (Default)',
  args: {
    tabs: basicTabs,
    variant: 'line',
  },
};

export const EnclosedVariant: Story = {
  name: 'Enclosed Variant',
  args: {
    tabs: basicTabs,
    variant: 'enclosed',
  },
};

export const PillsVariant: Story = {
  name: 'Pills Variant',
  args: {
    tabs: basicTabs,
    variant: 'pills',
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const tabsWithIcons: Tab[] = [
      {
        id: 'profile',
        label: 'Profile',
        icon: <User size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Settings</h3>
            <p className="text-muted-foreground">
              Manage your personal information and preferences.
            </p>
          </div>
        ),
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <Bell size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Settings</h3>
            <p className="text-muted-foreground">Configure how you receive notifications.</p>
          </div>
        ),
      },
      {
        id: 'security',
        label: 'Security',
        icon: <Lock size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Security Settings</h3>
            <p className="text-muted-foreground">Manage your password and security preferences.</p>
          </div>
        ),
      },
    ];

    return <Tabs tabs={tabsWithIcons} />;
  },
};

export const WithBadges: Story = {
  name: 'With Badges',
  render: () => {
    const tabsWithBadges: Tab[] = [
      {
        id: 'all',
        label: 'All',
        badge: <Badge variant="outline">24</Badge>,
        content: <div className="py-4">All items (24)</div>,
      },
      {
        id: 'unread',
        label: 'Unread',
        badge: <Badge color="destructive">5</Badge>,
        content: <div className="py-4">Unread items (5)</div>,
      },
      {
        id: 'archived',
        label: 'Archived',
        badge: <Badge variant="outline">12</Badge>,
        content: <div className="py-4">Archived items (12)</div>,
      },
    ];

    return <Tabs tabs={tabsWithBadges} variant="pills" />;
  },
};

export const WithIconsAndBadges: Story = {
  name: 'With Icons and Badges',
  render: () => {
    const tabs: Tab[] = [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: <Mail size={16} />,
        badge: <Badge color="destructive">3</Badge>,
        content: <div className="py-4">You have 3 unread messages</div>,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings size={16} />,
        content: <div className="py-4">Configure your settings</div>,
      },
      {
        id: 'billing',
        label: 'Billing',
        icon: <CreditCard size={16} />,
        badge: <Badge color="warning">!</Badge>,
        content: <div className="py-4">Payment method needs attention</div>,
      },
    ];

    return <Tabs tabs={tabs} />;
  },
};

export const DisabledTabs: Story = {
  name: 'Disabled Tabs',
  render: () => {
    const tabsWithDisabled: Tab[] = [
      {
        id: 'available',
        label: 'Available',
        content: <div className="py-4">This tab is available</div>,
      },
      {
        id: 'disabled',
        label: 'Disabled',
        disabled: true,
        content: <div className="py-4">This content cannot be accessed</div>,
      },
      {
        id: 'another',
        label: 'Another Available',
        content: <div className="py-4">This tab is also available</div>,
      },
    ];

    return <Tabs tabs={tabsWithDisabled} />;
  },
};

function ControlledModeDemo() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Active Tab:</span>
        <Badge>{activeTab}</Badge>
        <Button size="sm" variant="outline" onClick={() => setActiveTab('details')}>
          Go to Details
        </Button>
      </div>
      <Tabs tabs={basicTabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export const ControlledMode: Story = {
  name: 'Controlled Mode',
  render: () => <ControlledModeDemo />,
};

export const DefaultTab: Story = {
  name: 'Default Tab (Uncontrolled)',
  args: {
    tabs: basicTabs,
    defaultTab: 'settings',
  },
};

export const VerticalOrientation: Story = {
  name: 'Vertical Orientation',
  render: () => {
    const tabsWithIcons: Tab[] = [
      {
        id: 'general',
        label: 'General',
        icon: <Settings size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">General Settings</h3>
            <p className="text-muted-foreground">Basic configuration options for your account.</p>
          </div>
        ),
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: <User size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p className="text-muted-foreground">Update your profile details and photo.</p>
          </div>
        ),
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <Bell size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
            <p className="text-muted-foreground">Choose how you want to be notified.</p>
          </div>
        ),
      },
      {
        id: 'security',
        label: 'Security',
        icon: <Lock size={16} />,
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Security Options</h3>
            <p className="text-muted-foreground">Manage passwords and two-factor authentication.</p>
          </div>
        ),
      },
    ];

    return <Tabs tabs={tabsWithIcons} orientation="vertical" />;
  },
};

export const LazyLoading: Story = {
  name: 'Lazy Loading',
  render: () => {
    const expensiveTabs: Tab[] = [
      {
        id: 'tab1',
        label: 'Tab 1 (Loaded)',
        content: (
          <div className="space-y-2 py-4">
            <p>This content is loaded immediately.</p>
            <p className="text-xs text-muted-foreground">
              Mounted at: {new Date().toLocaleTimeString()}
            </p>
          </div>
        ),
      },
      {
        id: 'tab2',
        label: 'Tab 2 (Lazy)',
        content: (
          <div className="space-y-2 py-4">
            <p>This content is loaded only when you click this tab.</p>
            <p className="text-xs text-muted-foreground">
              Mounted at: {new Date().toLocaleTimeString()}
            </p>
          </div>
        ),
      },
      {
        id: 'tab3',
        label: 'Tab 3 (Lazy)',
        content: (
          <div className="space-y-2 py-4">
            <p>This content is also lazy loaded.</p>
            <p className="text-xs text-muted-foreground">
              Mounted at: {new Date().toLocaleTimeString()}
            </p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          With lazy loading, tab content is only mounted when you first visit it.
        </div>
        <Tabs tabs={expensiveTabs} lazy />
      </div>
    );
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    tabs: basicTabs,
    size: 'sm',
  },
};

export const MediumSize: Story = {
  name: 'Medium Size (Default)',
  args: {
    tabs: basicTabs,
    size: 'md',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    tabs: basicTabs,
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    tabs: basicTabs,
    fullWidth: true,
  },
};

export const AllVariants: Story = {
  name: 'All Variants Comparison',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Line Variant</h4>
        <Tabs tabs={basicTabs} variant="line" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Enclosed Variant</h4>
        <Tabs tabs={basicTabs} variant="enclosed" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Pills Variant</h4>
        <Tabs tabs={basicTabs} variant="pills" />
      </div>
    </div>
  ),
};

export const RichContent: Story = {
  name: 'Rich Content',
  render: () => {
    const richTabs: Tab[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Settings size={16} />,
        content: (
          <div className="space-y-4 py-4">
            <h3 className="text-xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <div className="text-2xl font-bold">{i * 123}</div>
                  <div className="text-sm text-muted-foreground">Metric {i}</div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              Your dashboard contains important metrics and insights.
            </p>
          </div>
        ),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: <Bell size={16} />,
        badge: <Badge color="success">New</Badge>,
        content: (
          <div className="space-y-4 py-4">
            <h3 className="text-xl font-bold">Analytics</h3>
            <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
              Chart placeholder
            </div>
            <div className="flex gap-4">
              <Button>Export Data</Button>
              <Button variant="outline">Customize</Button>
            </div>
          </div>
        ),
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: <User size={16} />,
        content: (
          <div className="space-y-4 py-4">
            <h3 className="text-xl font-bold">Reports</h3>
            <p className="text-muted-foreground">Generate and download custom reports.</p>
            <div className="space-y-2">
              {['Monthly Report', 'Quarterly Summary', 'Annual Overview'].map((report) => (
                <div
                  key={report}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <span>{report}</span>
                  <Button size="sm" variant="ghost">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ];

    return <Tabs tabs={richTabs} variant="enclosed" />;
  },
};
