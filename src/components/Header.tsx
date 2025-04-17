import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import CustomDropdown from './CustomDropdown';
import PulseDrawer from './PulseDrawer';
import NotificationsPanel from './NotificationsPanel';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [showPulseDrawer, setShowPulseDrawer] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const locations = [
    { id: '0', value: 'all', label: 'All Locations' },
    { id: '1', value: 'midtown', label: 'Midtown Clinic – Atlanta, GA' },
    { id: '2', value: 'downtown', label: 'Downtown Clinic – Atlanta, GA' },
    { id: '3', value: 'buckhead', label: 'Buckhead Clinic – Atlanta, GA' },
    { id: '4', value: 'jacksonville', label: 'Jacksonville Clinic – FL' },
    { id: '5', value: 'orlando', label: 'Orlando Clinic – FL' },
  ];

  const dateRanges = [
    { id: '1', value: 'today', label: 'Today' },
    { id: '2', value: 'yesterday', label: 'Yesterday' },
    { id: '3', value: 'week', label: 'Last 7 Days' },
    { id: '4', value: 'month', label: 'Last 30 Days' },
    { id: '5', value: 'year', label: 'This Year' },
  ];

  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('yesterday');

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
        {/* Left side - Location and Date Range */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <CustomDropdown
              options={locations}
              value={selectedLocation}
              onChange={setSelectedLocation}
              minWidth="220px"
              showLocationIcons
              className="px-3"
            />
          </div>
          <div className="relative flex items-center">
            <CustomDropdown
              options={dateRanges}
              value={selectedDateRange}
              onChange={setSelectedDateRange}
              minWidth="140px"
              icon={<CalendarIcon className="h-4 w-4 text-gray-400" />}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-900" />
            </button>
            
            <NotificationsPanel
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>
          <button
            onClick={() => setShowPulseDrawer(true)}
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></span>
              <span className="relative">✨</span>
            </span>
            Ask Pulse
          </button>
        </div>
      </header>

      <PulseDrawer
        isOpen={showPulseDrawer}
        onClose={() => setShowPulseDrawer(false)}
      />
    </>
  );
};

export default Header; 