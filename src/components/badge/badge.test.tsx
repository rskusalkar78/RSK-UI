import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';

describe('Badge — Render', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders as a <span>', () => {
    const { container } = render(<Badge>Tag</Badge>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});

describe('Badge — Variants', () => {
  it.each(['solid', 'outline', 'subtle'] as const)('renders %s variant', (variant) => {
    render(<Badge variant={variant}>Label</Badge>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});

describe('Badge — Colors', () => {
  it.each([
    'primary',
    'secondary',
    'accent',
    'success',
    'warning',
    'destructive',
    'info',
    'neutral',
  ] as const)('renders %s color', (color) => {
    render(<Badge color={color}>Label</Badge>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});

describe('Badge — Sizes', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
    render(<Badge size={size}>Label</Badge>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});

describe('Badge — Dot', () => {
  it('renders a dot element when dot=true', () => {
    const { container } = render(<Badge dot>Online</Badge>);
    // dot is a span with aria-hidden
    const dotEl = container.querySelector('[aria-hidden="true"]');
    expect(dotEl).toBeInTheDocument();
  });

  it('does not render a dot when dot=false', () => {
    const { container } = render(<Badge>Offline</Badge>);
    const dotEl = container.querySelector('[aria-hidden="true"]');
    expect(dotEl).not.toBeInTheDocument();
  });
});

describe('Badge — forwardRef', () => {
  it('forwards ref to span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe('Badge — className', () => {
  it('merges custom className', () => {
    render(<Badge className="my-badge">Label</Badge>);
    expect(screen.getByText('Label')).toHaveClass('my-badge');
  });
});
