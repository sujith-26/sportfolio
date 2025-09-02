import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  className = '', 
  variant = 'rectangular',
  width = '100%',
  height = 'auto',
  lines = 1,
  animation = 'pulse'
}) => {
  const baseClasses = `
    bg-gray-200 dark:bg-gray-700 rounded
    ${animation === 'pulse' ? 'animate-pulse' : ''}
    ${animation === 'wave' ? 'animate-wave' : ''}
  `;

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} h-4`}
            style={{ 
              width: index === lines - 1 ? '75%' : '100%' 
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: index * 0.1 
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circular') {
    return (
      <motion.div
        className={`${baseClasses} rounded-full ${className}`}
        style={{ width, height: height || width }}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className={`${className}`}>
        <motion.div
          className={`${baseClasses} h-48 mb-4`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="space-y-2">
          <motion.div
            className={`${baseClasses} h-4 w-3/4`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className={`${baseClasses} h-4 w-1/2`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
};

export default SkeletonLoader;
