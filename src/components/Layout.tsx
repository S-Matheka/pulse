import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header />
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