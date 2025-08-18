import React, { useState } from 'react';
import { InputField, DataTable, Column } from './components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const sampleUsers: User[] = [
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
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    status: 'inactive',
    joinDate: '2023-05-12',
  },
];

const userColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value) => (
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
    dataIndex: 'joinDate',
    sortable: true,
    render: (value) => new Date(String(value)).toLocaleDateString(),
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelection = (users: User[]) => {
    setSelectedUsers(users);
  };

  const handleRowClick = (user: User) => {
    console.log('Clicked user:', user);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            React Components Demo
          </h1>
          <p className="text-gray-600 mt-2">
            Showcase of InputField and DataTable components with TypeScript
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* InputField Demo Section */}
        <section>
          <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            InputField Component Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Input */}
            <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Basic Input</h3>
              <InputField
                label="Full Name"
                placeholder="Enter your full name..."
                helperText="This is a basic input field"
                theme={isDarkMode ? 'dark' : 'light'}
              />
            </div>

            {/* Search Input */}
            <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Search Input</h3>
              <InputField
                label="Search Users"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={handleSearch}
                showClearButton={true}
                variant="outlined"
                theme={isDarkMode ? 'dark' : 'light'}
              />
            </div>

            {/* Email Input with Validation */}
            <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Email Validation</h3>
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={
                  email && !email.includes('@') ? 'Please enter a valid email' : undefined
                }
                invalid={email && !email.includes('@')}
                variant="filled"
                theme={isDarkMode ? 'dark' : 'light'}
              />
            </div>

            {/* Password Input */}
            <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Password Input</h3>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordToggle={true}
                helperText="Password must be at least 8 characters"
                theme={isDarkMode ? 'dark' : 'light'}
              />
            </div>

            {/* Size Variants */}
            <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Size Variants</h3>
              <div className="space-y-3">
                <InputField
                  placeholder="Small input..."
                  size="sm"
                  variant="outlined"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
                <InputField
                  placeholder="Medium input..."
                  size="md"
                  variant="outlined"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
                <InputField
                  placeholder="Large input..."
                  size="lg"
                  variant="outlined"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
              </div>
            </div>

            {/* Style Variants */}
            <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Style Variants</h3>
              <div className="space-y-3">
                <InputField
                  placeholder="Filled variant..."
                  variant="filled"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
                <InputField
                  placeholder="Outlined variant..."
                  variant="outlined"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
                <InputField
                  placeholder="Ghost variant..."
                  variant="ghost"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Demo Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            DataTable Component Example
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">User Management</h3>
                  <p className="text-sm text-gray-600">
                    {selectedUsers.length > 0 
                      ? `${selectedUsers.length} user(s) selected`
                      : `Showing ${filteredUsers.length} users`
                    }
                  </p>
                </div>
                <button
                  onClick={simulateLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Simulate Loading
                </button>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              data={filteredUsers}
              columns={userColumns}
              loading={isLoading}
              selectable={true}
              onRowSelect={handleUserSelection}
              onRowClick={handleRowClick}
              emptyState={
                searchTerm ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-xl font-semibold text-gray-700 mb-2">
                      No users found
                    </div>
                    <div className="text-gray-500">
                      Try adjusting your search criteria
                    </div>
                  </div>
                ) : undefined
              }
            />
          </div>
        </section>

        {/* Feature Summary */}
        <section className={`rounded-lg shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Component Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>InputField</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>✅ Multiple variants (filled, outlined, ghost)</li>
                <li>✅ Size options (small, medium, large)</li>
                <li>✅ Validation states with error messages</li>
                <li>✅ Password toggle visibility</li>
                <li>✅ Clear button functionality</li>
                <li>✅ Loading state support</li>
                <li>✅ Light & dark theme support</li>
                <li>✅ Full TypeScript support</li>
                <li>✅ Accessibility features (ARIA labels)</li>
                <li>✅ Responsive design</li>
              </ul>
            </div>
            
            <div>
              <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>DataTable</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>✅ Sortable columns</li>
                <li>✅ Row selection (single/multiple)</li>
                <li>✅ Custom cell renderers</li>
                <li>✅ Loading state</li>
                <li>✅ Empty state with customization</li>
                <li>✅ Row click handlers</li>
                <li>✅ Generic TypeScript support</li>
                <li>✅ Accessibility features</li>
                <li>✅ Responsive design</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;