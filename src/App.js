import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { initSmoothScroll } from './utils/smoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationCertifications from './components/Edu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const smoothScrollInstance = initSmoothScroll();
    const pageTransition = () => {
      const overlay = document.createElement('div');
      overlay.classList.add('page-transition');
      document.body.appendChild(overlay);
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          overlay.remove();
          setIsLoading(false);
        }, 400);
      }, 600);
    };
    const preloadResources = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      pageTransition();
    };
    preloadResources();
    return () => {
      smoothScrollInstance.destroy();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`min-h-screen bg-dark text-light ${isLoading ? 'loading' : ''}`}
    >
      <Navbar />
      <main className="smooth-scroll-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;