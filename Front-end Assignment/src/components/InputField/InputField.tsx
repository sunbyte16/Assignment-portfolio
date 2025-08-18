import React, { useState, forwardRef, useId } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  theme?: 'light' | 'dark';
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  theme = 'light',
  className = '',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const generatedId = useId();
  const inputId = id || generatedId;

  const actualValue = value !== undefined ? value : internalValue;
  const isPassword = type === 'password';
  const hasError = invalid || !!errorMessage;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    
    if (onChange) {
      onChange(syntheticEvent);
    } else {
      setInternalValue('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Base styles
  const baseStyles = "w-full transition-all duration-200 focus:outline-none";
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-4 py-4 text-lg"
  };

  // Variant styles
  const variantStyles = {
    filled: hasError 
      ? "bg-red-50 border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
      : "bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:bg-gray-100",
    outlined: hasError 
      ? "bg-white border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
      : "bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-400",
    ghost: hasError 
      ? "bg-transparent border-b-2 border-red-300 focus:border-red-500 rounded-none" 
      : "bg-transparent border-b-2 border-gray-300 focus:border-blue-500 rounded-none hover:border-gray-400"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed bg-gray-100";
  const roundedStyles = variant === 'ghost' ? '' : 'rounded-lg';

  const inputClasses = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    roundedStyles,
    disabled && disabledStyles,
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    "block text-sm font-medium mb-1",
    hasError ? "text-red-700" : "text-gray-700",
    disabled && "text-gray-400"
  ].filter(Boolean).join(' ');

  const helperTextClasses = [
    "mt-1 text-sm",
    hasError ? "text-red-600" : "text-gray-600"
  ].filter(Boolean).join(' ');

  const showRightIcons = showClearButton || (isPassword && showPasswordToggle) || loading;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={actualValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`${inputClasses} ${showRightIcons ? 'pr-12' : ''}`}
          aria-invalid={hasError}
          aria-describedby={
            (helperText || errorMessage) ? `${inputId}-description` : undefined
          }
          {...props}
        />
        
        {showRightIcons && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {loading && (
              <Loader2 className={`h-4 w-4 animate-spin ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            )}
            
            {!loading && showClearButton && actualValue && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className={`transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-500 hover:text-gray-300' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {!loading && isPassword && showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className={`transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-500 hover:text-gray-300' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <p
          id={`${inputId}-description`}
          className={helperTextClasses}
          role={hasError ? "alert" : undefined}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;

export { InputField }