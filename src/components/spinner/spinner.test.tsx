import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './spinner';

describe('Spinner — Render', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label "Loading…"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading…');
  });

  it('respects custom label prop', () => {
    render(<Spinner label="Fetching data…" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Fetching data…');
  });

  it('respects aria-label override', () => {
    render(<Spinner aria-label="Custom label" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Custom label');
  });
});

describe('Spinner — Sizes', () => {
  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders %s size', (size) => {
    render(<Spinner size={size} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('Spinner — Variants', () => {
  it.each(['primary', 'secondary', 'accent', 'destructive', 'neutral', 'current'] as const)(
    'renders %s variant',
    (variant) => {
      render(<Spinner variant={variant} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    }
  );
});

describe('Spinner — forwardRef', () => {
  it('forwards ref to the svg element', () => {
    const ref = createRef<SVGSVGElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});

describe('Spinner — className', () => {
  it('merges custom className', () => {
    render(<Spinner className="custom-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('custom-spinner');
  });
});
