import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Search, Plus, Trash2, Mail, Inbox, User, Settings } from 'lucide-react';
import { ThemeProvider } from '../providers/theme-provider';
import { Button } from '../components/button/button';
import { Badge } from '../components/badge/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar/avatar';
import { Spinner } from '../components/spinner/spinner';
import { Divider } from '../components/divider/divider';
import { Alert } from '../components/feedback/alert';
import { Toast } from '../components/feedback/toast';
import { Progress } from '../components/feedback/progress';
import { Skeleton } from '../components/feedback/skeleton';
import { EmptyState } from '../components/feedback/empty-state';
import { Card } from '../components/data-display/card';
import { IconButton } from '../components/icon-button/icon-button';
import { Typography } from '../components/typography/typography';
import { Container } from '../components/layout/container';
import { Flex } from '../components/layout/flex';
import { Grid } from '../components/layout/grid';
import { Stack } from '../components/layout/stack';
import { Section } from '../components/layout/section';
import { Page } from '../components/layout/page';
import { Hero } from '../components/layout/hero';
import { Spacer } from '../components/layout/spacer';
import { Tabs } from '../components/data-display/tabs';
import { Input } from '../components/form/input';
import { Textarea } from '../components/form/textarea';
import { Checkbox } from '../components/form/checkbox';
import { Radio } from '../components/form/radio';
import { Switch } from '../components/form/switch';
import { Select } from '../components/form/select';
import { ThemeToggle } from '../components/theme-toggle/theme-toggle';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const { initial: _i, animate: _a, exit: _e, transition: _t, ...rest } = props;
      return <div {...(rest as Record<string, unknown>)}>{children}</div>;
    },
    aside: ({ children, ...props }: Record<string, unknown>) => {
      const { initial: _i, animate: _a, exit: _e, transition: _t, ...rest } = props;
      return <aside {...(rest as Record<string, unknown>)}>{children}</aside>;
    },
    span: ({ children, ...props }: Record<string, unknown>) => {
      const { initial: _i, animate: _a, exit: _e, transition: _t, ...rest } = props;
      return <span {...(rest as Record<string, unknown>)}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('Snapshots — Button', () => {
  it('Button solid variant', () => {
    const { asFragment } = renderWithTheme(<Button variant="solid">Solid Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Button outline variant', () => {
    const { asFragment } = renderWithTheme(<Button variant="outline">Outline Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Button ghost variant', () => {
    const { asFragment } = renderWithTheme(<Button variant="ghost">Ghost Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Button link variant', () => {
    const { asFragment } = renderWithTheme(<Button variant="link">Link Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Button destructive variant', () => {
    const { asFragment } = renderWithTheme(<Button variant="destructive">Delete</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Button loading state', () => {
    const { asFragment } = renderWithTheme(
      <Button isLoading loadingText="Submitting...">
        Submit
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Button with leftIcon', () => {
    const { asFragment } = renderWithTheme(
      <Button variant="solid" leftIcon={<Plus size={16} data-testid="left-icon" />}>
        Add Item
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Badge', () => {
  it('Badge default (subtle neutral)', () => {
    const { asFragment } = renderWithTheme(<Badge>Default Badge</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Badge solid primary', () => {
    const { asFragment } = renderWithTheme(
      <Badge variant="solid" color="primary">
        Primary
      </Badge>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Badge outline success with dot', () => {
    const { asFragment } = renderWithTheme(
      <Badge variant="outline" color="success" dot>
        Active
      </Badge>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Badge subtle warning', () => {
    const { asFragment } = renderWithTheme(
      <Badge variant="subtle" color="warning">
        Pending
      </Badge>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Avatar', () => {
  it('Avatar with initials fallback', () => {
    const { asFragment } = renderWithTheme(
      <Avatar size="md">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Avatar with image and status online', () => {
    const { asFragment } = renderWithTheme(
      <Avatar size="lg" status="online" name="Jane Doe">
        <AvatarImage src="https://example.com/avatar.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Avatar square shape with busy status', () => {
    const { asFragment } = renderWithTheme(
      <Avatar size="md" shape="square" status="busy">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Spinner', () => {
  it('Spinner default md size', () => {
    const { asFragment } = renderWithTheme(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Spinner primary xl size', () => {
    const { asFragment } = renderWithTheme(
      <Spinner size="xl" variant="primary" label="Loading data" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Spinner destructive sm size', () => {
    const { asFragment } = renderWithTheme(<Spinner size="sm" variant="destructive" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Divider', () => {
  it('Divider horizontal solid', () => {
    const { asFragment } = renderWithTheme(<Divider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Divider horizontal dashed with label', () => {
    const { asFragment } = renderWithTheme(<Divider variant="dashed" label="OR" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Divider vertical dotted', () => {
    const { asFragment } = renderWithTheme(
      <div style={{ height: '40px', display: 'inline-flex', alignItems: 'center' }}>
        <Divider orientation="vertical" variant="dotted" />
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Alert variants', () => {
  it('Alert info variant', () => {
    const { asFragment } = renderWithTheme(
      <Alert variant="info" title="Information" description="This is an informational message." />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Alert success variant', () => {
    const { asFragment } = renderWithTheme(
      <Alert variant="success" title="Success!" description="Your changes have been saved." />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Alert warning variant', () => {
    const { asFragment } = renderWithTheme(
      <Alert variant="warning" title="Warning" description="Please review before continuing." />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Alert destructive variant', () => {
    const { asFragment } = renderWithTheme(
      <Alert variant="destructive" title="Error" description="Something went wrong." />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Toast', () => {
  it('Toast open info variant', () => {
    const { asFragment } = renderWithTheme(
      <Toast
        open
        variant="info"
        title="Notification"
        description="You have a new message."
        onClose={() => undefined}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Toast open success variant', () => {
    const { asFragment } = renderWithTheme(
      <Toast open variant="success" title="Saved!" description="Document saved successfully." />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Progress', () => {
  it('Progress md size with label', () => {
    const { asFragment } = renderWithTheme(<Progress value={65} label="Uploading..." />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Progress sm size no label', () => {
    const { asFragment } = renderWithTheme(<Progress value={33} size="sm" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Progress lg size at 100%', () => {
    const { asFragment } = renderWithTheme(<Progress value={100} size="lg" label="Complete" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Skeleton', () => {
  it('Skeleton default', () => {
    const { asFragment } = renderWithTheme(<Skeleton className="h-4 w-48" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Skeleton stack with multiple', () => {
    const { asFragment } = renderWithTheme(
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Skeleton asChild with children', () => {
    const { asFragment } = renderWithTheme(
      <Skeleton asChild className="h-16 w-16 rounded-full">
        <span />
      </Skeleton>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — EmptyState', () => {
  it('EmptyState with title, description, action, and icon', () => {
    const { asFragment } = renderWithTheme(
      <EmptyState
        icon={<Inbox className="h-12 w-12" data-testid="empty-icon" />}
        title="No messages yet"
        description="Your inbox is empty. Check back later for updates."
        action={<Button variant="solid">Refresh</Button>}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('EmptyState minimal with just title', () => {
    const { asFragment } = renderWithTheme(<EmptyState title="No data available" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Card', () => {
  it('Card with title, description, action, children, and footer', () => {
    const { asFragment } = renderWithTheme(
      <Card
        title="User Profile"
        description="Manage your account settings"
        action={
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        }
        footer="Last updated: Today"
      >
        <p>Card content goes here with details about the user profile.</p>
      </Card>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Card with children only', () => {
    const { asFragment } = renderWithTheme(
      <Card>
        <Typography variant="body">Simple card with just content.</Typography>
      </Card>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Card loading state', () => {
    const { asFragment } = renderWithTheme(<Card title="Loading..." loading />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Card empty state', () => {
    const { asFragment } = renderWithTheme(<Card title="Items" empty />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — IconButton', () => {
  it('IconButton ghost md', () => {
    const { asFragment } = renderWithTheme(
      <IconButton aria-label="Search" icon={<Search data-testid="icon-search" />} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('IconButton solid circle lg', () => {
    const { asFragment } = renderWithTheme(
      <IconButton
        aria-label="Add item"
        variant="solid"
        shape="circle"
        size="lg"
        icon={<Plus data-testid="icon-plus" />}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('IconButton destructive sm', () => {
    const { asFragment } = renderWithTheme(
      <IconButton
        aria-label="Delete"
        variant="destructive"
        size="sm"
        icon={<Trash2 data-testid="icon-trash" />}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('IconButton outline square with loading', () => {
    const { asFragment } = renderWithTheme(
      <IconButton aria-label="Loading" variant="outline" shape="square" isLoading />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Typography variants', () => {
  it('Typography h1', () => {
    const { asFragment } = renderWithTheme(<Typography variant="h1">Heading 1</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography h2', () => {
    const { asFragment } = renderWithTheme(<Typography variant="h2">Heading 2</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography h3', () => {
    const { asFragment } = renderWithTheme(<Typography variant="h3">Heading 3</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography h4', () => {
    const { asFragment } = renderWithTheme(<Typography variant="h4">Heading 4</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography h5', () => {
    const { asFragment } = renderWithTheme(<Typography variant="h5">Heading 5</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography h6', () => {
    const { asFragment } = renderWithTheme(<Typography variant="h6">Heading 6</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography p (body)', () => {
    const { asFragment } = renderWithTheme(
      <Typography variant="body" as="p">
        This is a paragraph of body text.
      </Typography>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography small', () => {
    const { asFragment } = renderWithTheme(
      <Typography variant="caption" as="small">
        This is small caption text.
      </Typography>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography blockquote', () => {
    const { asFragment } = renderWithTheme(
      <Typography variant="body" as="blockquote" className="border-l-4 pl-4 italic">
        "This is a quoted block of text."
      </Typography>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Typography code', () => {
    const { asFragment } = renderWithTheme(
      <Typography variant="code">const greeting = "Hello, World!"</Typography>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Layout components', () => {
  it('Container xl padded centered', () => {
    const { asFragment } = renderWithTheme(
      <Container size="xl" padded centered>
        <p>Container content</p>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Flex row center gap-4', () => {
    const { asFragment } = renderWithTheme(
      <Flex direction="row" align="center" justify="between" gap="4">
        <span>Left</span>
        <span>Center</span>
        <span>Right</span>
      </Flex>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Grid responsive cols gap-6', () => {
    const { asFragment } = renderWithTheme(
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Stack vertical gap-3 with dividers', () => {
    const { asFragment } = renderWithTheme(
      <Stack gap="3" dividers>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Stack>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Section md spacing muted background', () => {
    const { asFragment } = renderWithTheme(
      <Section spacing="md" background="muted" aria-label="Features">
        <Container>
          <p>Section content</p>
        </Container>
      </Section>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Page with header, footer, sidebar', () => {
    const { asFragment } = renderWithTheme(
      <Page
        header={<div>Header Content</div>}
        footer={<div>Footer Content</div>}
        sidebar={<div>Sidebar Menu</div>}
        sidebarPosition="left"
      >
        <Container>
          <p>Main page content</p>
        </Container>
      </Page>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Hero with heading, subheading, actions, and gradient', () => {
    const { asFragment } = renderWithTheme(
      <Hero
        size="md"
        gradient="primary"
        align="center"
        eyebrow="New Release"
        heading={<h1>Welcome to RSK-UI</h1>}
        subheading="A production-ready design system for building beautiful interfaces."
        actions={
          <>
            <Button variant="solid">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </>
        }
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Spacer size 8 both axes', () => {
    const { asFragment } = renderWithTheme(
      <div>
        <p>Before spacer</p>
        <Spacer size="8" />
        <p>After spacer</p>
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Tabs', () => {
  it('Tabs horizontal line variant with 3 tabs', () => {
    const sampleTabs = [
      {
        id: 'tab-1',
        label: 'Overview',
        icon: <User data-testid="tab-icon-1" />,
        content: <p>Overview content goes here.</p>,
      },
      {
        id: 'tab-2',
        label: 'Settings',
        icon: <Settings data-testid="tab-icon-2" />,
        content: <p>Settings panel content.</p>,
      },
      {
        id: 'tab-3',
        label: 'Messages',
        icon: <Mail data-testid="tab-icon-3" />,
        badge: (
          <Badge color="primary" size="sm">
            5
          </Badge>
        ),
        content: <p>Messages content here.</p>,
      },
    ];
    const { asFragment } = renderWithTheme(
      <Tabs tabs={sampleTabs} variant="line" orientation="horizontal" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Tabs vertical pills variant with 3 tabs', () => {
    const sampleTabs = [
      { id: 'v1', label: 'General', content: <p>General settings</p> },
      { id: 'v2', label: 'Security', content: <p>Security options</p> },
      { id: 'v3', label: 'Notifications', content: <p>Notification preferences</p> },
    ];
    const { asFragment } = renderWithTheme(
      <Tabs tabs={sampleTabs} variant="pills" orientation="vertical" size="sm" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — Form components', () => {
  it('Input md with leftIcon', () => {
    const { asFragment } = renderWithTheme(
      <Input placeholder="Search..." leftIcon={<Search data-testid="input-icon" />} fullWidth />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Input sm error state', () => {
    const { asFragment } = renderWithTheme(<Input size="sm" isError value="invalid" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Input lg loading state', () => {
    const { asFragment } = renderWithTheme(
      <Input size="lg" isLoading placeholder="Verifying..." />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Textarea md with resize vertical and maxLength', () => {
    const { asFragment } = renderWithTheme(
      <Textarea placeholder="Enter your bio..." maxLength={200} fullWidth defaultValue="Hello" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Textarea sm error loading', () => {
    const { asFragment } = renderWithTheme(<Textarea size="sm" isError isLoading />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Checkbox md checked with label and helperText', () => {
    const { asFragment } = renderWithTheme(
      <Checkbox label="Accept terms" helperText="You must agree to continue." defaultChecked />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Checkbox lg indeterminate error', () => {
    const { asFragment } = renderWithTheme(
      <Checkbox size="lg" isIndeterminate isError label="Select all" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Radio md checked with label', () => {
    const { asFragment } = renderWithTheme(
      <Radio name="option" value="a" label="Option A" defaultChecked />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Radio sm disabled with helper text', () => {
    const { asFragment } = renderWithTheme(
      <Radio
        size="sm"
        name="opt"
        value="b"
        label="Unavailable"
        helperText="This option is currently disabled."
        disabled
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Switch md checked with label', () => {
    const { asFragment } = renderWithTheme(<Switch label="Enable notifications" defaultChecked />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Switch sm error disabled', () => {
    const { asFragment } = renderWithTheme(
      <Switch size="sm" label="Premium feature" isError disabled helperText="Upgrade to enable." />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Select md with placeholder and options', () => {
    const { asFragment } = renderWithTheme(
      <Select
        placeholder="Select a country..."
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
        ]}
        fullWidth
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Select lg loading with grouped options', () => {
    const { asFragment } = renderWithTheme(
      <Select
        size="lg"
        isLoading
        options={[
          { label: 'Fruits', options: [{ value: 'apple', label: 'Apple' }] },
          { label: 'Vegetables', options: [{ value: 'carrot', label: 'Carrot' }] },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Snapshots — ThemeToggle', () => {
  it('ThemeToggle icon variant md', () => {
    const { asFragment } = renderWithTheme(<ThemeToggle variant="icon" size="md" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('ThemeToggle icon variant sm with label', () => {
    const { asFragment } = renderWithTheme(<ThemeToggle variant="icon" size="sm" showLabel />);
    expect(asFragment()).toMatchSnapshot();
  });
});
