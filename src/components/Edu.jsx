import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiX, 
  FiShare2, 
  FiInfo, 
  FiCheckCircle, 
  FiTwitter, 
  FiLinkedin, 
  FiSun, 
  FiMoon, 
  FiChevronUp,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiBook,
  FiBriefcase,
  FiStar,
  FiTrendingUp,
  FiDownload,
  FiExternalLink,
  FiUser,
  FiBookmark
} from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Edu = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [expandedEdu, setExpandedEdu] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const modalRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    },
  };

  const education = [
    {
      id: 1,
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'Royal International Senior Secondary School',
      location: 'Komarapalayam',
      duration: '2019-2020',
      grade: '77.4%',
      description: 'Strong foundation in core subjects with focus on Mathematics and Science',
      category: 'school',
      details: 'Focused on core subjects including Mathematics, Science, and English. Participated in extracurricular activities like debates and science fairs. Developed strong analytical and problem-solving skills.',
      achievements: [
        'Participated in district-level science fair',
        'Active member of debate club',
        'Secured distinction in Mathematics'
      ],
      icon: FiBook,
      color: 'from-green-400 to-blue-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      id: 2,
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Royal International Senior Secondary School',
      location: 'Komarapalayam',
      duration: '2021-2022',
      grade: '86.4%',
      description: 'Computer Science stream with advanced programming concepts',
      category: 'school',
      details: 'Specialized in Computer Science stream with electives in Physics and Chemistry. Led a school project on web development basics. Gained foundational knowledge in programming and software development.',
      achievements: [
        'Led web development project team',
        'Excellence in Computer Science',
        'School topper in Programming'
      ],
      icon: FiBookmark,
      color: 'from-blue-400 to-purple-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 3,
      degree: 'B.Tech Information Technology',
      institution: 'Kongu Engineering College',
      location: 'Perundurai',
      duration: '2022-2026',
      grade: 'CGPA: 7.82',
      description: 'Pursuing advanced studies in IT with focus on Full Stack Development',
      category: 'college',
      details: 'Currently studying advanced topics like Data Structures, Algorithms, and Full Stack Development. Actively contributing to open-source projects and participating in hackathons. Specializing in modern web technologies.',
      achievements: [
        'Multiple hackathon participations',
        'Open-source contributions',
        'Technical project leadership',
        'Dean\'s list recognition'
      ],
      icon: FiUser,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      isOngoing: true
    },
  ];

  const certificates = [
    {
      id: 1,
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Comprehensive training in AWS Cloud fundamentals, covering cloud concepts, security, and core AWS services with hands-on experience.',
      link: 'https://skillbuilder.aws/',
      credentialId: 'AWS-CCP-2023-001',
      logo: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png',
      images: [
        'https://images.unsplash.com/photo-1611162617210-7d673bf0f2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      verified: true,
      date: '2023-04-10',
      expiryDate: '2026-04-10',
      skills: ['AWS Services', 'Cloud Computing', 'Security', 'Pricing Models'],
      level: 'Foundation',
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    },
    {
      id: 2,
      name: 'Oracle Database SQL Certified Associate',
      issuer: 'Oracle Corporation',
      description: 'Advanced certification in Oracle SQL fundamentals, including complex querying, database management, and performance optimization techniques.',
      link: 'https://education.oracle.com',
      credentialId: 'OCA-SQL-2023-002',
      logo: 'https://education.oracle.com/file/general/Oracle-Certification-Badge_Associate.png',
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      verified: true,
      date: '2023-07-15',
      expiryDate: 'No Expiry',
      skills: ['SQL Queries', 'Database Design', 'Performance Tuning', 'Data Management'],
      level: 'Associate',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    },
    {
      id: 3,
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      description: 'Professional-level certification demonstrating expertise in developing scalable and reliable applications using Google Cloud technologies.',
      link: 'https://cloud.google.com/certification',
      credentialId: 'GCP-PD-2024-003',
      logo: 'https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png',
      images: [
        'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      verified: true,
      date: '2024-02-20',
      expiryDate: '2026-02-20',
      skills: ['Cloud Development', 'Microservices', 'DevOps', 'Scalable Architecture'],
      level: 'Professional',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const filteredEducation = education.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch =
      !searchQuery ||
      item.degree.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      !searchQuery ||
      cert.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesSearch;
  });

  const handleCertDetails = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) closeModal();
    },
    [showModal]
  );

  const shareCert = async (cert, platform = 'clipboard') => {
    const url = cert.link;
    const text = `Check out my ${cert.name} certification from ${cert.issuer}! ${url}`;
    try {
      if (platform === 'clipboard') {
        await navigator.clipboard.writeText(url);
        alert('Certificate link copied to clipboard!');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      } else if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      }
    } catch (err) {
      console.error('Failed to share:', err);
      alert('Failed to share. Please try again.');
    }
  };

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
    <>
      <section
        id="education"
        className={`py-16 min-h-screen ${
          theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${
                  theme === 'dark' ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-600'
                }`}>
                  <FiBook className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === 'dark' ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-600'
                } mb-4`}
              >
                Education & Certifications
              </h2>
              <p
                className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                My academic journey and professional certifications that shape my expertise in technology and innovation.
              </p>
              <div className={`w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r ${
                theme === 'dark' ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-600'
              }`}></div>
            </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 justify-center items-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                placeholder="Search education/certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 bg-opacity-30 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-gray-200 border-gray-300 text-gray-800'
                }`}
                aria-label="Search education and certifications"
              />
              <FiSearch
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'School', value: 'school' },
                { label: 'College', value: 'college' },
              ].map((btn) => (
                <motion.button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    filter === btn.value
                      ? theme === 'dark'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={filter === btn.value}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </motion.button>
          </motion.div>

          {/* Education Section */}
          {loading && (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg h-32 animate-pulse"></div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key={filter + searchQuery}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className={`text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <FiBook className="text-blue-400" />
                  Educational Journey
                </h3>
                {filteredEducation.length > 0 ? (
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                      theme === 'dark' ? 'bg-gradient-to-b from-blue-400 to-purple-500' : 'bg-gradient-to-b from-blue-600 to-purple-600'
                    }`}></div>
                    
                    <div className="space-y-8">
                      {filteredEducation.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="relative pl-20"
                          >
                            {/* Timeline Node */}
                            <div className={`absolute left-6 top-6 w-6 h-6 rounded-full border-4 ${
                              theme === 'dark' ? 'border-gray-900 bg-blue-400' : 'border-white bg-blue-600'
                            } flex items-center justify-center`}>
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            
                            {/* Education Card */}
                            <motion.div
                              className={`glass-morphism rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                                item.bgColor
                              } ${item.borderColor} border group hover:scale-[1.02]`}
                              whileHover={{ y: -5 }}
                            >
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                                      <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                      <h4 className={`text-lg font-bold ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                      }`}>
                                        {item.degree}
                                      </h4>
                                      <div className="flex items-center gap-2 text-sm text-blue-400">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{item.institution}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                        <FiCalendar className="w-4 h-4" />
                                        <span>{item.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  {item.isOngoing && (
                                    <div className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-semibold rounded-full">
                                      Ongoing
                                    </div>
                                  )}
                                </div>

                                <div className="mb-4">
                                  <div className={`text-2xl font-bold mb-2 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {item.grade}
                                  </div>
                                  <p className={`text-sm ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                  }`}>
                                    {item.description}
                                  </p>
                                </div>

                                <button
                                  onClick={() => setExpandedEdu(expandedEdu === item.id ? null : item.id)}
                                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                                    theme === 'dark' 
                                      ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 hover:text-blue-300' 
                                      : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                                  }`}
                                >
                                  <FiInfo className="w-4 h-4" />
                                  {expandedEdu === item.id ? 'Hide Details' : 'Show Details'}
                                </button>

                                <AnimatePresence>
                                  {expandedEdu === item.id && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className={`mt-4 p-4 rounded-lg ${
                                        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                                      }`}
                                    >
                                      <div className="mb-4">
                                        <h5 className={`font-semibold mb-2 ${
                                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                          Details
                                        </h5>
                                        <p className={`text-sm leading-relaxed ${
                                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                          {item.details}
                                        </p>
                                      </div>
                                      
                                      <div>
                                        <h5 className={`font-semibold mb-3 flex items-center gap-2 ${
                                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                          <FiAward className="w-4 h-4 text-yellow-500" />
                                          Key Achievements
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                          {item.achievements.map((achievement, i) => (
                                            <div
                                              key={i}
                                              className={`flex items-center gap-2 text-sm ${
                                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                              }`}
                                            >
                                              <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                              <span>{achievement}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    className="text-center py-10"
                    variants={itemVariants}
                  >
                    <p className="text-gray-300">No education entries found.</p>
                    <button
                      onClick={() => {
                        setFilter('all');
                        setSearchQuery('');
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Show All
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Certifications Section */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className={`rounded-lg h-64 animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key={searchQuery}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className={`text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <FiAward className="text-yellow-400" />
                  Professional Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                      <motion.div
                        key={cert.id}
                        variants={itemVariants}
                        className={`relative glass-morphism rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                          cert.bgColor
                        } ${cert.borderColor} border group hover:scale-[1.02]`}
                        whileHover={{ y: -8 }}
                      >
                        {/* Verified Badge */}
                        {cert.verified && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                              <FiCheckCircle className="w-3 h-3" />
                              Verified
                            </div>
                          </div>
                        )}

                        {/* Level Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${cert.color} text-white`}>
                            {cert.level}
                          </div>
                        </div>

                        <div className="p-6 pt-16">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <img
                                src={cert.logo}
                                alt={`${cert.issuer} logo`}
                                className="w-16 h-16 rounded-xl object-contain bg-white p-2 shadow-lg"
                                loading="lazy"
                              />
                              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center`}>
                                <FiStar className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className={`text-lg font-bold mb-1 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {cert.name}
                              </h4>
                              <p className={`text-sm font-medium ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                {cert.issuer}
                              </p>
                            </div>
                          </div>

                          <p className={`text-sm leading-relaxed mb-4 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {cert.description}
                          </p>

                          {/* Skills */}
                          <div className="mb-4">
                            <h5 className={`text-xs font-semibold mb-2 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              SKILLS COVERED
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {cert.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 text-xs rounded-md ${
                                    theme === 'dark' 
                                      ? 'bg-gray-700/50 text-gray-300' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="mb-6 space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                              <FiCalendar className={`w-3 h-3 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`} />
                              <span className={`${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Issued: {new Date(cert.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FiTrendingUp className={`w-3 h-3 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`} />
                              <span className={`${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Expires: {cert.expiryDate}
                              </span>
                            </div>
                            {cert.credentialId && (
                              <div className="flex items-center gap-2 text-xs">
                                <FiBriefcase className={`w-3 h-3 ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`} />
                                <span className={`${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  ID: {cert.credentialId}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCertDetails(cert)}
                              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                theme === 'dark' 
                                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              <FiInfo className="w-4 h-4" />
                              Details
                            </button>
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 bg-gradient-to-r ${cert.color} hover:shadow-lg hover:scale-105`}
                            >
                              <FiExternalLink className="w-4 h-4" />
                              Verify
                            </a>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${cert.color} opacity-5`}></div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="col-span-full text-center py-10"
                      variants={itemVariants}
                    >
                      <p className="text-gray-300">No certifications found.</p>
                      <button
                        onClick={() => {
                          setFilter('all');
                          setSearchQuery('');
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Show All
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Certification Modal */}
      <AnimatePresence>
        {showModal && selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              className={`bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
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
                <motion.div
                  className="flex justify-between items-center mb-5"
                  variants={itemVariants}
                >
                  <h3
                    id="modal-title"
                    className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    {selectedCert.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                    }`}
                    aria-label="Close modal"
                  >
                    <FiX className="text-lg" />
                  </button>
                </motion.div>
                <motion.div
                  className="mb-5 rounded-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <Slider {...sliderSettings}>
                    {selectedCert.images.map((image, index) => (
                      <div key={index}>
                        <motion.img
                          src={image}
                          alt={`${selectedCert.name} screenshot ${index + 1}`}
                          className="w-full h-48 sm:h-64 object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </Slider>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 mb-5"
                  variants={itemVariants}
                >
                  <img
                    src={selectedCert.logo}
                    alt={`${selectedCert.issuer} logo`}
                    className="w-10 h-10 rounded-full object-contain bg-white p-1"
                  />
                  <div>
                    <h4 className={`text-base font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      {selectedCert.issuer}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedCert.verified ? 'Verified Credential' : 'Unverified'} | Issued: {new Date(selectedCert.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="mb-5"
                  variants={itemVariants}
                >
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedCert.description}
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={itemVariants}
                >
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg text-sm text-white ${
                      theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    aria-label={`View ${selectedCert.name} certificate`}
                  >
                    View Certificate
                  </a>
                  <button
                    onClick={() => shareCert(selectedCert, 'clipboard')}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    aria-label={`Copy ${selectedCert.name} certificate link`}
                  >
                    <FiShare2 className="inline mr-1" /> Share
                  </button>
                  <button
                    onClick={() => shareCert(selectedCert, 'twitter')}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                    }`}
                    aria-label={`Share ${selectedCert.name} on Twitter`}
                  >
                    <FiTwitter className="inline mr-1" /> Twitter
                  </button>
                  <button
                    onClick={() => shareCert(selectedCert, 'linkedin')}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                    }`}
                    aria-label={`Share ${selectedCert.name} on LinkedIn`}
                  >
                    <FiLinkedin className="inline mr-1" /> LinkedIn
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Edu;