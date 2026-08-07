import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Alert, type AlertVariant } from './alert';
import { Star } from 'lucide-react';

describe('Alert — Variants', () => {
  it.each(['info', 'success', 'warning', 'destructive'] as const)(
    'renders %s variant',
    (variant) => {
      render(<Alert variant={variant} title="Title" description="Desc" />);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    }
  );

  it.each([
    ['info', 'border-info-300'],
    ['success', 'border-success-300'],
    ['warning', 'border-warning-300'],
    ['destructive', 'border-destructive-300'],
  ] as const)('applies correct style classes for %s variant', (variant, expectedClass) => {
    render(<Alert variant={variant} title="Test" />);
    expect(screen.getByRole('alert')).toHaveClass(expectedClass);
  });

  it('uses info as default variant', () => {
    render(<Alert title="Default" />);
    expect(screen.getByRole('alert')).toHaveClass('border-info-300');
  });
});

describe('Alert — Title', () => {
  it('renders title when provided', () => {
    render(<Alert title="Success title" />);
    expect(screen.getByText('Success title')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    render(<Alert description="Only description" />);
    expect(screen.queryByText('Only description')).toBeInTheDocument();
  });
});

describe('Alert — Description', () => {
  it('renders description when provided', () => {
    render(<Alert title="T" description="Detailed description here" />);
    expect(screen.getByText('Detailed description here')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<Alert title="Only title" />);
    const descDivs = container.querySelectorAll('.text-sm.opacity-90');
    expect(descDivs).toHaveLength(0);
  });
});

describe('Alert — Custom Icon', () => {
  it('renders default icon based on variant', () => {
    render(<Alert variant="success" title="Ok" />);
    const alert = screen.getByRole('alert');
    const iconContainer = alert.firstChild as HTMLElement;
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<Alert title="Custom" icon={<Star data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});

describe('Alert — forwardRef', () => {
  it('forwards ref to the container div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByRole('alert'));
  });
});

describe('Alert — Accessibility', () => {
  it('has role="alert"', () => {
    render(<Alert title="Accessible" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

describe('Alert — className', () => {
  it('merges custom className with default classes', () => {
    render(<Alert title="Class merge" className="my-alert-class extra-class" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('my-alert-class');
    expect(alert).toHaveClass('extra-class');
    expect(alert).toHaveClass('rounded-lg');
    expect(alert).toHaveClass('border');
  });
});
