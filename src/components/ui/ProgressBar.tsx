import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-xs">
        <span className="text-sm font-medium text-gray-300">
          Étape {current} sur {total}
        </span>
        <span className="text-sm font-medium text-gray-300">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
