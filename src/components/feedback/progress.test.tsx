import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Progress } from './progress';

describe('Progress — Value clamping', () => {
  it('uses value as-is when within range', () => {
    render(<Progress value={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
  });

  it('clamps negative values to 0', () => {
    render(<Progress value={-10} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps values above max to max', () => {
    render(<Progress value={150} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps to 0 when value is 0', () => {
    render(<Progress value={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});

describe('Progress — Percent calculation', () => {
  it('calculates 50% when value is half of max', () => {
    render(<Progress value={50} max={100} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('calculates 25% with custom max', () => {
    render(<Progress value={25} max={100} />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('calculates 0% for 0/max edge case', () => {
    render(<Progress value={0} max={100} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('calculates 100% for max/max edge case', () => {
    render(<Progress value={100} max={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles max=0 without division error (returns 0%)', () => {
    render(<Progress value={50} max={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('rounds percent to nearest integer', () => {
    render(<Progress value={33} max={100} />);
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('renders bar width style correctly', () => {
    const { container } = render(<Progress value={75} max={100} />);
    const fillDiv = container.querySelector('.bg-primary-500') as HTMLElement;
    expect(fillDiv.style.width).toBe('75%');
  });
});

describe('Progress — Label', () => {
  it('renders label text when provided', () => {
    render(<Progress value={40} label="Upload" />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('does not render label span when not provided', () => {
    const { container } = render(<Progress value={40} />);
    const labelSpans = container.querySelectorAll('.font-medium');
    expect(labelSpans).toHaveLength(0);
  });
});

describe('Progress — Aria attributes & role', () => {
  it('has role="progressbar"', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuemin to 0', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
  });

  it('sets aria-valuemax to default 100', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets aria-valuemax to custom max', () => {
    render(<Progress value={50} max={200} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
  });

  it('sets aria-valuenow to clamped value', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-label when label is provided', () => {
    render(<Progress value={60} label="Download progress" />);
    expect(screen.getByRole('progressbar', { name: 'Download progress' })).toBeInTheDocument();
  });
});

describe('Progress — Sizes', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
    render(<Progress value={50} size={size} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies sm size class (h-2)', () => {
    const { container } = render(<Progress value={50} size="sm" />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toHaveClass('h-2');
  });

  it('applies md size class (h-3) as default', () => {
    const { container } = render(<Progress value={50} />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toHaveClass('h-3');
  });

  it('applies lg size class (h-4)', () => {
    const { container } = render(<Progress value={50} size="lg" />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toHaveClass('h-4');
  });
});

describe('Progress — Edge cases: 0 and max', () => {
  it('handles value=0 with default max', () => {
    render(<Progress value={0} label="Start" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles value=max (full)', () => {
    render(<Progress value={100} max={100} label="Done" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles value=0 with custom max', () => {
    render(<Progress value={0} max={250} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles value=max with custom max', () => {
    render(<Progress value={250} max={250} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '250');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});

describe('Progress — forwardRef + className', () => {
  it('forwards ref to the outer wrapper', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className on wrapper', () => {
    const { container } = render(<Progress value={50} className="progress-wrap" />);
    expect(container.firstChild).toHaveClass('progress-wrap');
    expect(container.firstChild).toHaveClass('w-full');
  });
});
