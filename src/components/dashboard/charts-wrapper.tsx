import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { cn } from '../../lib/utils';
import { Skeleton } from '../feedback/skeleton';
import { EmptyState } from '../feedback/empty-state';

export const DEFAULT_CHART_COLORS = [
  '#8b5cf6',
  '#6366f1',
  '#ec4899',
  '#10b981',
  '#f59e0b',
  '#3b82f6',
];

export interface ChartSeries {
  key: string;
  name: string;
  color?: string;
}

export type ChartType = 'area' | 'line' | 'bar' | 'pie';

export interface ChartsWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Chart Title */
  title?: ReactNode;
  /** Subtitle / Description text */
  description?: ReactNode;
  /** Chart height in pixels (default 320) */
  height?: number;
  /** Preset chart type if using data prop instead of children */
  type?: ChartType;
  /** Data array for preset chart rendering */
  data?: Record<string, unknown>[];
  /** Data key for X-Axis (default 'name' or 'label') */
  dataKey?: string;
  /** Series definitions for area/line/bar charts */
  series?: ChartSeries[];
  /** Colors array for chart series */
  colors?: string[];
  /** Available time range pill buttons (e.g. ['7D', '30D', '90D', '1Y']) */
  timeRanges?: string[];
  /** Active time range selected */
  selectedTimeRange?: string;
  /** Callback on time range selection */
  onTimeRangeChange?: (range: string) => void;
  /** Header right action node (e.g. filter dropdown, export button) */
  action?: ReactNode;
  /** Footer content node below chart */
  footer?: ReactNode;
  /** Show horizontal grid lines */
  grid?: boolean;
  /** Format function for Y axis numbers */
  yAxisFormatter?: (value: number) => string;
  /** Format function for X axis labels */
  xAxisFormatter?: (value: string | number) => string;
  /** Format function for tooltip values */
  tooltipFormatter?: (value: number | string, name: string) => [string, string];
  /** Loading skeleton state */
  loading?: boolean;
  /** Empty data state */
  empty?: boolean;
  /** Custom Recharts elements as children */
  children?: ReactNode;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number | string;
    name?: string;
    dataKey?: string | number;
    color?: string;
    fill?: string;
  }>;
  label?: string | number;
  valueFormatter?: (val: number | string, name: string) => [string, string];
}

/** Custom SaaS Styled Recharts Tooltip */
export function CustomChartTooltip({ active, payload, label, valueFormatter }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-border bg-popover/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md text-popover-foreground text-xs font-medium space-y-1.5 min-w-[140px] z-50">
      {label !== undefined && (
        <div className="font-semibold border-b border-border/50 pb-1 text-foreground">
          {String(label)}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((item, idx: number) => {
          const rawValue = item.value ?? '';
          const rawName = String(item.name || item.dataKey || '');
          const formatted = valueFormatter
            ? valueFormatter(rawValue, rawName)
            : [String(rawValue), rawName];
          return (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color || item.fill || DEFAULT_CHART_COLORS[0] }}
                />
                <span className="text-muted-foreground">{formatted[1] || item.name}</span>
              </div>
              <span className="font-semibold text-foreground">{formatted[0]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ChartsWrapper = forwardRef<HTMLDivElement, ChartsWrapperProps>(function ChartsWrapper(
  {
    title,
    description,
    height = 320,
    type = 'area',
    data,
    dataKey = 'name',
    series = [],
    colors = DEFAULT_CHART_COLORS,
    timeRanges,
    selectedTimeRange,
    onTimeRangeChange,
    action,
    footer,
    grid = true,
    yAxisFormatter,
    xAxisFormatter,
    tooltipFormatter,
    loading = false,
    empty = false,
    children,
    className,
    ...props
  },
  ref
) {
  const [internalTimeRange, setInternalTimeRange] = useState<string>(
    selectedTimeRange || (timeRanges && timeRanges.length > 0 ? (timeRanges[0] ?? '') : '')
  );

  const activeRange = selectedTimeRange !== undefined ? selectedTimeRange : internalTimeRange;

  const handleRangeChange = (range: string) => {
    setInternalTimeRange(range);
    onTimeRangeChange?.(range);
  };

  const isDataEmpty = empty || (!children && (!data || data.length === 0));

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-xs transition-all duration-200',
        className
      )}
      {...props}
    >
      {(title || description || timeRanges || action) && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {timeRanges && timeRanges.length > 0 && (
              <div className="inline-flex rounded-xl bg-muted p-1 text-xs">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleRangeChange(range)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-medium transition-all duration-150',
                      activeRange === range
                        ? 'bg-background text-foreground shadow-xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
            {action}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-end space-y-3" style={{ height }}>
          <Skeleton className="w-full" style={{ height: height - 40 }} />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      ) : isDataEmpty ? (
        <div className="flex items-center justify-center" style={{ height }}>
          <EmptyState
            title="No chart data available"
            description="There are no data points to display for the selected filter."
          />
        </div>
      ) : (
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            {children ? (
              (children as ReactElement)
            ) : type === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {series.map((s, idx) => {
                    const color = s.color || colors[idx % colors.length];
                    return (
                      <linearGradient
                        key={s.key}
                        id={`gradient-${s.key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                      </linearGradient>
                    );
                  })}
                </defs>
                {grid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    opacity={0.5}
                  />
                )}
                <XAxis
                  dataKey={dataKey}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={xAxisFormatter}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={yAxisFormatter}
                />
                <Tooltip content={<CustomChartTooltip valueFormatter={tooltipFormatter} />} />
                {series.map((s, idx) => {
                  const color = s.color || colors[idx % colors.length];
                  return (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      name={s.name}
                      stroke={color}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={`url(#gradient-${s.key})`}
                    />
                  );
                })}
              </AreaChart>
            ) : type === 'line' ? (
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                {grid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    opacity={0.5}
                  />
                )}
                <XAxis
                  dataKey={dataKey}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={xAxisFormatter}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={yAxisFormatter}
                />
                <Tooltip content={<CustomChartTooltip valueFormatter={tooltipFormatter} />} />
                {series.map((s, idx) => {
                  const color = s.color || colors[idx % colors.length];
                  return (
                    <Line
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      name={s.name}
                      stroke={color}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  );
                })}
              </LineChart>
            ) : type === 'bar' ? (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                {grid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    opacity={0.5}
                  />
                )}
                <XAxis
                  dataKey={dataKey}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={xAxisFormatter}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={yAxisFormatter}
                />
                <Tooltip content={<CustomChartTooltip valueFormatter={tooltipFormatter} />} />
                {series.map((s, idx) => {
                  const color = s.color || colors[idx % colors.length];
                  return (
                    <Bar
                      key={s.key}
                      dataKey={s.key}
                      name={s.name}
                      fill={color}
                      radius={[6, 6, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            ) : (
              <PieChart>
                <Tooltip content={<CustomChartTooltip valueFormatter={tooltipFormatter} />} />
                <Pie
                  data={data}
                  dataKey={series[0]?.key || 'value'}
                  nameKey={dataKey}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {data?.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {footer && (
        <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
});

ChartsWrapper.displayName = 'ChartsWrapper';
