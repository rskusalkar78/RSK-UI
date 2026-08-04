import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Code2,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Palette,
  LayoutGrid,
  Github,
  Star,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Feather,
  CheckCircle2,
  Box as BoxIcon,
  LineChart,
} from 'lucide-react';

import {
  Page,
  Navbar,
  Hero,
  Section,
  Container,
  Grid,
  GridItem,
  Stack,
  Flex,
  Card,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  ThemeToggle,
  Input,
  Select,
  Checkbox,
  Switch,
  FormField,
  Alert,
  Progress,
  AnalyticsCard,
  MetricsGrid,
  Table,
  Divider,
} from './components';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Code Snippets ────────────────────────────────────────────────────────────

const installCommands = {
  npm: 'npm install rsk-ui',
  pnpm: 'pnpm add rsk-ui',
  yarn: 'yarn add rsk-ui',
  bun: 'bun add rsk-ui',
};

const setupCode = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, Button, AnalyticsCard, Container } from 'rsk-ui';
import 'rsk-ui/styles/globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Container size="xl" padded className="py-12">
        <AnalyticsCard
          title="Monthly Revenue"
          value="$128,450.00"
          trend={18.4}
          trendLabel="vs last month"
          variant="primary"
        />
      </Container>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);`;

const codeExamples = {
  quickstart: `// 1. Wrap your app with ThemeProvider
import { ThemeProvider } from 'rsk-ui';
import 'rsk-ui/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`,
  button: `import { Button, IconButton, Flex } from 'rsk-ui';
import { Sparkles, Github } from 'lucide-react';

export function ButtonDemo() {
  return (
    <Flex gap="3" align="center" wrap="wrap">
      {/* Solid primary — the default CTA */}
      <Button variant="solid" leftIcon={<Sparkles />}>
        Get Started
      </Button>

      {/* Outline secondary action */}
      <Button variant="outline" leftIcon={<Github />}>
        Star on GitHub
      </Button>

      {/* Loading state with spinner */}
      <Button variant="solid" isLoading loadingText="Saving…" />

      {/* Icon-only variant */}
      <IconButton aria-label="GitHub" icon={<Github />} variant="ghost" />
    </Flex>
  );
}`,
  dashboard: `import {
  AnalyticsCard,
  MetricsGrid,
  Stack,
  Badge,
} from 'rsk-ui';

export function DashboardPreview() {
  return (
    <Stack gap="6">
      <MetricsGrid columns={3} gap="md">
        <AnalyticsCard
          title="Monthly Revenue"
          value="$284,910"
          trend={24.8}
          trendLabel="vs last month"
          variant="primary"
        />
        <AnalyticsCard
          title="Active Users"
          value="12,490"
          trend={12.5}
          trendLabel="vs last week"
          variant="success"
        />
        <AnalyticsCard
          title="API Requests"
          value="4.2M"
          trend={-1.2}
          trendLabel="vs peak"
          variant="warning"
        />
      </MetricsGrid>
    </Stack>
  );
}`,
};

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: 'Is rsk-ui compatible with React 19 and Next.js App Router?',
    answer:
      'Yes! rsk-ui is built ground-up for React 19 and Vite/Next.js environments. All server/client boundaries are carefully structured, and theme injection scripts run SSR without hydration flash.',
  },
  {
    question: 'How does the dark mode theme engine work?',
    answer:
      'rsk-ui provides an inline no-flash theme script that executes before HTML paint. It supports light, dark, and system preference modes with local persistence and CSS custom properties.',
  },
  {
    question: 'Can I customize the color palette and design tokens?',
    answer:
      'Absolutely. rsk-ui uses standard Tailwind CSS v4 theme mappings and CSS custom properties (--rsk-color-*). You can override variables directly in your CSS or Tailwind config.',
  },
  {
    question: 'Are all components fully accessible?',
    answer:
      'Yes. Every component enforces strict WAI-ARIA patterns, appropriate role attributes, keyboard focus management, and screen-reader status indicators.',
  },
  {
    question: 'What is the bundle size overhead of rsk-ui?',
    answer:
      'rsk-ui is fully tree-shakeable. Core layout and foundational components add less than 15kB gzipped to your bundle size, with zero bloat.',
  },
];

