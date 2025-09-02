import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import { initSmoothScroll } from './utils/smoothScroll';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import ScrollProgress from './components/ui/ScrollProgress';
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

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider>
        <ToastProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`min-h-screen bg-dark text-light ${isLoading ? 'loading' : ''}`}
          >
            <ScrollProgress sections={sections} />
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
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;