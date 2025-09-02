import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiInfo, FiChevronUp, FiX, FiSearch, FiDownload, FiChevronDown } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '../contexts/ThemeContext';

const Projects = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalRef = useRef(null);
  const cursorRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Alumni Association — SIH 2024 Project',
      description: 'A cross-platform Alumni Engagement Portal to connect students, alumni, and mentors seamlessly.',
      longDescription: 'A robust platform built for SIH 2024, enabling alumni to connect with students and mentors through profiles, events, and mentorship programs. Features secure authentication, interactive dashboards, and seamless communication tools.',
      whatIDid: [
        'Developed a responsive frontend using HTML, CSS, and Bootstrap.',
        'Built backend APIs with Python and MongoDB for data management.',
        'Implemented secure user authentication and role-based access.',
        'Designed an interactive dashboard for alumni networking.',
        'Integrated features for event management and mentorship coordination.',
      ],
      images: [
        '/assets/image/alumini.jpg',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['html', 'css', 'bootstrap', 'python', 'mongodb'],
      github: 'https://github.com/sujith-26/Alumni-Association-sih',
      demo: '#',
      featured: true,
      category: 'web',
      date: '2024-08-15',
      timeline: [
        { date: '2024-06-01', milestone: 'Project Ideation' },
        { date: '2024-07-01', milestone: 'Development Started' },
        { date: '2024-08-15', milestone: 'Project Completed' },
      ],
    },
    {
      id: 2,
      title: 'KEC Study Hub App',
      description: 'A cross-platform Flutter app for students with academic resources, JDoodle IDE, and an interactive map.',
      longDescription: 'A Flutter-based mobile application designed for students, offering academic resources, an integrated JDoodle IDE for coding, an interactive KEC map, and discussion forums for collaborative learning.',
      whatIDid: [
        'Built a cross-platform app using Flutter for iOS and Android.',
        'Integrated Node.js and MongoDB for backend services.',
        'Embedded JDoodle IDE for in-app coding practice.',
        'Developed an interactive KEC map for navigation.',
        'Designed a responsive UI with Flutter widgets.',
      ],
      images: [
        '/assets/image/studyhub.jpg',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['flutter', 'node', 'mongodb'],
      github: 'https://github.com/sujith-26/kec-app',
      demo: '#',
      featured: true,
      category: 'mobile',
      date: '2023-03-10',
      timeline: [
        { date: '2023-01-15', milestone: 'Project Ideation' },
        { date: '2023-02-01', milestone: 'Development Started' },
        { date: '2023-03-10', milestone: 'Project Completed' },
      ],
    },
    {
      id: 3,
      title: 'Employee Management System',
      description: 'A system to streamline HR tasks like attendance, payroll, and performance tracking.',
      longDescription: 'A full-stack app for employee data management, featuring attendance tracking, payroll processing, and performance reviews, built with React, Node.js, and PostgreSQL.',
      whatIDid: [
        'Developed the frontend with React and Chakra UI.',
        'Built backend APIs with Node.js, Express, and Sequelize.',
        'Designed a PostgreSQL schema for employee records.',
        'Implemented OAuth 2.0 authentication.',
        'Created HR analytics dashboards with Chart.js.',
      ],
      images: [
        '/assets/image/employee.jpg',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['react', 'node', 'postgresql', 'chakra-ui', 'sequelize'],
      github: 'https://github.com/sujith-26/Employee-Management-System',
      demo: '#',
      featured: true,
      category: 'web',
      date: '2023-09-20',
      timeline: [
        { date: '2023-07-01', milestone: 'Project Ideation' },
        { date: '2023-08-01', milestone: 'Development Started' },
        { date: '2023-09-20', milestone: 'Project Completed' },
      ],
    },
    {
      id: 4,
      title: 'Friends Car Care Consultancy Portal',
      description: 'A web platform for vehicle service management, customer bookings, and admin oversight.',
      longDescription: 'A scalable web application built with React.js (Vite) and MongoDB Atlas, enabling vehicle service management, customer appointment scheduling, and admin oversight with real-time updates.',
      whatIDid: [
        'Developed a fast frontend using React.js with Vite.',
        'Integrated MongoDB Atlas with Node.js for data storage.',
        'Built APIs for customer bookings and service tracking.',
        'Designed an admin dashboard for oversight and analytics.',
        'Implemented real-time updates for appointment statuses.',
      ],
      images: [
        '/assets/image/car.jpg',
        'https://images.unsplash.com/photo-1581235720704-06d1018152bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['react', 'vite', 'mongodb', 'node'],
      github: 'https://github.com/sujith-26/6th-Sem-Project1',
      demo: '#',
      featured: true,
      category: 'web',
      date: '2024-01-12',
      timeline: [
        { date: '2023-11-01', milestone: 'Project Ideation' },
        { date: '2023-12-01', milestone: 'Development Started' },
        { date: '2024-01-12', milestone: 'Project Completed' },
      ],
    },
    {
      id: 5,
      title: 'Automated Jenkins Testing Pipeline',
      description: 'An automated testing pipeline for code commits with Jenkins, Pytest, and Streamlit.',
      longDescription: 'A CI/CD pipeline that automates testing on code commits using Jenkins, integrates Pytest for validation, and uses Streamlit for report visualization. GitHub Actions enhance workflow automation.',
      whatIDid: [
        'Configured Jenkins for automated testing on code commits.',
        'Integrated Pytest for unit and integration testing.',
        'Built a Streamlit dashboard for test report visualization.',
        'Set up GitHub Actions for workflow automation.',
        'Ensured seamless CI/CD pipeline integration.',
      ],
      images: [
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1616530940355-351fabd68c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['jenkins', 'github-actions', 'pytest', 'streamlit'],
      github: 'https://github.com/sujith-26/Jenkins-AutoTesting',
      demo: '#',
      featured: true,
      category: 'devops',
      date: '2024-05-20',
      timeline: [
        { date: '2024-03-01', milestone: 'Project Ideation' },
        { date: '2024-04-01', milestone: 'Development Started' },
        { date: '2024-05-20', milestone: 'Project Completed' },
      ],
    },
    {
      id: 6,
      title: 'Alumniconnects',
      description: 'A 30-hour hackathon project for alumni networking at DevForge\'25 by IT Association, Kongu Engineering College.',
      longDescription: 'A Flutter-based mobile app developed during the DevForge\'25 hackathon, enabling alumni networking with features like profiles, event management, and mentorship, powered by Node.js and MongoDB.',
      whatIDid: [
        'Built a cross-platform app using Flutter for rapid development.',
        'Developed backend APIs with Node.js and MongoDB.',
        'Implemented user profiles and event management features.',
        'Integrated mentorship coordination tools.',
        'Designed a responsive UI for seamless user experience.',
      ],
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['flutter', 'node', 'mongodb'],
      github: 'https://github.com/sujith-26/Alumniconnects',
      demo: '#',
      featured: true,
      category: 'mobile',
      date: '2025-02-15',
      timeline: [
        { date: '2025-02-13', milestone: 'Hackathon Ideation' },
        { date: '2025-02-14', milestone: 'Development Started' },
        { date: '2025-02-15', milestone: 'Project Completed' },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'featured' && project.featured) ||
      (['web', 'mobile', 'devops'].includes(filter) && project.category === filter) ||
      project.tags.includes(filter);
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    rest: { scale: 1, y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: '0 0 20px rgba(59,130,246,0.5)',
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95 },
  };

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) closeModal();
    },
    [showModal]
  );

  useEffect(() => {
    const handleScroll = () => {
      const rect = document.getElementById('projects')?.getBoundingClientRect();
      setShowScrollTop(rect?.top < -300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, handleEscapeKey]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: (
      <button className="slick-prev slick-arrow p-2 bg-gray-800/50 rounded-lg text-white hover:bg-blue-500">
        <FiChevronUp className="rotate-90" />
      </button>
    ),
    nextArrow: (
      <button className="slick-next slick-arrow p-2 bg-gray-800/50 rounded-lg text-white hover:bg-blue-500">
        <FiChevronUp className="-rotate-90" />
      </button>
    ),
  };

  return (
    <motion.section
      id="projects"
      className={`py-16 min-h-screen relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10" />
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-6 h-6 rounded-full bg-blue-500/40 shadow-md pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text ${
              theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}
          >
            My Projects
          </motion.h2>
          <TypeAnimation
            sequence={['Innovative Projects', 1000, 'Tech Solutions', 1000, 'Creative Builds', 1000]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className={`mt-3 text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          />
        </motion.div>

        <motion.div
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {[
              { label: `All (${projects.length})`, value: 'all' },
              { label: `Featured (${projects.filter((p) => p.featured).length})`, value: 'featured' },
              { label: `Web (${projects.filter((p) => p.category === 'web').length})`, value: 'web' },
              { label: `Mobile (${projects.filter((p) => p.category === 'mobile').length})`, value: 'mobile' },
              { label: `DevOps (${projects.filter((p) => p.category === 'devops').length})`, value: 'devops' },
            ].map((btn) => (
              <motion.button
                key={btn.value}
                onClick={() => handleFilterChange(btn.value)}
                className={`px-3 py-1 text-sm rounded ${
                  filter === btn.value
                    ? theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800/30 text-gray-200'
                    : 'bg-gray-200 text-gray-800'
                } hover:bg-blue-500/20 transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={filter === btn.value}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
          <div className="relative w-full max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-3 py-2 pl-8 bg-gray-800/30 border ${
                theme === 'dark' ? 'border-blue-500/30' : 'border-blue-600/30'
              } rounded text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
              aria-label="Search projects"
            />
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </motion.div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`rounded-lg h-[360px] animate-pulse ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={filter + searchQuery}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="group"
                  >
                    <motion.div
                      variants={cardVariants}
                      className={`bg-opacity-30 backdrop-blur-md rounded-lg overflow-hidden border h-[360px] flex flex-col ${
                        theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <motion.img
                          src={project.images[0]}
                          alt={project.title}
                          srcSet={`
                            ${project.images[0]}?w=400 400w,
                            ${project.images[0]}?w=800 800w
                          `}
                          sizes="(max-width: 640px) 400px, 800px"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-opacity-80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            theme === 'dark' ? 'from-gray-900' : 'from-gray-800'
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded text-white hover:bg-blue-500 transition-colors ${
                              theme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-800/80'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`View ${project.title} source code`}
                          >
                            <FiGithub className="text-lg" />
                          </motion.a>
                          <motion.button
                            onClick={() => handleProjectDetails(project)}
                            className={`p-2 rounded text-white hover:bg-blue-500 transition-colors ${
                              theme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-800/80'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`View ${project.title} details`}
                          >
                            <FiInfo className="text-lg" />
                          </motion.button>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              project.category === 'web'
                                ? theme === 'dark'
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : 'bg-blue-100 text-blue-700'
                                : project.category === 'mobile'
                                ? theme === 'dark'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-purple-100 text-purple-700'
                                : theme === 'dark'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3
                          className={`text-lg font-medium mb-2 group-hover:text-blue-400 transition-colors ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className={`text-sm flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              className={`px-2 py-1 text-xs rounded cursor-pointer ${
                                theme === 'dark' ? 'bg-gray-700/30 text-gray-300 hover:bg-blue-500/20' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
                              }`}
                              onClick={() => handleFilterChange(tag)}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      {project.featured && (
                        <motion.div
                          className={`absolute top-2 right-2 text-xs font-medium py-1 px-2 rounded text-white ${
                            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                          }`}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          Featured
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.div className="col-span-full text-center py-10" variants={itemVariants}>
                  <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No projects found.</p>
                  <motion.button
                    onClick={() => {
                      setFilter('all');
                      setSearchQuery('');
                    }}
                    className={`mt-4 px-4 py-2 rounded text-white ${
                      theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Show All
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={`mt-12 text-center p-6 rounded-lg bg-opacity-30 backdrop-blur-md border ${
            theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
          }`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Explore More</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-md mx-auto`}>
            Discover additional projects and contributions on my GitHub profile.
          </p>
          <motion.a
            href="https://github.com/sujith-26"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 mt-4 rounded text-white ${
              theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub className="text-base" /> Explore More on GitHub
          </motion.a>
        </motion.div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className={`fixed bottom-6 right-6 p-2 rounded text-white shadow-md ${
                theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <FiChevronUp className="text-base" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <a href="#contact" className="text-gray-300 hover:text-blue-400" aria-label="Scroll to next section">
            <FiChevronDown className="text-xl" />
          </a>
        </motion.div>

        <AnimatePresence>
          {showModal && selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                ref={modalRef}
                className={`bg-opacity-30 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border ${
                  theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
                } shadow-lg`}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="modal-title"
                tabIndex="-1"
              >
                <div className="p-6">
                  <motion.div className="flex justify-between items-center mb-4" variants={itemVariants}>
                    <h3
                      id="modal-title"
                      className={`text-xl font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      {selectedProject.title}
                    </h3>
                    <motion.button
                      onClick={closeModal}
                      className={`p-2 rounded ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close modal"
                    >
                      <FiX className="text-base" />
                    </motion.button>
                  </motion.div>
                  <motion.div className="mb-4 rounded-lg overflow-hidden" variants={itemVariants}>
                    <Slider {...sliderSettings}>
                      {selectedProject.images.map((image, index) => (
                        <div key={index}>
                          <motion.img
                            src={image}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </Slider>
                  </motion.div>
                  <motion.div className="mb-4" variants={itemVariants}>
                    <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Overview</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.longDescription}</p>
                  </motion.div>
                  <motion.div className="mb-4" variants={itemVariants}>
                    <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>What I Did</h4>
                    <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedProject.whatIDid.map((task, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className={`mt-1 ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div className="mb-4" variants={itemVariants}>
                    <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700/30 text-gray-200' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div className="mb-4" variants={itemVariants}>
                    <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Project Timeline</h4>
                    <div className="relative pl-5">
                      <div className={`absolute left-1 top-0 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-600/30'}`} />
                      {selectedProject.timeline.map((event, index) => (
                        <div key={index} className="mb-3 flex items-center">
                          <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'} mr-3`} />
                          <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{event.milestone}</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-white ${
                        theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                      } transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View ${selectedProject.title} source code`}
                    >
                      <FiGithub className="text-base" /> Source Code
                    </motion.a>
                    {selectedProject.demo !== '#' && (
                      <motion.a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded text-white ${
                          theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                        } transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`View ${selectedProject.title} live demo`}
                      >
                        <FiExternalLink className="text-base" /> Live Demo
                      </motion.a>
                    )}
                    <motion.a
                      href="/assets/Project_Summary.pdf"
                      download={`Project_Summary_${selectedProject.title.replace(/\s+/g, '_')}.pdf`}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-white ${
                        theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                      } transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Download ${selectedProject.title} summary`}
                    >
                      <FiDownload className="text-base" /> Download PDF
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 20s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  );
};

export default Projects;