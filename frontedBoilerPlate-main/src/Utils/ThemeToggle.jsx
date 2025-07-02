import React from 'react';
import { useTheme } from './useTheme';

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`dark-light-toggle ${sizeClasses[size]} ${className}`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{ cursor: 'pointer' }}
    >
      <span className={isDarkMode ? 'light' : 'dark'}>
        <i className="fi fi-rr-eclipse-alt" />
      </span>
      <span className={isDarkMode ? 'dark' : 'light'}>
        <i className="fi fi-rr-eclipse-alt" />
      </span>
    </button>
  );
};

export default ThemeToggle; 