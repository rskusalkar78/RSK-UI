# Dashboard Components

The Dashboard suite provides a set of reusable, accessible, responsive, and visually stunning SaaS components built with React 19, TypeScript, Lucide React icons, Tailwind CSS v4, and Recharts.

## Included Components

- **AnalyticsCard**: KPI metric card featuring trends, sparkline graphs, progress bars, loading skeletons, and accent variants (`default`, `primary`, `success`, `warning`, `destructive`, `glass`).
- **ChartsWrapper**: Flexible, responsive chart container powered by **Recharts**. Supports preset chart types (`area`, `line`, `bar`, `pie`) or custom Recharts composition, custom styled tooltips, custom legends, time range filters (`7D`, `30D`, `90D`, `1Y`), and loading/empty states.
- **ProfileCard**: SaaS profile card featuring custom banner background, user avatar with online status dot, role badge, bio, key metrics counters, and action triggers.
- **NotificationPanel**: Interactive notification center with unread counter badges, category filters (`All`, `Unread`, `System`, `Mentions`), read/unread toggles, item dismissals, and empty states.
- **ActivityFeed**: Vertical timeline displaying real-time user events, action badges, avatars, timestamps, code/metadata previews, and "Load More" pagination.
- **MetricsGrid**: Responsive multi-column grid layout wrapper tailored for metrics and analytics cards with configurable column counts and gap spacing.

## Usage Examples

### AnalyticsCard

```tsx
import { AnalyticsCard } from '@/components/dashboard';
import { DollarSign } from 'lucide-react';

<AnalyticsCard
  title="Total Revenue"
  value="$45,231.89"
  trend={14.2}
  trendLabel="vs last month"
  icon={<DollarSign className="h-5 w-5" />}
  variant="primary"
  sparklineData={[30, 45, 35, 60, 75, 90, 85, 110]}
/>;
```

### ChartsWrapper (with Recharts)

```tsx
import { ChartsWrapper } from '@/components/dashboard';

const data = [
  { name: 'Jan', Revenue: 4000, Profit: 2400 },
  { name: 'Feb', Revenue: 3000, Profit: 1398 },
  { name: 'Mar', Revenue: 9800, Profit: 2000 },
];

<ChartsWrapper
  title="Financial Performance"
  description="Monthly revenue and net profit overview"
  type="area"
  data={data}
  series={[
    { key: 'Revenue', name: 'Revenue', color: '#8b5cf6' },
    { key: 'Profit', name: 'Profit', color: '#10b981' },
  ]}
  timeRanges={['7D', '30D', '90D', '1Y']}
  yAxisFormatter={(val) => `$${val}`}
/>;
```

### ProfileCard

```tsx
import { ProfileCard } from '@/components/dashboard';

<ProfileCard
  name="Rohan Usalkar"
  role="Lead Designer"
  email="rohan@example.com"
  location="San Francisco, CA"
  status="online"
  stats={[
    { label: 'Projects', value: '34' },
    { label: 'Followers', value: '2.4k' },
    { label: 'Rating', value: '4.9' },
  ]}
  primaryActionText="Connect"
  onPrimaryAction={() => console.log('Connect clicked')}
/>;
```

### NotificationPanel

```tsx
import { NotificationPanel } from '@/components/dashboard';

const notifications = [
  {
    id: '1',
    title: 'New Deployment Successful',
    description: 'Build #402 deployed to production environment.',
    timestamp: '5m ago',
    read: false,
    type: 'success',
    category: 'system',
  },
];

<NotificationPanel items={notifications} onMarkAllAsRead={() => console.log('Mark all read')} />;
```

### ActivityFeed

```tsx
import { ActivityFeed } from '@/components/dashboard';

const activities = [
  {
    id: '1',
    user: { name: 'Sarah Chen' },
    action: 'pushed commit',
    target: 'feat/dashboard-ui',
    timestamp: '12 minutes ago',
    type: 'commit',
  },
];

<ActivityFeed items={activities} hasMore onLoadMore={() => {}} />;
```

### MetricsGrid

```tsx
import { MetricsGrid, AnalyticsCard } from '@/components/dashboard';

<MetricsGrid columns={4} gap="md" title="Key Performance Indicators">
  <AnalyticsCard title="Total Sales" value="1,429" trend={8.5} />
  <AnalyticsCard title="Active Users" value="8,921" trend={-2.1} />
  <AnalyticsCard title="Conversion Rate" value="3.42%" trend={1.2} />
  <AnalyticsCard title="Avg Session" value="4m 12s" trend={0.5} />
</MetricsGrid>;
```

## Accessibility & Responsiveness

- All interactive controls (buttons, time range pills, tab filters, dismissal triggers) feature explicit keyboard focus rings (`outline-color`, `ring-2`) and ARIA labels.
- Layouts seamlessly scale down to single-column on mobile screens (`xs` and `sm` breakpoints) and scale up to multi-column grids on desktop viewports.
- Color tokens dynamically conform to light mode and dark mode HSL variables (`bg-card`, `text-card-foreground`, `border-border`).
