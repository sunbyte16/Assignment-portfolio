import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders with basic props', () => {
    render(
      <InputField
        label="Test Input"
        placeholder="Enter text..."
        helperText="Helper text"
      />
    );

    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('displays error message when invalid', () => {
    render(
      <InputField
        label="Email"
        errorMessage="Invalid email"
        invalid={true}
      />
    );

    const errorMessage = screen.getByText('Invalid email');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });

  it('handles controlled input changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputField
        label="Test Input"
        value="initial"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Test Input');
    await user.clear(input);
    await user.type(input, 'new value');

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows clear button when enabled and has value', () => {
    render(
      <InputField
        label="Search"
        value="search term"
        showClearButton={true}
      />
    );

    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('handles clear button click', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputField
        label="Search"
        value="search term"
        onChange={handleChange}
        showClearButton={true}
      />
    );

    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' })
      })
    );
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();

    render(
      <InputField
        label="Password"
        type="password"
        value="secret"
        showPasswordToggle={true}
      />
    );

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('Show password');

    expect(input.type).toBe('password');

    await user.click(toggleButton);
    expect(input.type).toBe('text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(
      <InputField
        label="Disabled Input"
        disabled={true}
      />
    );

    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
  });

  it('shows loading state', () => {
    render(
      <InputField
        label="Loading Input"
        loading={true}
      />
    );

    const input = screen.getByLabelText('Loading Input');
    expect(input).toBeDisabled();
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(
      <InputField
        label="Test Input"
        variant="filled"
      />
    );

    let input = screen.getByLabelText('Test Input');
    expect(input).toHaveClass('bg-gray-50');

    rerender(
      <InputField
        label="Test Input"
        variant="outlined"
      />
    );

    input = screen.getByLabelText('Test Input');
    expect(input).toHaveClass('bg-white');

    rerender(
      <InputField
        label="Test Input"
        variant="ghost"
      />
    );

    input = screen.getByLabelText('Test Input');
    expect(input).toHaveClass('bg-transparent');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <InputField
        label="Test Input"
        size="sm"
      />
    );

    let input = screen.getByLabelText('Test Input');
    expect(input).toHaveClass('px-3', 'py-2', 'text-sm');

    rerender(
      <InputField
        label="Test Input"
        size="lg"
      />
    );

    input = screen.getByLabelText('Test Input');
    expect(input).toHaveClass('px-4', 'py-4', 'text-lg');
  });

  it('has proper accessibility attributes', () => {
    render(
      <InputField
        label="Email"
        helperText="Enter your email address"
        errorMessage="Invalid email"
        invalid={true}
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});