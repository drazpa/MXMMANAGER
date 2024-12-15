import React from 'react';
import { TimeRange } from '../types/types';
import { TIME_RANGE_OPTIONS } from '../utils/chartUtils';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange
}) => {
  return (
    <div className="flex gap-2">
      {Object.values(TIME_RANGE_OPTIONS).map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onRangeChange(value)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedRange === value
              ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg scale-105'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};