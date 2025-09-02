import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ size = 'md', showLabel = false, className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  const sizes = {
    sm: { toggle: 'w-12 h-6', thumb: 'w-4 h-4', icon: 'text-xs' },
    md: { toggle: 'w-16 h-8', thumb: 'w-6 h-6', icon: 'text-sm' },
    lg: { toggle: 'w-20 h-10', thumb: 'w-8 h-8', icon: 'text-base' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme
        </span>
      )}
      
      <motion.button
        onClick={toggleTheme}
        className={`
          relative ${currentSize.toggle} rounded-full p-1 
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          }
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        `}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Toggle Thumb */}
        <motion.div
          className={`
            absolute top-1 ${currentSize.thumb} rounded-full 
            bg-white shadow-lg flex items-center justify-center
            ${theme === 'dark' ? 'text-blue-600' : 'text-yellow-600'}
          `}
          animate={{ 
            x: theme === 'dark' 
              ? size === 'sm' ? 24 : size === 'md' ? 32 : 40
              : 4 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3 
          }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? (
              <FaMoon className={currentSize.icon} />
            ) : (
              <FaSun className={currentSize.icon} />
            )}
          </motion.div>
        </motion.div>

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <motion.div
            animate={{ opacity: theme === 'light' ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            <FaSun className={`${currentSize.icon} text-white`} />
          </motion.div>
          <motion.div
            animate={{ opacity: theme === 'dark' ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            <FaMoon className={`${currentSize.icon} text-white`} />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
