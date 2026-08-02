import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './container';
import { Section } from './section';
import { Stack } from './stack';
import { Flex } from './flex';
import { Grid, GridItem } from './grid';
import { Page } from './page';
import { Hero } from './hero';
import { Spacer } from './spacer';

// ─── Shared Demo Primitives ───────────────────────────────────────────────────

const Box = ({
  children,
  className = '',
  label,
}: {
  children?: React.ReactNode;
  className?: string;
  label?: string;
}) => (
  <div
    className={`flex min-h-12 items-center justify-center rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary ${className}`}
  >
    {label ?? children}
  </div>
);

const SidebarDemo = () => (
  <div className="flex h-full w-56 flex-col gap-2 border-r border-border bg-card p-4">
    <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      Navigation
    </div>
    {['Dashboard', 'Analytics', 'Users', 'Settings'].map((item) => (
      <button
        key={item}
        className="rounded-md px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {item}
      </button>
    ))}
  </div>
);

const HeaderDemo = () => (
  <div className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
    <span className="font-bold text-foreground">RSK-UI</span>
    <div className="flex gap-2">
      {['Docs', 'GitHub', 'Log in'].map((label) => (
        <button
          key={label}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

const FooterDemo = () => (
  <div className="border-t border-border bg-card px-6 py-4 text-center text-xs text-muted-foreground">
    © 2026 RSK-UI — MIT License
  </div>
);

// ─── Container Stories ────────────────────────────────────────────────────────

const containerMeta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    padded: { control: 'boolean' },
    centered: { control: 'boolean' },
  },
} satisfies Meta<typeof Container>;

export default containerMeta;
type ContainerStory = StoryObj<typeof Container>;

export const ContainerDefault: ContainerStory = {
  name: 'Container / Default',
  render: () => (
    <div className="bg-background py-8">
      <Container>
        <Box>Container (xl, padded, centered)</Box>
      </Container>
    </div>
  ),
};

export const ContainerSizes: ContainerStory = {
  name: 'Container / All Sizes',
  render: () => (
    <div className="flex flex-col gap-4 bg-background py-8">
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((size) => (
        <Container key={size} size={size}>
          <Box label={`size="${size}"`} />
        </Container>
      ))}
    </div>
  ),
};

export const ContainerUnpadded: ContainerStory = {
  name: 'Container / Unpadded',
  render: () => (
    <div className="bg-background py-8">
      <Container padded={false}>
        <Box>No horizontal padding</Box>
      </Container>
    </div>
  ),
};

export const ContainerPlayground: ContainerStory = {
  name: 'Container / Playground',
  args: { size: 'xl', padded: true, centered: true },
  render: (args) => (
    <div className="bg-background py-8">
      <Container {...args}>
        <Box>Playground Container</Box>
      </Container>
    </div>
  ),
};

// ─── Section Stories ──────────────────────────────────────────────────────────

export const SectionDefault: StoryObj = {
  name: 'Section / Default',
  render: () => (
    <Section aria-label="Default section demo">
      <Container>
        <Box>Section with default spacing (md)</Box>
      </Container>
    </Section>
  ),
};

export const SectionSpacings: StoryObj = {
  name: 'Section / All Spacings',
  render: () => (
    <div className="flex flex-col divide-y divide-border bg-background">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((spacing) => (
        <Section key={spacing} spacing={spacing}>
          <Container>
            <Box label={`spacing="${spacing}"`} />
          </Container>
        </Section>
      ))}
    </div>
  ),
};

export const SectionBackgrounds: StoryObj = {
  name: 'Section / Backgrounds',
  render: () => (
    <div className="flex flex-col bg-background">
      {(['none', 'muted', 'subtle', 'emphasis', 'card'] as const).map((bg) => (
        <Section key={bg} spacing="sm" background={bg}>
          <Container>
            <Box label={`background="${bg}"`} />
          </Container>
        </Section>
      ))}
    </div>
  ),
};

// ─── Stack Stories ────────────────────────────────────────────────────────────

