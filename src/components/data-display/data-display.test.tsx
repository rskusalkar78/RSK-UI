import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { List } from './list';
import { Table } from './table';

describe('data display components', () => {
  it('renders card loading and empty states', () => {
    const { rerender } = render(<Card title="Revenue" loading />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();

    rerender(
      <Card title="Revenue" empty emptyTitle="No revenue" emptyDescription="No revenue data yet." />
    );
    expect(screen.getByText('No revenue')).toBeInTheDocument();
  });

  it('renders a sortable table', async () => {
    const user = userEvent.setup();
    render(
      <Table
        data={[
          { name: 'Zoe', score: 10 },
          { name: 'Ava', score: 20 },
        ]}
        columns={[
          {
            key: 'name',
            header: 'Name',
            accessor: (row: { name: string; score: number }) => row.name,
            sortable: true,
          },
          {
            key: 'score',
            header: 'Score',
            accessor: (row: { name: string; score: number }) => row.score,
            sortable: true,
          },
        ]}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Name' }));
    expect(screen.getByText('Ava')).toBeInTheDocument();
  });

  it('renders list empty state', () => {
    render(<List items={[]} emptyTitle="No tasks" emptyDescription="Add a task to start." />);
    expect(screen.getByText('No tasks')).toBeInTheDocument();
  });
});
