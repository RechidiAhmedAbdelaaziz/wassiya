import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label}
            {props.required && <span className="text-primary-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-lg shadow-sm
            bg-gray-900 text-gray-100 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500
            ${error ? 'border-primary-500' : 'border-gray-700'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-primary-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
