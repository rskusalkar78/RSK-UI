import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
} from './index';

// ─── Label Tests ─────────────────────────────────────────────────────────────

describe('Label', () => {
  it('renders label text', () => {
    render(<Label htmlFor="test-id">Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders asterisk when isRequired is true', () => {
    render(<Label isRequired>Email</Label>);
    expect(screen.getByTitle('Required')).toBeInTheDocument();
  });

  it('renders optional text when provided', () => {
    render(<Label optionalText="(Optional)">Phone</Label>);
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('applies disabled styling when disabled', () => {
    render(<Label disabled>Disabled Label</Label>);
    expect(screen.getByText('Disabled Label').parentElement).toHaveClass('opacity-50');
  });
});

// ─── HelperText & ErrorMessage Tests ──────────────────────────────────────────

describe('HelperText & ErrorMessage', () => {
  it('renders HelperText correctly', () => {
    render(<HelperText id="h1">Enter your full legal name</HelperText>);
    expect(screen.getByText('Enter your full legal name')).toBeInTheDocument();
  });

  it('renders ErrorMessage with role="alert"', () => {
    render(<ErrorMessage>This field is required</ErrorMessage>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('This field is required');
  });

  it('returns null when ErrorMessage children is empty', () => {
    const { container } = render(<ErrorMessage>{null}</ErrorMessage>);
    expect(container).toBeEmptyDOMElement();
  });
});

// ─── Input Tests ─────────────────────────────────────────────────────────────

describe('Input', () => {
  it('renders text input and accepts typing', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here..." />);
    const input = screen.getByPlaceholderText('Type here...');
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('supports disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('supports loading state', () => {
    render(<Input isLoading placeholder="Loading" />);
    expect(screen.getByPlaceholderText('Loading')).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies aria-invalid when isError is true', () => {
    render(<Input isError placeholder="Error" />);
    expect(screen.getByPlaceholderText('Error')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

// ─── Textarea Tests ──────────────────────────────────────────────────────────

describe('Textarea', () => {
  it('renders textarea and handles input', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Bio..." />);
    const area = screen.getByPlaceholderText('Bio...');
    await user.type(area, 'Developer bio');
    expect(area).toHaveValue('Developer bio');
  });

  it('displays character counter when maxLength is set', () => {
    render(<Textarea maxLength={100} value="Hello" onChange={() => {}} />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('supports loading state', () => {
    render(<Textarea isLoading placeholder="Loading textarea" />);
    expect(screen.getByPlaceholderText('Loading textarea')).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

// ─── Checkbox Tests ──────────────────────────────────────────────────────────

describe('Checkbox', () => {
  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept Terms" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept Terms' });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('handles indeterminate state', () => {
    render(<Checkbox label="Select All" isIndeterminate />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select All' }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('renders helper text when provided', () => {
    render(<Checkbox label="Newsletter" helperText="Weekly updates" />);
    expect(screen.getByText('Weekly updates')).toBeInTheDocument();
  });
});

// ─── Radio & RadioGroup Tests ────────────────────────────────────────────────

describe('Radio & RadioGroup', () => {
  it('allows selecting radio options', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Plan">
        <Radio name="plan" value="free" label="Free" />
        <Radio name="plan" value="pro" label="Pro" />
      </RadioGroup>
    );

    const free = screen.getByRole('radio', { name: 'Free' });
    const pro = screen.getByRole('radio', { name: 'Pro' });

    expect(free).not.toBeChecked();
    await user.click(pro);
    expect(pro).toBeChecked();
    expect(free).not.toBeChecked();
  });
});

// ─── Switch Tests ────────────────────────────────────────────────────────────

describe('Switch', () => {
  it('toggles switch state on click', async () => {
    const user = userEvent.setup();
    render(<Switch label="Enable notifications" />);
    const toggle = screen.getByRole('switch', { name: 'Enable notifications' });
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });
});

// ─── Select Tests ────────────────────────────────────────────────────────────

describe('Select', () => {
  it('renders select with options and changes value', async () => {
    const user = userEvent.setup();
    const options = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ];
    render(<Select options={options} aria-label="Choose Option" />);
    const select = screen.getByRole('combobox', { name: 'Choose Option' });

    await user.selectOptions(select, 'b');
    expect(select).toHaveValue('b');
  });

  it('renders placeholder option', () => {
    render(<Select placeholder="Select a role..." aria-label="Role" />);
    expect(screen.getByText('Select a role...')).toBeInTheDocument();
  });
});

// ─── FormField Wrapper Tests ─────────────────────────────────────────────────

describe('FormField', () => {
  it('links Label, Input, HelperText, and ErrorMessage via ARIA', () => {
    render(
      <FormField
        label="Email Address"
        helperText="We will never share your email."
        error="Invalid email domain"
      >
        <Input placeholder="user@example.com" />
      </FormField>
    );

    const input = screen.getByPlaceholderText('user@example.com');
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email domain');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});

// ─── React Hook Form Integration Tests ────────────────────────────────────────

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  agree: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
});

type FormValues = z.infer<typeof formSchema>;

function TestFormComponent({ onSubmit }: { onSubmit: (data: FormValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { username: '', agree: false },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Username" error={errors.username?.message}>
        <Input
          {...register('username', {
            validate: (val) => {
              const res = formSchema.shape.username?.safeParse(val);
              return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
            },
          })}
          placeholder="Username"
        />
      </FormField>
      <Checkbox
        label="Agree to terms"
        isError={Boolean(errors.agree)}
        {...register('agree', {
          validate: (val) => {
            const res = formSchema.shape.agree?.safeParse(val);
            return res && res.success ? true : (res?.error.issues[0]?.message ?? 'Invalid');
          },
        })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('React Hook Form Integration', () => {
  it('validates inputs correctly with zod and React Hook Form', async () => {
    const user = userEvent.setup();
    const handleFormSubmit = vi.fn();

    render(<TestFormComponent onSubmit={handleFormSubmit} />);

    // Submit empty form to trigger validation errors
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Username must be at least 3 characters')).toBeInTheDocument();
    expect(handleFormSubmit).not.toHaveBeenCalled();

    // Fill valid values
    await user.type(screen.getByPlaceholderText('Username'), 'john_doe');
    await user.click(screen.getByRole('checkbox', { name: 'Agree to terms' }));

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleFormSubmit).toHaveBeenCalledWith(
      { username: 'john_doe', agree: true },
      expect.anything()
    );
  });
});
