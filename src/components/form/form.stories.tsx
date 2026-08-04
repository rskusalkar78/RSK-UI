import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Lock, User, Search, Globe } from 'lucide-react';

import {
  ErrorMessage,
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Select,
  FormField,
} from './index';

import { Button } from '../button/button';

const meta: Meta = {
  title: 'Form Components / Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// ─── Input Stories ────────────────────────────────────────────────────────────

export const Inputs: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <FormField label="Standard Input" helperText="Standard text input field">
        <Input placeholder="Enter text..." />
      </FormField>

      <FormField label="Input with Icons">
        <Input
          leftIcon={<Mail className="w-4 h-4" />}
          rightIcon={<Globe className="w-4 h-4" />}
          placeholder="example.com"
        />
      </FormField>

      <FormField label="Loading State">
        <Input
          isLoading
          leftIcon={<Search className="w-4 h-4" />}
          placeholder="Searching records..."
        />
      </FormField>

      <FormField label="Disabled State">
        <Input disabled leftIcon={<Lock className="w-4 h-4" />} value="Read-only system value" />
      </FormField>

      <FormField label="Error State" error="Invalid email address format">
        <Input leftIcon={<Mail className="w-4 h-4" />} value="invalid-email@" />
      </FormField>
    </div>
  ),
};

// ─── Textarea Stories ─────────────────────────────────────────────────────────

export const Textareas: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <FormField label="User Bio" helperText="Describe yourself in a few words">
        <Textarea placeholder="Type your bio..." maxLength={200} />
      </FormField>

      <FormField label="Disabled Textarea">
        <Textarea disabled value="This text area is disabled." />
      </FormField>

      <FormField label="Error State Textarea" error="Feedback cannot be empty">
        <Textarea isError placeholder="Write your feedback..." />
      </FormField>
    </div>
  ),
};

// ─── Checkbox, Radio, Switch Stories ─────────────────────────────────────────

export const SelectionControls: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-sm">Checkboxes</h4>
        <Checkbox label="Remember me on this device" helperText="Saves your session for 30 days" />
        <Checkbox label="Indeterminate option" isIndeterminate />
        <Checkbox label="Disabled option" disabled defaultChecked />
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-sm">Radio Buttons</h4>
        <RadioGroup label="Notification Frequency">
          <Radio name="freq" value="realtime" label="Real-time alerts" defaultChecked />
          <Radio name="freq" value="daily" label="Daily digest summary" />
          <Radio name="freq" value="weekly" label="Weekly report" />
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-sm">Switches</h4>
        <Switch label="Dark Mode" helperText="Enable sleek dark theme interface" defaultChecked />
        <Switch label="Auto-save drafts" size="sm" />
        <Switch label="Disabled Toggle" disabled />
      </div>
    </div>
  ),
};

// ─── Select Stories ───────────────────────────────────────────────────────────

export const SelectDropdowns: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <FormField label="Country Selection" helperText="Select your primary region">
        <Select
          placeholder="Select country..."
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' },
            { label: 'Germany', value: 'de' },
            { label: 'India', value: 'in' },
          ]}
        />
      </FormField>

      <FormField label="Loading Select">
        <Select isLoading placeholder="Loading server locations..." />
      </FormField>

      <FormField label="Error Select" error="Please select a valid option">
        <Select
          isError
          placeholder="Select role..."
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ]}
        />
      </FormField>
    </div>
  ),
};

// ─── React Hook Form & Zod Demo ───────────────────────────────────────────────

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().max(150, 'Bio must be under 150 characters'),
  terms: z.boolean().refine((val) => val === true, 'You must accept terms & conditions'),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

function ReactHookFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      role: '',
      bio: '',
      terms: false,
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    alert(`Form Submitted Successfully!\n\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 rounded-xl border border-border bg-card shadow-sm w-96 space-y-4"
    >
      <h3 className="text-lg font-bold text-foreground">Create Account</h3>

      <FormField label="Full Name" isRequired error={errors.fullName?.message}>
        <Input
          leftIcon={<User className="w-4 h-4" />}
          placeholder="John Doe"
          {...register('fullName', {
            validate: (val) => {
              const res = registrationSchema.shape.fullName?.safeParse(val);
              return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
            },
          })}
        />
      </FormField>

      <FormField label="Email Address" isRequired error={errors.email?.message}>
        <Input
          leftIcon={<Mail className="w-4 h-4" />}
          placeholder="john@example.com"
          {...register('email', {
            validate: (val) => {
              const res = registrationSchema.shape.email?.safeParse(val);
              return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
            },
          })}
        />
      </FormField>

      <FormField label="Role" isRequired error={errors.role?.message}>
        <Select
          placeholder="Select your role..."
          options={[
            { label: 'Frontend Engineer', value: 'fe' },
            { label: 'Backend Engineer', value: 'be' },
            { label: 'UI/UX Designer', value: 'design' },
            { label: 'Product Manager', value: 'pm' },
          ]}
          {...register('role', {
            validate: (val) => {
              const res = registrationSchema.shape.role?.safeParse(val);
              return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
            },
          })}
        />
      </FormField>

      <FormField label="Short Bio" optionalText="(Optional)" error={errors.bio?.message}>
        <Textarea
          placeholder="Tell us about yourself..."
          maxLength={150}
          {...register('bio', {
            validate: (val) => {
              const res = registrationSchema.shape.bio?.safeParse(val);
              return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
            },
          })}
        />
      </FormField>

      <div>
        <Checkbox
          label="I accept the Terms & Conditions"
          helperText="You agree to our privacy policy and terms."
          {...register('terms', {
            validate: (val) => {
              const res = registrationSchema.shape.terms?.safeParse(val);
              return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
            },
          })}
        />
        {errors.terms?.message && (
          <ErrorMessage className="mt-1">{errors.terms.message}</ErrorMessage>
        )}
      </div>

      <Button type="submit" variant="solid" fullWidth isLoading={isSubmitting}>
        Register Account
      </Button>
    </form>
  );
}

export const ReactHookFormZodIntegration: StoryObj = {
  name: 'React Hook Form + Zod Integration',
  render: () => <ReactHookFormDemo />,
};
