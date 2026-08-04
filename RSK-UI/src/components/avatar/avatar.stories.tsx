import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    status: { control: 'select', options: ['online', 'offline', 'busy', 'away', undefined] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

const IMG_URL = 'https://i.pravatar.cc/150?img=3';

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={IMG_URL} alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  args: { size: 'md', shape: 'circle' },
};

export const WithFallback: Story = {
  name: 'Fallback (No Image)',
  render: () => (
    <Avatar size="md">
      <AvatarImage src="/broken-image.jpg" alt="Broken" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const InitialsOnly: Story = {
  name: 'Initials Only',
  render: () => (
    <div className="flex items-center gap-3 p-6 bg-background">
      {['JD', 'AB', 'MK', 'RS'].map((initials) => (
        <Avatar key={initials} size="md">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-end gap-4 p-6 bg-background">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Avatar size={s}>
            <AvatarImage src={IMG_URL} alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-background">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" shape="circle">
          <AvatarImage src={IMG_URL} alt="Circle" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" shape="square">
          <AvatarImage src={IMG_URL} alt="Square" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Square</span>
      </div>
    </div>
  ),
};

export const WithStatus: Story = {
  name: 'Status Indicators',
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-background">
      {(['online', 'offline', 'busy', 'away'] as const).map((status) => (
        <div key={status} className="flex flex-col items-center gap-2">
          <Avatar size="md" status={status}>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground capitalize">{status}</span>
        </div>
      ))}
    </div>
  ),
};

export const Group: Story = {
  name: 'Avatar Group',
  render: () => (
    <div className="p-6 bg-background space-y-4">
      <AvatarGroup max={3}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Avatar key={i} size="md">
            <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} alt={`User ${i}`} />
            <AvatarFallback>U{i}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  ),
};
