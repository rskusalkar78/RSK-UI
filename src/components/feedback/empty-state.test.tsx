import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './empty-state';
import { Inbox, Plus } from 'lucide-react';

describe('EmptyState — Title', () => {
  it('renders required title in an h3', () => {
    render(<EmptyState title="No items found" />);
    const heading = screen.getByRole('heading', { level: 3, name: 'No items found' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H3');
  });

  it('applies semibold text-lg styling to title', () => {
    render(<EmptyState title="Title" />);
    const heading = screen.getByRole('heading', { level: 3, name: 'Title' });
    expect(heading).toHaveClass('text-lg');
    expect(heading).toHaveClass('font-semibold');
  });
});

describe('EmptyState — Description', () => {
  it('renders description paragraph when provided', () => {
    render(
      <EmptyState title="No projects" description="Create your first project to get started." />
    );
    expect(screen.getByText('Create your first project to get started.')).toBeInTheDocument();
    expect(screen.getByText('Create your first project to get started.').tagName).toBe('P');
  });

  it('does not render a p when description is omitted', () => {
    const { container } = render(<EmptyState title="Only title" />);
    const paragraphs = container.querySelectorAll('p.text-muted-foreground');
    expect(paragraphs).toHaveLength(0);
  });
});

describe('EmptyState — Action', () => {
  it('renders action element when provided', () => {
    render(<EmptyState title="No data" action={<button>Refresh</button>} />);
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });

  it('fires action handler when action button is clicked', async () => {
    const user = userEvent.setup();
    const onRefresh = vi.fn();
    render(
      <EmptyState title="Nothing here" action={<button onClick={onRefresh}>Refresh</button>} />
    );
    await user.click(screen.getByRole('button', { name: 'Refresh' }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('does not render action wrapper when action omitted', () => {
    const { container } = render(<EmptyState title="T" />);
    const mt6Divs = container.querySelectorAll('.mt-6');
    expect(mt6Divs).toHaveLength(0);
  });
});

describe('EmptyState — Icon', () => {
  it('renders icon when provided', () => {
    render(
      <EmptyState title="Inbox empty" icon={<Inbox data-testid="empty-icon" aria-hidden />} />
    );
    expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
  });

  it('does not render icon wrapper when icon omitted', () => {
    const { container } = render(<EmptyState title="No icon" />);
    const mb4Divs = container.querySelectorAll('.mb-4');
    expect(mb4Divs).toHaveLength(0);
  });

  it('renders custom arbitrary icon node', () => {
    const customIcon = (
      <div data-testid="custom">
        <Plus />
      </div>
    );
    render(<EmptyState title="T" icon={customIcon} />);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });
});

describe('EmptyState — forwardRef', () => {
  it('forwards ref to the container div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyState ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('ref points to the outermost wrapper with layout classes', () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyState ref={ref} title="T" />);
    expect(ref.current).toHaveClass('flex');
    expect(ref.current).toHaveClass('flex-col');
    expect(ref.current).toHaveClass('items-center');
  });
});

describe('EmptyState — className + children', () => {
  it('merges custom className onto the wrapper', () => {
    const { container } = render(<EmptyState title="T" className="my-empty extra-cls" />);
    expect(container.firstChild).toHaveClass('my-empty');
    expect(container.firstChild).toHaveClass('extra-cls');
    expect(container.firstChild).toHaveClass('rounded-xl');
  });

  it('renders extra children alongside the standard content', () => {
    render(
      <EmptyState title="T">
        <div data-testid="extra-child">extra content</div>
      </EmptyState>
    );
    expect(screen.getByTestId('extra-child')).toBeInTheDocument();
    expect(screen.getByText('extra content')).toBeInTheDocument();
  });
});
