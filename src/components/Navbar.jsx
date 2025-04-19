import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToElement } from '../utils/smoothScroll';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      const currentPosition = window.scrollY;

      setScrolled(currentPosition > scrollThreshold);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentPosition / totalHeight) * 100;
      setScrollProgress(progress);

      updateActiveSection(currentPosition);
    };

    const updateActiveSection = (scrollPosition) => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const threshold = section === 'home' ? 0.4 : 0.2;
          if (top <= window.innerHeight * threshold && bottom >= window.innerHeight * threshold) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const throttle = (func, limit) => {
      let inThrottle;
      return () => {
        if (!inThrottle) {
          func();
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    window.addEventListener('scroll', throttle(handleScroll, 20), { passive: true });

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleNavLinkClick = (target) => {
    scrollToElement(`#${target}`, 80);
    setMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-opacity-90 backdrop-blur-md shadow-md' : 'py-4'
      } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white text-gray-800'}`}
    >
      <motion.div
        className="h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500 absolute top-0 left-0"
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />

      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center"
        >
          <div
            onClick={() => handleNavLinkClick('home')}
            className="cursor-pointer"
            role="button"
            aria-label="Go to home"
          >
            <span className="text-xl font-bold text-gradient">Sujith</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden md:flex space-x-6 items-center"
        >
          {navLinks.map((link) => (
            <div
              key={link.to}
              onClick={() => handleNavLinkClick(link.to)}
              className="relative group cursor-pointer"
              role="button"
            >
              <span
                className={`text-sm font-medium ${
                  activeSection === link.to
                    ? 'text-primary-400'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600'
                } transition-colors duration-200`}
              >
                {link.name}
              </span>
              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500 transition-all duration-200 ${
                  activeSection === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </div>
          ))}

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-gray-800/50 transition-colors duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </motion.div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-gray-800/50 transition-colors duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-1.5 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden bg-opacity-95 backdrop-blur-md ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06, duration: 0.25 }}
                >
                  <div
                    onClick={() => handleNavLinkClick(link.to)}
                    className={`block border-l-2 pl-2 py-1.5 text-sm ${
                      activeSection === link.to
                        ? theme === 'dark'
                          ? 'text-primary-400 border-primary-400'
                          : 'text-primary-600 border-primary-600'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:text-primary-400 border-gray-700 hover:border-primary-400'
                        : 'text-gray-700 hover:text-primary-600 border-gray-300 hover:border-primary-600'
                    } transition-all duration-200 cursor-pointer`}
                    role="button"
                  >
                    {link.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;