// ─── Code Example Section Component ──────────────────────────────────────────

function CodeExampleSection() {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'button' | 'dashboard'>('quickstart');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'quickstart', label: 'Quick Start' },
    { id: 'button', label: 'Buttons' },
    { id: 'dashboard', label: 'Dashboard' },
  ] as const;

  return (
    <Section spacing="xl" background="none" id="code-example">
      <Container size="xl" padded>
        <Stack gap="12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="primary" size="sm" className="mb-3">
              Code Examples
            </Badge>
            <Typography variant="h2" className="text-3xl sm:text-4xl font-bold">
              Clean, Composable API
            </Typography>
            <Typography variant="body" muted className="mt-2">
              Every component is thoughtfully typed with sensible defaults. Ship production-quality
              UI with minimal boilerplate.
            </Typography>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Card className="overflow-hidden border-border bg-[#0d1117] text-white shadow-2xl p-0">
              {/* Tab bar */}
              <div className="flex items-center justify-between border-b border-gray-800 bg-[#161b22] px-4 py-2">
                <Flex align="center" gap="1">
                  <div className="h-3 w-3 rounded-full bg-red-500/80 mr-1" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80 mr-1" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80 mr-3" />
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={[
                        'px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all',
                        activeTab === tab.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5',
                      ].join(' ')}
                    >
                      {tab.label}
                    </button>
                  ))}
                </Flex>
                <IconButton
                  aria-label="Copy code"
                  variant="ghost"
                  size="xs"
                  className="text-gray-400 hover:text-white"
                  icon={
                    copied ? (
                      <Check className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )
                  }
                  onClick={copyCode}
                />
              </div>

              {/* Code panel */}
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-gray-300 min-h-[280px]"
                >
                  <code className="whitespace-pre">{codeExamples[activeTab]}</code>
                </motion.pre>
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Feature pills row */}
          <Flex gap="3" wrap="wrap" justify="center">
            {[
              { label: '100% TypeScript', icon: <Code2 className="h-3.5 w-3.5" /> },
              { label: 'Tree-Shakeable', icon: <Zap className="h-3.5 w-3.5" /> },
              { label: 'Zero Runtime CSS', icon: <Feather className="h-3.5 w-3.5" /> },
              { label: 'forwardRef Ready', icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
              { label: 'SSR Safe', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
            ].map((pill) => (
              <Flex
                key={pill.label}
                align="center"
                gap="2"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                <span className="text-primary">{pill.icon}</span>
                {pill.label}
              </Flex>
            ))}
          </Flex>
        </Stack>
      </Container>
    </Section>
  );
}

// ─── Homepage Component ───────────────────────────────────────────────────────

