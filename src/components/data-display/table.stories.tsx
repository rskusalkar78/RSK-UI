import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Table, type Column } from './table';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'pending',
    joinDate: '2023-04-05',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Viewer',
    status: 'active',
    joinDate: '2023-05-12',
  },
];

const basicColumns: Column<User>[] = [
  { key: 'name', header: 'Name', accessor: (user) => user.name },
  { key: 'email', header: 'Email', accessor: (user) => user.email },
  { key: 'role', header: 'Role', accessor: (user) => user.role },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    data: { control: false },
    columns: { control: false },
    loading: { control: 'boolean' },
    empty: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
} satisfies Meta<typeof Table<User>>;

export default meta;
type Story = StoryObj<typeof Table<User>>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
  },
};

function SortableColumnsDemo() {
  const [sortBy, setSortBy] = useState<{ key: string; direction: 'asc' | 'desc' } | undefined>();

  const sortableColumns: Column<User>[] = [
    { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true },
    { key: 'email', header: 'Email', accessor: (user) => user.email, sortable: true },
    { key: 'role', header: 'Role', accessor: (user) => user.role, sortable: true },
    { key: 'joinDate', header: 'Join Date', accessor: (user) => user.joinDate, sortable: true },
  ];

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortBy({ key, direction });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {sortBy ? `Sorted by ${sortBy.key} (${sortBy.direction})` : 'Click column headers to sort'}
      </div>
      <Table data={mockUsers} columns={sortableColumns} onSort={handleSort} sortBy={sortBy} />
    </div>
  );
}

export const SortableColumns: Story = {
  name: 'Sortable Columns',
  render: () => <SortableColumnsDemo />,
};

function SelectableRowsDemo() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(mockUsers.map((user) => user.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedRows.size} of {mockUsers.length} rows selected
        </div>
        {selectedRows.size > 0 && (
          <Button size="sm" variant="destructive" onClick={() => setSelectedRows(new Set())}>
            Clear Selection
          </Button>
        )}
      </div>
      <Table
        data={mockUsers}
        columns={basicColumns}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        getRowId={(user) => user.id}
      />
    </div>
  );
}

export const SelectableRows: Story = {
  name: 'Selectable Rows',
  render: () => <SelectableRowsDemo />,
};

