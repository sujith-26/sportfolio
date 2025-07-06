import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaSun, FaMoon, FaChevronDown, FaDownload, FaShareAlt, FaTrophy, FaLaptopCode, FaGraduationCap, FaProjectDiagram, FaRocket } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const About = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [currentProject, setCurrentProject] = useState(0);
  const cursorRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseOverLink = () => cursorRef.current?.classList.add('hover');
    const handleMouseOutLink = () => cursorRef.current?.classList.remove('hover');

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      const links = document.querySelectorAll('a, button');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleMouseOverLink, { passive: true });
        link.addEventListener('mouseleave', handleMouseOutLink, { passive: true });
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        links.forEach((link) => {
          link.removeEventListener('mouseenter', handleMouseOverLink);
          link.removeEventListener('mouseleave', handleMouseOutLink);
        });
      };
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const sharePortfolio = async () => {
    const url = window.location.origin;
    try {
      await navigator.clipboard.writeText(url);
      alert('Portfolio link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy. Please try again.');
    }
  };

  const handleResumeDownload = () => {
    const resumeUrl = '/assets/Sujith_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sujith_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const skillCardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 16px rgba(59,130,246,0.2)',
      transition: { duration: 0.3 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const skills = [
    { name: 'React', icon: <FaLaptopCode />, level: 90 },
    { name: 'Node.js', icon: <FaLaptopCode />, level: 85 },
    { name: 'TypeScript', icon: <FaLaptopCode />, level: 80 },
    { name: 'AWS', icon: <FaRocket />, level: 75 },
    { name: 'MongoDB', icon: <FaLaptopCode />, level: 85 },
    { name: 'React Native', icon: <FaLaptopCode />, level: 70 },
    { name: 'Tailwind CSS', icon: <FaLaptopCode />, level: 90 },
    { name: 'Express', icon: <FaLaptopCode />, level: 80 },
    { name: 'Flutter', icon: <FaLaptopCode />, level: 70 },
    { name: 'Docker', icon: <FaLaptopCode />, level: 75 },
  ];

  const projects = [
    {
      title: 'Started B.Tech in Information Technology',
      description: 'Began my academic journey at Kongu Engineering College, focusing on software development and IT principles.',
      icon: <FaGraduationCap className="text-xl text-blue-400" />,
      year: '2022',
    },
    {
      title: 'Alumni Portal',
      description: 'Developed a MERN stack platform to connect alumni, recognized for its impact at Kongu Engineering College.',
      icon: <FaProjectDiagram className="text-xl text-blue-400" />,
      year: '2023',
    },
    {
      title: 'Freelance Developer',
      description: 'Contributed to projects like FCC Virtual Garage, enhancing full-stack development expertise.',
      icon: <FaLaptopCode className="text-xl text-blue-400" />,
      year: '2024',
    },
    {
      title: 'KEC-STUDY-HUB Mobile App',
      description: 'Built a study hub app during a 24-hour hackathon at CSD department, Kongu Engineering College.',
      icon: <FaRocket className="text-xl text-blue-400" />,
      year: '2025',
    },
    {
      title: 'Open Source Contributions',
      description: 'Actively contributed to multiple open-source projects on GitHub, enhancing community-driven software.',
      icon: <FaGithub className="text-xl text-blue-400" />,
      year: '2025',
    },
  ];

  const achievements = [
    {
      title: '1st Place, Hacknovate\'25',
      description: 'Secured 1st place in a 24-hour hackathon at Kongu Engineering College for KEC-STUDY-HUB (2025).',
      icon: <FaTrophy className="text-xl text-yellow-400" />,
    },
    {
      title: '2nd Place, Hackathon at GCE',
      description: 'Achieved 2nd place in a hackathon at Government College of Engineering, Erode (2024).',
      icon: <FaTrophy className="text-xl text-yellow-400" />,
    },
    {
      title: 'Runner-up, Samhita-24',
      description: 'Earned runner-up position in the National Level Hackathon at MIT, Chennai (2024).',
      icon: <FaTrophy className="text-xl text-yellow-400" />,
    },
    {
      title: '2nd Place, DevForge\'25',
      description: 'Secured 2nd place in a 30-hour hackathon at Kongu Engineering College (2025).',
      icon: <FaTrophy className="text-xl text-yellow-400" />,
    },
  ];

  const handlePrevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.section
      id="about"
      className={`relative py-16 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: theme === 'dark' ? '#60a5fa' : '#1e40af' },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: true },
            size: { value: 2, random: true },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: 'repulse' },
              onclick: { enable: true, mode: 'push' },
            },
            modes: {
              repulse: { distance: 80, duration: 0.4 },
              push: { particles_nb: 3 },
            },
          },
          retina_detect: true,
        }}
        className="absolute inset-0 z-0"
      />
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block fixed w-6 h-6 rounded-full bg-blue-500/40 shadow-[0_0_15px_5px_rgba(59,130,246,0.5)] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl font-bold text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
          >
            About Me
          </motion.h2>
          <TypeAnimation
            sequence={['Full Stack Developer', 1000, 'Innovator', 1000, 'Problem Solver', 1000]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className={`mt-3 text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            variants={imageVariants}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-1 space-y-4"
          >
            <div
              className={`relative rounded-lg overflow-hidden bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30' : 'bg-white/20 border-gray-200/30'} shadow-lg hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] transition-shadow duration-300`}
            >
              <img
                src="/assets/image/sujith.jpeg"
                alt="Sujith, Full Stack Developer"
                className="w-full h-[280px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-center">
              <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Sujith</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Full Stack Developer</p>
            </div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center"
            >
              {[
                {
                  url: 'https://github.com/sujith-26',
                  icon: <FaGithub className="text-lg" />,
                  label: 'GitHub',
                },
                {
                  url: 'https://www.linkedin.com/in/sujith-g-33a390259',
                  icon: <FaLinkedin className="text-lg" />,
                  label: 'LinkedIn',
                },
                {
                  url: 'https://www.instagram.com/_.sujith._26/profilecard/?igsh=MXVicjdrYXo1bGJvcg==',
                  icon: <FaInstagram className="text-lg" />,
                  label: 'Instagram',
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative group p-2 rounded-md bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30 text-gray-200 hover:bg-blue-500/20' : 'bg-white/20 border-gray-200/30 text-gray-800 hover:bg-blue-200/20'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visit Sujith's ${social.label}`}
                >
                  {social.icon}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block text-xs bg-gray-800 text-white rounded py-1 px-2">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            >
              Professional Overview
            </motion.h3>
            <motion.div
              variants={itemVariants}
              className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30' : 'bg-white/20 border-gray-200/30'} p-5 rounded-lg shadow-sm`}
            >
              <p>
                I am Sujith, a dedicated Full Stack Developer with a B.Tech in Information Technology from Kongu Engineering College. Specializing in creating robust and user-centric digital solutions, I leverage modern technologies to deliver seamless web and mobile applications.
              </p>
              <p className="mt-3">
                My expertise spans front-end and back-end development, with a focus on building scalable, efficient systems. I am passionate about embracing challenges, contributing to open-source communities, and driving innovation through code.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                onClick={handleResumeDownload}
                className={`relative group flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md text-white ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59,130,246,0.4)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download Sujith's resume"
              >
                <FaDownload className="text-sm" />
                Resume
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Download Resume
                </span>
              </motion.button>
              <motion.a
                href="#contact"
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md border ${theme === 'dark' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/20' : 'border-blue-600 text-blue-600 hover:bg-blue-600/20'}`}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact Sujith"
              >
                <FaEnvelope className="text-sm" />
                Contact
              </motion.a>
              <motion.button
                onClick={sharePortfolio}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md border ${theme === 'dark' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/20' : 'border-purple-600 text-purple-600 hover:bg-purple-600/20'}`}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236,72,153,0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share portfolio"
              >
                <FaShareAlt className="text-sm" />
                Share
              </motion.button>
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-md bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30 text-gray-200 hover:bg-gray-700/20' : 'bg-white/20 border-gray-200/30 text-gray-800 hover:bg-gray-300/20'}`}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12"
        >
          <motion.h3
            variants={itemVariants}
            className={`text-2xl font-semibold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            Technical Skills
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={skillCardVariants}
                initial="initial"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className={`relative p-4 rounded-lg bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30' : 'bg-white/20 border-gray-200/30'} shadow-sm text-center`}
              >
                <div className="flex justify-center mb-2">{skill.icon}</div>
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {skill.name}
                </h4>
                <div className={`mt-2 w-full h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12"
        >
          <motion.h3
            variants={itemVariants}
            className={`text-2xl font-semibold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            Professional Journey
          </motion.h3>
          <div className="relative mt-6 overflow-hidden">
            <div className="flex items-center justify-center">
              <motion.button
                onClick={handlePrevProject}
                className={`p-2 rounded-full bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30 text-gray-200' : 'bg-white/20 border-gray-200/30 text-gray-800'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <div className="flex-1 mx-4 max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject}
                    variants={projectVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`p-5 rounded-lg bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30' : 'bg-white/20 border-gray-200/30'} shadow-sm`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {projects[currentProject].icon}
                      <h4 className={`text-base font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                        {projects[currentProject].title}
                      </h4>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {projects[currentProject].description}
                    </p>
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {projects[currentProject].year}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.button
                onClick={handleNextProject}
                className={`p-2 rounded-full bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30 text-gray-200' : 'bg-white/20 border-gray-200/30 text-gray-800'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            <div className="flex justify-center mt-3 gap-1.5">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${index === currentProject ? (theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600') : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12"
        >
          <motion.h3
            variants={itemVariants}
            className={`text-2xl font-semibold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            Achievements
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                className={`p-4 rounded-lg bg-opacity-20 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30' : 'bg-white/20 border-gray-200/30'} shadow-sm hover:shadow-[0_8px_16px_rgba(59,130,246,0.2)] transition-shadow`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {achievement.icon}
                  <h4 className={`text-base font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                    {achievement.title}
                  </h4>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        <a href="#projects" className="text-gray-300 hover:text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]" aria-label="Scroll to next section">
          <FaChevronDown className="text-xl animate-bounce" />
        </a>
      </motion.div>
      <style>{`
        .custom-cursor {
          transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
        }
        .custom-cursor.hover {
          width: 2.5rem;
          height: 2.5rem;
          background-color: rgba(236, 72, 153, 0.5);
          box-shadow: 0 0 20px 8px rgba(236, 72, 153, 0.3);
        }
        @media (max-width: 640px) {
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default About;