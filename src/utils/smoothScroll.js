/**
 * Enhanced Smooth Scrolling Utility
 * Optimized for performance, accessibility, and modern browsers
 */

import { easings } from './easings';

/**
 * Initialize smooth scrolling with progress indicator and reveal animations
 * @returns {Object} Methods to manage and destroy the instance
 */
export const initSmoothScroll = () => {
  // Disable intensive animations on mobile for performance
  if (window.innerWidth < 640) {
    setupScrollProgressIndicator();
    return { destroy: () => {} };
  }

  // Setup progress bar and observer
  const progressBar = setupScrollProgressIndicator();
  const observer = setupIntersectionObserver();

  // Handle hash links on page load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToElement(window.location.hash, 60, 600);
    }, 300);
  }

  // Add anchor click listeners
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#') && href.length > 1) {
      e.preventDefault();
      scrollToElement(href, 60, 600);
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', handleAnchorClick, { passive: true });
  });

  return {
    destroy: () => {
      observer?.disconnect();
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      if (progressBar) {
        window.removeEventListener('scroll', progressBar.update);
      }
    },
  };
};

/**
 * Setup scroll progress indicator
 * @returns {Object|null} Progress bar controller
 */
export const setupScrollProgressIndicator = () => {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return null;

  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
    progressBar.style.width = `${percentage}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();

  return { element: progressBar, update };
};

/**
 * Setup intersection observer for reveal animations
 * @returns {IntersectionObserver} Observer instance
 */
export const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.dataset.once !== 'false') {
            observer.unobserve(entry.target);
          }
        } else if (entry.target.dataset.once === 'false') {
          entry.target.classList.remove('active');
        }
      });
    },
    { rootMargin: '0px', threshold: 0.1 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

/**
 * Smoothly scroll to an element
 * @param {string} selector - CSS selector or ID
 * @param {number} [offset=0] - Scroll offset in pixels
 * @param {number} [duration=600] - Animation duration in ms
 */
export const scrollToElement = (selector, offset = 0, duration = 600) => {
  const target = document.querySelector(selector);
  if (!target) return;

  const start = window.scrollY;
  const targetY = target.getBoundingClientRect().top + start - offset;
  const distance = targetY - start;
  let startTime = null;

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const scrollY = easings.easeOutCubic(elapsed, start, distance, duration);

    window.scrollTo(0, scrollY);

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      window.location.hash = selector; // Update URL hash
    }
  };

  requestAnimationFrame(animation);
};