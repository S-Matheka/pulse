import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Logo: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <a href="/dashboard" className="flex items-center px-4 h-[65px]">
      <img
        src={`/assets/logos/${theme}/logo.svg`}
        alt="Healthcare Pulse"
        className="h-10 max-w-[180px] object-contain transition-opacity duration-300"
      />
    </a>
  );
};

export default Logo; 