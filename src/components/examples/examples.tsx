import { type ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package2,
  PanelsTopLeft,
  PieChart,
  Receipt,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SquareKanban,
  TrendingUp,
  UserCircle2,
  Users,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Container,
  FormField,
  Input,
  Navbar,
  Page,
  Sidebar,
  Stack,
  ThemeToggle,
  Typography,
  Checkbox,
  Switch,
  Select,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../index';

const shellClassName =
  'min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_45%)] bg-background text-foreground';

function PageShell({
  children,
  title,
  subtitle,
  action,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className={shellClassName}>
      <Container size="2xl" padded className="py-6 sm:py-8">
        <Stack gap="6">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Typography variant="h2" className="text-2xl font-semibold tracking-tight">
                {title}
              </Typography>
              {subtitle ? (
                <Typography variant="body-sm" muted className="mt-1">
                  {subtitle}
                </Typography>
              ) : null}
            </div>
            {action ? <div className="flex items-center gap-2">{action}</div> : null}
          </div>
          {children}
        </Stack>
      </Container>
    </div>
  );
}

function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_35%)] bg-background px-4 py-10 text-foreground">
      <Card className="w-full max-w-5xl overflow-hidden border-border/70 p-0 shadow-2xl">
        <div className="grid min-h-[640px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-10">
            <div>
              <Badge color="primary" className="mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> RSK UI
              </Badge>
              <Typography variant="h2" className="text-3xl font-semibold tracking-tight">
                {title}
              </Typography>
              <Typography variant="body" muted className="mt-3 max-w-md">
                {description}
              </Typography>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/70 bg-background/80 p-4">
              {[
                ['Design systems', 'Reusable layouts with responsive cards and nav.'],
                ['Dark mode', 'Accessible surfaces that feel native in either theme.'],
                ['Storybook ready', 'Drop into docs and iterate without rework.'],
              ].map(([title, copy]) => (
                <div key={title} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <Typography variant="label">{title}</Typography>
                    <Typography variant="body-sm" muted>
                      {copy}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center bg-card/70 p-6 sm:p-10">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AppShell({ children, active = 'Overview' }: { children: ReactNode; active?: string }) {
  const navItems = [
    {
      label: 'Overview',
      href: '#',
      active: active === 'Overview',
      icon: <LayoutDashboard size={16} />,
    },
    {
      label: 'Analytics',
      href: '#',
      active: active === 'Analytics',
      icon: <BarChart3 size={16} />,
    },
    { label: 'Customers', href: '#', active: active === 'Customers', icon: <Users size={16} /> },
    { label: 'Billing', href: '#', active: active === 'Billing', icon: <Receipt size={16} /> },
  ];

  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: active === 'Dashboard' },
    { label: 'Analytics', icon: <PieChart size={16} />, active: active === 'Analytics' },
    { label: 'Products', icon: <Package2 size={16} />, active: active === 'Products' },
    { label: 'Settings', icon: <Settings size={16} />, active: active === 'Settings' },
  ];

  return (
    <Page
      header={
        <Navbar
          brand={
            <span className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-primary" />
              Northstar
            </span>
          }
          items={navItems}
          actions={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" leftIcon={<Search size={16} />}>
                Search
              </Button>
              <ThemeToggle variant="icon" size="sm" />
              <Avatar size="sm" className="h-8 w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                  alt="Alicia Lopez"
                />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            </div>
          }
        />
      }
      sidebar={
        <Sidebar
          title="Workspace"
          items={sidebarItems}
          footer={
            <Button variant="outline" size="sm" fullWidth leftIcon={<LogOut size={16} />}>
              Sign out
            </Button>
          }
        />
      }
      sidebarPosition="left"
    >
      {children}
    </Page>
  );
}

export function LoginExample() {
  return (
    <AuthCard title="Welcome back" description="Sign in to continue your workspace.">
      <Stack gap="6">
        <div>
          <Typography variant="h3">Welcome back</Typography>
          <Typography variant="body-sm" muted>
            Sign in to continue your workspace and pick up where you left off.
          </Typography>
        </div>
        <Stack gap="4">
          <FormField label="Email" fullWidth>
            <Input type="email" placeholder="name@company.com" fullWidth />
          </FormField>
          <FormField label="Password" fullWidth>
            <Input type="password" placeholder="••••••••" fullWidth />
          </FormField>
          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" />
            <Button variant="link" size="sm">
              Forgot password?
            </Button>
          </div>
        </Stack>
        <Stack gap="3">
          <Button fullWidth size="lg">
            Sign in
          </Button>
          <Button variant="outline" fullWidth size="lg">
            Continue with SSO
          </Button>
        </Stack>
      </Stack>
    </AuthCard>
  );
}

