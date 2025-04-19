import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiLinkedin className="text-lg" />,
      url: 'https://www.linkedin.com/in/sujith-g-33a390259',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
    },
    {
      icon: <FiGithub className="text-lg" />,
      url: 'https://github.com/sujith-26',
      label: 'GitHub',
      color: 'hover:bg-gray-600',
    },
    {
      icon: <FiInstagram className="text-lg" />,
      url: 'https://www.instagram.com/_.sujith._26/profilecard/?igsh=MXVicjdrYXo1bGJvcg==',
      label: 'Instagram',
      color: 'hover:bg-pink-600',
    },
  ];

  const navLinks = [
    { name: 'Home', to: '#home' },
    { name: 'About', to: '#about' },
    { name: 'Skills', to: '#skills' },
    { name: 'Projects', to: '#projects' },
    { name: 'Experience', to: '#experience' },
    { name: 'Contact', to: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-8 w-full"
          fill="#121212"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="absolute top-1/3 left-8 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-8 right-8 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl" />

      <div className="container mx-auto px-4">
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-500 text-white p-2.5 rounded-full absolute right-8 top-0 -translate-y-1/2 shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="text-lg" />
        </motion.button>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              Sujith
            </h2>
            <p className="text-gray-400 text-sm mt-1">Full Stack Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors py-1 relative group"
                aria-label={`Go to ${link.name} section`}
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex space-x-4 mb-8"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${link.label} profile`}
                className={`p-2 bg-gray-800/50 rounded-full text-gray-300 ${link.color} transition-all duration-200 hover:text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center"
          >
            <div className="mb-3 w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
            <p className="text-gray-500 text-xs">© {year} Sujith. All Rights Reserved.</p>
            <p className="mt-1 flex items-center justify-center text-gray-400 text-xs">
              Built with <FiHeart className="mx-1 text-red-400 text-sm" /> using React
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-4 text-xs text-gray-500 flex justify-center gap-3"
          >
            <a href="#privacy" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;