import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

const SwipeableContainer = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  className = '',
  preventDefaultTouchmoveEvent = true,
  trackMouse = true,
  ...props 
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    preventDefaultTouchmoveEvent,
    trackMouse,
    delta: 10, // Minimum distance to trigger swipe
    ...props
  });

  return (
    <motion.div
      {...handlers}
      className={`touch-none select-none ${className}`}
      style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but prevent horizontal
    >
      {children}
    </motion.div>
  );
};

export default SwipeableContainer;
