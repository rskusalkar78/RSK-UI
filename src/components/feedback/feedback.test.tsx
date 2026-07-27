import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './alert';
import { EmptyState } from './empty-state';
import { LoadingOverlay } from './loading-overlay';
import { Progress } from './progress';
import { Skeleton } from './skeleton';
import { Toast } from './toast';

describe('feedback components', () => {
  it('renders an alert with accessible semantics', () => {
<<<<<<< HEAD
    render(<Alert title="Success" description="Your changes have been saved." variant="success" />);
=======
    render(
      <Alert title="Success" description="Your changes have been saved." variant="success" />
    );
>>>>>>> 461806c (feat: add Alert component stories for Storybook)

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument();
  });

  it('renders a toast with polite live announcements', () => {
    render(<Toast title="Saved" description="Changes were saved successfully." />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('renders a progress bar with the right aria attributes', () => {
    render(<Progress value={65} label="Upload progress" />);

    const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(progress).toHaveAttribute('aria-valuenow', '65');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders skeleton placeholders with aria-hidden semantics', () => {
    render(<Skeleton className="h-4 w-24" />);

    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a loading overlay when active', () => {
    render(<LoadingOverlay active label="Loading content" />);

    expect(screen.getByRole('status', { name: 'Loading content' })).toBeInTheDocument();
  });

  it('renders an empty state with actions', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <EmptyState
        title="No projects yet"
        description="Create your first project to get started."
        action={<button onClick={onAction}>Create project</button>}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Create project' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
