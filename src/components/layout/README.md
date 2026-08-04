# Layout System

A set of eight reusable, mobile-first, fully typed layout primitives for RSK-UI.
All components support dark mode via CSS custom properties, are fully accessible, and compose seamlessly with one another.

## Components

| Component                 | Element     | Description                                     |
| ------------------------- | ----------- | ----------------------------------------------- |
| [`Container`](#container) | `<div>`     | Responsive max-width wrapper                    |
| [`Section`](#section)     | `<section>` | Semantic page section with vertical spacing     |
| [`Stack`](#stack)         | `<div>`     | Vertical flex column with optional dividers     |
| [`Flex`](#flex)           | `<div>`     | Full-surface Flexbox container                  |
| [`Grid`](#grid)           | `<div>`     | CSS Grid container with responsive columns      |
| [`GridItem`](#griditem)   | `<div>`     | Grid cell with span and placement control       |
| [`Page`](#page)           | `<div>`     | Full-page scaffold with landmark slots          |
| [`Hero`](#hero)           | `<section>` | Above-the-fold section with named content slots |
| [`Spacer`](#spacer)       | `<div>`     | Invisible spacing element                       |

---

## Container

Constrains content to a maximum width with optional horizontal padding and centering.

```tsx
import { Container } from '@/components/layout';

<Container size="xl" padded centered>
  <p>Content</p>
</Container>;
```

### Props

| Prop        | Type                                              | Default | Description                              |
| ----------- | ------------------------------------------------- | ------- | ---------------------------------------- |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`  | Maximum width constraint                 |
| `padded`    | `boolean`                                         | `true`  | Applies responsive horizontal padding    |
| `centered`  | `boolean`                                         | `true`  | Centers the container via `margin: auto` |
| `className` | `string`                                          | —       | Merged with internal classes             |

---

## Section

Semantic `<section>` wrapper with configurable vertical padding and background.
Compose with `Container` for full-page sections.

```tsx
import { Section, Container } from '@/components/layout';

<Section spacing="lg" background="muted" aria-label="Features">
  <Container>
    <h2>Features</h2>
  </Container>
</Section>;
```

### Props

| Prop         | Type                                                      | Default  | Description                          |
| ------------ | --------------------------------------------------------- | -------- | ------------------------------------ |
| `spacing`    | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`   | Vertical padding scale               |
| `background` | `'none' \| 'muted' \| 'subtle' \| 'emphasis' \| 'card'`   | `'none'` | Background color variant             |
| `aria-label` | `string`                                                  | —        | Required for landmark identification |

---

## Stack

Vertical Flexbox column with configurable gap, alignment, and optional dividers.

```tsx
import { Stack } from '@/components/layout';

// Basic stack
<Stack gap="6" align="start">
  <Card />
  <Card />
  <Card />
</Stack>

// With dividers (settings menu pattern)
<Stack gap="4" dividers>
  <SettingsRow label="Profile" />
  <SettingsRow label="Notifications" />
  <SettingsRow label="Security" />
</Stack>
```

### Props

| Prop       | Type                                                                           | Default     | Description                           |
| ---------- | ------------------------------------------------------------------------------ | ----------- | ------------------------------------- |
| `gap`      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '8' \| '10' \| '12' \| '16'` | `'4'`       | Gap between children                  |
| `align`    | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`                      | `'stretch'` | Cross-axis alignment                  |
| `justify`  | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'`            | `'start'`   | Main-axis justification               |
| `dividers` | `boolean`                                                                      | `false`     | Show `<hr>` dividers between children |
| `wrap`     | `boolean`                                                                      | `false`     | Allow children to wrap                |

---

## Flex

Full-surface Flexbox container. Exposes every major flex property as a typed prop.
Prefer `Stack` for simple vertical lists.

```tsx
import { Flex } from '@/components/layout';

<Flex direction="row" align="center" justify="between" gap="4">
  <Logo />
  <NavLinks />
</Flex>;
```

### Props

| Prop        | Type                                                                            | Default     | Description                         |
| ----------- | ------------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `direction` | `'row' \| 'col' \| 'row-reverse' \| 'col-reverse'`                              | `'row'`     | Flex direction                      |
| `wrap`      | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                          | `'nowrap'`  | Flex wrap                           |
| `gap`       | `'0' \| '1' \| ... \| '16'`                                                     | `'0'`       | Gap between children                |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`                       | `'stretch'` | Cross-axis alignment                |
| `justify`   | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly' \| 'normal'` | `'start'`   | Main-axis justification             |
| `inline`    | `boolean`                                                                       | `false`     | Use `inline-flex` instead of `flex` |

---

## Grid

CSS Grid container. Accepts a number or responsive object for column count.

```tsx
import { Grid, GridItem } from '@/components/layout';

// Responsive: 1 col mobile → 2 col tablet → 4 col desktop
<Grid cols={{ base: 1, md: 2, lg: 4 }} gap="6">
  <GridItem colSpan={2}>
    <FeaturedCard />
  </GridItem>
  <GridItem>
    <Card />
  </GridItem>
  <GridItem colSpan="full">
    <Banner />
  </GridItem>
</Grid>;
```

### Grid Props

| Prop     | Type                                                      | Default | Description                       |
| -------- | --------------------------------------------------------- | ------- | --------------------------------- |
| `cols`   | `1–12` or `{ base?, sm?, md?, lg?, xl? }`                 | `1`     | Column count (flat or responsive) |
| `rows`   | `1–6`                                                     | —       | Explicit row count                |
| `gap`    | `'0' \| '1' \| ... \| '16'`                               | —       | Uniform cell gap                  |
| `colGap` | `'0' \| '1' \| ... \| '16'`                               | —       | Column (horizontal) gap           |
| `rowGap` | `'0' \| '1' \| ... \| '16'`                               | —       | Row (vertical) gap                |
| `flow`   | `'row' \| 'col' \| 'dense' \| 'row-dense' \| 'col-dense'` | —       | Auto-placement flow               |

### GridItem Props

| Prop       | Type             | Default | Description                |
| ---------- | ---------------- | ------- | -------------------------- |
| `colSpan`  | `1–12 \| 'full'` | —       | Columns to span            |
| `rowSpan`  | `1–6`            | —       | Rows to span               |
| `colStart` | `1–12`           | —       | Explicit column start line |
| `rowStart` | `1–6`            | —       | Explicit row start line    |

---

## Page

Full-page scaffold with named landmark slots. Includes a skip-to-content link for keyboard accessibility.

```tsx
import { Page, Container } from '@/components/layout';

<Page header={<Navbar />} footer={<Footer />} sidebar={<Sidebar />} sidebarPosition="left">
  <Container>
    <h1>Dashboard</h1>
    {/* page content */}
  </Container>
</Page>;
```

### Props

| Prop              | Type                | Default          | Description                                  |
| ----------------- | ------------------- | ---------------- | -------------------------------------------- |
| `skipToContentId` | `string`            | `'main-content'` | ID of the `<main>` element for the skip link |
| `header`          | `ReactNode`         | —                | Rendered inside `<header>` landmark          |
| `footer`          | `ReactNode`         | —                | Rendered inside `<footer>` landmark          |
| `sidebar`         | `ReactNode`         | —                | Rendered inside `<aside>` landmark           |
| `sidebarPosition` | `'left' \| 'right'` | `'left'`         | Sidebar placement                            |

---

## Hero

Above-the-fold section with named content slots, gradient backgrounds, and responsive two-column layout with media.

```tsx
import { Hero } from '@/components/layout';
import { Button } from '@/components/button';

<Hero
  size="lg"
  gradient="primary"
  align="center"
  eyebrow="Introducing RSK-UI v2"
  heading={<h1>Build beautiful interfaces faster</h1>}
  subheading="A production-ready design system for React."
  actions={
    <>
      <Button variant="solid">Get started</Button>
      <Button variant="outline">View docs</Button>
    </>
  }
/>;
```

With a media slot (two-column layout on `lg+`):

```tsx
<Hero
  gradient="primary"
  align="left"
  heading={<h1>Title</h1>}
  subheading="Description"
  actions={<Button>CTA</Button>}
  media={<img src="/screenshot.png" alt="App screenshot" className="rounded-2xl shadow-2xl" />}
/>
```

### Props

| Prop         | Type                                              | Default    | Description                                       |
| ------------ | ------------------------------------------------- | ---------- | ------------------------------------------------- |
| `align`      | `'left' \| 'center' \| 'right'`                   | `'center'` | Text and action alignment                         |
| `size`       | `'sm' \| 'md' \| 'lg' \| 'xl'`                    | `'lg'`     | Vertical padding scale                            |
| `gradient`   | `boolean \| 'primary' \| 'accent' \| 'secondary'` | `false`    | Background gradient                               |
| `eyebrow`    | `ReactNode`                                       | —          | Small label above the heading                     |
| `heading`    | `ReactNode`                                       | —          | Primary heading (typically `<h1>`)                |
| `subheading` | `ReactNode`                                       | —          | Supporting description                            |
| `actions`    | `ReactNode`                                       | —          | CTA row content                                   |
| `media`      | `ReactNode`                                       | —          | Right-side media slot; triggers two-column layout |

---

## Spacer

Invisible `aria-hidden` element that inserts empty space. Useful when sibling
`margin`/`padding` modification is undesirable.

```tsx
import { Spacer } from '@/components/layout';

// Vertical space between two sections
<Box>Top</Box>
<Spacer size="16" axis="y" />
<Box>Bottom</Box>

// Horizontal push inside a Flex row
<Flex align="center">
  <Logo />
  <Spacer size="8" axis="x" />
  <NavLinks />
</Flex>

// Explicit per-axis sizes
<Spacer x="4" y="12" />
```

### Props

| Prop   | Type                        | Default  | Description                                |
| ------ | --------------------------- | -------- | ------------------------------------------ |
| `size` | `'1' \| '2' \| ... \| '64'` | —        | Uniform size for both axes (or per `axis`) |
| `x`    | `SpacerSize`                | —        | Explicit horizontal (width) override       |
| `y`    | `SpacerSize`                | —        | Explicit vertical (height) override        |
| `axis` | `'x' \| 'y' \| 'both'`      | `'both'` | Which axis `size` applies to               |

---

## Composition Example

```tsx
import {
  Page,
  Hero,
  Section,
  Container,
  Grid,
  GridItem,
  Stack,
  Flex,
  Spacer,
} from '@/components/layout';
import { Button } from '@/components/button';

function AppLayout() {
  return (
    <Page header={<Navbar />} footer={<Footer />} sidebar={<Sidebar />}>
      {/* Hero */}
      <Hero
        gradient="primary"
        size="lg"
        eyebrow="New"
        heading={<h1>Welcome to the app</h1>}
        subheading="Built with RSK-UI."
        actions={<Button variant="solid">Get started</Button>}
      />

      {/* Feature grid */}
      <Section spacing="xl" background="muted">
        <Container>
          <Stack gap="10">
            <h2>Features</h2>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
              <FeatureCard />
              <GridItem colSpan={2}>
                <FeatureCardWide />
              </GridItem>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container>
          <Flex direction="col" align="center" gap="6">
            <h2>Ready?</h2>
            <Spacer size="2" axis="y" />
            <Button>Start building</Button>
          </Flex>
        </Container>
      </Section>
    </Page>
  );
}
```

---

## Accessibility

- **`Page`** renders a skip-to-content link that becomes visible on keyboard focus, pointing to `<main id="main-content">`. All slots use proper HTML landmark elements (`<header>`, `<main>`, `<footer>`, `<aside>`).
- **`Section`** renders a `<section>` landmark — always provide an `aria-label` or `aria-labelledby` for screen reader navigation.
- **`Hero`** renders a `<section>` landmark; decorative gradient elements are `aria-hidden`.
- **`Spacer`** is `aria-hidden="true"` with `role="presentation"` to be invisible to assistive technology.
- **`Stack`** divider `<hr>` elements are `aria-hidden="true"` since they are purely decorative.
- All components support `tabIndex` and any ARIA attribute passthrough via `...props`.

## Responsiveness

All components are **mobile-first**:

- `Container` padding: `px-4` (mobile) → `sm:px-6` → `lg:px-8`
- `Section` uses responsive spacing for `lg`, `xl`, and `2xl` variants
- `Grid` `cols` accepts a responsive object `{ base, sm, md, lg, xl }`
- `Hero` switches from single-column to two-column when a `media` prop is provided (`lg:flex-row`)
- `Page` sidebar layout adapts via Flexbox
