import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DataTable } from '../components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-05',
  },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof User,
    sortable: true,
    render: (value: User[keyof User]) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {String(value)}
      </span>
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate' as keyof User,
    sortable: true,
    render: (value: User[keyof User]) => 
      new Date(String(value)).toLocaleDateString(),
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, selection, and customizable columns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onRowSelect: { action: 'rows selected' },
    onRowClick: { action: 'row clicked' },
  },
  args: {
    onRowSelect: fn(),
    onRowClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
  },
};

export const CustomEmptyState: Story = {
  args: {
    data: [],
    columns: columns,
    emptyState: (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <div className="text-xl font-semibold text-gray-700 mb-2">
          No users found
        </div>
        <div className="text-gray-500">
          Get started by adding your first user
        </div>
      </div>
    ),
  },
};

export const ClickableRows: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Moderator'][i % 3],
      status: (i % 2 === 0 ? 'active' : 'inactive') as 'active' | 'inactive',
      joinDate: new Date(2023, (i % 12), (i % 28) + 1).toISOString().split('T')[0],
    })),
    columns: columns,
    selectable: true,
  },
};