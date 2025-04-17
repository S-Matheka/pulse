import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDateRange, setSelectedDateRange] = useState('Yesterday');

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const start = range.start.toLocaleDateString('en-US', options);
    const end = range.end.toLocaleDateString('en-US', options);
    setSelectedDateRange(start === end ? start : `${start} - ${end}`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      <div className="flex h-[calc(100vh-64px)]">
        <div className="fixed left-0 w-64">
          <Sidebar />
        </div>
        <div className="ml-64 flex-1 overflow-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout; 