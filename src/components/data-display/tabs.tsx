import { forwardRef, useState, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tab {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: ReactNode;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional badge or count */
  badge?: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Tab panel content */
  content: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of tab configurations */
  tabs: Tab[];
  /** Default active tab (uncontrolled) */
  defaultTab?: string;
  /** Active tab (controlled) */
  activeTab?: string;
  /** Callback when active tab changes */
  onChange?: (tabId: string) => void;
  /** Visual variant */
  variant?: 'line' | 'enclosed' | 'pills';
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size of tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Whether tabs should take full width */
  fullWidth?: boolean;
  /** Whether to lazy load tab content */
  lazy?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    tabs,
    defaultTab,
    activeTab: controlledActiveTab,
    onChange,
    variant = 'line',
    orientation = 'horizontal',
    size = 'md',
    fullWidth = false,
    lazy = false,
    className,
    ...props
  },
  ref
) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    defaultTab || tabs[0]?.id || ''
  );

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const [mountedTabs, setMountedTabs] = useState<Set<string>>(new Set([activeTab]));

  useEffect(() => {
    if (activeTab && lazy) {
      setMountedTabs((prev) => new Set([...prev, activeTab]));
    }
  }, [activeTab, lazy]);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;

    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }

    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string, _index: number) => {
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentIndex = enabledTabs.findIndex((tab) => tab.id === tabId);

    let nextIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
      }
    } else {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
      }
    }

    if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex !== currentIndex) {
      handleTabClick(enabledTabs[nextIndex].id);
      // Focus the next tab
      setTimeout(() => {
        const nextTabElement = document.querySelector(
          `[role="tab"][data-tab-id="${enabledTabs[nextIndex].id}"]`
        ) as HTMLElement;
        nextTabElement?.focus();
      }, 0);
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  const variantClasses = {
    line: {
      list: 'border-b border-border',
      tab: 'border-b-2 border-transparent data-[active=true]:border-primary data-[active=true]:text-primary',
      panel: 'pt-4',
    },
    enclosed: {
      list: 'border-b border-border',
      tab: 'border border-transparent rounded-t-lg data-[active=true]:border-border data-[active=true]:border-b-transparent data-[active=true]:bg-card relative top-[1px]',
      panel: 'border border-border border-t-0 rounded-b-lg p-4',
    },
    pills: {
      list: 'gap-2 p-1 bg-muted/50 rounded-lg',
      tab: 'rounded-md data-[active=true]:bg-card data-[active=true]:shadow-sm',
      panel: 'pt-4',
    },
  };

  const isVertical = orientation === 'vertical';

  return (
    <div ref={ref} className={cn('w-full', isVertical && 'flex gap-4', className)} {...props}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'flex',
          isVertical ? 'flex-col' : 'flex-row',
          variantClasses[variant].list,
          className
        )}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              data-tab-id={tab.id}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              aria-disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              data-active={isActive}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
              className={cn(
                'inline-flex items-center justify-center gap-2 font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'hover:text-foreground data-[active=false]:text-muted-foreground',
                sizeClasses[size],
                variantClasses[variant].tab,
                fullWidth && 'flex-1',
                isVertical && 'justify-start'
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span className="shrink-0">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      <div className={cn('flex-1', isVertical && 'min-w-0')}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const shouldRender = !lazy || mountedTabs.has(tab.id);

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={tab.id}
              hidden={!isActive}
              className={cn(variantClasses[variant].panel)}
            >
              {shouldRender && tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
});

Tabs.displayName = 'Tabs';