export function RegisterExample() {
  return (
    <AuthCard title="Create your account" description="Start your free trial in minutes.">
      <Stack gap="5">
        <div>
          <Typography variant="h3">Create your account</Typography>
          <Typography variant="body-sm" muted>
            Start your 14-day free trial with workspace-level analytics.
          </Typography>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="First name" fullWidth>
            <Input placeholder="Maya" fullWidth />
          </FormField>
          <FormField label="Last name" fullWidth>
            <Input placeholder="Chen" fullWidth />
          </FormField>
        </div>
        <FormField label="Work email" fullWidth>
          <Input type="email" placeholder="maya@northstar.io" fullWidth />
        </FormField>
        <FormField label="Company" fullWidth>
          <Input placeholder="Northstar Labs" fullWidth />
        </FormField>
        <FormField label="Password" fullWidth>
          <Input type="password" placeholder="Create a strong password" fullWidth />
        </FormField>
        <Checkbox label="I agree to the Terms and Privacy Policy" />
        <Button fullWidth size="lg">
          Create account
        </Button>
      </Stack>
    </AuthCard>
  );
}

export function ForgotPasswordExample() {
  return (
    <AuthCard title="Reset your password" description="We’ll send you a secure recovery link.">
      <Stack gap="6">
        <div>
          <Typography variant="h3">Reset your password</Typography>
          <Typography variant="body-sm" muted>
            Enter your email and we’ll send a recovery link that expires in 15 minutes.
          </Typography>
        </div>
        <FormField label="Email" fullWidth>
          <Input type="email" placeholder="you@company.com" fullWidth />
        </FormField>
        <Button fullWidth size="lg">
          Send recovery link
        </Button>
        <Button variant="outline" fullWidth size="lg">
          Back to sign in
        </Button>
      </Stack>
    </AuthCard>
  );
}

export function DashboardExample() {
  const cards = [
    { title: 'Revenue', value: '$246K', trend: '+18.2%', detail: 'vs last month' },
    { title: 'Active users', value: '18.4K', trend: '+7.1%', detail: 'new this week' },
    { title: 'Conversion', value: '4.8%', trend: '+0.6%', detail: 'quarterly lift' },
  ];

  return (
    <AppShell active="Dashboard">
      <PageShell
        title="Executive dashboard"
        subtitle="A polished overview for product, growth, and operations teams."
        action={
          <Button size="sm" leftIcon={<Sparkles size={16} />}>
            Create report
          </Button>
        }
      >
        <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <Card
            title="Pipeline health"
            description="A glance at momentum across your funnel."
            action={<Badge color="success">Live</Badge>}
          >
            <div className="grid gap-4 md:grid-cols-3">
              {cards.map((card) => (
                <div key={card.title} className="rounded-xl border border-border bg-muted/30 p-4">
                  <Typography variant="body-sm" muted>
                    {card.title}
                  </Typography>
                  <Typography variant="h3" className="mt-2">
                    {card.value}
                  </Typography>
                  <Typography
                    variant="body-sm"
                    className="mt-1 text-success-600 dark:text-success-400"
                  >
                    {card.trend}
                  </Typography>
                  <Typography variant="caption" muted>
                    {card.detail}
                  </Typography>
                </div>
              ))}
            </div>
          </Card>
          <Card
            title="Team activity"
            description="Latest updates from your workspace."
            action={
              <Button variant="ghost" size="sm">
                View all
              </Button>
            }
          >
            <Stack gap="3">
              {[
                'Product launch approved',
                'Design review scheduled',
                'Onboarding flow improved',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
                >
                  <Typography variant="body-sm">{item}</Typography>
                  <Badge variant="outline" color="primary">
                    Ready
                  </Badge>
                </div>
              ))}
            </Stack>
          </Card>
        </div>
      </PageShell>
    </AppShell>
  );
}

