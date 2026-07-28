import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<NonNullable<ProgressProps['size']>, string> = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, label, size = 'md', className, ...props },
  ref
) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percent = max === 0 ? 0 : (safeValue / max) * 100;

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        {label ? <span className="text-sm font-medium">{label}</span> : null}
        <span className="text-sm text-muted-foreground">{Math.round(percent)}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        aria-label={label}
        className={cn(
          'mt-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
          sizeStyles[size]
        )}
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
});

Progress.displayName = 'Progress';
