import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`inline-block ${sizeClasses[size]}`} role="status" aria-label="Loading">
      <div className="animate-spin rounded-full border-4 border-gray-700 border-t-primary-600 h-full w-full" />
    </div>
  );
};