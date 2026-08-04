import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';

import { Container } from './container';
import { Section } from './section';
import { Stack } from './stack';
import { Flex } from './flex';
import { Grid, GridItem } from './grid';
import { Page } from './page';
import { Hero } from './hero';
import { Spacer } from './spacer';

// =============================================================================
// Container
// =============================================================================

describe('Container — Render', () => {
  it('renders children', () => {
    render(<Container>Hello</Container>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders as a <div> element', () => {
    const { container } = render(<Container>test</Container>);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('includes w-full class', () => {
    const { container } = render(<Container>test</Container>);
    expect(container.firstChild).toHaveClass('w-full');
  });
});

describe('Container — Size', () => {
  it.each(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const)(
    'renders size="%s" without crashing',
    (size) => {
      const { container } = render(<Container size={size}>test</Container>);
      expect(container.firstChild).toBeInTheDocument();
    }
  );

  it('applies max-w-screen-xl by default', () => {
    const { container } = render(<Container>test</Container>);
    expect(container.firstChild).toHaveClass('max-w-screen-xl');
  });

  it('applies max-w-screen-sm for size="sm"', () => {
    const { container } = render(<Container size="sm">test</Container>);
    expect(container.firstChild).toHaveClass('max-w-screen-sm');
  });

  it('applies max-w-full for size="full"', () => {
    const { container } = render(<Container size="full">test</Container>);
    expect(container.firstChild).toHaveClass('max-w-full');
  });
});

describe('Container — Padded', () => {
  it('applies px-4 padding by default', () => {
    const { container } = render(<Container>test</Container>);
    expect(container.firstChild).toHaveClass('px-4');
  });

  it('does not apply px-4 when padded=false', () => {
    const { container } = render(<Container padded={false}>test</Container>);
    expect(container.firstChild).not.toHaveClass('px-4');
  });
});

describe('Container — Centered', () => {
  it('applies mx-auto by default', () => {
    const { container } = render(<Container>test</Container>);
    expect(container.firstChild).toHaveClass('mx-auto');
  });

  it('does not apply mx-auto when centered=false', () => {
    const { container } = render(<Container centered={false}>test</Container>);
    expect(container.firstChild).not.toHaveClass('mx-auto');
  });
});

describe('Container — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<Container className="custom-class">test</Container>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Container ref={ref}>test</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// Section
// =============================================================================

describe('Section — Render', () => {
  it('renders children', () => {
    render(<Section>Content</Section>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as a <section> element', () => {
    render(<Section aria-label="test-section">Content</Section>);
    expect(screen.getByRole('region', { name: 'test-section' })).toBeInTheDocument();
  });
});

describe('Section — Spacing', () => {
  it('applies py-12 for default spacing="md"', () => {
    render(<Section aria-label="s">test</Section>);
    expect(screen.getByRole('region', { name: 's' })).toHaveClass('py-12');
  });

  it('applies no padding for spacing="none"', () => {
    render(
      <Section aria-label="s" spacing="none">
        test
      </Section>
    );
    const el = screen.getByRole('region', { name: 's' });
    expect(el).not.toHaveClass('py-12');
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'renders spacing="%s" without crashing',
    (spacing) => {
      render(
        <Section aria-label={spacing} spacing={spacing}>
          test
        </Section>
      );
      expect(screen.getByRole('region', { name: spacing })).toBeInTheDocument();
    }
  );
});

describe('Section — Background', () => {
  it.each(['none', 'muted', 'subtle', 'emphasis', 'card'] as const)(
    'renders background="%s" without crashing',
    (background) => {
      render(
        <Section aria-label="s" background={background}>
          test
        </Section>
      );
      expect(screen.getByRole('region', { name: 's' })).toBeInTheDocument();
    }
  );

  it('applies bg-muted for background="muted"', () => {
    render(
      <Section aria-label="s" background="muted">
        test
      </Section>
    );
    expect(screen.getByRole('region', { name: 's' })).toHaveClass('bg-muted');
  });
});

describe('Section — className & ref', () => {
  it('merges custom className', () => {
    render(
      <Section aria-label="s" className="my-custom">
        test
      </Section>
    );
    expect(screen.getByRole('region', { name: 's' })).toHaveClass('my-custom');
  });

  it('forwards ref to section element', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Section ref={ref} aria-label="s">
        test
      </Section>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SECTION');
  });
});

// =============================================================================
// Stack
// =============================================================================

describe('Stack — Render', () => {
  it('renders children', () => {
    render(
      <Stack>
        <div>A</div>
        <div>B</div>
      </Stack>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders as a <div> with flex and flex-col', () => {
    const { container } = render(<Stack>test</Stack>);
    expect(container.firstChild).toHaveClass('flex', 'flex-col');
  });

  it('applies gap-4 by default', () => {
    const { container } = render(<Stack>test</Stack>);
    expect(container.firstChild).toHaveClass('gap-4');
  });
});

describe('Stack — Gap', () => {
  it.each(['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'] as const)(
    'applies gap class for gap="%s"',
    (gap) => {
      const { container } = render(<Stack gap={gap}>test</Stack>);
      expect(container.firstChild).toHaveClass(`gap-${gap}`);
    }
  );
});

describe('Stack — Align', () => {
  it('applies items-stretch by default', () => {
    const { container } = render(<Stack>test</Stack>);
    expect(container.firstChild).toHaveClass('items-stretch');
  });

  it('applies items-center for align="center"', () => {
    const { container } = render(<Stack align="center">test</Stack>);
    expect(container.firstChild).toHaveClass('items-center');
  });
});

describe('Stack — Dividers', () => {
  it('renders dividers between children when dividers=true', () => {
    render(
      <Stack dividers>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    );
    // 2 dividers between 3 items
    const dividers = document.querySelectorAll('hr');
    expect(dividers).toHaveLength(2);
  });

  it('does not render dividers by default', () => {
    render(
      <Stack>
        <div>A</div>
        <div>B</div>
      </Stack>
    );
    expect(document.querySelectorAll('hr')).toHaveLength(0);
  });

  it('hr dividers are aria-hidden', () => {
    render(
      <Stack dividers>
        <div>A</div>
        <div>B</div>
      </Stack>
    );
    const hr = document.querySelector('hr');
    expect(hr).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Stack — Wrap', () => {
  it('does not apply flex-wrap by default', () => {
    const { container } = render(<Stack>test</Stack>);
    expect(container.firstChild).not.toHaveClass('flex-wrap');
  });

  it('applies flex-wrap when wrap=true', () => {
    const { container } = render(<Stack wrap>test</Stack>);
    expect(container.firstChild).toHaveClass('flex-wrap');
  });
});

describe('Stack — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<Stack className="extra-class">test</Stack>);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stack ref={ref}>test</Stack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// Flex
// =============================================================================

describe('Flex — Render', () => {
  it('renders children', () => {
    render(<Flex>Content</Flex>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as a <div> with flex class', () => {
    const { container } = render(<Flex>test</Flex>);
    expect(container.firstChild).toHaveClass('flex');
  });

  it('applies flex-row by default', () => {
    const { container } = render(<Flex>test</Flex>);
    expect(container.firstChild).toHaveClass('flex-row');
  });
});

describe('Flex — Inline', () => {
  it('applies inline-flex when inline=true', () => {
    const { container } = render(<Flex inline>test</Flex>);
    expect(container.firstChild).toHaveClass('inline-flex');
  });

  it('does not apply inline-flex by default', () => {
    const { container } = render(<Flex>test</Flex>);
    expect(container.firstChild).not.toHaveClass('inline-flex');
  });
});

describe('Flex — Direction', () => {
  it.each(['row', 'col', 'row-reverse', 'col-reverse'] as const)(
    'applies flex-%s class for direction="%s"',
    (dir) => {
      const { container } = render(<Flex direction={dir}>test</Flex>);
      expect(container.firstChild).toHaveClass(`flex-${dir}`);
    }
  );
});

describe('Flex — Wrap', () => {
  it('applies flex-nowrap by default', () => {
    const { container } = render(<Flex>test</Flex>);
    expect(container.firstChild).toHaveClass('flex-nowrap');
  });

  it('applies flex-wrap for wrap="wrap"', () => {
    const { container } = render(<Flex wrap="wrap">test</Flex>);
    expect(container.firstChild).toHaveClass('flex-wrap');
  });
});

describe('Flex — Gap', () => {
  it('applies gap-0 by default', () => {
    const { container } = render(<Flex>test</Flex>);
    expect(container.firstChild).toHaveClass('gap-0');
  });

  it('applies gap-6 for gap="6"', () => {
    const { container } = render(<Flex gap="6">test</Flex>);
    expect(container.firstChild).toHaveClass('gap-6');
  });
});

describe('Flex — Align & Justify', () => {
  it('applies items-center for align="center"', () => {
    const { container } = render(<Flex align="center">test</Flex>);
    expect(container.firstChild).toHaveClass('items-center');
  });

  it('applies justify-between for justify="between"', () => {
    const { container } = render(<Flex justify="between">test</Flex>);
    expect(container.firstChild).toHaveClass('justify-between');
  });
});

describe('Flex — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<Flex className="my-flex">test</Flex>);
    expect(container.firstChild).toHaveClass('my-flex');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Flex ref={ref}>test</Flex>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// Grid
// =============================================================================

describe('Grid — Render', () => {
  it('renders children', () => {
    render(
      <Grid>
        <div>Cell</div>
      </Grid>
    );
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('renders as a <div> with grid class', () => {
    const { container } = render(<Grid>test</Grid>);
    expect(container.firstChild).toHaveClass('grid');
  });

  it('applies grid-cols-1 by default', () => {
    const { container } = render(<Grid>test</Grid>);
    expect(container.firstChild).toHaveClass('grid-cols-1');
  });
});

describe('Grid — Cols (number)', () => {
  it.each([1, 2, 3, 4, 6, 12] as const)('applies grid-cols-%i for cols=%i', (cols) => {
    const { container } = render(<Grid cols={cols}>test</Grid>);
    expect(container.firstChild).toHaveClass(`grid-cols-${cols}`);
  });
});

describe('Grid — Cols (responsive object)', () => {
  it('applies responsive column classes', () => {
    const { container } = render(<Grid cols={{ base: 1, md: 2, lg: 4 }}>test</Grid>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('grid-cols-1');
    expect(el.className).toContain('md:grid-cols-2');
    expect(el.className).toContain('lg:grid-cols-4');
  });

  it('applies sm: prefix for sm breakpoint', () => {
    const { container } = render(<Grid cols={{ base: 1, sm: 3 }}>test</Grid>);
    expect((container.firstChild as HTMLElement).className).toContain('sm:grid-cols-3');
  });
});

describe('Grid — Gap', () => {
  it('applies gap class when gap is provided', () => {
    const { container } = render(<Grid gap="6">test</Grid>);
    expect(container.firstChild).toHaveClass('gap-6');
  });

  it('applies gap-x class for colGap', () => {
    const { container } = render(<Grid colGap="4">test</Grid>);
    expect(container.firstChild).toHaveClass('gap-x-4');
  });

  it('applies gap-y class for rowGap', () => {
    const { container } = render(<Grid rowGap="8">test</Grid>);
    expect(container.firstChild).toHaveClass('gap-y-8');
  });
});

describe('Grid — Flow', () => {
  it('applies grid-flow-col for flow="col"', () => {
    const { container } = render(<Grid flow="col">test</Grid>);
    expect(container.firstChild).toHaveClass('grid-flow-col');
  });

  it('applies grid-flow-dense for flow="dense"', () => {
    const { container } = render(<Grid flow="dense">test</Grid>);
    expect(container.firstChild).toHaveClass('grid-flow-dense');
  });
});

describe('Grid — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<Grid className="custom-grid">test</Grid>);
    expect(container.firstChild).toHaveClass('custom-grid');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Grid ref={ref}>test</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// GridItem
// =============================================================================

describe('GridItem — Render', () => {
  it('renders children', () => {
    render(<GridItem>Cell content</GridItem>);
    expect(screen.getByText('Cell content')).toBeInTheDocument();
  });

  it('renders as a <div>', () => {
    const { container } = render(<GridItem>test</GridItem>);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});

describe('GridItem — ColSpan', () => {
  it('applies col-span-2 for colSpan=2', () => {
    const { container } = render(<GridItem colSpan={2}>test</GridItem>);
    expect(container.firstChild).toHaveClass('col-span-2');
  });

  it('applies col-span-full for colSpan="full"', () => {
    const { container } = render(<GridItem colSpan="full">test</GridItem>);
    expect(container.firstChild).toHaveClass('col-span-full');
  });
});

describe('GridItem — RowSpan', () => {
  it('applies row-span-3 for rowSpan=3', () => {
    const { container } = render(<GridItem rowSpan={3}>test</GridItem>);
    expect(container.firstChild).toHaveClass('row-span-3');
  });
});

describe('GridItem — Start positions', () => {
  it('applies col-start-2 for colStart=2', () => {
    const { container } = render(<GridItem colStart={2}>test</GridItem>);
    expect(container.firstChild).toHaveClass('col-start-2');
  });

  it('applies row-start-3 for rowStart=3', () => {
    const { container } = render(<GridItem rowStart={3}>test</GridItem>);
    expect(container.firstChild).toHaveClass('row-start-3');
  });
});

describe('GridItem — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<GridItem className="item-class">test</GridItem>);
    expect(container.firstChild).toHaveClass('item-class');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<GridItem ref={ref}>test</GridItem>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// Page
// =============================================================================

describe('Page — Render', () => {
  it('renders children in a <main> element', () => {
    render(<Page>Main content</Page>);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders as a <div> with min-h-screen', () => {
    const { container } = render(<Page>test</Page>);
    expect(container.firstChild).toHaveClass('min-h-screen');
  });
});

describe('Page — Skip Link', () => {
  it('renders a skip-to-content link', () => {
    render(<Page>test</Page>);
    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toBeInTheDocument();
  });

  it('skip link href points to skipToContentId', () => {
    render(<Page skipToContentId="my-main">test</Page>);
    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toHaveAttribute('href', '#my-main');
  });

  it('main element has default id "main-content"', () => {
    render(<Page>test</Page>);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('main element has custom id from skipToContentId', () => {
    render(<Page skipToContentId="custom-id">test</Page>);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'custom-id');
  });
});

describe('Page — Header', () => {
  it('renders header slot inside <header>', () => {
    render(<Page header={<div>Nav</div>}>content</Page>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Nav')).toBeInTheDocument();
  });

  it('does not render <header> when header is not provided', () => {
    render(<Page>content</Page>);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });
});

describe('Page — Footer', () => {
  it('renders footer slot inside <footer>', () => {
    render(<Page footer={<div>Footer</div>}>content</Page>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('does not render <footer> when footer is not provided', () => {
    render(<Page>content</Page>);
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });
});

describe('Page — Sidebar', () => {
  it('renders sidebar inside an <aside> landmark', () => {
    render(<Page sidebar={<div>Sidebar</div>}>content</Page>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('does not render <aside> when sidebar is not provided', () => {
    render(<Page>content</Page>);
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('renders sidebar for sidebarPosition="left"', () => {
    render(
      <Page sidebar={<div>Left</div>} sidebarPosition="left">
        content
      </Page>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
  });

  it('renders sidebar for sidebarPosition="right"', () => {
    render(
      <Page sidebar={<div>Right</div>} sidebarPosition="right">
        content
      </Page>
    );
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});

describe('Page — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<Page className="page-class">test</Page>);
    expect(container.firstChild).toHaveClass('page-class');
  });

  it('forwards ref to outer div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Page ref={ref}>test</Page>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// Hero
// =============================================================================

describe('Hero — Render', () => {
  it('renders children', () => {
    render(<Hero>Hero content</Hero>);
    expect(screen.getByText('Hero content')).toBeInTheDocument();
  });

  it('renders as a <section> element', () => {
    render(<Hero aria-label="hero">test</Hero>);
    expect(screen.getByRole('region', { name: 'hero' })).toBeInTheDocument();
  });
});

describe('Hero — Slots', () => {
  it('renders eyebrow when provided', () => {
    render(<Hero eyebrow="New feature" />);
    expect(screen.getByText('New feature')).toBeInTheDocument();
  });

  it('renders heading when provided', () => {
    render(<Hero heading={<h1>Big title</h1>} />);
    expect(screen.getByRole('heading', { name: 'Big title' })).toBeInTheDocument();
  });

  it('renders subheading when provided', () => {
    render(<Hero subheading="Descriptive text" />);
    expect(screen.getByText('Descriptive text')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(<Hero actions={<button>CTA</button>} />);
    expect(screen.getByRole('button', { name: 'CTA' })).toBeInTheDocument();
  });

  it('renders media slot', () => {
    render(<Hero media={<img src="test.png" alt="media" />} />);
    expect(screen.getByRole('img', { name: 'media' })).toBeInTheDocument();
  });
});

describe('Hero — Gradient', () => {
  it('renders decorative blur element when gradient is truthy', () => {
    const { container } = render(
      <Hero gradient="primary" aria-label="h">
        test
      </Hero>
    );
    const glow = container.querySelector('[aria-hidden="true"]');
    expect(glow).toBeInTheDocument();
  });

  it('does not render decorative blur when gradient=false', () => {
    const { container } = render(
      <Hero gradient={false} aria-label="h">
        test
      </Hero>
    );
    // The section itself is not aria-hidden, only the decorative glow is
    const decorativeEl = container.querySelector('[aria-hidden="true"]');
    expect(decorativeEl).not.toBeInTheDocument();
  });

  it.each([true, 'primary', 'accent', 'secondary'] as const)(
    'renders gradient="%s" without crashing',
    (gradient) => {
      render(
        <Hero gradient={gradient} aria-label="h">
          test
        </Hero>
      );
      expect(screen.getByRole('region', { name: 'h' })).toBeInTheDocument();
    }
  );
});

describe('Hero — Size', () => {
  it.each(['sm', 'md', 'lg', 'xl'] as const)('renders size="%s" without crashing', (size) => {
    render(
      <Hero size={size} aria-label="h">
        test
      </Hero>
    );
    expect(screen.getByRole('region', { name: 'h' })).toBeInTheDocument();
  });
});

describe('Hero — Align', () => {
  it.each(['left', 'center', 'right'] as const)('renders align="%s" without crashing', (align) => {
    render(
      <Hero align={align} aria-label="h">
        test
      </Hero>
    );
    expect(screen.getByRole('region', { name: 'h' })).toBeInTheDocument();
  });
});

describe('Hero — className & ref', () => {
  it('merges custom className', () => {
    render(
      <Hero aria-label="h" className="hero-class">
        test
      </Hero>
    );
    expect(screen.getByRole('region', { name: 'h' })).toHaveClass('hero-class');
  });

  it('forwards ref to section element', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Hero ref={ref} aria-label="h">
        test
      </Hero>
    );
    expect(ref.current?.tagName).toBe('SECTION');
  });
});

// =============================================================================
// Spacer
// =============================================================================

describe('Spacer — Render', () => {
  it('renders as a <div>', () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('is aria-hidden', () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('has role="presentation"', () => {
    const { container } = render(<Spacer />);
    // The Spacer is aria-hidden, so we query the DOM attribute directly
    expect(container.firstChild).toHaveAttribute('role', 'presentation');
  });
});

describe('Spacer — Size (both axes)', () => {
  it('applies w-8 and h-8 for size="8"', () => {
    const { container } = render(<Spacer size="8" />);
    expect(container.firstChild).toHaveClass('w-8', 'h-8');
  });

  it('applies w-4 and h-4 for size="4" with axis="both"', () => {
    const { container } = render(<Spacer size="4" axis="both" />);
    expect(container.firstChild).toHaveClass('w-4', 'h-4');
  });
});

describe('Spacer — Axis', () => {
  it('applies only height for axis="y"', () => {
    const { container } = render(<Spacer size="8" axis="y" />);
    expect(container.firstChild).toHaveClass('h-8');
    expect(container.firstChild).toHaveClass('w-0');
  });

  it('applies only width for axis="x"', () => {
    const { container } = render(<Spacer size="8" axis="x" />);
    expect(container.firstChild).toHaveClass('w-8');
    expect(container.firstChild).toHaveClass('h-0');
  });
});

describe('Spacer — Explicit x and y', () => {
  it('applies x and y independently', () => {
    const { container } = render(<Spacer x="4" y="12" />);
    expect(container.firstChild).toHaveClass('w-4', 'h-12');
  });

  it('x prop overrides size for x-axis', () => {
    const { container } = render(<Spacer size="8" x="2" />);
    // x overrides size on x-axis
    expect(container.firstChild).toHaveClass('w-2', 'h-8');
  });

  it('y prop overrides size for y-axis', () => {
    const { container } = render(<Spacer size="8" y="2" />);
    expect(container.firstChild).toHaveClass('h-2', 'w-8');
  });
});

describe('Spacer — className & ref', () => {
  it('merges custom className', () => {
    const { container } = render(<Spacer className="my-spacer" />);
    expect(container.firstChild).toHaveClass('my-spacer');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
