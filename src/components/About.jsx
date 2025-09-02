import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaChevronDown, FaDownload, FaShareAlt, FaTrophy, FaLaptopCode, FaGraduationCap, FaProjectDiagram, FaRocket } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from './ui/Toast';
import { useEventListener } from '../hooks/useCustomHooks';
import { copyToClipboard, downloadFile, validateResumeFile } from '../utils/helpers';
import ProgressiveImage from './ui/ProgressiveImage';
import GlassCard from './ui/GlassCard';
import Button from './ui/Button';
import ThemeToggle from './ui/ThemeToggle';
import InteractiveTimeline from './ui/InteractiveTimeline';

const About = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const cursorRef = useRef(null);

  // Validate resume file on component mount
  useEffect(() => {
    const checkResume = async () => {
      const url = await validateResumeFile();
      setResumeUrl(url);
      if (!url) {
        toast.warning('Resume file not found. Please contact for the latest version.');
      }
    };
    checkResume();
  }, [toast]);

  // Enhanced mouse move handler with proper cleanup
  useEventListener('mousemove', (e) => {
    if (cursorRef.current && window.innerWidth >= 768) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  });

  // Enhanced mouse over/out handlers
  useEffect(() => {
    const handleMouseOverLink = () => cursorRef.current?.classList.add('hover');
    const handleMouseOutLink = () => cursorRef.current?.classList.remove('hover');

    if (window.innerWidth >= 768) {
      const links = document.querySelectorAll('a, button');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleMouseOverLink, { passive: true });
        link.addEventListener('mouseleave', handleMouseOutLink, { passive: true });
      });

      return () => {
        links.forEach((link) => {
          link.removeEventListener('mouseenter', handleMouseOverLink);
          link.removeEventListener('mouseleave', handleMouseOutLink);
        });
      };
    }
  }, []);

  const sharePortfolio = async () => {
    setIsSharing(true);
    const url = window.location.origin;
    const success = await copyToClipboard(url);
    
    if (success) {
      toast.success('Portfolio link copied to clipboard!', {
        title: 'Share Success'
      });
    } else {
      toast.error('Failed to copy link. Please try again.', {
        title: 'Share Failed'
      });
    }
    setIsSharing(false);
  };

  const handleResumeDownload = async () => {
    if (!resumeUrl) {
      toast.error('Resume file is not available at the moment.', {
        title: 'Download Failed'
      });
      return;
    }
    
    setIsDownloading(true);
    const success = downloadFile(resumeUrl, 'Sujith_Resume.pdf');
    
    if (success) {
      toast.success('Resume downloaded successfully!', {
        title: 'Download Complete'
      });
    } else {
      toast.error('Download failed. Please try again.', {
        title: 'Download Failed'
      });
    }
    setIsDownloading(false);
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
      id: 1,
      title: 'Started B.Tech in Information Technology',
      description: 'Began my academic journey at Kongu Engineering College, focusing on software development and IT principles.',
      details: 'Enrolled in Information Technology program with focus on full-stack development, algorithms, and modern web technologies.',
      icon: <FaGraduationCap className="text-xl text-blue-400" />,
      year: '2022',
      technologies: ['Java', 'Python', 'HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      title: 'Alumni Portal',
      description: 'Developed a MERN stack platform to connect alumni, recognized for its impact at Kongu Engineering College.',
      details: 'Built a comprehensive platform for alumni networking, job postings, and college updates using modern web technologies.',
      icon: <FaProjectDiagram className="text-xl text-blue-400" />,
      year: '2023',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Bootstrap']
    },
    {
      id: 3,
      title: 'Freelance Developer',
      description: 'Contributed to projects like FCC Virtual Garage, enhancing full-stack development expertise.',
      details: 'Worked on multiple client projects, gaining experience in project management, client communication, and diverse tech stacks.',
      icon: <FaLaptopCode className="text-xl text-blue-400" />,
      year: '2024',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
    },
    {
      id: 4,
      title: 'KEC-STUDY-HUB Mobile App',
      description: 'Built a study hub app during a 24-hour hackathon at CSD department, Kongu Engineering College.',
      details: 'Developed a comprehensive mobile app for students with integrated IDE, campus map, and discussion forums.',
      icon: <FaRocket className="text-xl text-blue-400" />,
      year: '2025',
      technologies: ['Flutter', 'Dart', 'Firebase', 'JDoodle API']
    },
    {
      id: 5,
      title: 'Open Source Contributions',
      description: 'Actively contributed to multiple open-source projects on GitHub, enhancing community-driven software.',
      details: 'Regular contributor to open-source projects, focusing on React components, documentation improvements, and bug fixes.',
      icon: <FaGithub className="text-xl text-blue-400" />,
      year: '2025',
      technologies: ['React', 'TypeScript', 'Jest', 'Storybook']
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

  return (
    <motion.section
      id="about"
      className={`relative py-16 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'}`}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-blue-400/30' : 'bg-blue-600/30'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
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
            <GlassCard className="p-0 overflow-hidden">
              <ProgressiveImage
                src="/assets/image/sujith.jpeg"
                alt="Sujith, Full Stack Developer"
                className="w-full h-[280px]"
                fallbackSrc="/assets/image/sujithh.jpg"
              />
            </GlassCard>
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
              <Button
                onClick={handleResumeDownload}
                loading={isDownloading}
                disabled={!resumeUrl}
                className="flex items-center gap-2"
                aria-label="Download Sujith's resume"
              >
                <FaDownload className="text-sm" />
                {isDownloading ? 'Downloading...' : 'Resume'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2"
                aria-label="Contact Sujith"
              >
                <FaEnvelope className="text-sm" />
                Contact
              </Button>
              
              <Button
                variant="outline"
                onClick={sharePortfolio}
                loading={isSharing}
                className="flex items-center gap-2"
                aria-label="Share portfolio"
              >
                <FaShareAlt className="text-sm" />
                {isSharing ? 'Copying...' : 'Share'}
              </Button>
              
              <ThemeToggle size="md" />
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
          <div className="mt-8">
            <InteractiveTimeline items={projects} />
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