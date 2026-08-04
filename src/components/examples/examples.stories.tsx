import type { Meta, StoryObj } from '@storybook/react';
import {
  AnalyticsExample,
  DashboardExample,
  ECommerceExample,
  ForgotPasswordExample,
  KanbanExample,
  LandingPageExample,
  LoginExample,
  PricingExample,
  ProfileExample,
  RegisterExample,
  SettingsExample,
} from './examples';

const meta = {
  title: 'Examples/SaaS Applications',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Login: StoryObj = { render: () => <LoginExample /> };
export const Register: StoryObj = { render: () => <RegisterExample /> };
export const ForgotPassword: StoryObj = { render: () => <ForgotPasswordExample /> };
export const Dashboard: StoryObj = { render: () => <DashboardExample /> };
export const Analytics: StoryObj = { render: () => <AnalyticsExample /> };
export const Pricing: StoryObj = { render: () => <PricingExample /> };
export const Profile: StoryObj = { render: () => <ProfileExample /> };
export const Settings: StoryObj = { render: () => <SettingsExample /> };
export const ECommerce: StoryObj = { render: () => <ECommerceExample /> };
export const Kanban: StoryObj = { render: () => <KanbanExample /> };
export const LandingPage: StoryObj = { render: () => <LandingPageExample /> };