export function AnalyticsExample() {
  return (
    <AppShell active="Analytics">
      <PageShell
        title="Analytics hub"
        subtitle="Track performance, retention, and engagement in one place."
        action={
          <Button variant="outline" size="sm" leftIcon={<TrendingUp size={16} />}>
            Export
          </Button>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card
            title="Revenue trend"
            description="Rolling 90-day SaaS metrics."
            action={<Badge color="primary">Updated 5m ago</Badge>}
          >
            <div className="h-56 rounded-xl border border-dashed border-border p-4">
              <div className="flex h-full items-end gap-2">
                {[40, 55, 70, 60, 82, 92, 110].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-accent"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          </Card>
          <Card title="Key cohorts" description="Segment performance at a glance.">
            <Stack gap="3">
              {[
                ['Retention', '84%'],
                ['Activation', '73%'],
                ['Expansion', '26%'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
                >
                  <Typography variant="body-sm">{label}</Typography>
                  <Typography variant="label">{value}</Typography>
                </div>
              ))}
            </Stack>
          </Card>
        </div>
      </PageShell>
    </AppShell>
  );
}

export function PricingExample() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Ideal for solo founders.',
      features: ['Unlimited projects', 'Community support'],
      highlight: false,
    },
    {
      name: 'Growth',
      price: '$99',
      description: 'For modern product teams.',
      features: ['Priority support', 'Advanced analytics'],
      highlight: true,
    },
    {
      name: 'Scale',
      price: '$249',
      description: 'For larger organizations.',
      features: ['SSO', 'Dedicated success manager'],
      highlight: false,
    },
  ];

  return (
    <div className={shellClassName}>
      <Container size="2xl" padded className="py-10">
        <Stack gap="8">
          <div className="text-center">
            <Badge color="primary">Pricing</Badge>
            <Typography variant="h2" className="mt-3 text-3xl font-semibold tracking-tight">
              Choose a plan that scales with your team
            </Typography>
            <Typography variant="body" muted className="mx-auto mt-3 max-w-2xl">
              Flexible tiers with enterprise-grade controls and zero-friction onboarding.
            </Typography>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlight ? 'border-primary shadow-lg' : ''}
                title={plan.name}
                description={plan.description}
                action={plan.highlight ? <Badge color="success">Most popular</Badge> : null}
              >
                <Stack gap="4">
                  <div className="flex items-end gap-2">
                    <Typography variant="h2">{plan.price}</Typography>
                    <Typography variant="body-sm" muted>
                      /month
                    </Typography>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button fullWidth variant={plan.highlight ? 'solid' : 'outline'}>
                    Start free
                  </Button>
                </Stack>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export function ProfileExample() {
  return (
    <AppShell active="Customers">
      <PageShell
        title="Profile"
        subtitle="Keep customer context and preferences in sync."
        action={
          <Button variant="outline" size="sm" leftIcon={<UserCircle2 size={16} />}>
            Edit profile
          </Button>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card title="About" description="Core identity and recent notes.">
            <Stack gap="4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Mina Nguyen"
                  />
                  <AvatarFallback>MN</AvatarFallback>
                </Avatar>
                <div>
                  <Typography variant="h4">Mina Nguyen</Typography>
                  <Typography variant="body-sm" muted>
                    Product Lead • Northstar
                  </Typography>
                </div>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
                <Typography variant="body-sm">
                  "Focused on turning customer insight into sharper product decisions."
                </Typography>
              </div>
            </Stack>
          </Card>
          <Card title="Preferences" description="Delivery, communication, and plan updates.">
            <Stack gap="4">
              <div className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2">
                <div>
                  <Typography variant="label">Email updates</Typography>
                  <Typography variant="caption" muted>
                    Product and billing summaries
                  </Typography>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2">
                <div>
                  <Typography variant="label">Beta access</Typography>
                  <Typography variant="caption" muted>
                    Early access to new features
                  </Typography>
                </div>
                <Switch />
              </div>
            </Stack>
          </Card>
        </div>
      </PageShell>
    </AppShell>
  );
}

export function SettingsExample() {
  return (
    <AppShell active="Settings">
      <PageShell
        title="Settings"
        subtitle="Adjust platform preferences and security controls."
        action={<ThemeToggle variant="icon" size="sm" />}
      >
        <Card title="Workspace preferences" description="Tune the experience for your team.">
          <Stack gap="4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Workspace name" fullWidth>
                <Input placeholder="Northstar" fullWidth />
              </FormField>
              <FormField label="Time zone" fullWidth>
                <Select
                  fullWidth
                  placeholder="Select timezone"
                  options={[
                    { label: 'UTC', value: 'UTC' },
                    { label: 'PST', value: 'PST' },
                  ]}
                />
              </FormField>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2">
              <div>
                <Typography variant="label">Auto-save drafts</Typography>
                <Typography variant="caption" muted>
                  Store work-in-progress automatically
                </Typography>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2">
              <div>
                <Typography variant="label">Email notifications</Typography>
                <Typography variant="caption" muted>
                  Receive weekly digests
                </Typography>
              </div>
              <Switch />
            </div>
          </Stack>
        </Card>
      </PageShell>
    </AppShell>
  );
}

export function ECommerceExample() {
  const products = [
    { name: 'Aero Desk', price: '$329', badge: 'New' },
    { name: 'Halo Headset', price: '$219', badge: 'Best seller' },
    { name: 'Pulse Keyboard', price: '$149', badge: 'Limited' },
  ];

  return (
    <div className={shellClassName}>
      <Container size="2xl" padded className="py-8">
        <Stack gap="6">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Typography variant="h2" className="text-2xl font-semibold tracking-tight">
                Commerce storefront
              </Typography>
              <Typography variant="body-sm" muted className="mt-1">
                Design-led product discovery with a premium checkout experience.
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" leftIcon={<Search size={16} />}>
                Search
              </Button>
              <Button leftIcon={<CreditCard size={16} />}>Checkout</Button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <Card
              title="Highlights"
              description="Featured collections."
              action={<Badge color="accent">Spring</Badge>}
            >
              <Stack gap="3">
                {['Fast shipping', 'Free returns', 'Secure checkout'].map((item) => (
                  <div key={item} className="rounded-lg border border-border/70 px-3 py-2 text-sm">
                    {item}
                  </div>
                ))}
              </Stack>
            </Card>
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.name}
                  title={product.name}
                  description="Premium workspace gear"
                  action={<Badge color="primary">{product.badge}</Badge>}
                >
                  <Stack gap="3">
                    <div className="h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="flex items-center justify-between">
                      <Typography variant="label">{product.price}</Typography>
                      <Button size="sm">Add</Button>
                    </div>
                  </Stack>
                </Card>
              ))}
            </div>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export function KanbanExample() {
  const columns = [
    { title: 'Backlog', items: ['Pitch deck refresh', 'Customer interviews'] },
    { title: 'In progress', items: ['Prototype polish'] },
    { title: 'Done', items: ['Onboarding copy'] },
  ];

  return (
    <div className={shellClassName}>
      <Container size="2xl" padded className="py-8">
        <Stack gap="6">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Typography variant="h2" className="text-2xl font-semibold tracking-tight">
                Kanban workspace
              </Typography>
              <Typography variant="body-sm" muted className="mt-1">
                Keep delivery moving with a clear, lightweight team board.
              </Typography>
            </div>
            <Button leftIcon={<SquareKanban size={16} />}>New task</Button>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {columns.map((column) => (
              <Card key={column.title} title={column.title} description="Sprint coordination">
                <Stack gap="3">
                  {column.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/70 bg-muted/30 p-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </Stack>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export function LandingPageExample() {
  return (
    <div className={shellClassName}>
      <Navbar
        brand={
          <span className="flex items-center gap-2">
            <PanelsTopLeft className="h-4 w-4 text-primary" />
            Northstar
          </span>
        }
        items={[
          { label: 'Product', href: '#', active: true },
          { label: 'Customers', href: '#' },
          { label: 'Pricing', href: '#' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <ThemeToggle variant="icon" size="sm" />
            <Button variant="outline" size="sm">
              Book demo
            </Button>
          </div>
        }
      />
      <Container size="2xl" padded className="py-16 sm:py-24">
        <Stack gap="10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge color="primary">Launch faster</Badge>
              <Typography
                variant="h1"
                className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Design SaaS applications that feel effortless.
              </Typography>
              <Typography variant="body" muted className="mt-4 max-w-xl">
                Northstar helps teams build polished product surfaces with a flexible design system,
                shared layouts, and production-ready example experiences.
              </Typography>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" leftIcon={<Rocket size={16} />}>
                  Start free
                </Button>
                <Button variant="outline" size="lg" leftIcon={<PlayIcon />}>
                  Watch preview
                </Button>
              </div>
            </div>
            <Card
              title="Why teams choose Northstar"
              description="Built for high-growth product companies."
            >
              <Stack gap="3">
                {[
                  ['Reusable layouts', 'Compose screens in minutes.'],
                  ['Accessible by default', 'Form and navigation primitives.'],
                  ['Dark mode ready', 'Premium visual polish out of the box.'],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-xl border border-border/70 p-3">
                    <Typography variant="label">{title}</Typography>
                    <Typography variant="body-sm" muted>
                      {copy}
                    </Typography>
                  </div>
                ))}
              </Stack>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['200+', 'Teams building with RSK UI'],
              ['99.9%', 'Component consistency score'],
              ['24/7', 'Global support and docs'],
            ].map(([value, label]) => (
              <Card key={label} className="text-center">
                <Typography variant="h3">{value}</Typography>
                <Typography variant="body-sm" muted>
                  {label}
                </Typography>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </div>
  );
}

function PlayIcon() {
  return <ArrowRight className="h-4 w-4" />;
}
