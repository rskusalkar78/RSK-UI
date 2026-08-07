import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './skeleton';

describe('Skeleton — Basic render', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with data-testid="skeleton" by default', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('has the animate-pulse class for shimmer effect', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
  });

  it('has the rounded class', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded');
  });

  it('has default neutral background classes', () => {
    const el = render(<Skeleton />).getByTestId('skeleton');
    expect(el).toHaveClass('bg-neutral-200/80');
  });
});

describe('Skeleton — asChild with children', () => {
  it('does not render data-testid skeleton when asChild=true with children', () => {
    render(
      <Skeleton asChild>
        <div>child content</div>
      </Skeleton>
    );
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
  });

  it('renders children inside wrapper when asChild=true', () => {
    render(
      <Skeleton asChild>
        <p data-testid="nested-child">placeholder text</p>
      </Skeleton>
    );
    expect(screen.getByTestId('nested-child')).toBeInTheDocument();
    expect(screen.getByText('placeholder text')).toBeInTheDocument();
  });

  it('applies animate-pulse class when asChild=true with children', () => {
    const { container } = render(
      <Skeleton asChild>
        <span data-testid="child">hi</span>
      </Skeleton>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('animate-pulse');
  });

  it('applies pointer-events-none when asChild=true with children', () => {
    const { container } = render(
      <Skeleton asChild>
        <span>child</span>
      </Skeleton>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('pointer-events-none');
  });

  it('renders standard skeleton (not asChild) even when asChild=true but no children', () => {
    render(<Skeleton asChild />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});

describe('Skeleton — aria-hidden', () => {
  it('has aria-hidden="true" on default skeleton', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('has aria-hidden="true" on asChild wrapper with children', () => {
    const { container } = render(
      <Skeleton asChild>
        <span>hi</span>
      </Skeleton>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Skeleton — className', () => {
  it('merges custom className with default classes (default mode)', () => {
    render(<Skeleton className="h-10 w-40 custom-skel" />);
    const el = screen.getByTestId('skeleton');
    expect(el).toHaveClass('h-10');
    expect(el).toHaveClass('w-40');
    expect(el).toHaveClass('custom-skel');
    expect(el).toHaveClass('animate-pulse');
  });

  it('merges custom className with default classes (asChild mode)', () => {
    const { container } = render(
      <Skeleton asChild className="my-wrap extra">
        <span>x</span>
      </Skeleton>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-wrap');
    expect(wrapper).toHaveClass('extra');
    expect(wrapper).toHaveClass('animate-pulse');
  });
});

describe('Skeleton — forwardRef', () => {
  it('forwards ref to default skeleton element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId('skeleton'));
  });

  it('forwards ref to asChild wrapper element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Skeleton ref={ref} asChild>
        <span>child</span>
      </Skeleton>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
