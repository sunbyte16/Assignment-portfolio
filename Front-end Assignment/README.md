# React Component Development Assignment

A comprehensive implementation of two production-ready React components: **InputField** and **DataTable**, built with TypeScript, TailwindCSS, and Storybook.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook for component documentation
npm run storybook

# Run tests
npm test
```

## 📦 Components

### InputField Component

A flexible, accessible input component with multiple variants and features.

#### Features
- ✅ **Multiple Variants**: filled, outlined, ghost
- ✅ **Size Options**: small, medium, large  
- ✅ **Validation States**: error messages, invalid state
- ✅ **Special Features**: password toggle, clear button, loading state
- ✅ **Accessibility**: ARIA labels, keyboard navigation
- ✅ **TypeScript**: Fully typed with proper interfaces

#### Usage
```tsx
import { InputField } from './components';

<InputField
  label="Email Address"
  type="email"
  placeholder="Enter your email..."
  variant="outlined"
  size="md"
  showClearButton={true}
  helperText="We'll never share your email"
/>
```

### DataTable Component

A powerful, sortable data table with selection capabilities.

#### Features
- ✅ **Sortable Columns**: Click headers to sort
- ✅ **Row Selection**: Single or multiple selection
- ✅ **Custom Renderers**: Custom cell content
- ✅ **Loading State**: Built-in loading indicator
- ✅ **Empty State**: Customizable empty state
- ✅ **Accessibility**: Proper ARIA attributes
- ✅ **Generic Types**: Full TypeScript support

#### Usage
```tsx
import { DataTable, Column } from './components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

<DataTable
  data={users}
  columns={columns}
  selectable={true}
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>
```

## 🧪 Testing

Both components include comprehensive test suites:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:ui
```

## 📚 Storybook Documentation

Interactive component documentation is available in Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to explore:
- Component props and controls
- Multiple usage examples
- Interactive playground
- Accessibility features
- Responsive behavior

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)  
- **Error**: Red (#EF4444)
- **Gray Scale**: Various shades for text and backgrounds

### Typography
- **Font**: System fonts (Inter fallback)
- **Sizes**: Small (14px), Medium (16px), Large (18px)
- **Weights**: Normal (400), Medium (500), Semibold (600)

### Spacing
- **System**: 8px base unit
- **Components**: Consistent padding and margins
- **Responsive**: Mobile-first approach

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.test.tsx
│   │   └── index.ts
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.test.tsx
│   │   └── index.ts
│   └── index.ts
├── stories/
│   ├── InputField.stories.tsx
│   └── DataTable.stories.tsx
├── test/
│   └── setup.ts
└── App.tsx (Demo application)
```

## ♿ Accessibility Features

Both components follow accessibility best practices:

### InputField
- Proper label associations
- ARIA attributes for validation states
- Keyboard navigation support
- Screen reader announcements
- Focus management

### DataTable  
- Semantic table structure
- Row/column headers
- Selection announcements
- Keyboard navigation
- Sort state indicators

## 📱 Responsive Design

Components are fully responsive:
- **Mobile**: < 768px - Optimized touch targets
- **Tablet**: 768px - 1024px - Balanced layout
- **Desktop**: > 1024px - Full feature set

## 🔧 Development

### TypeScript Configuration
- Strict mode enabled
- Proper type checking
- Generic component support
- Interface exports

### Testing Setup
- Vitest for test runner
- React Testing Library for component testing
- Jest DOM matchers
- User event simulation

### Build Tools
- Vite for fast development
- TailwindCSS for styling
- ESLint for code quality
- TypeScript for type safety

## 📝 Component APIs

### InputField Props
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}
```

### DataTable Props
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (record: T, index: number) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  emptyState?: React.ReactNode;
}
```

## 🚀 Production Ready

These components are built for production use with:
- Performance optimizations
- Error boundary support
- Memory leak prevention
- Bundle size optimization
- Cross-browser compatibility

## 📄 License

MIT License - feel free to use in your projects!