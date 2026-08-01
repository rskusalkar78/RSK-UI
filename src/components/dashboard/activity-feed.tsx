import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  GitCommit,
  MessageSquare,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Skeleton } from '../feedback/skeleton';
import { EmptyState } from '../feedback/empty-state';

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
    avatarFallback?: string;
  };
  action: ReactNode;
  target?: ReactNode;
  timestamp: string;
  type?: 'commit' | 'comment' | 'create' | 'status' | 'alert' | 'default';
  metadata?: ReactNode;
  tags?: string[];
}

export interface ActivityFeedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title of the activity feed section */
  title?: ReactNode;
  /** Activity item entries list */
  items?: ActivityItem[];
  /** Optional callback to trigger when "Load More" is clicked */
  onLoadMore?: () => void;
  /** Whether there are more items to load */
  hasMore?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Action slot in feed header */
  headerAction?: ReactNode;
}

const typeIconMap: Record<string, ReactNode> = {
  commit: <GitCommit className="h-3 w-3 text-primary-500" />,
  comment: <MessageSquare className="h-3 w-3 text-info-500" />,
  create: <Plus className="h-3 w-3 text-success-500" />,
  status: <CheckCircle2 className="h-3 w-3 text-success-500" />,
  alert: <AlertTriangle className="h-3 w-3 text-warning-500" />,
  default: <FileText className="h-3 w-3 text-muted-foreground" />,
};

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(function ActivityFeed(
  {
    title = 'Activity Feed',
    items = [],
    onLoadMore,
    hasMore = false,
    loading = false,
    headerAction,
    className,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-xs',
        className
      )}
      {...props}
    >
      {(title || headerAction) && (
        <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
          <h3 className="font-semibold text-foreground text-sm tracking-tight">{title}</h3>
          {headerAction}
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <div className="flex gap-4">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      ) : items.length === 0 ? (
        <EmptyState title="No recent activity" description="Activity events will appear here." />
      ) : (
        <div className="relative pl-3 space-y-6">
          <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-border/60" />

          {items.map((item, idx) => {
            const fallback =
              item.user.avatarFallback ||
              item.user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

            const iconNode = typeIconMap[item.type || 'default'] || typeIconMap.default;

            return (
              <div key={item.id || idx} className="relative flex items-start gap-4 group">
                <div className="relative z-10 shrink-0">
                  <Avatar size="sm" className="ring-2 ring-background">
                    {item.user.avatarUrl && (
                      <AvatarImage src={item.user.avatarUrl} alt={item.user.name} />
                    )}
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-card ring-1 ring-border shadow-xs">
                    {iconNode}
                  </div>
                </div>

                <div className="flex-1 space-y-1 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-foreground">{item.user.name}</span>
                      <span className="text-muted-foreground">{item.action}</span>
                      {item.target && (
                        <span className="font-medium text-foreground">{item.target}</span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{item.timestamp}</span>
                  </div>

                  {item.metadata && (
                    <div className="mt-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground border border-border/40">
                      {item.metadata}
                    </div>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag, tIdx) => (
                        <Badge key={tIdx} variant="subtle" color="neutral" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {hasMore && onLoadMore && (
        <div className="mt-6 border-t border-border/60 pt-4 text-center">
          <Button variant="ghost" size="sm" onClick={onLoadMore} className="gap-1 text-xs">
            Load More Activity
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
});

ActivityFeed.displayName = 'ActivityFeed';
