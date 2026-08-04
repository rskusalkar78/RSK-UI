import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './icon-button';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['rounded', 'circle', 'square'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { 'aria-label': 'Search', icon: <SearchIcon />, variant: 'ghost', size: 'md' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex items-center gap-3 p-6 bg-background">
      <IconButton aria-label="Solid" variant="solid" icon={<SearchIcon />} />
      <IconButton aria-label="Outline" variant="outline" icon={<SearchIcon />} />
      <IconButton aria-label="Ghost" variant="ghost" icon={<SearchIcon />} />
      <IconButton aria-label="Destructive" variant="destructive" icon={<TrashIcon />} />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-3 p-6 bg-background">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <IconButton
          key={s}
          aria-label={`Size ${s}`}
          variant="outline"
          size={s}
          icon={<CloseIcon />}
        />
      ))}
    </div>
  ),
};

export const AllShapes: Story = {
  name: 'All Shapes',
  render: () => (
    <div className="flex items-center gap-3 p-6 bg-background">
      <IconButton aria-label="Rounded" variant="outline" shape="rounded" icon={<SearchIcon />} />
      <IconButton aria-label="Circle" variant="outline" shape="circle" icon={<SearchIcon />} />
      <IconButton aria-label="Square" variant="outline" shape="square" icon={<SearchIcon />} />
    </div>
  ),
};

export const Loading: Story = {
  args: { 'aria-label': 'Loading', icon: <SearchIcon />, isLoading: true },
};

export const Disabled: Story = {
  args: { 'aria-label': 'Disabled', icon: <TrashIcon />, variant: 'destructive', disabled: true },
};
