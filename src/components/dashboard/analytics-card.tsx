import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../feedback/skeleton';
import { EmptyState } from '../feedback/empty-state';

export type AnalyticsCardVariant =
  'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'glass';

export interface SparklinePoint {
  value: number;
}

export interface AnalyticsCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title' | 'prefix'
> {
  /** KPI Metric title header */
  title: ReactNode;
  /** Primary metric value (e.g. "$45,231" or 94.2) */
  value?: ReactNode;
  /** Optional icon displayed in top right or next to title */
  icon?: ReactNode;
  /** Optional prefix string/node before value (e.g. "$") */
  prefix?: ReactNode;
  /** Optional suffix string/node after value (e.g. "USD" or "/mo") */
  suffix?: ReactNode;
  /** Numerical percentage or value of trend (e.g. 12.5) */
  trend?: number;
  /** Label accompanying the trend (e.g. "vs last month") */
  trendLabel?: ReactNode;
  /** Explicit trend direction if not inferred from positive/negative `trend` */
  trendDirection?: 'up' | 'down' | 'neutral';
  /** Secondary text description underneath title or metric */
  description?: ReactNode;
  /** Optional badge or status tag at top right */
  badge?: ReactNode;
  /** Accent variant style */
  variant?: AnalyticsCardVariant;
  /** Sparkline array data points for a mini line visualization */
  sparklineData?: number[];
  /** Progress percentage bar (0 to 100) */
  progress?: number;
  /** Footer content slot */
  footer?: ReactNode;
  /** Loading skeleton state */
  loading?: boolean;
  /** Empty state indicator */
  empty?: boolean;
  /** Action node top right (e.g. menu button or link) */
  action?: ReactNode;
}

const variantStyles: Record<AnalyticsCardVariant, string> = {
  default:
    'bg-card text-card-foreground border-border hover:border-neutral-300 dark:hover:border-neutral-700',
  primary:
    'bg-primary-500/5 text-card-foreground border-primary-200 dark:border-primary-800/60 hover:border-primary-400',
  secondary:
    'bg-secondary-500/5 text-card-foreground border-secondary-200 dark:border-secondary-800/60 hover:border-secondary-400',
  accent:
    'bg-accent-500/5 text-card-foreground border-accent-200 dark:border-accent-800/60 hover:border-accent-400',
  success:
    'bg-success-500/5 text-card-foreground border-success-200 dark:border-success-800/60 hover:border-success-400',
  warning:
    'bg-warning-500/5 text-card-foreground border-warning-200 dark:border-warning-800/60 hover:border-warning-400',
  destructive:
    'bg-destructive-500/5 text-card-foreground border-destructive-200 dark:border-destructive-800/60 hover:border-destructive-400',
  glass:
    'bg-background/60 backdrop-blur-md text-card-foreground border-border/80 shadow-md hover:border-primary-500/30',
};

const iconVariantBg: Record<AnalyticsCardVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400',
  secondary: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400',
  accent: 'bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400',
  success: 'bg-success-100 text-success-600 dark:bg-success-950 dark:text-success-400',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-950 dark:text-warning-400',
  destructive:
    'bg-destructive-100 text-destructive-600 dark:bg-destructive-950 dark:text-destructive-400',
  glass: 'bg-primary-500/10 text-primary-500',
};

/** Mini inline SVG Sparkline Component */
function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 32;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  const strokeColor = positive ? '#10b981' : '#ef4444';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-8 w-24 overflow-visible">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export const AnalyticsCard = forwardRef<HTMLDivElement, AnalyticsCardProps>(function AnalyticsCard(
  {
    title,
    value,
    icon,
    prefix,
    suffix,
    trend,
    trendLabel,
    trendDirection,
    description,
    badge,
    variant = 'default',
    sparklineData,
    progress,
    footer,
    loading = false,
    empty = false,
    action,
    className,
    ...props
  },
  ref
) {
  const effectiveDirection =
    trendDirection ??
    (trend !== undefined ? (trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral') : undefined);

  const isPositiveTrend = effectiveDirection === 'up';
  const isNegativeTrend = effectiveDirection === 'down';

  return (
    <div
      ref={ref}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all duration-200 hover:shadow-md',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-9 rounded-xl" />
          </div>
          <Skeleton className="h-8 w-36" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ) : empty ? (
        <EmptyState
          title="No metric data"
          description="Analytics are currently unavailable for this metric."
        />
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {title}
              </span>
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {badge}
              {action}
              {icon && (
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
                    iconVariantBg[variant]
                  )}
                >
                  {icon}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1">
              {prefix && <span className="text-xl font-bold text-muted-foreground">{prefix}</span>}
              {value !== undefined && (
                <span className="text-3xl font-extrabold tracking-tight text-foreground">
                  {value}
                </span>
              )}
              {suffix && (
                <span className="text-sm font-medium text-muted-foreground">{suffix}</span>
              )}
            </div>

            {sparklineData && sparklineData.length > 1 && (
              <MiniSparkline data={sparklineData} positive={isPositiveTrend || !isNegativeTrend} />
            )}
          </div>

          {progress !== undefined && (
            <div className="mt-3 space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    isNegativeTrend ? 'bg-destructive-500' : 'bg-primary-500'
                  )}
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}

          {(trend !== undefined || trendLabel || effectiveDirection) && (
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium">
              {effectiveDirection && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold',
                    isPositiveTrend && 'bg-success-500/15 text-success-700 dark:text-success-400',
                    isNegativeTrend &&
                      'bg-destructive-500/15 text-destructive-700 dark:text-destructive-400',
                    effectiveDirection === 'neutral' && 'bg-muted text-muted-foreground'
                  )}
                >
                  {isPositiveTrend && <TrendingUp className="h-3.5 w-3.5" />}
                  {isNegativeTrend && <TrendingDown className="h-3.5 w-3.5" />}
                  {effectiveDirection === 'neutral' && <Minus className="h-3.5 w-3.5" />}
                  {trend !== undefined && `${trend > 0 ? '+' : ''}${trend}%`}
                </span>
              )}

              {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
            </div>
          )}

          {footer && (
            <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
              {footer}
            </div>
          )}
        </>
      )}
    </div>
  );
});

AnalyticsCard.displayName = 'AnalyticsCard';
