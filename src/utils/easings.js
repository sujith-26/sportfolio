/**
 * Collection of easing functions for smooth animations
 * Optimized for performance with fewer calculations and modern use cases
 */

export const easings = {
    // Linear - no easing
    linear: (t, b, c, d) => c * (t / d) + b,
  
    // Quadratic easing
    easeInQuad: (t, b, c, d) => {
      t /= d;
      return c * t * t + b;
    },
    easeOutQuad: (t, b, c, d) => {
      t /= d;
      return -c * t * (t - 2) + b;
    },
    easeInOutQuad: (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
  
    // Cubic easing
    easeInCubic: (t, b, c, d) => {
      t /= d;
      return c * t * t * t + b;
    },
    easeOutCubic: (t, b, c, d) => {
      t = t / d - 1;
      return c * (t * t * t + 1) + b;
    },
    easeInOutCubic: (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t - 2) * (t - 2) * (t - 2) + 2) + b;
    },
  
    // Sine easing
    easeInSine: (t, b, c, d) => -c * Math.cos((t / d) * (Math.PI / 2)) + c + b,
    easeOutSine: (t, b, c, d) => c * Math.sin((t / d) * (Math.PI / 2)) + b,
    easeInOutSine: (t, b, c, d) => (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b,
  
    // Exponential easing
    easeOutExpo: (t, b, c, d) =>
      t === d ? b + c : c * (1 - Math.pow(2, (-10 * t) / d)) + b,
  };
  
  export default easings;