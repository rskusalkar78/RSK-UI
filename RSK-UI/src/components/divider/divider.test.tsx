import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Divider } from './divider';

describe('Divider — Render', () => {
  it('renders without crashing', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies data-orientation="horizontal" by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveAttribute('data-orientation', 'horizontal');
  });
});

describe('Divider — Orientation', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders vertical divider', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute('data-orientation', 'vertical');
  });
});

describe('Divider — Variants', () => {
  it.each(['solid', 'dashed', 'dotted'] as const)('renders %s variant', (variant) => {
    const { container } = render(<Divider variant={variant} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('Divider — Label', () => {
  it('renders label text when provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { queryByText } = render(<Divider />);
    expect(queryByText('OR')).not.toBeInTheDocument();
  });
});

describe('Divider — Accessibility', () => {
  it('has role="none" when decorative (default)', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveAttribute('role', 'none');
  });

  it('has role="separator" when not decorative', () => {
    const { container } = render(<Divider decorative={false} />);
    expect(container.firstChild).toHaveAttribute('role', 'separator');
  });

  it('has aria-orientation="horizontal" when semantic horizontal', () => {
    const { container } = render(<Divider decorative={false} orientation="horizontal" />);
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('has aria-orientation="vertical" when semantic vertical', () => {
    const { container } = render(<Divider decorative={false} orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('Divider — forwardRef', () => {
  it('forwards ref to the element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Divider — className', () => {
  it('merges custom className', () => {
    const { container } = render(<Divider className="my-custom" />);
    expect(container.firstChild).toHaveClass('my-custom');
  });
});
