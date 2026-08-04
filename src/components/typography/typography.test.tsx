import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Typography } from './typography';

describe('Typography — Render', () => {
  it('renders children', () => {
    render(<Typography>Hello</Typography>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('defaults to <p> element for body variant', () => {
    const { container } = render(<Typography variant="body">Text</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });
});

describe('Typography — Heading Variants', () => {
  it.each([
    ['h1', 'h1'],
    ['h2', 'h2'],
    ['h3', 'h3'],
    ['h4', 'h4'],
    ['h5', 'h5'],
    ['h6', 'h6'],
  ] as const)('renders %s as <%s>', (variant, tag) => {
    const { container } = render(<Typography variant={variant}>Heading</Typography>);
    expect(container.querySelector(tag)).toBeInTheDocument();
  });
});

describe('Typography — Text Variants', () => {
  it('renders body as <p>', () => {
    const { container } = render(<Typography variant="body">Body</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('renders body-sm as <p>', () => {
    const { container } = render(<Typography variant="body-sm">Small</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('renders caption as <span>', () => {
    const { container } = render(<Typography variant="caption">Caption</Typography>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders label as <label>', () => {
    const { container } = render(<Typography variant="label">Label</Typography>);
    expect(container.querySelector('label')).toBeInTheDocument();
  });

  it('renders code as <code>', () => {
    const { container } = render(<Typography variant="code">code</Typography>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders overline as <span>', () => {
    const { container } = render(<Typography variant="overline">SECTION</Typography>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});

describe('Typography — Polymorphic `as` prop', () => {
  it('renders h2 variant as h1 element when as="h1"', () => {
    const { container } = render(
      <Typography variant="h2" as="h1">
        Title
      </Typography>
    );
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h2')).not.toBeInTheDocument();
  });

  it('renders body variant as span when as="span"', () => {
    const { container } = render(
      <Typography variant="body" as="span">
        Text
      </Typography>
    );
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
});

describe('Typography — Modifiers', () => {
  it('applies truncate class when truncate=true', () => {
    const { container } = render(<Typography truncate>Truncated text</Typography>);
    expect(container.firstChild).toHaveClass('truncate');
  });

  it('applies muted foreground class when muted=true', () => {
    const { container } = render(<Typography muted>Muted</Typography>);
    expect(container.firstChild).toHaveClass('text-muted-foreground');
  });
});

describe('Typography — forwardRef', () => {
  it('forwards ref to the element', () => {
    const ref = createRef<HTMLElement>();
    render(<Typography ref={ref}>Ref test</Typography>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe('Typography — className', () => {
  it('merges custom className', () => {
    const { container } = render(<Typography className="custom-text">Text</Typography>);
    expect(container.firstChild).toHaveClass('custom-text');
  });
});
