import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const GlassCard = ({
  children,
  className = '',
  hover = true,
  blur = 'backdrop-blur-lg',
  border = true,
  shadow = true,
  padding = 'p-6',
  rounded = 'rounded-lg',
  ...props
}) => {
  const { theme } = useTheme();

  const baseClasses = `
    relative overflow-hidden
    ${blur}
    ${rounded}
    ${padding}
    ${border ? (theme === 'dark' 
      ? 'border border-white/10' 
      : 'border border-black/10'
    ) : ''}
    ${shadow ? (theme === 'dark'
      ? 'shadow-xl shadow-black/20'
      : 'shadow-xl shadow-gray-900/10'
    ) : ''}
    ${theme === 'dark'
      ? 'bg-white/5'
      : 'bg-white/70'
    }
    ${className}
  `;

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    hover: hover ? {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    } : {},
  };

  return (
    <motion.div
      className={baseClasses}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      {...props}
    >
      {/* Gradient Overlay */}
      <div className={`
        absolute inset-0 opacity-60
        ${theme === 'dark'
          ? 'bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'
          : 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5'
        }
      `} />
      
      {/* Shimmer Effect */}
      <div className={`
        absolute inset-0 opacity-30
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        transform -skew-x-12 -translate-x-full
        group-hover:translate-x-full transition-transform duration-1000
      `} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
