import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  Circle,
  AlertCircle,
  Info,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Skeleton } from '../feedback/skeleton';
import { EmptyState } from '../feedback/empty-state';

export type NotificationCategory = 'all' | 'unread' | 'system' | 'mentions';
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'mention';

export interface NotificationItem {
  id: string;
  title: string;
  description: ReactNode;
  timestamp: string;
  read: boolean;
  type?: NotificationType;
  category?: 'system' | 'mentions' | 'user';
  avatarUrl?: string;
  avatarFallback?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface NotificationPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Notification items list */
  items?: NotificationItem[];
  /** Panel Title (default "Notifications") */
  title?: ReactNode;
  /** Callback when user clicks "Mark all as read" */
  onMarkAllAsRead?: () => void;
  /** Callback when user marks individual notification as read */
  onMarkAsRead?: (id: string) => void;
  /** Callback when user deletes / dismisses a notification */
  onItemDelete?: (id: string) => void;
  /** Callback when user clicks on a notification item */
  onItemClick?: (item: NotificationItem) => void;
  /** Max scroll height for notifications container (default "max-h-[380px]") */
  maxHeight?: string;
  /** Show filter tab bar */
  showTabs?: boolean;
  /** Loading state */
  loading?: boolean;
}

const typeIcons: Record<NotificationType, ReactNode> = {
  info: <Info className="h-4 w-4 text-info-500" />,
  success: <CheckCircle2 className="h-4 w-4 text-success-500" />,
  warning: <AlertCircle className="h-4 w-4 text-warning-500" />,
  error: <AlertCircle className="h-4 w-4 text-destructive-500" />,
  mention: <MessageSquare className="h-4 w-4 text-primary-500" />,
};

export const NotificationPanel = forwardRef<HTMLDivElement, NotificationPanelProps>(
  function NotificationPanel(
    {
      items = [],
      title = 'Notifications',
      onMarkAllAsRead,
      onMarkAsRead,
      onItemDelete,
      onItemClick,
      maxHeight = 'max-h-[380px]',
      showTabs = true,
      loading = false,
      className,
      ...props
    },
    ref
  ) {
    const [activeTab, setActiveTab] = useState<NotificationCategory>('all');

    const unreadCount = items.filter((item) => !item.read).length;

    const filteredItems = items.filter((item) => {
      if (activeTab === 'unread') return !item.read;
      if (activeTab === 'system') return item.category === 'system';
      if (activeTab === 'mentions') return item.category === 'mentions' || item.type === 'mention';
      return true;
    });

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
              <Bell className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              {title}
              {unreadCount > 0 && (
                <Badge color="primary" size="sm" variant="solid">
                  {unreadCount}
                </Badge>
              )}
            </h3>
          </div>

          {unreadCount > 0 && onMarkAllAsRead && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {showTabs && (
          <div className="flex border-b border-border bg-muted/40 px-3 py-1.5 text-xs font-medium gap-1">
            {(['all', 'unread', 'system', 'mentions'] as NotificationCategory[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-lg px-2.5 py-1 capitalize transition-colors',
                  activeTab === tab
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className={cn('overflow-y-auto divide-y divide-border/50', maxHeight)}>
          {loading ? (
            <div className="space-y-4 p-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-6 text-center">
              <EmptyState
                title="All caught up!"
                description={
                  activeTab === 'unread'
                    ? 'You have no unread notifications.'
                    : 'No notifications found for this category.'
                }
              />
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={cn(
                  'group relative flex items-start gap-3 p-4 text-xs transition-colors hover:bg-muted/50 cursor-pointer',
                  !item.read && 'bg-primary-500/5'
                )}
              >
                {!item.read && (
                  <span className="absolute left-2 top-5 h-2 w-2 rounded-full bg-primary-500" />
                )}

                <div className="mt-0.5 shrink-0">{typeIcons[item.type || 'info']}</div>

                <div className="flex-1 space-y-1 pr-14">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  </div>

                  <div className="text-muted-foreground leading-relaxed">{item.description}</div>

                  {item.actionLabel && item.onAction && (
                    <div className="pt-1">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onAction?.();
                        }}
                      >
                        {item.actionLabel}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!item.read && onMarkAsRead && (
                    <button
                      type="button"
                      title="Mark as read"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(item.id);
                      }}
                      className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Circle className="h-3.5 w-3.5 fill-current" />
                    </button>
                  )}
                  {onItemDelete && (
                    <button
                      type="button"
                      title="Delete notification"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemDelete(item.id);
                      }}
                      className="p-1 rounded-md text-muted-foreground hover:bg-destructive-500/10 hover:text-destructive-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);

NotificationPanel.displayName = 'NotificationPanel';
