import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiInfo, FiChevronUp, FiX, FiSearch, FiSun, FiMoon, FiDownload, FiChevronDown } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TypeAnimation } from 'react-type-animation';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const projects = [
    {
      id: 1,
      title: 'Alumni Association Portal',
      description: 'A platform to connect alumni with their college for networking, events, and mentorship.',
      longDescription: 'A MERN stack application enabling alumni to create profiles, access job boards, manage events, and engage in mentorship programs. Features secure JWT authentication, interactive maps, personalized dashboards, and automated email notifications.',
      whatIDid: [
        'Designed and implemented the frontend using React and Tailwind CSS.',
        'Developed RESTful APIs with Node.js, Express, and MongoDB.',
        'Implemented JWT-based authentication and role-based access.',
        'Integrated Nodemailer for event notification emails.',
        'Built an interactive alumni map with Google Maps API.',
      ],
      images: [
        '/assets/image/alumini.jpg',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['react', 'node', 'mongodb', 'express', 'jwt', 'tailwind'],
      github: 'https://github.com/sujith-26/Alumni-Association-Portal',
      demo: '#',
      featured: true,
      category: 'web',
      date: '2023-06-15',
      timeline: [
        { date: '2023-04-01', milestone: 'Project Ideation' },
        { date: '2023-05-01', milestone: 'Development Started' },
        { date: '2023-06-15', milestone: 'Project Completed' },
      ],
    },
    {
      id: 2,
      title: 'KEC Study Hub App',
      description: 'A collaborative learning platform for students with resources, forums, and study tools.',
      longDescription: 'A React Native app for cross-platform support, offering study materials, discussion forums, real-time chat, file sharing, and a task scheduler with reminders.',
      whatIDid: [
        'Built a cross-platform app using React Native and Expo.',
        'Integrated Firebase for real-time chat and file storage.',
        'Designed a task scheduler with AsyncStorage.',
        'Created a responsive UI with NativeBase.',
        'Added push notifications for updates.',
      ],
      images: [
        '/assets/image/studyhub.jpg',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['react-native', 'firebase', 'expo', 'nativebase'],
      github: 'https://github.com/sujith-26/KEC-Study-Hub',
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
      title: 'FCC Virtual Garage',
      description: 'A consultancy project for FCC to manage virtual vehicle inventories.',
      longDescription: 'A scalable web app for real-time vehicle inventory tracking, maintenance logs, and customer interfaces, built with Next.js and MongoDB.',
      whatIDid: [
        'Developed a Next.js frontend with SSR for SEO.',
        'Integrated MongoDB with Mongoose for data modeling.',
        'Implemented real-time updates via WebSocket.',
        'Built a customer portal with Stripe payments.',
        'Ensured compliance with FCC standards.',
      ],
      images: [
        '/assets/image/car.jpg',
        'https://images.unsplash.com/photo-1581235720704-06d1018152bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['nextjs', 'mongodb', 'websocket', 'stripe'],
      github: 'https://github.com/sujith-26/FCC-Virtual-Garage',
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
      title: 'News Website',
      description: 'A dynamic news platform with real-time updates and personalized feeds.',
      longDescription: 'A news aggregation platform fetching articles via APIs, with personalized recommendations and an admin CMS, built with React and Node.js.',
      whatIDid: [
        'Built a responsive frontend with React and Tailwind CSS.',
        'Developed a Node.js backend with NewsAPI integration.',
        'Implemented a CMS with CRUD operations.',
        'Added Firebase Auth for user authentication.',
        'Designed a basic ML recommendation engine.',
      ],
      images: [
        '/assets/image/news.jpg',
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['react', 'node', 'firebase', 'tailwind'],
      github: 'https://github.com/sujith-26/News-Website',
      demo: '#',
      featured: false,
      category: 'web',
      date: '2022-11-05',
      timeline: [
        { date: '2022-09-01', milestone: 'Project Ideation' },
        { date: '2022-10-01', milestone: 'Development Started' },
        { date: '2022-11-05', milestone: 'Project Completed' },
      ],
    },
    {
      id: 6,
      title: 'Mini Project: Todo App',
      description: 'A simple todo app with task categorization and local storage.',
      longDescription: 'A lightweight app for task management, built with vanilla JavaScript and Bootstrap, featuring drag-and-drop and local storage persistence.',
      whatIDid: [
        'Designed a responsive UI with Bootstrap.',
        'Implemented task logic with vanilla JavaScript.',
        'Used local storage for persistence.',
        'Added drag-and-drop task reordering.',
      ],
      images: [
        'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1611224923851-80f91ce194d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['javascript', 'bootstrap'],
      github: 'https://github.com/sujith-26/Todo-App',
      demo: '#',
      featured: false,
      category: 'web',
      date: '2022-08-15',
      timeline: [
        { date: '2022-07-15', milestone: 'Project Ideation' },
        { date: '2022-08-01', milestone: 'Development Started' },
        { date: '2022-08-15', milestone: 'Project Completed' },
      ],
    },
    {
      id: 7,
      title: 'Mini Project: Weather App',
      description: 'A weather forecasting app with real-time data from OpenWeatherMap.',
      longDescription: 'A simple web app displaying weather data based on user location or search, built with React and custom CSS.',
      whatIDid: [
        'Developed the frontend with React and CSS.',
        'Integrated OpenWeatherMap API for weather data.',
        'Added geolocation for automatic updates.',
        'Implemented a global city search feature.',
      ],
      images: [
        '/assets/image/weather.jpg',
        'https://images.unsplash.com/photo-1561484930-998b4bd74e91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      tags: ['react', 'css', 'api'],
      github: 'https://github.com/sujith-26/Weather-App',
      demo: '#',
      featured: false,
      category: 'web',
      date: '2022-09-20',
      timeline: [
        { date: '2022-08-01', milestone: 'Project Ideation' },
        { date: '2022-09-01', milestone: 'Development Started' },
        { date: '2022-09-20', milestone: 'Project Completed' },
      ],
    },
  ];

  useEffect(() => {
    const urlFilter = searchParams.get('filter') || 'all';
    setFilter(urlFilter);
  }, [searchParams]);

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

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchParams({ filter: newFilter });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'featured' && project.featured) ||
      (['web', 'mobile'].includes(filter) && project.category === filter) ||
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
                                : theme === 'dark'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-purple-100 text-purple-700'
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
                      setSearchParams({ filter: 'all' });
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