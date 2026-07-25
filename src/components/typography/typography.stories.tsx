import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'body-sm',
        'caption',
        'label',
        'code',
        'overline',
      ],
    },
    as: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'div',
        'label',
        'small',
        'strong',
        'em',
        'blockquote',
        'code',
        'pre',
      ],
    },
    truncate: { control: 'boolean' },
    muted: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: { variant: 'body', children: 'The quick brown fox jumps over the lazy dog.' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="space-y-4 p-6 bg-background max-w-2xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body">Body — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-sm">
        Body Small — The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="caption">Caption — Additional context text</Typography>
      <Typography variant="label">Label — Form field label</Typography>
      <Typography variant="code">const answer = 42;</Typography>
      <Typography variant="overline">Overline Text</Typography>
    </div>
  ),
};

export const Muted: Story = {
  name: 'Muted Variants',
  render: () => (
    <div className="space-y-3 p-6 bg-background">
      <Typography variant="body" muted>
        Muted body text for secondary information.
      </Typography>
      <Typography variant="caption" muted>
        Muted caption for helper text.
      </Typography>
    </div>
  ),
};

export const Truncated: Story = {
  name: 'Truncated',
  render: () => (
    <div className="p-6 bg-background w-64">
      <Typography variant="body" truncate>
        This text is very long and will be truncated with an ellipsis when it overflows.
      </Typography>
    </div>
  ),
};

export const Polymorphic: Story = {
  name: 'Polymorphic (as prop)',
  render: () => (
    <div className="space-y-3 p-6 bg-background">
      <Typography variant="h2" as="h1">
        h2 style, h1 semantics
      </Typography>
      <Typography variant="body" as="span">
        body style, span element
      </Typography>
      <Typography variant="label" as="strong">
        label style, strong element
      </Typography>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'body',
    children: 'Edit me in the controls panel.',
    truncate: false,
    muted: false,
  },
};
