import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon, FaChevronDown, FaGraduationCap, FaProjectDiagram, FaLaptopCode, FaRocket, FaDownload, FaShareAlt } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
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
    const resumeUrl = '/assets/Sujith_Resume.pdf'; // Ensure this path is correct
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sujith_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  const hexTileVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -5,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const skills = [
    { name: 'React', icon: <FaLaptopCode />, description: 'Building dynamic UIs with React and Redux.' },
    { name: 'Node.js', icon: <FaLaptopCode />, description: 'Creating scalable APIs with Express.' },
    { name: 'TypeScript', icon: <FaLaptopCode />, description: 'Enhancing code with type safety.' },
    { name: 'AWS', icon: <FaRocket />, description: 'Deploying apps with EC2, S3, Lambda.' },
    { name: 'MongoDB', icon: <FaLaptopCode />, description: 'Managing NoSQL databases.' },
    { name: 'React Native', icon: <FaLaptopCode />, description: 'Developing cross-platform mobile apps.' },
    { name: 'Tailwind CSS', icon: <FaLaptopCode />, description: 'Styling with utility-first CSS.' },
    { name: 'Express', icon: <FaLaptopCode />, description: 'Building robust backend services.' },
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Started B.Tech in Information Technology',
      description: 'Began my journey at Kongu Engineering College, diving into programming and software development.',
      icon: <FaGraduationCap className="text-2xl text-blue-400" />,
    },
    {
      year: '2023',
      title: 'First Major Project: Alumni Portal',
      description: 'Developed a MERN stack platform to connect alumni, earning recognition in college.',
      icon: <FaProjectDiagram className="text-2xl text-blue-400" />,
    },
    {
      year: '2024',
      title: 'Freelance Developer',
      description: 'Worked on projects like FCC Virtual Garage, honing full-stack skills.',
      icon: <FaLaptopCode className="text-2xl text-blue-400" />,
    },
    {
      year: '2025',
      title: 'Developed a mobile app: KEC-STUDY-HUB',
      description: 'Participated in CSD dept 24hrs Hackathon and developed a Study-Hub-App.',
      icon: <FaRocket className="text-2xl text-blue-400" />,
    },
    {
      year: '2025',
      title: 'Contributed to Open Source',
      description: 'Made significant contributions to open-source projects on GitHub.',
      icon: <FaGithub className="text-2xl text-blue-400" />,
    },
  ];

  return (
    <motion.section
      id="about"
      className={`relative py-24 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 animate-gradient" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-blue-500/50 rounded-full animate-particle top-10 left-20" />
        <div className="absolute w-3 h-3 bg-purple-500/50 rounded-full animate-particle-delayed bottom-30 right-30" />
        <div className="absolute w-2 h-2 bg-blue-400/50 rounded-full animate-particle top-50 left-80" />
      </div>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block fixed w-8 h-8 rounded-full bg-blue-500/50 shadow-[0_0_20px_5px_rgba(59,130,246,0.6)] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
          >
            About Me
          </motion.h2>
          <TypeAnimation
            sequence={['Developer', 1000, 'Innovator', 1000, 'Creator', 1000]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className={`mt-4 text-lg sm:text-xl md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={imageVariants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div
              className={`relative rounded-2xl overflow-hidden bg-opacity-30 backdrop-blur-md border ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700/50' : 'bg-white/30 border-gray-200/50'} shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow duration-300`}
            >
              <img
                src="/assets/image/sujithh.jpg"
                alt="Sujith, Full Stack Developer"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent ${theme === 'dark' ? 'from-gray-900/80' : 'from-gray-800/80'}`}
              />
              <div className="absolute bottom-6 left-6 text-gray-100">
                <p className="text-xl font-semibold">Sujith</p>
                <p className="text-sm text-gray-300">Full Stack Developer</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className={`text-2xl md:text-3xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            >
              Crafting the Future
            </motion.h3>
            <motion.div
              variants={itemVariants}
              className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
            >
              <p>
                I’m Sujith, a Full Stack Developer passionate about building seamless, innovative digital solutions. From intuitive frontends to robust backends, I turn ideas into reality.
              </p>
              <p className="mt-4">
                Driven by creativity and technical expertise, I thrive on solving challenges and delivering impactful projects.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex gap-4"
            >
              {[
                {
                  url: 'https://github.com/sujith-26',
                  icon: <FaGithub className="text-xl" />,
                  label: 'GitHub',
                },
                {
                  url: 'https://www.linkedin.com/in/sujith-g-33a390259',
                  icon: <FaLinkedin className="text-xl" />,
                  label: 'LinkedIn',
                },
                {
                  url: 'https://www.instagram.com/_.sujith._26/profilecard/?igsh=MXVicjdrYXo1bGJvcg==',
                  icon: <FaTwitter className="text-xl" />,
                  label: 'Instagram',
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative group p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 text-gray-200 hover:bg-blue-500/50' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visit Sujith's ${social.label}`}
                >
                  {social.icon}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-xs bg-gray-800 text-white rounded py-1 px-2">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={handleResumeDownload}
                className={`relative group flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-white ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download Sujith's resume"
              >
                <FaDownload className="text-sm" />
                Download Resume
                <span className="absolute left-1/2 -translate-x-1/2 -top-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Download my resume
                </span>
              </motion.button>
              <motion.a
                href="#contact"
                className={`flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg border-2 ${theme === 'dark' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/20' : 'border-blue-600 text-blue-600 hover:bg-blue-600/20'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact Sujith"
              >
                <FaEnvelope className="text-sm" />
                Let's Talk
              </motion.a>
              <motion.button
                onClick={sharePortfolio}
                className={`flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg border-2 ${theme === 'dark' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/20' : 'border-purple-600 text-purple-600 hover:bg-purple-600/20'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share portfolio"
              >
                <FaShareAlt className="text-sm" />
                Share
              </motion.button>
              <motion.button
                onClick={toggleTheme}
                className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                whileHover={{ scale: 1.05 }}
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
          className="mt-16"
        >
          <motion.h3
            variants={itemVariants}
            className={`text-2xl md:text-3xl font-semibold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            My Toolkit
          </motion.h3>
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-items-center"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={hexTileVariants}
                initial="initial"
                whileHover="hover"
                className={`relative flex flex-col items-center w-24 h-28 clip-hexagon bg-opacity-30 backdrop-blur-md border ${theme === 'dark' ? 'bg-gray-800/30 border-blue-500/50' : 'bg-white/30 border-blue-600/50'} shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow duration-300 will-change-transform`}
              >
                <div className="text-2xl mt-4 mb-2">{skill.icon}</div>
                <h4 className={`text-xs font-semibold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {skill.name}
                </h4>
                <div
                  className={`absolute inset-0 bg-gray-900/90 clip-hexagon flex items-center justify-center text-xs text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-gray-800/90'}`}
                >
                  {skill.description}
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
          className="mt-16"
        >
          <motion.h3
            variants={itemVariants}
            className={`text-2xl md:text-3xl font-semibold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            My Journey
          </motion.h3>
          <div className="relative mt-12">
            <div className={`absolute left-8 sm:left-1/2 sm:-translate-x-1/2 h-full w-1.5 ${theme === 'dark' ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-gradient-to-b from-blue-600 to-purple-600'}`} />
            {timeline.reduce((acc, event, index) => {
              const lastGroup = acc[acc.length - 1];
              if (lastGroup && lastGroup.year === event.year) {
                lastGroup.events.push({ ...event, id: `${event.year}-${index}` });
              } else {
                acc.push({ year: event.year, events: [{ ...event, id: `${event.year}-${index}` }] });
              }
              return acc;
            }, []).map((group, groupIndex) => (
              <motion.div
                key={group.year}
                variants={timelineItemVariants}
                className="flex flex-col mb-10 sm:mb-14 relative"
              >
                <div className="flex items-center">
                  <div className="w-14 sm:w-1/2 flex justify-end pr-6 sm:pr-10">
                    <p className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                      {group.year}
                    </p>
                  </div>
                  <div className="w-14 sm:w-14 flex justify-center">
                    <motion.div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${theme === 'dark' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.7)]' : 'bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </div>
                  <div className="w-0 sm:w-1/2" />
                </div>
                {group.events.map((event) => (
                  <div key={event.id} className="flex items-start mt-6">
                    <div className="w-14 sm:w-1/2" />
                    <div className="w-14 sm:w-14 flex justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`} />
                    </div>
                    <div className="w-full sm:w-1/2 pl-6 sm:pl-10">
                      <motion.div
                        variants={timelineItemVariants}
                        className={`p-5 sm:p-6 rounded-2xl bg-opacity-50 backdrop-blur-lg border ${theme === 'dark' ? 'bg-gray-800/50 border-blue-500/30' : 'bg-white/50 border-blue-600/30'} shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300`}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          {event.icon}
                          <h4 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                            {event.title}
                          </h4>
                        </div>
                        <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {event.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        <a href="#projects" className="text-gray-300 hover:text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" aria-label="Scroll to next section">
          <FaChevronDown className="text-2xl animate-bounce" />
        </a>
      </motion.div>
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-particle {
          animation: particleMove 10s ease-in-out infinite;
        }
        @keyframes particleMove {
          0% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(20px, -20px); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 0.5; }
        }
        .animate-particle-delayed {
          animation: particleMove 12s ease-in-out infinite 3s;
        }
        .custom-cursor {
          transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
        }
        .custom-cursor.hover {
          width: 3rem;
          height: 3rem;
          background-color: rgba(236, 72, 153, 0.5);
          box-shadow: 0 0 25px 10px rgba(236, 72, 153, 0.4);
        }
        .clip-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        @media (max-width: 640px) {
          .timeline-container {
            padding-left: 2rem;
          }
          .timeline-line {
            left: 2rem;
            transform: none;
          }
          .timeline-event {
            flex-direction: column;
            align-items: flex-start;
          }
          .timeline-year {
            font-size: 1.25rem;
            margin-bottom: 0.75rem;
          }
          .timeline-content {
            padding: 1rem;
          }
          .timeline-dot {
            width: 0.875rem;
            height: 0.875rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default About;