export function Homepage() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedSetup, setCopiedSetup] = useState(false);
  const [pm, setPm] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [previewTab, setPreviewTab] = useState<'foundational' | 'form' | 'dashboard' | 'feedback'>(
    'foundational'
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [switchState, setSwitchState] = useState(true);
  const [checkState, setCheckState] = useState(true);
  const [selectVal, setSelectVal] = useState('react');
  const [inputVal, setInputVal] = useState('rsk-ui-project');

  const copyToClipboard = (text: string, type: 'install' | 'setup') => {
    navigator.clipboard.writeText(text);
    if (type === 'install') {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopiedSetup(true);
      setTimeout(() => setCopiedSetup(false), 2000);
    }
  };

  const navItems = [
    { label: 'Components', href: '#components' },
    { label: 'Features', href: '#features' },
    { label: 'Installation', href: '#installation' },
    { label: 'Code', href: '#code-example' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <Page
      header={
        <Navbar
          brand={
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-accent text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                rsk-ui
              </span>
              <Badge variant="primary" size="sm" className="ml-1 font-mono">
                v0.1.0
              </Badge>
            </a>
          }
          items={navItems}
          actions={
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/rskusalkar78/RSK-UI"
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
              >
                <Button variant="ghost" size="sm" leftIcon={<Github className="h-4 w-4" />}>
                  GitHub
                </Button>
              </a>
              <ThemeToggle variant="dropdown" size="sm" />
              <Button
                variant="solid"
                size="sm"
                leftIcon={<Sparkles className="h-4 w-4" />}
                onClick={() => {
                  document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </Button>
            </div>
          }
        />
      }
      footer={
        <Section spacing="lg" background="card" className="border-t border-border">
          <Container size="xl" padded>
            <Grid cols={{ base: 1, md: 2, lg: 5 }} gap="8">
              <GridItem colSpan={2}>
                <Stack gap="4" align="start">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <Typography variant="h4" className="font-extrabold">
                      rsk-ui
                    </Typography>
                  </div>
                  <Typography variant="body-sm" muted className="max-w-sm">
                    A premium, accessible, dark-mode first design system built for modern React 19
                    applications with Tailwind CSS v4 and Framer Motion.
                  </Typography>
                  <Flex gap="3" align="center" className="pt-2">
                    <ThemeToggle variant="cycle" size="sm" />
                    <Typography variant="caption" muted>
                      Theme switch
                    </Typography>
                  </Flex>
                </Stack>
              </GridItem>

              <div>
                <Typography variant="label" className="mb-3 block text-foreground font-semibold">
                  Product
                </Typography>
                <Stack gap="2" align="start">
                  <a
                    href="#components"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Components
                  </a>
                  <a
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Features
                  </a>
                  <a
                    href="#installation"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Installation
                  </a>
                  <a
                    href="#code-example"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Examples
                  </a>
                </Stack>
              </div>

              <div>
                <Typography variant="label" className="mb-3 block text-foreground font-semibold">
                  Resources
                </Typography>
                <Stack gap="2" align="start">
                  <a
                    href="https://github.com/rskusalkar78/RSK-UI"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1"
                  >
                    GitHub Repo <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="#faq"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    FAQ
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Design Tokens
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Storybook
                  </a>
                </Stack>
              </div>

              <div>
                <Typography variant="label" className="mb-3 block text-foreground font-semibold">
                  Community
                </Typography>
                <Stack gap="2" align="start">
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Discord Server
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Twitter / X
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Release Notes
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    License (MIT)
                  </a>
                </Stack>
              </div>
            </Grid>

            <Divider className="my-8" />

            <Flex direction="col" align="center" justify="between" gap="4" className="sm:flex-row">
              <Typography variant="caption" muted>
                © 2026 rsk-ui design system. Built with React 19, TypeScript & Tailwind CSS v4.
              </Typography>
              <Flex gap="4" align="center">
                <Badge variant="outline" size="sm">
                  MIT License
                </Badge>
                <Badge variant="success" size="sm">
                  488 Unit Tests Passing
                </Badge>
              </Flex>
            </Flex>
          </Container>
        </Section>
      }
    >
      {/* ─── Hero Section ────────────────────────────────────────────────────── */}
      <Hero
        size="xl"
        gradient="primary"
        align="center"
        eyebrow={
          <Badge variant="primary" size="md" className="gap-1.5 py-1 px-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Design System for React 19</span>
          </Badge>
        }
        heading={
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Typography
              variant="h1"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              Build Next-Gen Interfaces with{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-400 to-accent bg-clip-text text-transparent">
                Antigravity Speed
              </span>
            </Typography>
          </motion.div>
        }
        subheading={
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Typography
              variant="body"
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Production-ready React 19 component library engineered with TypeScript, Tailwind CSS
              v4, Framer Motion, and zero-flash dark mode.
            </Typography>
          </motion.div>
        }
        actions={
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full">
            <Flex direction="col" align="center" justify="center" gap="4" className="sm:flex-row">
              <Button
                variant="solid"
                size="xl"
                leftIcon={<Sparkles className="h-5 w-5" />}
                onClick={() => {
                  document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="xl"
                leftIcon={<Code2 className="h-5 w-5" />}
                onClick={() => {
                  document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse 50+ Components
              </Button>
            </Flex>

            {/* Quick terminal copy pill */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-card/80 backdrop-blur px-4 py-2 shadow-lg">
              <Terminal className="h-4 w-4 text-primary shrink-0" />
              <Typography
                variant="code"
                className="bg-transparent border-none p-0 text-foreground font-semibold"
              >
                {installCommands[pm]}
              </Typography>
              <IconButton
                aria-label="Copy install command"
                variant="ghost"
                size="xs"
                icon={
                  copiedInstall ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )
                }
                onClick={() => copyToClipboard(installCommands[pm], 'install')}
              />
            </div>
          </motion.div>
        }
        media={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-xl"
          >
            <Card className="shadow-2xl border-primary/20 bg-card/90 backdrop-blur p-6 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
              <Stack gap="5">
                <Flex align="center" justify="between">
                  <Flex align="center" gap="3">
                    <Avatar size="md" status="online">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Rohan Usalkar"
                      />
                      <AvatarFallback>RU</AvatarFallback>
                    </Avatar>
                    <div>
                      <Typography variant="label" className="block text-foreground">
                        RSK Dashboard Live
                      </Typography>
                      <Typography variant="caption" muted>
                        Interactive Design Tokens
                      </Typography>
                    </div>
                  </Flex>
                  <Badge variant="success" size="sm">
                    ● Live Preview
                  </Badge>
                </Flex>

                <AnalyticsCard
                  title="Quarterly Sales Growth"
                  value="$284,910.00"
                  trend={24.8}
                  trendLabel="vs previous quarter"
                  variant="primary"
                />

                <Grid cols={2} gap="3">
                  <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
                    <Flex align="center" justify="between">
                      <Typography variant="caption" muted>
                        System Status
                      </Typography>
                      <Switch
                        checked={switchState}
                        onChange={(e) => setSwitchState(e.target.checked)}
                        size="sm"
                      />
                    </Flex>
                    <Typography variant="label" className="block font-semibold">
                      {switchState ? 'Active Sync' : 'Paused'}
                    </Typography>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
                    <Typography variant="caption" muted>
                      Team Members
                    </Typography>
                    <AvatarGroup size="sm" max={3}>
                      <Avatar>
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>DK</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                    </AvatarGroup>
                  </div>
                </Grid>

                <Progress value={82} label="Design System Build Progress" />
              </Stack>
            </Card>
          </motion.div>
        }
      />

      {/* ─── Statistics Section ────────────────────────────────────────────── */}
      <Section spacing="md" background="muted">
        <Container size="xl" padded>
          <Grid cols={{ base: 2, md: 4 }} gap="4">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 bg-card/60 backdrop-blur">
                <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl font-extrabold text-primary"
                >
                  50+
                </Typography>
                <Typography variant="body-sm" muted className="mt-1 font-medium">
                  UI Primitives
                </Typography>
              </Card>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 bg-card/60 backdrop-blur">
                <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl font-extrabold text-accent"
                >
                  100%
                </Typography>
                <Typography variant="body-sm" muted className="mt-1 font-medium">
                  TypeScript Strictly Typed
                </Typography>
              </Card>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 bg-card/60 backdrop-blur">
                <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl font-extrabold text-success"
                >
                  &lt;15kB
                </Typography>
                <Typography variant="body-sm" muted className="mt-1 font-medium">
                  Lightweight Bundle
                </Typography>
              </Card>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 bg-card/60 backdrop-blur">
                <Typography variant="h2" className="text-3xl sm:text-4xl font-extrabold text-info">
                  488+
                </Typography>
                <Typography variant="body-sm" muted className="mt-1 font-medium">
                  Unit Tests Passed
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* ─── Component Showcase Section ──────────────────────────────────────── */}
      <Section spacing="xl" background="none" id="components">
        <Container size="xl" padded>
          <Stack gap="8" align="center">
            <div className="text-center max-w-2xl">
              <Badge variant="primary" size="sm" className="mb-3">
                Interactive Showcase
              </Badge>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-bold">
                Crafted for Complete UI Flexibility
              </Typography>
              <Typography variant="body" muted className="mt-2">
                Test and interact with live rsk-ui components directly in your browser.
              </Typography>
            </div>

            {/* Category selection */}
            <Flex gap="2" wrap="wrap" justify="center">
              {[
                {
                  id: 'foundational',
                  label: 'Foundational',
                  icon: <BoxIcon className="h-4 w-4" />,
                },
                { id: 'form', label: 'Form Controls', icon: <Code2 className="h-4 w-4" /> },
                {
                  id: 'dashboard',
                  label: 'Dashboard & Data',
                  icon: <LineChart className="h-4 w-4" />,
                },
                {
                  id: 'feedback',
                  label: 'Feedback & Badges',
                  icon: <Sparkles className="h-4 w-4" />,
                },
              ].map((cat) => (
                <Button
                  key={cat.id}
                  variant={previewTab === cat.id ? 'solid' : 'outline'}
                  size="md"
                  leftIcon={cat.icon}
                  onClick={() => setPreviewTab(cat.id as any)}
                >
                  {cat.label}
                </Button>
              ))}
            </Flex>

            {/* Live Interactive Component Card */}
            <Card className="w-full max-w-4xl p-8 bg-card shadow-xl border-border">
              <AnimatePresence mode="wait">
                {previewTab === 'foundational' && (
                  <motion.div
                    key="foundational"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack gap="6">
                      <div>
                        <Typography
                          variant="label"
                          className="block mb-3 text-muted-foreground uppercase tracking-wider text-xs font-semibold"
                        >
                          Buttons & Icon Buttons
                        </Typography>
                        <Flex gap="3" wrap="wrap" align="center">
                          <Button variant="solid">Solid Primary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="destructive">Destructive</Button>
                          <Button variant="solid" isLoading loadingText="Saving…">
                            Loading
                          </Button>
                          <IconButton
                            aria-label="Github"
                            icon={<Github className="h-4 w-4" />}
                            variant="outline"
                          />
                        </Flex>
                      </div>

                      <Divider />

                      <div>
                        <Typography
                          variant="label"
                          className="block mb-3 text-muted-foreground uppercase tracking-wider text-xs font-semibold"
                        >
                          Badges & Variants
                        </Typography>
                        <Flex gap="2" wrap="wrap" align="center">
                          <Badge variant="primary">Primary</Badge>
                          <Badge variant="secondary">Secondary</Badge>
                          <Badge variant="success">Success</Badge>
                          <Badge variant="warning">Warning</Badge>
                          <Badge variant="destructive">Destructive</Badge>
                          <Badge variant="outline">Outline</Badge>
                        </Flex>
                      </div>

                      <Divider />

                      <div>
                        <Typography
                          variant="label"
                          className="block mb-3 text-muted-foreground uppercase tracking-wider text-xs font-semibold"
                        >
                          Avatars & Avatar Groups
                        </Typography>
                        <Flex gap="4" align="center">
                          <Avatar size="md" status="online">
                            <AvatarFallback>AR</AvatarFallback>
                          </Avatar>
                          <Avatar size="md" status="busy">
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <Avatar size="md" status="offline">
                            <AvatarFallback>DK</AvatarFallback>
                          </Avatar>
                          <AvatarGroup size="md" max={3}>
                            <Avatar>
                              <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <Avatar>
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <Avatar>
                              <AvatarFallback>DK</AvatarFallback>
                            </Avatar>
                            <Avatar>
                              <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                          </AvatarGroup>
                        </Flex>
                      </div>
                    </Stack>
                  </motion.div>
                )}

                {previewTab === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Grid cols={{ base: 1, md: 2 }} gap="6">
                      <Stack gap="4">
                        <FormField
                          label="Project Name"
                          helperText="Enter a valid project slug"
                          fullWidth
                        >
                          <Input
                            placeholder="e.g. my-awesome-app"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                          />
                        </FormField>
                        <FormField label="Framework" fullWidth>
                          <Select value={selectVal} onChange={(e) => setSelectVal(e.target.value)}>
                            <option value="react">React 19 (Recommended)</option>
                            <option value="next">Next.js App Router</option>
                            <option value="vite">Vite + React</option>
                          </Select>
                        </FormField>
                      </Stack>

                      <Stack gap="4" justify="center">
                        <Checkbox
                          label="Enable dark mode theme synchronization"
                          checked={checkState}
                          onChange={(e) => setCheckState(e.target.checked)}
                        />
                        <Flex
                          align="center"
                          justify="between"
                          className="rounded-xl border border-border p-3"
                        >
                          <Typography variant="body-sm" className="font-medium">
                            Automatic Framer Motion spring physics
                          </Typography>
                          <Switch
                            checked={switchState}
                            onChange={(e) => setSwitchState(e.target.checked)}
                          />
                        </Flex>
                      </Stack>
                    </Grid>
                  </motion.div>
                )}

                {previewTab === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack gap="6">
                      <MetricsGrid columns={2} gap="md">
                        <AnalyticsCard
                          title="Active Subscriptions"
                          value="12,490"
                          trend={12.5}
                          trendLabel="vs last month"
                          variant="primary"
                        />
                        <AnalyticsCard
                          title="API Requests / sec"
                          value="4,180"
                          trend={-1.2}
                          trendLabel="vs peak hour"
                          variant="warning"
                        />
                      </MetricsGrid>

                      <Table
                        columns={[
                          { key: 'name', header: 'Package', accessor: (row: any) => row.name },
                          {
                            key: 'version',
                            header: 'Version',
                            accessor: (row: any) => row.version,
                          },
                          { key: 'status', header: 'Status', accessor: (row: any) => row.status },
                        ]}
                        data={[
                          {
                            id: '1',
                            name: 'rsk-ui',
                            version: 'v0.1.0',
                            status: <Badge variant="success">Published</Badge>,
                          },
                          {
                            id: '2',
                            name: 'react',
                            version: '^19.0.0',
                            status: <Badge variant="primary">Latest</Badge>,
                          },
                          {
                            id: '3',
                            name: 'tailwindcss',
                            version: '^4.0.0',
                            status: <Badge variant="secondary">Active</Badge>,
                          },
                        ]}
                      />
                    </Stack>
                  </motion.div>
                )}

                {previewTab === 'feedback' && (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack gap="4">
                      <Alert
                        variant="info"
                        title="System Notice"
                        description="rsk-ui v0.1.0 is now live and available on npm with 100% test coverage."
                      />
                      <Alert
                        variant="success"
                        title="Build Successful"
                        description="All 488 unit tests passed clean with zero warnings."
                      />
                      <Alert
                        variant="warning"
                        title="Deprecation Check"
                        description="No deprecated React 18 legacy APIs found."
                      />
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* ─── Installation Section ───────────────────────────────────────────── */}
      <Section spacing="xl" background="muted" id="installation">
        <Container size="xl" padded>
          <Grid cols={{ base: 1, lg: 2 }} gap="12" className="items-center">
            <Stack gap="6">
              <Badge variant="primary" size="sm" className="w-fit">
                Quickstart Setup
              </Badge>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-bold">
                Install & Start Building in Seconds
              </Typography>
              <Typography variant="body" muted className="leading-relaxed">
                Add rsk-ui to any React 19 project. Select your package manager below and copy the
                command.
              </Typography>

              {/* Package manager tabs */}
              <Flex gap="2">
                {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((item) => (
                  <Button
                    key={item}
                    variant={pm === item ? 'solid' : 'outline'}
                    size="sm"
                    onClick={() => setPm(item)}
                  >
                    {item}
                  </Button>
                ))}
              </Flex>

              {/* Command box */}
              <div className="relative rounded-xl border border-border bg-card p-4 flex items-center justify-between font-mono text-sm">
                <div className="flex items-center gap-3">
                  <Terminal className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground font-semibold">{installCommands[pm]}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={
                    copiedInstall ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )
                  }
                  onClick={() => copyToClipboard(installCommands[pm], 'install')}
                >
                  {copiedInstall ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              <Stack gap="3">
                <Flex align="center" gap="2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <Typography variant="body-sm">Supports React 19 & Next.js App Router</Typography>
                </Flex>
                <Flex align="center" gap="2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <Typography variant="body-sm">Built for Tailwind CSS v4 Theme Engine</Typography>
                </Flex>
                <Flex align="center" gap="2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <Typography variant="body-sm">
                    Zero-flash dark mode theme script included
                  </Typography>
                </Flex>
              </Stack>
            </Stack>

            {/* Code Box */}
            <Card className="p-0 overflow-hidden border-border bg-[#0d1117] text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 bg-[#161b22] px-4 py-3">
                <Flex align="center" gap="2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-gray-400">src/main.tsx</span>
                </Flex>
                <IconButton
                  aria-label="Copy setup code"
                  variant="ghost"
                  size="xs"
                  className="text-gray-400 hover:text-white"
                  icon={
                    copiedSetup ? (
                      <Check className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )
                  }
                  onClick={() => copyToClipboard(setupCode, 'setup')}
                />
              </div>
              <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-gray-300">
                <code>{setupCode}</code>
              </pre>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* ─── Features Section ────────────────────────────────────────────────── */}
      <Section spacing="xl" background="none" id="features">
        <Container size="xl" padded>
          <Stack gap="12">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="primary" size="sm" className="mb-3">
                Core Principles
              </Badge>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-bold">
                Everything You Need for Enterprise Apps
              </Typography>
              <Typography variant="body" muted className="mt-2">
                Designed with precision to give you speed, accessibility, and uncompromised style
                control.
              </Typography>
            </div>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 space-y-3 hover:border-primary/50 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Palette className="h-5 w-5" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    Theme Engine & Tokens
                  </Typography>
                  <Typography variant="body-sm" muted>
                    Full HSL design system with zero-flash SSR detection, dark mode persistence, and
                    standard CSS custom properties.
                  </Typography>
                </Card>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 space-y-3 hover:border-primary/50 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Zap className="h-5 w-5" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    React 19 & Tailwind v4
                  </Typography>
                  <Typography variant="body-sm" muted>
                    Next-generation compiler optimized. Uses Tailwind CSS v4 @theme mappings for
                    ultra-fast CSS output.
                  </Typography>
                </Card>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 space-y-3 hover:border-primary/50 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    Strict Accessibility
                  </Typography>
                  <Typography variant="body-sm" muted>
                    Built with ARIA landmarks, keyboard focus rings, skip links, screen reader
                    announcements, and role contracts.
                  </Typography>
                </Card>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 space-y-3 hover:border-primary/50 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    Mobile-First Layout Primitives
                  </Typography>
                  <Typography variant="body-sm" muted>
                    Composable Container, Section, Grid, Flex, Stack, Page, Hero, and Spacer layout
                    primitives out of the box.
                  </Typography>
                </Card>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 space-y-3 hover:border-primary/50 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
                    <Feather className="h-5 w-5" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    Framer Motion Micro-Interactions
                  </Typography>
                  <Typography variant="body-sm" muted>
                    Smooth spring physics and UI micro-interactions that elevate your product
                    aesthetics instantly.
                  </Typography>
                </Card>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 space-y-3 hover:border-primary/50 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <Typography variant="h4" className="font-bold">
                    Dashboard & SaaS Ready
                  </Typography>
                  <Typography variant="body-sm" muted>
                    Analytics cards, activity feeds, metrics grids, notification centers, and chart
                    wrappers pre-assembled.
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ─── Code Example Section ─────────────────────────────────────────── */}
      <CodeExampleSection />

      {/* ─── Testimonials Section ───────────────────────────────────────────── */}
      <Section spacing="xl" background="muted">
        <Container size="xl" padded>
          <Stack gap="10">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="primary" size="sm" className="mb-3">
                Community Feedback
              </Badge>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-bold">
                Loved by Engineers & Designers
              </Typography>
            </div>

            <Grid cols={{ base: 1, md: 3 }} gap="6">
              <Card className="p-6 space-y-4 bg-card/80 backdrop-blur">
                <Flex align="center" gap="1" className="text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </Flex>
                <Typography variant="body-sm" className="italic leading-relaxed">
                  &quot;rsk-ui has dramatically sped up our frontend velocity. The theme engine and
                  pre-built dashboard cards are top tier.&quot;
                </Typography>
                <Flex align="center" gap="3">
                  <Avatar size="md" status="online">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant="label" className="block text-foreground">
                      Sarah Chen
                    </Typography>
                    <Typography variant="caption" muted>
                      Principal Frontend Engineer
                    </Typography>
                  </div>
                </Flex>
              </Card>

              <Card className="p-6 space-y-4 bg-card/80 backdrop-blur">
                <Flex align="center" gap="1" className="text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </Flex>
                <Typography variant="body-sm" className="italic leading-relaxed">
                  &quot;The layout system (Stack, Grid, Flex) with responsive object props is
                  standardizing our entire design system across 4 products.&quot;
                </Typography>
                <Flex align="center" gap="3">
                  <Avatar size="md" status="online">
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant="label" className="block text-foreground">
                      Alex Rivera
                    </Typography>
                    <Typography variant="caption" muted>
                      Head of Product Design
                    </Typography>
                  </div>
                </Flex>
              </Card>

              <Card className="p-6 space-y-4 bg-card/80 backdrop-blur">
                <Flex align="center" gap="1" className="text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </Flex>
                <Typography variant="body-sm" className="italic leading-relaxed">
                  &quot;Zero SSR flash in dark mode and 100% strict TypeScript types out of the box.
                  Absolutely brilliant execution.&quot;
                </Typography>
                <Flex align="center" gap="3">
                  <Avatar size="md" status="online">
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant="label" className="block text-foreground">
                      David Kim
                    </Typography>
                    <Typography variant="caption" muted>
                      CTO & Co-founder
                    </Typography>
                  </div>
                </Flex>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ─── FAQ Section ────────────────────────────────────────────────────── */}
      <Section spacing="xl" background="none" id="faq">
        <Container size="lg" padded>
          <Stack gap="8">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="primary" size="sm" className="mb-3">
                Got Questions?
              </Badge>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-bold">
                Frequently Asked Questions
              </Typography>
            </div>

            <Stack gap="3">
              {faqs.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <Card key={faq.question} className="p-0 overflow-hidden border-border transition">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-muted/30 transition"
                    >
                      <span className="text-base sm:text-lg">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 pt-0 border-t border-border/50 text-muted-foreground text-sm leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                );
              })}
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* ─── Final CTA Banner ───────────────────────────────────────────────── */}
      <Section spacing="xl" background="none">
        <Container size="xl" padded>
          <Card className="relative overflow-hidden p-8 sm:p-12 text-center bg-gradient-to-tr from-primary/20 via-card to-accent/20 border-primary/30 shadow-2xl">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <Stack gap="6" align="center" className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="primary" size="md">
                Get Started Today
              </Badge>
              <Typography
                variant="h2"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight"
              >
                Ready to Upgrade Your React App UI?
              </Typography>
              <Typography variant="body" muted className="text-base sm:text-lg">
                Join developers building faster, cleaner, and more accessible user interfaces with
                rsk-ui.
              </Typography>
              <Flex gap="4" justify="center" wrap="wrap" className="pt-2">
                <Button
                  variant="solid"
                  size="xl"
                  leftIcon={<Sparkles className="h-5 w-5" />}
                  onClick={() => {
                    document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Install rsk-ui Now
                </Button>
                <a
                  href="https://github.com/rskusalkar78/RSK-UI"
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={-1}
                >
                  <Button variant="outline" size="xl" leftIcon={<Github className="h-5 w-5" />}>
                    Star on GitHub
                  </Button>
                </a>
              </Flex>
            </Stack>
          </Card>
        </Container>
      </Section>
    </Page>
  );
}
