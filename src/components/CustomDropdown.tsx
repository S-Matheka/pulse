import React, { useState, useRef, useEffect } from 'react';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';

interface Option {
  id: string;
  value: string;
  label: string;
  showLocationIcon?: boolean;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minWidth?: string;
  showLocationIcons?: boolean;
  icon?: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className = '',
  minWidth = '120px',
  showLocationIcons = false,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef} style={{ minWidth }}>
      <button
        type="button"
        className={`group flex w-full items-center justify-between appearance-none rounded-lg border-0 bg-transparent px-3 py-2 text-base font-medium text-gray-900 transition-all duration-200 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800/40 focus:outline-none focus:ring-1 focus:ring-primary-500 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">{icon}</span>}
          {showLocationIcons && !icon && (
            <BuildingOffice2Icon className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          )}
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-300 ${isOpen ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
          <ul className="max-h-60 py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {options.map((option) => (
              <li
                key={option.id}
                className={`flex cursor-pointer select-none items-center px-3 py-2 text-gray-900 transition-colors duration-150 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700/60 ${
                  option.value === value ? 'text-primary-600 dark:text-primary-300' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {showLocationIcons && !icon && (
                  <BuildingOffice2Icon className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                )}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown; 