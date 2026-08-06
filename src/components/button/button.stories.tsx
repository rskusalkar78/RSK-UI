import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary action trigger with multiple visual variants, sizes, and loading states.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'link', 'destructive'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    loadingText: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button', variant: 'solid', size: 'md' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6 bg-background">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-wrap items-end gap-3 p-6 bg-background">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Button key={s} variant="solid" size={s}>
          Size {s}
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: { children: 'Save changes', variant: 'solid', isLoading: true },
};

export const LoadingWithText: Story = {
  name: 'Loading with Text',
  args: { children: 'Save changes', variant: 'solid', isLoading: true, loadingText: 'Saving…' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', variant: 'solid', disabled: true },
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6 bg-background">
      <Button
        variant="solid"
        leftIcon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        }
      >
        Continue
      </Button>
      <Button
        variant="outline"
        rightIcon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        }
      >
        Download
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  name: 'Full Width',
  render: () => (
    <div className="w-72 p-6 bg-background">
      <Button variant="solid" fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
};

export const DisabledVariants: Story = {
  name: 'All Disabled',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6 bg-background">
      {(['solid', 'outline', 'ghost', 'link', 'destructive'] as const).map((v) => (
        <Button key={v} variant={v} disabled>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Click me',
    variant: 'solid',
    size: 'md',
    isLoading: false,
    disabled: false,
    fullWidth: false,
  },
};
