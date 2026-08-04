# Form Components

RSK-UI Form Components provide a robust, highly accessible, and visually cohesive suite of form elements supporting validation states, loading indicators, disabled modes, and seamless integration with **React Hook Form** and **Zod**.

---

## Included Components

- **Label**: Accessible label with optional indicator, size variants, disabled state styling.
- **HelperText**: Accessible hint/help text tied via `aria-describedby`.
- **ErrorMessage**: Accessible error text component with `role="alert"`.
- **Input**: Flexible text input supporting sizes, left/right icons, loading spinners, and error states.
- **Textarea**: Multi-line input supporting resize controls, character counter, loading, and error states.
- **Checkbox**: Checkbox control supporting checked, unchecked, indeterminate, and error states.
- **Radio & RadioGroup**: Single-select radio controls and container fieldset.
- **Switch**: Accessible toggle switch component.
- **Select**: Dropdown selection component with option groups and loading state.
- **FormField**: High-level wrapper component connecting `Label`, control, `HelperText`, and `ErrorMessage` automatically via ARIA attributes.

---

## Installation & Import

```tsx
import {
  Label,
  HelperText,
  ErrorMessage,
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Select,
  FormField,
} from '@/components';
```

---

## React Hook Form + Zod Integration Example

```tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, Input, Checkbox, Select, Textarea, Button } from '@/components';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().max(200, 'Bio too long'),
  terms: z.boolean().refine((v) => v === true, 'Terms must be accepted'),
});

type FormValues = z.infer<typeof schema>;

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted values:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <FormField label="Username" isRequired error={errors.username?.message}>
        <Input {...register('username')} placeholder="johndoe" />
      </FormField>

      <FormField label="Email" isRequired error={errors.email?.message}>
        <Input type="email" {...register('email')} placeholder="john@example.com" />
      </FormField>

      <FormField label="Role" isRequired error={errors.role?.message}>
        <Select
          {...register('role')}
          placeholder="Select role..."
          options={[
            { label: 'Developer', value: 'dev' },
            { label: 'Designer', value: 'designer' },
          ]}
        />
      </FormField>

      <FormField label="Bio" optionalText="(Optional)" error={errors.bio?.message}>
        <Textarea {...register('bio')} placeholder="Tell us about yourself..." maxLength={200} />
      </FormField>

      <Checkbox
        label="I accept terms and conditions"
        isError={Boolean(errors.terms)}
        {...register('terms')}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

---

## Accessibility & Features

- **ARIA Attributes**: Form control automatically links with `Label` via `htmlFor`/`id`, `HelperText` and `ErrorMessage` via `aria-describedby`, and error states via `aria-invalid`.
- **Keyboard Navigation**: Full support for native focus rings, keyboard navigation (`Tab`, `Space`, `Arrow` keys).
- **Disabled & Loading States**: Setting `isLoading` automatically disables interaction and displays accessible loaders with `aria-busy="true"`.
