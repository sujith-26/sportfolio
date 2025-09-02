import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useCustomHooks';

const ScrollProgress = ({ sections = [] }) => {
  const scrollPosition = useScrollPosition();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Ensure we have valid numbers and avoid division by zero
      if (!windowHeight || !documentHeight || documentHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const progress = (scrollPosition / documentHeight) * 100;
      const validProgress = Math.min(100, Math.max(0, progress || 0));
      setScrollProgress(validProgress);

      // Determine active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      let currentSection = 0;
      sectionElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= windowHeight / 2) {
          currentSection = index;
        }
      });
      setActiveSection(currentSection);
    };

    calculateProgress();
  }, [scrollPosition, sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${Math.max(0, scrollProgress || 0)}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${Math.max(0, scrollProgress || 0)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Section Navigator */}
      {sections.length > 0 && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 space-y-3 hidden lg:block">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 relative group
                ${activeSection === index
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500'
                }
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={section.label}
            >
              {/* Tooltip */}
              <span className="
                absolute right-6 top-1/2 transform -translate-y-1/2
                bg-gray-900 text-white text-xs px-2 py-1 rounded
                opacity-0 group-hover:opacity-100 transition-opacity
                whitespace-nowrap pointer-events-none
              ">
                {section.label}
              </span>
              
              {/* Active indicator */}
              {activeSection === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/30"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </>
  );
};

export default ScrollProgress;
