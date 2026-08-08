import { render, screen } from '@testing-library/react';
import { LoginExample } from './examples';

describe('SaaS example applications', () => {
  it('renders the login experience with primary actions', () => {
    render(<LoginExample />);

    expect(screen.getAllByText(/welcome back/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
