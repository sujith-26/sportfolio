import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiShare2, FiInfo, FiCheckCircle, FiTwitter, FiLinkedin, FiSun, FiMoon, FiChevronUp } from 'react-icons/fi';
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

  const education = [
    {
      id: 1,
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'Royal International Senior Secondary School, Komarapalayam',
      duration: '2019-2020',
      description: 'Percentage: 77.4%',
      category: 'school',
      details: 'Focused on core subjects including Mathematics, Science, and English. Participated in extracurricular activities like debates and science fairs.',
    },
    {
      id: 2,
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Royal International Senior Secondary School, Komarapalayam',
      duration: '2021-2022',
      description: 'Percentage: 86.4%',
      category: 'school',
      details: 'Specialized in Computer Science stream with electives in Physics and Chemistry. Led a school project on web development basics.',
    },
    {
      id: 3,
      degree: 'B.Tech Information Technology',
      institution: 'Kongu Engineering College, Perundurai',
      duration: '2022-2026',
      description: 'CGPA: 7.82 (Up to 5th Semester)',
      category: 'college',
      details: 'Studying advanced topics like Data Structures, Algorithms, and Full Stack Development. Contributed to open-source projects and hackathons.',
    },
  ];

  const certificates = [
    {
      id: 1,
      name: 'AWS Cloud Practitioner',
      issuer: 'AWS',
      description: 'Completed training in AWS Cloud fundamentals, covering cloud concepts, security, and core AWS services.',
      link: 'https://skillbuilder.aws/',
      logo: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png',
      images: [
        'https://images.unsplash.com/photo-1611162617210-7d673bf0f2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      verified: true,
      date: '2023-04-10',
    },
    {
      id: 2,
      name: 'Oracle Database SQL Certified Associate',
      issuer: 'Oracle',
      description: 'Certified in Oracle SQL fundamentals, including querying, database management, and performance tuning.',
      link: 'https://education.oracle.com',
      logo: 'https://education.oracle.com/file/general/Oracle-Certification-Badge_Associate.png',
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ],
      verified: true,
      date: '2023-07-15',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95 },
  };

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text ${
                theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}
            >
              Education & Certifications
            </h2>
            <p
              className={`text-sm sm:text-base max-w-xl mx-auto mt-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              My academic journey and professional certifications in technology.
            </p>
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
                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">Education</h3>
                {filteredEducation.length > 0 ? (
                  <div className="space-y-6">
                    {filteredEducation.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="bg-gray-800/30 p-5 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex items-start gap-3">
                          <FiCheckCircle className="text-blue-400 text-xl mt-1" />
                          <div className="flex-grow">
                            <h4 className="text-base font-semibold text-white">{item.degree}</h4>
                            <h5 className="text-sm text-blue-400">{item.institution}</h5>
                            <p className="text-sm text-gray-400">{item.duration}</p>
                            <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                            <button
                              onClick={() => setExpandedEdu(expandedEdu === item.id ? null : item.id)}
                              className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                              aria-label={
                                expandedEdu === item.id
                                  ? `Collapse details for ${item.degree}`
                                  : `Expand details for ${item.degree}`
                              }
                            >
                              {expandedEdu === item.id ? 'Hide Details' : 'Show Details'}
                            </button>
                            <AnimatePresence>
                              {expandedEdu === item.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3 bg-gray-900/50 p-3 rounded text-sm text-gray-300"
                                >
                                  {item.details}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                      <motion.div
                        key={cert.id}
                        variants={itemVariants}
                        className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50 min-h-[300px] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={cert.logo}
                              alt={`${cert.issuer} logo`}
                              className="w-10 h-10 rounded-full object-contain bg-white p-1"
                              loading="lazy"
                            />
                            <div>
                              <h4 className="text-base font-semibold text-white">{cert.name}</h4>
                              <h5 className="text-sm text-gray-400">{cert.issuer}</h5>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{cert.description}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => handleCertDetails(cert)}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              theme === 'dark' ? 'bg-gray-900 text-gray-200 hover:bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                            }`}
                            aria-label={`View details for ${cert.name}`}
                          >
                            <FiInfo className="inline mr-1" /> Details
                          </button>
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-3 py-2 rounded-lg text-sm text-white ${
                              theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            aria-label={`View ${cert.name} certificate`}
                          >
                            View
                          </a>
                        </div>
                        {cert.verified && (
                          <div className="absolute top-3 right-3 text-xs font-semibold py-1 px-2 rounded bg-blue-500 text-white">
                            Verified
                          </div>
                        )}
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