import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Table, type Column } from './table';

// ─── Test Data ────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockData: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const mockColumns: Column<User>[] = [
  { key: 'name', header: 'Name', accessor: (user) => user.name },
  { key: 'email', header: 'Email', accessor: (user) => user.email },
  { key: 'role', header: 'Role', accessor: (user) => user.role },
];

// ─── Render ───────────────────────────────────────────────────────────────────

describe('Table — Render', () => {
  it('renders table with data correctly', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('renders all rows', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    const rows = screen.getAllByRole('row');
    // +1 for header row
    expect(rows).toHaveLength(mockData.length + 1);
  });
});

// ─── Empty State ──────────────────────────────────────────────────────────────

describe('Table — Empty State', () => {
  it('renders empty state when data is empty', () => {
    render(<Table data={[]} columns={mockColumns} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('There are no records to display.')).toBeInTheDocument();
  });

  it('renders empty state when empty prop is true', () => {
    render(<Table data={mockData} columns={mockColumns} empty />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders custom empty state text', () => {
    render(
      <Table
        data={[]}
        columns={mockColumns}
        emptyTitle="No users found"
        emptyDescription="Try adjusting your filters"
      />
    );
    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });
});

// ─── Loading State ────────────────────────────────────────────────────────────

describe('Table — Loading State', () => {
  it('renders loading state with skeletons', () => {
    render(<Table data={mockData} columns={mockColumns} loading />);
    // Should not render actual data
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    // Should have skeleton rows
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});

// ─── Sorting ──────────────────────────────────────────────────────────────────

describe('Table — Sorting', () => {
  it('renders sort icons for sortable columns', () => {
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    render(<Table data={mockData} columns={sortableColumns} />);
    const nameHeader = screen.getByRole('button', { name: /Name/i });
    expect(nameHeader).toBeInTheDocument();
  });

  it('calls onSort when sortable column is clicked', async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    render(<Table data={mockData} columns={sortableColumns} onSort={handleSort} />);

    const nameHeader = screen.getByRole('button', { name: /Name/i });
    await user.click(nameHeader);

    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('toggles sort direction on repeated clicks', async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    const { rerender } = render(
      <Table data={mockData} columns={sortableColumns} onSort={handleSort} />
    );

    const nameHeader = screen.getByRole('button', { name: /Name/i });
    await user.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith('name', 'asc');

    // Rerender with updated sortBy to simulate controlled component
    rerender(
      <Table
        data={mockData}
        columns={sortableColumns}
        onSort={handleSort}
        sortBy={{ key: 'name', direction: 'asc' }}
      />
    );

    await user.click(screen.getByRole('button', { name: /Name/i }));
    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('handles keyboard sorting (Enter key)', async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    render(<Table data={mockData} columns={sortableColumns} onSort={handleSort} />);

    const nameHeader = screen.getByRole('button', { name: /Name/i });
    nameHeader.focus();
    await user.keyboard('{Enter}');

    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('handles keyboard sorting (Space key)', async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    render(<Table data={mockData} columns={sortableColumns} onSort={handleSort} />);

    const nameHeader = screen.getByRole('button', { name: /Name/i });
    nameHeader.focus();
    await user.keyboard(' ');

    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('displays correct aria-sort attribute', () => {
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    render(
      <Table data={mockData} columns={sortableColumns} sortBy={{ key: 'name', direction: 'asc' }} />
    );

    const nameHeader = screen.getByRole('button', { name: /Name/i });
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
  });
});

// ─── Selection ────────────────────────────────────────────────────────────────

describe('Table — Selection', () => {
  it('renders checkboxes when selectable is true', () => {
    render(<Table data={mockData} columns={mockColumns} selectable />);
    const checkboxes = screen.getAllByRole('checkbox');
    // +1 for select all checkbox
    expect(checkboxes).toHaveLength(mockData.length + 1);
  });

  it('calls onRowSelect when row checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleRowSelect = vi.fn();
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        selectable
        onRowSelect={handleRowSelect}
        getRowId={(row) => row.id}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1];
    if (firstRowCheckbox) {
      await user.click(firstRowCheckbox);
    }

    expect(handleRowSelect).toHaveBeenCalledWith('1');
  });

  it('calls onSelectAll when select all checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleSelectAll = vi.fn();
    render(
      <Table data={mockData} columns={mockColumns} selectable onSelectAll={handleSelectAll} />
    );

    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    await user.click(selectAllCheckbox);

    expect(handleSelectAll).toHaveBeenCalledWith(true);
  });

  it('shows selected rows with correct styling', () => {
    const selectedRows = new Set(['1', '2']);
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        selectable
        selectedRows={selectedRows}
        getRowId={(row) => row.id}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[1]).toBeChecked(); // Row 1
    expect(checkboxes[2]).toBeChecked(); // Row 2
    expect(checkboxes[3]).not.toBeChecked(); // Row 3
  });

  it('sets select all checkbox to checked when all rows are selected', () => {
    const selectedRows = new Set(['1', '2', '3']);
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        selectable
        selectedRows={selectedRows}
        getRowId={(row) => row.id}
      />
    );

    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    expect(selectAllCheckbox).toBeChecked();
  });

  it('sets select all checkbox to indeterminate when some rows are selected', () => {
    const selectedRows = new Set(['1']);
    const { container } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        selectable
        selectedRows={selectedRows}
        getRowId={(row) => row.id}
      />
    );

    const selectAllCheckbox = container.querySelector(
      'input[aria-label="Select all rows"]'
    ) as HTMLInputElement;
    expect(selectAllCheckbox.indeterminate).toBe(true);
  });
});

// ─── Styling ──────────────────────────────────────────────────────────────────

describe('Table — Styling', () => {
  it('applies striped styling when striped is true', () => {
    const { container } = render(<Table data={mockData} columns={mockColumns} striped />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[1]).toHaveClass('bg-muted/20');
  });

  it('applies hover styling when hoverable is true', () => {
    const { container } = render(<Table data={mockData} columns={mockColumns} hoverable />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).toHaveClass('hover:bg-muted/50');
  });

  it('applies sticky header when stickyHeader is true', () => {
    const { container } = render(<Table data={mockData} columns={mockColumns} stickyHeader />);
    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('sticky');
  });

  it('merges custom className', () => {
    const { container } = render(
      <Table data={mockData} columns={mockColumns} className="custom-class" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });
});

// ─── Column Configuration ─────────────────────────────────────────────────────

describe('Table — Column Configuration', () => {
  it('applies column width', () => {
    const columnsWithWidth: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, width: '200px' },
    ];
    render(<Table data={mockData} columns={columnsWithWidth} />);
    const nameHeader = screen.getByText('Name').closest('th');
    expect(nameHeader).toHaveStyle({ width: '200px' });
  });

  it('applies column alignment', () => {
    const columnsWithAlign: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, align: 'center' },
      { key: 'email', header: 'Email', accessor: (user) => user.email, align: 'right' },
    ];
    const { container } = render(<Table data={mockData} columns={columnsWithAlign} />);

    const nameHeader = container.querySelector('th:nth-child(1)');
    expect(nameHeader).toHaveClass('text-center');

    const emailHeader = container.querySelector('th:nth-child(2)');
    expect(emailHeader).toHaveClass('text-right');
  });
});

// ─── forwardRef ───────────────────────────────────────────────────────────────

describe('Table — forwardRef', () => {
  it('forwards ref to the wrapper div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Table ref={ref} data={mockData} columns={mockColumns} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('Table — Accessibility', () => {
  it('has proper table structure', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('has aria-label for checkboxes', () => {
    render(<Table data={mockData} columns={mockColumns} selectable />);
    expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
    expect(screen.getByLabelText('Select row 1')).toBeInTheDocument();
  });

  it('sortable headers have button role', () => {
    const sortableColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    ];
    render(<Table data={mockData} columns={sortableColumns} />);
    const nameHeader = screen.getByRole('button', { name: /Name/i });
    expect(nameHeader).toHaveAttribute('role', 'button');
  });
});

// ─── Custom Row ID ────────────────────────────────────────────────────────────

describe('Table — Custom Row ID', () => {
  it('uses custom getRowId function', async () => {
    const user = userEvent.setup();
    const handleRowSelect = vi.fn();
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        selectable
        onRowSelect={handleRowSelect}
        getRowId={(row) => row.id}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1];
    if (firstRowCheckbox) {
      await user.click(firstRowCheckbox);
    }

    expect(handleRowSelect).toHaveBeenCalledWith('1');
  });
});
