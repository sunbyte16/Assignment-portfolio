import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { InputField } from '../components';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    onChange: { action: 'changed' },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    errorMessage: 'Please enter a valid email address',
    invalid: true,
    value: 'invalid-email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
    showPasswordToggle: true,
    value: 'secretpassword',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    showClearButton: true,
    value: 'Search query',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Loading...',
    loading: true,
    value: 'Processing...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Disabled value',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Filled Variant"
        variant="filled"
        placeholder="Filled input..."
      />
      <InputField
        label="Outlined Variant"
        variant="outlined"
        placeholder="Outlined input..."
      />
      <InputField
        label="Ghost Variant"
        variant="ghost"
        placeholder="Ghost input..."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Small Size"
        size="sm"
        placeholder="Small input..."
      />
      <InputField
        label="Medium Size"
        size="md"
        placeholder="Medium input..."
      />
      <InputField
        label="Large Size"
        size="lg"
        placeholder="Large input..."
      />
    </div>
  ),
};

export const AllFeatures: Story = {
  args: {
    label: 'Advanced Input',
    placeholder: 'Type something...',
    helperText: 'This input has all features enabled',
    showClearButton: true,
    value: 'Sample text with clear button',
  },
};
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div className="bg-gray-900 p-6 rounded-lg space-y-4">
      <InputField
        label="Dark Theme Input"
        placeholder="Enter text..."
        theme="dark"
        helperText="This is a dark theme input"
      />
      <InputField
        label="Dark Theme with Error"
        placeholder="Enter email..."
        theme="dark"
        errorMessage="Please enter a valid email"
        invalid={true}
        value="invalid-email"
      />
      <InputField
        label="Dark Theme Password"
        type="password"
        placeholder="Enter password..."
        theme="dark"
        showPasswordToggle={true}
        value="secretpassword"
      />
    </div>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Light Theme</h3>
        <div className="space-y-4">
          <InputField
            label="Light Input"
            placeholder="Light theme..."
            theme="light"
            variant="outlined"
          />
          <InputField
            label="Light Filled"
            placeholder="Filled variant..."
            theme="light"
            variant="filled"
          />
          <InputField
            label="Light Ghost"
            placeholder="Ghost variant..."
            theme="light"
            variant="ghost"
          />
        </div>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Dark Theme</h3>
        <div className="space-y-4">
          <InputField
            label="Dark Input"
            placeholder="Dark theme..."
            theme="dark"
            variant="outlined"
          />
          <InputField
            label="Dark Filled"
            placeholder="Filled variant..."
            theme="dark"
            variant="filled"
          />
          <InputField
            label="Dark Ghost"
            placeholder="Ghost variant..."
            theme="dark"
            variant="ghost"
          />
        </div>
      </div>
    </div>
  ),
};