export const WithCustomCells: Story = {
  name: 'Custom Cell Rendering',
  render: () => {
    const customColumns: Column<User>[] = [
      {
        key: 'name',
        header: 'User',
        accessor: (user) => (
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        accessor: (user) => (
          <Badge
            color={user.role === 'Admin' ? 'primary' : 'neutral'}
            variant={user.role === 'Admin' ? 'solid' : 'outline'}
          >
            {user.role}
          </Badge>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        accessor: (user) => (
          <Badge
            color={
              user.status === 'active'
                ? 'success'
                : user.status === 'inactive'
                  ? 'destructive'
                  : 'warning'
            }
          >
            {user.status}
          </Badge>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        accessor: () => (
          <div className="flex items-center gap-2">
            <Button size="xs" variant="ghost">
              <Edit size={14} />
            </Button>
            <Button size="xs" variant="ghost">
              <Trash2 size={14} />
            </Button>
          </div>
        ),
        align: 'right',
      },
    ];

    return <Table data={mockUsers} columns={customColumns} />;
  },
};

export const StripedRows: Story = {
  name: 'Striped Rows',
  args: {
    data: mockUsers,
    columns: basicColumns,
    striped: true,
  },
};

export const StickyHeader: Story = {
  name: 'Sticky Header',
  render: () => {
    const longData = Array.from({ length: 50 }, (_, i) => ({
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      joinDate: '2023-01-01',
    }));

    return (
      <div className="h-[400px] overflow-auto">
        <Table data={longData} columns={basicColumns} stickyHeader striped hoverable />
      </div>
    );
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    data: mockUsers,
    columns: basicColumns,
    loading: true,
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    data: [],
    columns: basicColumns,
    emptyTitle: 'No users found',
    emptyDescription: 'Get started by adding your first user.',
    emptyAction: <Button size="sm">Add User</Button>,
  },
};

export const ColumnAlignment: Story = {
  name: 'Column Alignment',
  render: () => {
    const alignedColumns: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, align: 'left' },
      { key: 'role', header: 'Role', accessor: (user) => user.role, align: 'center' },
      { key: 'joinDate', header: 'Join Date', accessor: (user) => user.joinDate, align: 'right' },
    ];

    return <Table data={mockUsers} columns={alignedColumns} />;
  },
};

export const ColumnWidths: Story = {
  name: 'Custom Column Widths',
  render: () => {
    const columnsWithWidth: Column<User>[] = [
      { key: 'name', header: 'Name', accessor: (user) => user.name, width: '30%' },
      { key: 'email', header: 'Email', accessor: (user) => user.email, width: '40%' },
      { key: 'role', header: 'Role', accessor: (user) => user.role, width: '20%' },
      { key: 'status', header: 'Status', accessor: (user) => user.status, width: '10%' },
    ];

    return <Table data={mockUsers} columns={columnsWithWidth} />;
  },
};

export const CompactTable: Story = {
  name: 'Compact Table',
  render: () => (
    <Table data={mockUsers.slice(0, 3)} columns={basicColumns} striped={false} hoverable={false} />
  ),
};

function FullFeaturedDemo() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<{ key: string; direction: 'asc' | 'desc' } | undefined>();

  const fullColumns: Column<User>[] = [
    { key: 'name', header: 'Name', accessor: (user) => user.name, sortable: true, width: '25%' },
    {
      key: 'email',
      header: 'Email',
      accessor: (user) => user.email,
      sortable: true,
      width: '30%',
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (user) => (
        <Badge
          color={user.role === 'Admin' ? 'primary' : 'neutral'}
          variant={user.role === 'Admin' ? 'solid' : 'outline'}
        >
          {user.role}
        </Badge>
      ),
      sortable: true,
      width: '15%',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (user) => (
        <Badge
          color={
            user.status === 'active'
              ? 'success'
              : user.status === 'inactive'
                ? 'destructive'
                : 'warning'
          }
        >
          {user.status}
        </Badge>
      ),
      sortable: true,
      width: '15%',
      align: 'center',
    },
    {
      key: 'actions',
      header: '',
      accessor: () => (
        <Button size="xs" variant="ghost">
          <MoreVertical size={16} />
        </Button>
      ),
      width: '15%',
      align: 'right',
    },
  ];

  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(mockUsers.map((user) => user.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortBy({ key, direction });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedRows.size > 0 && `${selectedRows.size} selected • `}
          {sortBy ? `Sorted by ${sortBy.key} (${sortBy.direction})` : 'Click to sort'}
        </div>
        {selectedRows.size > 0 && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Export
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </div>
        )}
      </div>
      <Table
        data={mockUsers}
        columns={fullColumns}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        getRowId={(user) => user.id}
        onSort={handleSort}
        sortBy={sortBy}
        striped
        hoverable
      />
    </div>
  );
}

export const FullFeatured: Story = {
  name: 'Full Featured',
  render: () => <FullFeaturedDemo />,
};

export const ResponsiveTable: Story = {
  name: 'Responsive (Scroll)',
  render: () => {
    const wideColumns: Column<User>[] = [
      { key: 'name', header: 'Full Name', accessor: (user) => user.name, width: '200px' },
      { key: 'email', header: 'Email Address', accessor: (user) => user.email, width: '250px' },
      { key: 'role', header: 'Role', accessor: (user) => user.role, width: '150px' },
      { key: 'status', header: 'Status', accessor: (user) => user.status, width: '150px' },
      { key: 'joinDate', header: 'Join Date', accessor: (user) => user.joinDate, width: '150px' },
    ];

    return (
      <div className="max-w-2xl">
        <Table data={mockUsers} columns={wideColumns} striped />
      </div>
    );
  },
};
