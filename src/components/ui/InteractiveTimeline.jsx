import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from './GlassCard';

const InteractiveTimeline = ({ items = [], orientation = 'vertical' }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { theme } = useTheme();

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <motion.div
        className={`
          absolute left-1/2 transform -translate-x-1/2 
          w-0.5 h-full origin-top
          ${theme === 'dark'
            ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500'
            : 'bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600'
          }
        `}
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      {/* Timeline Items */}
      <motion.div
        className="space-y-12"
        variants={timelineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            variants={itemVariants}
            className={`
              flex items-center relative
              ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
            `}
          >
            {/* Content Card */}
            <div className="w-5/12">
              <GlassCard
                className={`
                  cursor-pointer transition-all duration-300 group
                  ${hoveredItem === index ? 'scale-105' : ''}
                  ${selectedItem === index ? 'ring-2 ring-blue-500' : ''}
                `}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(selectedItem === index ? null : index)}
              >
                <div className="flex items-start gap-3">
                  {item.icon && (
                    <div className={`
                      p-2 rounded-lg flex-shrink-0
                      ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'}
                    `}>
                      {item.icon}
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className={`
                      font-semibold text-lg mb-2 group-hover:text-blue-500 transition-colors
                      ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
                    `}>
                      {item.title}
                    </h3>
                    <p className={`
                      text-sm mb-3
                      ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                      {item.description}
                    </p>
                    {item.year && (
                      <span className={`
                        text-xs px-2 py-1 rounded
                        ${theme === 'dark' 
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-500/10 text-blue-600'
                        }
                      `}>
                        {item.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedItem === index && item.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600"
                    >
                      <p className={`
                        text-sm
                        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        {item.details}
                      </p>
                      {item.technologies && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`
                                text-xs px-2 py-1 rounded
                                ${theme === 'dark'
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-200 text-gray-700'
                                }
                              `}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </div>

            {/* Timeline Node */}
            <motion.div
              className={`
                absolute left-1/2 transform -translate-x-1/2 z-10
                w-4 h-4 rounded-full border-4
                ${hoveredItem === index || selectedItem === index
                  ? 'w-6 h-6 border-blue-500 bg-blue-500'
                  : theme === 'dark'
                    ? 'border-blue-400 bg-gray-900'
                    : 'border-blue-500 bg-white'
                }
                transition-all duration-300
              `}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Pulse Effect */}
              {(hoveredItem === index || selectedItem === index) && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/30"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Spacer */}
            <div className="w-5/12" />
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 space-y-2">
        {items.map((_, index) => (
          <motion.button
            key={index}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${selectedItem === index || hoveredItem === index
                ? 'bg-blue-500 scale-125'
                : theme === 'dark'
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }
            `}
            onClick={() => setSelectedItem(selectedItem === index ? null : index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveTimeline;
