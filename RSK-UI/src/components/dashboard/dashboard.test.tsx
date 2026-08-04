import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AnalyticsCard } from './analytics-card';
import { ChartsWrapper } from './charts-wrapper';
import { ProfileCard } from './profile-card';
import { NotificationPanel } from './notification-panel';
import { ActivityFeed } from './activity-feed';
import { MetricsGrid } from './metrics-grid';

// Mock ResizeObserver for Recharts / ResponsiveContainer in jsdom
beforeEach(() => {
  (globalThis as any).ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

describe('Dashboard Components', () => {
  describe('AnalyticsCard', () => {
    it('renders title, value, and trend percentage', () => {
      render(
        <AnalyticsCard
          title="Total Revenue"
          value="$45,231.89"
          trend={14.2}
          trendLabel="vs last month"
        />
      );

      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
      expect(screen.getByText('$45,231.89')).toBeInTheDocument();
      expect(screen.getByText('+14.2%')).toBeInTheDocument();
      expect(screen.getByText('vs last month')).toBeInTheDocument();
    });

    it('renders loading skeleton when loading prop is true', () => {
      render(<AnalyticsCard title="Total Sales" loading />);

      expect(screen.queryByText('Total Sales')).not.toBeInTheDocument();
    });

    it('renders empty state when empty prop is true', () => {
      render(<AnalyticsCard title="Total Sales" empty />);

      expect(screen.getByText('No metric data')).toBeInTheDocument();
    });
  });

  describe('ChartsWrapper', () => {
    it('renders title, description, and time range pills', async () => {
      const user = userEvent.setup();
      const onRangeChange = vi.fn();

      render(
        <ChartsWrapper
          title="Revenue Overview"
          description="Monthly revenue data"
          timeRanges={['7D', '30D', '90D']}
          selectedTimeRange="30D"
          onTimeRangeChange={onRangeChange}
        />
      );

      expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
      expect(screen.getByText('Monthly revenue data')).toBeInTheDocument();

      const pill = screen.getByRole('button', { name: '90D' });
      await user.click(pill);
      expect(onRangeChange).toHaveBeenCalledWith('90D');
    });

    it('renders empty state when empty prop is true', () => {
      render(<ChartsWrapper title="Empty Chart" empty />);

      expect(screen.getByText('No chart data available')).toBeInTheDocument();
    });
  });

  describe('ProfileCard', () => {
    it('renders user details, status, stats, and handles primary action click', async () => {
      const user = userEvent.setup();
      const onPrimary = vi.fn();

      render(
        <ProfileCard
          name="Sarah Chen"
          role="Lead Engineer"
          email="sarah@example.com"
          location="San Francisco, CA"
          stats={[
            { label: 'Projects', value: '42' },
            { label: 'Rating', value: '4.9' },
          ]}
          primaryActionText="Connect"
          onPrimaryAction={onPrimary}
        />
      );

      expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
      expect(screen.getByText('Lead Engineer')).toBeInTheDocument();
      expect(screen.getByText('sarah@example.com')).toBeInTheDocument();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'Connect' });
      await user.click(button);
      expect(onPrimary).toHaveBeenCalledTimes(1);
    });
  });

  describe('NotificationPanel', () => {
    const notifications = [
      {
        id: 'n1',
        title: 'Deployment Success',
        description: 'Version 2.4 deployed.',
        timestamp: '5m ago',
        read: false,
        category: 'system' as const,
      },
      {
        id: 'n2',
        title: 'Mention',
        description: 'Sarah mentioned you.',
        timestamp: '1h ago',
        read: true,
        category: 'mentions' as const,
      },
    ];

    it('renders notification items and unread badge', () => {
      render(<NotificationPanel items={notifications} />);

      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Unread count badge
      expect(screen.getByText('Deployment Success')).toBeInTheDocument();
      expect(screen.getByText('Version 2.4 deployed.')).toBeInTheDocument();
    });

    it('filters items by tab', async () => {
      const user = userEvent.setup();
      render(<NotificationPanel items={notifications} />);

      const unreadTab = screen.getByRole('button', { name: 'unread' });
      await user.click(unreadTab);

      expect(screen.getByText('Deployment Success')).toBeInTheDocument();
      expect(screen.queryByText('Mention')).not.toBeInTheDocument();
    });
  });

  describe('ActivityFeed', () => {
    const activities = [
      {
        id: 'a1',
        user: { name: 'Alex Rivera' },
        action: 'created branch',
        target: 'feature/auth',
        timestamp: '10m ago',
      },
    ];

    it('renders activity feed items and load more button', async () => {
      const user = userEvent.setup();
      const onLoadMore = vi.fn();

      render(<ActivityFeed items={activities} hasMore onLoadMore={onLoadMore} />);

      expect(screen.getByText('Activity Feed')).toBeInTheDocument();
      expect(screen.getByText('Alex Rivera')).toBeInTheDocument();
      expect(screen.getByText('created branch')).toBeInTheDocument();
      expect(screen.getByText('feature/auth')).toBeInTheDocument();

      const loadMoreBtn = screen.getByRole('button', { name: /Load More Activity/i });
      await user.click(loadMoreBtn);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('MetricsGrid', () => {
    it('renders grid header and children', () => {
      render(
        <MetricsGrid title="Key Metrics" columns={3}>
          <div>Card 1</div>
          <div>Card 2</div>
        </MetricsGrid>
      );

      expect(screen.getByText('Key Metrics')).toBeInTheDocument();
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
    });
  });
});
