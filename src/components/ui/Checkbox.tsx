import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-4 h-4 text-primary-600 bg-gray-900 border-gray-700 rounded
              focus:ring-2 focus:ring-primary-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
        </div>
        <div className="ml-3">
          <label className="text-sm font-medium text-gray-300 cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
