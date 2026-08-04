import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../button/button';
import { IconButton } from '../icon-button/icon-button';

export interface NavbarItem {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface NavbarProps {
  brand: ReactNode;
  items?: NavbarItem[];
  actions?: ReactNode;
  className?: string;
  mobileLabel?: string;
}

export function Navbar({
  brand,
  items = [],
  actions,
  className,
  mobileLabel = 'Toggle navigation',
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn('border-b border-border bg-background/95 backdrop-blur', className)}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold text-foreground">{brand}</div>

          <nav aria-label="Primary" className="hidden md:flex">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const content = (
                  <>
                    {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
                    <span>{item.label}</span>
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                          item.active && 'bg-muted text-foreground'
                        )}
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={item.onClick}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                          item.active && 'bg-muted text-foreground'
                        )}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {actions ? <div className="hidden sm:block">{actions}</div> : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="navbar-mobile-menu"
            aria-label={mobileLabel}
            leftIcon={open ? <X size={16} /> : <Menu size={16} />}
          >
            Menu
          </Button>
        </div>
      </div>

      {open ? (
        <div id="navbar-mobile-menu" className="border-t border-border px-4 py-3 md:hidden">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {items.map((item) => {
                const content = (
                  <>
                    {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
                    <span>{item.label}</span>
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                          item.active && 'bg-muted text-foreground'
                        )}
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          item.onClick?.();
                          setOpen(false);
                        }}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                          item.active && 'bg-muted text-foreground'
                        )}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            {actions ? <div className="mt-3 border-t border-border pt-3">{actions}</div> : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export interface SidebarItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface SidebarProps {
  title?: ReactNode;
  items?: SidebarItem[];
  footer?: ReactNode;
  className?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
}

export function Sidebar({
  title,
  items = [],
  footer,
  className,
  collapsed,
  defaultCollapsed = false,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internalCollapsed;

  return (
    <aside
      className={cn(
        'flex min-h-[20rem] flex-col border-r border-border bg-card/70 p-4 text-card-foreground shadow-sm',
        isCollapsed ? 'w-20' : 'w-full max-w-[18rem]',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        {!isCollapsed ? (
          <div className="text-sm font-semibold text-foreground">{title ?? 'Navigation'}</div>
        ) : null}
        <IconButton
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          variant="ghost"
          size="sm"
          icon={isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          onClick={() => setInternalCollapsed((current) => !current)}
        />
      </div>

      <nav aria-label="Sidebar" className="flex h-full flex-col">
        <ul className="flex-1 space-y-1">
          {items.map((item) => {
            const contentNode = (
              <>
                {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
                {!isCollapsed ? <span>{item.label}</span> : null}
              </>
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                      item.active && 'bg-muted text-foreground'
                    )}
                  >
                    {contentNode}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                      item.active && 'bg-muted text-foreground'
                    )}
                  >
                    {contentNode}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {footer ? <div className="mt-4 border-t border-border pt-4">{footer}</div> : null}
      </nav>
    </aside>
  );
}

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  content?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ items, defaultValue, value, onValueChange, className }: TabsProps) {
  const generatedId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const selectedValue = value ?? internalValue;
  const activeItem = useMemo(
    () => items.find((item) => item.value === selectedValue) ?? items[0],
    [items, selectedValue]
  );

  const selectTab = (nextValue: string) => {
    if (!items.some((item) => item.value === nextValue)) return;
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, currentValue: string) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentIndex = enabledItems.findIndex((item) => item.value === currentValue);

    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % enabledItems.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = enabledItems.length - 1;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectTab(currentValue);
      return;
    } else {
      return;
    }

    const nextItem = enabledItems[nextIndex];
    if (nextItem) {
      selectTab(nextItem.value);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-1"
      >
        {items.map((item) => {
          const isSelected = item.value === selectedValue;
          const panelId = `${generatedId}-panel-${item.value}`;

          return (
            <button
              key={item.value}
              id={`${generatedId}-${item.value}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectTab(item.value)}
              onKeyDown={(event) => handleKeyDown(event, item.value)}
              className={cn(
                'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition',
                isSelected && 'bg-background text-foreground shadow-sm',
                !item.disabled && 'hover:bg-background/80',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {activeItem?.content ? (
        <div
          id={`${generatedId}-panel-${activeItem.value}`}
          role="tabpanel"
          aria-labelledby={`${generatedId}-${activeItem.value}`}
          className="mt-4 rounded-lg border border-border bg-card p-4 text-sm text-foreground"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm text-muted-foreground', className)}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = isLast ? (
            <span aria-current="page" className="font-medium text-foreground">
              {item.label}
            </span>
          ) : item.href ? (
            <a href={item.href} onClick={item.onClick} className="transition hover:text-foreground">
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="transition hover:text-foreground"
            >
              {item.label}
            </button>
          );

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {content}
              {!isLast ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

function getVisiblePages(current: number, total: number, siblingCount: number) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const start = Math.max(2, current - siblingCount);
  const end = Math.min(total - 1, current + siblingCount);
  const pages: Array<number | 'ellipsis'> = [1];

  if (start > 2) pages.push('ellipsis');
  for (let index = start; index <= end; index += 1) pages.push(index);
  if (end < total - 1) pages.push('ellipsis');
  pages.push(total);

  return pages;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  const visiblePages = getVisiblePages(page, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <ul className="flex items-center gap-1">
        {visiblePages.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                …
              </li>
            );
          }

          const isCurrent = item === page;

          return (
            <li key={item}>
              <button
                type="button"
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onPageChange(item)}
                className={cn(
                  'h-9 min-w-9 rounded-md border px-3 text-sm transition',
                  isCurrent
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                )}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}

export interface DropdownItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  shortcut?: string;
  icon?: ReactNode;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
  label?: string;
}

export function Dropdown({ trigger, items, className, label = 'Dropdown menu' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (!open) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % items.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(items.length - 1);
      } else if (event.key === 'Enter' && items[activeIndex] && !items[activeIndex].disabled) {
        event.preventDefault();
        items[activeIndex].onSelect?.();
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, items, open]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.left });
  }, [open]);

  const handleToggle = () => {
    if (!open) setActiveIndex(0);
    setOpen((current) => !current);
  };

  const triggerElement = isValidElement(trigger)
    ? cloneElement(
        trigger as ReactElement<{
          onClick?: (event: React.MouseEvent<HTMLElement>) => void;
          onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
          'aria-expanded'?: boolean;
          'aria-controls'?: string;
          'aria-haspopup'?: string;
        }>,
        {
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            handleToggle();
          },
          onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            if (
              event.key === 'ArrowDown' ||
              event.key === 'ArrowUp' ||
              event.key === 'Enter' ||
              event.key === ' '
            ) {
              event.preventDefault();
              setActiveIndex(0);
              setOpen(true);
            }
          },
          'aria-expanded': open,
          'aria-controls': menuId,
          'aria-haspopup': 'menu',
        }
      )
    : trigger;

  return (
    <>
      <span ref={triggerRef} className="inline-flex">
        {triggerElement}
      </span>

      {createPortal(
        open ? (
          <div
            id={menuId}
            role="menu"
            aria-label={label}
            className={cn(
              'fixed z-[var(--z-popover)] w-56 rounded-xl border border-border bg-popover p-1 shadow-lg',
              className
            )}
            style={{ top: position.top, left: position.left }}
          >
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={item.label}>
                  <button
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.disabled) return;
                      item.onSelect?.();
                      setOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition hover:bg-muted',
                      activeIndex === index && 'bg-muted',
                      item.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                      {item.label}
                    </span>
                    {item.shortcut ? (
                      <span className="text-xs text-muted-foreground">{item.shortcut}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null,
        document.body
      )}
    </>
  );
}

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: CommandPaletteItem[];
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function CommandPalette({
  open,
  onOpenChange,
  commands,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No commands found.',
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(() => {
    const nextQuery = query.toLowerCase();
    if (!nextQuery) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.description ?? ''}`.toLowerCase().includes(nextQuery)
    );
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (!filteredCommands.length) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % filteredCommands.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex(
          (current) => (current - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        filteredCommands[activeIndex]?.onSelect?.();
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, filteredCommands, onOpenChange, open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center bg-black/60 px-4 py-16">
      <div
        className={cn(
          'w-full max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-2xl',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" aria-hidden="true" />
          <input
            ref={inputRef}
            aria-label="Search commands"
            placeholder={placeholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </label>

        <ul className="mt-3 space-y-1" role="listbox" aria-label="Commands">
          {filteredCommands.length ? (
            filteredCommands.map((command, index) => (
              <li key={command.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  onClick={() => {
                    command.onSelect?.();
                    onOpenChange(false);
                  }}
                  className={cn(
                    'flex w-full items-start justify-between rounded-lg px-3 py-2 text-left text-sm transition',
                    activeIndex === index
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span>
                    <span className="block font-medium">{command.label}</span>
                    {command.description ? (
                      <span className="text-xs text-muted-foreground">{command.description}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="rounded-lg px-3 py-4 text-sm text-muted-foreground">{emptyMessage}</li>
          )}
        </ul>
      </div>
    </div>,
    document.body
  );
}
