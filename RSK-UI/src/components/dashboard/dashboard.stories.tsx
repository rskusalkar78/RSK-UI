import type { Meta, StoryObj } from '@storybook/react';
import {
  DollarSign,
  Users,
  Activity,
  ShoppingCart,
  ArrowUpRight,
  Filter,
  Download,
} from 'lucide-react';
import { AnalyticsCard } from './analytics-card';
import { ChartsWrapper } from './charts-wrapper';
import { ProfileCard } from './profile-card';
import { NotificationPanel } from './notification-panel';
import { ActivityFeed } from './activity-feed';
import { MetricsGrid } from './metrics-grid';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';

const meta = {
  title: 'Components/Dashboard/Overview',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

// Helper formatters
const formatThousands = (val: number) => `$${val / 1000}k`;

// Sample Chart Data
const sampleRevenueData = [
  { name: 'Jan', Revenue: 12400, Expense: 8200 },
  { name: 'Feb', Revenue: 15600, Expense: 9400 },
  { name: 'Mar', Revenue: 18900, Expense: 10100 },
  { name: 'Apr', Revenue: 22400, Expense: 11200 },
  { name: 'May', Revenue: 28100, Expense: 13500 },
  { name: 'Jun', Revenue: 34200, Expense: 15200 },
  { name: 'Jul', Revenue: 42100, Expense: 17800 },
];

const samplePieData = [
  { name: 'Direct', value: 4400 },
  { name: 'Organic Search', value: 3200 },
  { name: 'Referral', value: 1800 },
  { name: 'Social', value: 1200 },
];

// Sample Notifications
const sampleNotifications = [
  {
    id: '1',
    title: 'High CPU Usage Alert',
    description: 'Server node us-east-1 reached 92% utilization.',
    timestamp: '2m ago',
    read: false,
    type: 'warning' as const,
    category: 'system' as const,
  },
  {
    id: '2',
    title: 'New Enterprise Plan Purchase',
    description: 'Acme Corp subscribed to Enterprise Annual plan ($48,000/yr).',
    timestamp: '15m ago',
    read: false,
    type: 'success' as const,
    category: 'system' as const,
  },
  {
    id: '3',
    title: 'Sarah Chen mentioned you',
    description: 'In PR #182: "Please review the updated Recharts wrapper component."',
    timestamp: '1h ago',
    read: true,
    type: 'mention' as const,
    category: 'mentions' as const,
  },
  {
    id: '4',
    title: 'API Rate Limit Reached',
    description: 'Client app "Analytics-Bot" triggered 10k requests/min threshold.',
    timestamp: '3h ago',
    read: true,
    type: 'error' as const,
    category: 'system' as const,
  },
];

// Sample Activities
const sampleActivities = [
  {
    id: '1',
    user: { name: 'Sarah Chen', avatarFallback: 'SC' },
    action: 'deployed release',
    target: 'v2.4.0 to Production',
    timestamp: '10 mins ago',
    type: 'status' as const,
    tags: ['production', 'release'],
  },
  {
    id: '2',
    user: { name: 'Marcus Vance', avatarFallback: 'MV' },
    action: 'pushed 3 commits to',
    target: 'main',
    timestamp: '45 mins ago',
    type: 'commit' as const,
    metadata: (
      <code className="text-[11px] font-mono text-primary-600 dark:text-primary-400">
        feat(charts): add custom SaaS tooltip and legends
      </code>
    ),
  },
  {
    id: '3',
    user: { name: 'Elena Rostova', avatarFallback: 'ER' },
    action: 'commented on issue',
    target: '#349 Recharts dark mode',
    timestamp: '2 hours ago',
    type: 'comment' as const,
    metadata: 'Looks great! All HSL CSS tokens align properly with light and dark mode.',
  },
];

/** Story 1: Analytics Cards Showcase */
export const AnalyticsCards: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Analytics Cards</h2>
      <MetricsGrid columns={4}>
        <AnalyticsCard
          title="Total Revenue"
          value="$45,231.89"
          trend={14.2}
          trendLabel="vs last month"
          icon={<DollarSign className="h-5 w-5" />}
          variant="primary"
          sparklineData={[30, 42, 38, 55, 68, 80, 95]}
        />
        <AnalyticsCard
          title="Active Customers"
          value="2,420"
          trend={8.1}
          trendLabel="vs last month"
          icon={<Users className="h-5 w-5" />}
          variant="success"
          sparklineData={[1200, 1500, 1800, 2100, 2420]}
        />
        <AnalyticsCard
          title="Conversion Rate"
          value="3.42%"
          trend={-1.4}
          trendLabel="vs last month"
          icon={<Activity className="h-5 w-5" />}
          variant="warning"
          sparklineData={[4.2, 4.0, 3.8, 3.5, 3.42]}
        />
        <AnalyticsCard
          title="Pending Orders"
          value="18"
          trend={-24.0}
          trendLabel="vs last week"
          icon={<ShoppingCart className="h-5 w-5" />}
          variant="destructive"
          progress={72}
        />
      </MetricsGrid>
    </div>
  ),
};

