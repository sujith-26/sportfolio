import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useCustomHooks';
import { handleImageError } from '../../utils/helpers';

const ProgressiveImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = 'bg-gray-200 dark:bg-gray-700',
  fallbackSrc = null,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e) => {
    handleImageError(e);
    setImageError(true);
    if (fallbackSrc) {
      e.target.src = fallbackSrc;
      setImageError(false);
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Skeleton/Placeholder */}
      <AnimatePresence>
        {(!imageLoaded || imageError) && (
          <motion.div
            className={`absolute inset-0 ${placeholderColor} animate-pulse`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      {isVisible && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: imageLoaded && !imageError ? 1 : 0,
            scale: imageLoaded && !imageError ? 1 : 1.1 
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}

      {/* Error State */}
      {imageError && !fallbackSrc && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressiveImage;