export const StackDefault: StoryObj = {
  name: 'Stack / Default',
  render: () => (
    <div className="bg-background p-8">
      <Stack gap="4">
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Stack>
    </div>
  ),
};

export const StackGaps: StoryObj = {
  name: 'Stack / Gap Scale',
  render: () => (
    <div className="flex flex-col gap-12 bg-background p-8">
      {(['2', '4', '6', '8', '12'] as const).map((gap) => (
        <div key={gap}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            gap=&quot;{gap}&quot;
          </p>
          <Stack gap={gap}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const StackDividers: StoryObj = {
  name: 'Stack / With Dividers',
  render: () => (
    <div className="bg-background p-8">
      <div className="mx-auto max-w-sm rounded-xl border border-border bg-card p-4 shadow-sm">
        <Stack gap="4" dividers>
          {['Profile Settings', 'Notifications', 'Security', 'Billing'].map((item) => (
            <div key={item} className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-foreground">{item}</span>
              <span className="text-xs text-muted-foreground">›</span>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  ),
};

export const StackAlignment: StoryObj = {
  name: 'Stack / Alignment',
  render: () => (
    <div className="flex gap-8 bg-background p-8">
      {(['start', 'center', 'end'] as const).map((align) => (
        <div key={align} className="flex-1">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            align=&quot;{align}&quot;
          </p>
          <Stack
            gap="3"
            align={align}
            className="min-h-40 rounded-lg border border-dashed border-border p-3"
          >
            <Box className="w-full">Full</Box>
            <Box className="w-3/4">3/4</Box>
            <Box className="w-1/2">1/2</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

// ─── Flex Stories ─────────────────────────────────────────────────────────────

export const FlexDefault: StoryObj = {
  name: 'Flex / Default',
  render: () => (
    <div className="bg-background p-8">
      <Flex gap="4" align="center" justify="between">
        <Box>Logo</Box>
        <Flex gap="2">
          <Box>Docs</Box>
          <Box>GitHub</Box>
          <Box>Log in</Box>
        </Flex>
      </Flex>
    </div>
  ),
};

export const FlexDirections: StoryObj = {
  name: 'Flex / Directions',
  render: () => (
    <div className="flex flex-col gap-8 bg-background p-8">
      {(['row', 'col', 'row-reverse', 'col-reverse'] as const).map((dir) => (
        <div key={dir}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            direction=&quot;{dir}&quot;
          </p>
          <Flex
            direction={dir}
            gap="3"
            className="rounded-lg border border-dashed border-border p-3"
          >
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const FlexWrap: StoryObj = {
  name: 'Flex / Wrap',
  render: () => (
    <div className="bg-background p-8">
      <Flex wrap="wrap" gap="3" className="max-w-xs">
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} className="w-20">
            {i + 1}
          </Box>
        ))}
      </Flex>
    </div>
  ),
};

export const FlexJustify: StoryObj = {
  name: 'Flex / Justify',
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-8">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((j) => (
        <div key={j}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            justify=&quot;{j}&quot;
          </p>
          <Flex
            justify={j}
            gap="2"
            className="w-full rounded-lg border border-dashed border-border p-2"
          >
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

// ─── Grid Stories ─────────────────────────────────────────────────────────────

export const GridDefault: StoryObj = {
  name: 'Grid / Default',
  render: () => (
    <div className="bg-background p-8">
      <Grid cols={3} gap="4">
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i}>{i + 1}</Box>
        ))}
      </Grid>
    </div>
  ),
};

export const GridResponsive: StoryObj = {
  name: 'Grid / Responsive Columns',
  render: () => (
    <div className="bg-background p-8">
      <p className="mb-4 text-xs text-muted-foreground">
        Resize the viewport: 1 col (mobile) → 2 col (md) → 4 col (lg)
      </p>
      <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="4">
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i}>{i + 1}</Box>
        ))}
      </Grid>
    </div>
  ),
};

export const GridWithSpanning: StoryObj = {
  name: 'Grid / Item Spanning',
  render: () => (
    <div className="bg-background p-8">
      <Grid cols={3} gap="4">
        <GridItem colSpan={2}>
          <Box className="h-full">Wide (colSpan=2)</Box>
        </GridItem>
        <GridItem>
          <Box className="h-full">Normal</Box>
        </GridItem>
        <GridItem>
          <Box className="h-full">Normal</Box>
        </GridItem>
        <GridItem colSpan="full">
          <Box>Full width (colSpan=&quot;full&quot;)</Box>
        </GridItem>
        <GridItem rowSpan={2}>
          <Box className="h-full">Tall (rowSpan=2)</Box>
        </GridItem>
        <GridItem>
          <Box>Normal</Box>
        </GridItem>
        <GridItem>
          <Box>Normal</Box>
        </GridItem>
      </Grid>
    </div>
  ),
};

export const GridGaps: StoryObj = {
  name: 'Grid / Separate Col & Row Gaps',
  render: () => (
    <div className="bg-background p-8">
      <Grid cols={3} colGap="8" rowGap="2">
        {Array.from({ length: 9 }, (_, i) => (
          <Box key={i}>{i + 1}</Box>
        ))}
      </Grid>
    </div>
  ),
};

// ─── Page Stories ─────────────────────────────────────────────────────────────

export const PageDefault: StoryObj = {
  name: 'Page / Default',
  render: () => (
    <div className="h-[500px] overflow-auto rounded-xl border border-border">
      <Page header={<HeaderDemo />} footer={<FooterDemo />}>
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Main Content</h1>
          <p className="text-muted-foreground">
            This is the main content area. The Page component provides header, footer, and sidebar
            slots with proper landmark roles.
          </p>
        </div>
      </Page>
    </div>
  ),
};

export const PageWithSidebar: StoryObj = {
  name: 'Page / With Sidebar',
  render: () => (
    <div className="h-[500px] overflow-auto rounded-xl border border-border">
      <Page
        header={<HeaderDemo />}
        footer={<FooterDemo />}
        sidebar={<SidebarDemo />}
        sidebarPosition="left"
      >
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Dashboard</h1>
          <Grid cols={{ base: 1, md: 2 }} gap="4">
            {['Revenue', 'Users', 'Sessions', 'Conversions'].map((metric) => (
              <div key={metric} className="rounded-xl border border-border bg-card p-4">
                <div className="text-sm font-medium text-muted-foreground">{metric}</div>
                <div className="mt-1 text-2xl font-bold text-foreground">—</div>
              </div>
            ))}
          </Grid>
        </div>
      </Page>
    </div>
  ),
};

export const PageRightSidebar: StoryObj = {
  name: 'Page / Right Sidebar',
  render: () => (
    <div className="h-[500px] overflow-auto rounded-xl border border-border">
      <Page header={<HeaderDemo />} sidebar={<SidebarDemo />} sidebarPosition="right">
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Content</h1>
          <p className="text-muted-foreground">
            Main content with a right-positioned sidebar panel.
          </p>
        </div>
      </Page>
    </div>
  ),
};

// ─── Hero Stories ─────────────────────────────────────────────────────────────

export const HeroDefault: StoryObj = {
  name: 'Hero / Default',
  render: () => (
    <Hero
      eyebrow="Introducing RSK-UI"
      heading={<h1>Build beautiful interfaces faster</h1>}
      subheading="A production-ready design system built with React, TypeScript, and Tailwind CSS v4."
      actions={
        <div className="flex gap-3">
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
            Get started
          </button>
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
            View docs
          </button>
        </div>
      }
    />
  ),
};

export const HeroGradients: StoryObj = {
  name: 'Hero / Gradients',
  render: () => (
    <div className="flex flex-col divide-y divide-border bg-background">
      {([true, 'primary', 'accent', 'secondary'] as const).map((gradient) => (
        <Hero
          key={String(gradient)}
          gradient={gradient}
          size="sm"
          eyebrow={`gradient="${String(gradient)}"`}
          heading={<h2>Hero Section</h2>}
          subheading="Supporting description text."
        />
      ))}
    </div>
  ),
};

export const HeroAlignments: StoryObj = {
  name: 'Hero / Alignments',
  render: () => (
    <div className="flex flex-col divide-y divide-border bg-background">
      {(['left', 'center', 'right'] as const).map((align) => (
        <Hero
          key={align}
          size="sm"
          align={align}
          eyebrow={`align="${align}"`}
          heading={<h2>Hero heading</h2>}
          subheading="A shorter supporting description."
          actions={
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              CTA
            </button>
          }
        />
      ))}
    </div>
  ),
};

export const HeroWithMedia: StoryObj = {
  name: 'Hero / With Media',
  render: () => (
    <Hero
      gradient="primary"
      size="md"
      align="left"
      eyebrow="New in v2.0"
      heading={<h1>Compose complex layouts with ease</h1>}
      subheading="RSK-UI's layout system gives you Container, Grid, Flex, Stack, and more — all typed and responsive."
      actions={
        <div className="flex gap-3">
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Get started
          </button>
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground">
            Learn more
          </button>
        </div>
      }
      media={
        <div className="aspect-video w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            📐 Media / Screenshot
          </div>
        </div>
      }
    />
  ),
};

export const HeroSizes: StoryObj = {
  name: 'Hero / Size Scale',
  render: () => (
    <div className="flex flex-col divide-y divide-border bg-background">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Hero
          key={size}
          size={size}
          heading={<h2>size=&quot;{size}&quot;</h2>}
          subheading="Varies vertical padding."
        />
      ))}
    </div>
  ),
};

// ─── Spacer Stories ───────────────────────────────────────────────────────────

export const SpacerVertical: StoryObj = {
  name: 'Spacer / Vertical',
  render: () => (
    <div className="bg-background p-8">
      <Box>Above spacer</Box>
      <Spacer size="16" axis="y" />
      <Box>Below spacer (size=16)</Box>
    </div>
  ),
};

export const SpacerHorizontal: StoryObj = {
  name: 'Spacer / Horizontal',
  render: () => (
    <div className="bg-background p-8">
      <Flex align="center">
        <Box>Left</Box>
        <Spacer size="16" axis="x" />
        <Box>Right — pushed by spacer (size=16)</Box>
      </Flex>
    </div>
  ),
};

export const SpacerScale: StoryObj = {
  name: 'Spacer / Scale Demo',
  render: () => (
    <div className="bg-background p-8">
      {(['4', '8', '12', '16', '24'] as const).map((size) => (
        <div key={size} className="mb-8">
          <p className="mb-1 text-xs text-muted-foreground">size=&quot;{size}&quot;</p>
          <Box>Block A</Box>
          <Spacer size={size} axis="y" className="bg-primary/5" />
          <Box>Block B</Box>
        </div>
      ))}
    </div>
  ),
};

// ─── Composition Story ────────────────────────────────────────────────────────

export const ComposedLayout: StoryObj = {
  name: 'Composed / Full Layout',
  render: () => (
    <div className="bg-background">
      {/* Hero */}
      <Hero
        gradient="primary"
        size="md"
        eyebrow="RSK-UI Layout System"
        heading={<h1>Composable layout primitives</h1>}
        subheading="Combine Container, Section, Grid, Stack, and Flex to build any layout."
        actions={
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Get started
          </button>
        }
      />

      {/* Features section */}
      <Section spacing="xl" background="muted">
        <Container>
          <Stack gap="10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">Layout Components</h2>
              <p className="mt-2 text-muted-foreground">Eight primitives, infinitely composable.</p>
            </div>
            <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="4">
              {['Container', 'Section', 'Stack', 'Flex', 'Grid', 'Page', 'Hero', 'Spacer'].map(
                (name) => (
                  <div key={name} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                    <div className="text-sm font-semibold text-foreground">{name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Layout primitive</div>
                  </div>
                )
              )}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* CTA section */}
      <Section spacing="lg">
        <Container>
          <Flex direction="col" align="center" gap="6">
            <h2 className="text-2xl font-bold text-foreground">Ready to build?</h2>
            <Flex gap="3">
              <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Documentation
              </button>
              <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground">
                GitHub
              </button>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </div>
  ),
};