/** Story 2: Charts Wrapper Showcase */
export const Charts: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Charts Wrapper (Recharts)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartsWrapper
            title="Revenue & Expense Growth"
            description="Monthly financial metrics breakdown"
            type="area"
            data={sampleRevenueData}
            series={[
              { key: 'Revenue', name: 'Revenue', color: '#8b5cf6' },
              { key: 'Expense', name: 'Expense', color: '#ec4899' },
            ]}
            timeRanges={['7D', '30D', '90D', '1Y']}
            yAxisFormatter={formatThousands}
            action={
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            }
          />
        </div>

        <div>
          <ChartsWrapper
            title="Acquisition Channels"
            description="Traffic distribution"
            type="pie"
            data={samplePieData}
            dataKey="name"
            series={[{ key: 'value', name: 'Sessions' }]}
            height={320}
          />
        </div>
      </div>
    </div>
  ),
};

/** Story 3: Profile Card Showcase */
export const ProfileCards: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Profile Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <ProfileCard
          name="Alex Rivera"
          role="VP of Engineering"
          email="alex.rivera@saas.io"
          location="San Francisco, CA"
          bio="Building high-scale cloud platforms and reactive user interfaces. Passionate about design systems and open source."
          status="online"
          stats={[
            { label: 'Projects', value: '48' },
            { label: 'Team', value: '16' },
            { label: 'Rating', value: '4.95' },
          ]}
          primaryActionText="Send Message"
          onPrimaryAction={() => alert('Message Sent')}
          headerAction={
            <Badge variant="solid" color="primary">
              PRO
            </Badge>
          }
        />

        <ProfileCard
          variant="glass"
          name="Sophia Taylor"
          role="Product Designer"
          email="sophia@design.co"
          location="London, UK"
          status="away"
          stats={[
            { label: 'Designs', value: '124' },
            { label: 'Figma', value: '89' },
            { label: 'Stars', value: '2.1k' },
          ]}
          primaryActionText="Follow Profile"
          onPrimaryAction={() => alert('Followed')}
        />
      </div>
    </div>
  ),
};

/** Story 4: Notification Panel Showcase */
export const NotificationPanels: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Notification Panel</h2>
      <div className="max-w-md">
        <NotificationPanel
          items={sampleNotifications}
          onMarkAllAsRead={() => alert('Marked all as read')}
          onItemClick={(item) => alert(`Clicked: ${item.title}`)}
          onItemDelete={(id) => alert(`Deleted item ${id}`)}
        />
      </div>
    </div>
  ),
};

/** Story 5: Activity Feed Showcase */
export const ActivityFeeds: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Activity Feed</h2>
      <div className="max-w-lg">
        <ActivityFeed
          items={sampleActivities}
          hasMore
          onLoadMore={() => alert('Loading more activity...')}
        />
      </div>
    </div>
  ),
};

/** Story 6: Full SaaS Dashboard View */
export const FullSaaSDashboard: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Dashboard Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Executive Dashboard</h1>
          <p className="text-xs text-muted-foreground">
            Real-time performance analytics & system metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Button variant="solid" size="sm" className="gap-1.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <MetricsGrid columns={4}>
        <AnalyticsCard
          title="Monthly Recurring Revenue"
          value="$128,450"
          trend={18.4}
          trendLabel="vs last month"
          icon={<DollarSign className="h-5 w-5" />}
          variant="primary"
          sparklineData={[80, 95, 110, 105, 120, 135, 150]}
        />
        <AnalyticsCard
          title="Active Subscriptions"
          value="4,890"
          trend={12.1}
          trendLabel="vs last month"
          icon={<Users className="h-5 w-5" />}
          variant="success"
          sparklineData={[3800, 4100, 4300, 4550, 4890]}
        />
        <AnalyticsCard
          title="Churn Rate"
          value="1.12%"
          trend={-0.4}
          trendLabel="vs last month"
          icon={<Activity className="h-5 w-5" />}
          variant="glass"
          progress={15}
        />
        <AnalyticsCard
          title="Net Promoter Score"
          value="68"
          trend={5.0}
          trendLabel="vs last quarter"
          icon={<ShoppingCart className="h-5 w-5" />}
          variant="accent"
          sparklineData={[52, 58, 60, 63, 68]}
        />
      </MetricsGrid>

      {/* Main Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartsWrapper
            title="Revenue & Expense Growth"
            description="Monthly financial metrics breakdown"
            type="area"
            data={sampleRevenueData}
            series={[
              { key: 'Revenue', name: 'Revenue ($)', color: '#8b5cf6' },
              { key: 'Expense', name: 'Expense ($)', color: '#ec4899' },
            ]}
            timeRanges={['7D', '30D', '90D', '1Y']}
            yAxisFormatter={formatThousands}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartsWrapper
              title="Bar Chart Performance"
              type="bar"
              data={sampleRevenueData.slice(0, 5)}
              series={[{ key: 'Revenue', name: 'Revenue', color: '#10b981' }]}
              height={240}
            />
            <ActivityFeed items={sampleActivities} />
          </div>
        </div>

        {/* Right Sidebar: Profile & Notifications */}
        <div className="space-y-6">
          <ProfileCard
            name="Rohan Usalkar"
            role="Lead SaaS Architect"
            email="rohan@rsk.ui"
            location="San Francisco, CA"
            status="online"
            stats={[
              { label: 'Apps', value: '12' },
              { label: 'Users', value: '45k' },
              { label: 'Uptime', value: '99.9%' },
            ]}
          />
          <NotificationPanel items={sampleNotifications} />
        </div>
      </div>
    </div>
  ),
};
