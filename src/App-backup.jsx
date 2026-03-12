import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

// Normal imports - NOT lazy
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Section Divider Component
const SectionDivider = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
    margin: '0'
  }}>
    <div style={{
      width: '1px',
      height: '80px',
      background: 'linear-gradient(transparent, rgba(139,92,246,0.4))'
    }}/>
    <div style={{
      width: '6px', height: '6px',
      borderRadius: '50%',
      background: '#8B5CF6',
      boxShadow: '0 0 12px rgba(139,92,246,0.8)'
    }}/>
    <div style={{
      width: '1px',
      height: '80px', 
      background: 'linear-gradient(rgba(139,92,246,0.4), transparent)'
    }}/>
  </div>
);

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      
      setShowBackToTop(scrollTop > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative" style={{ background: '#050505' }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#050505] z-[9999] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ 
                duration: 1.2,
                scale: { type: "spring", stiffness: 100 },
                opacity: { duration: 0.8 }
              }}
              className="relative"
            >
              <motion.h1 
                className="text-[80px] font-clash-display text-[#8B5CF6] select-none mb-8"
                style={{ 
                  fontFamily: 'Clash Display, sans-serif',
                  textShadow: '0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.4)'
                }}
                animate={{
                  textShadow: [
                    '0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.4)',
                    '0 0 60px rgba(139,92,246,1), 0 0 120px rgba(139,92,246,0.6)',
                    '0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.4)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                SA
              </motion.h1>
              
              <motion.div
                className="h-0.5 rounded-full mx-auto"
                style={{
                  width: '0px',
                  background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)'
                }}
                animate={{ width: '200px' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 z-[200] bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] transition-all duration-150"
        style={{ 
          height: '2px',
          width: `${scrollProgress}%`,
          pointerEvents: 'none',
          boxShadow: '0 0 8px rgba(139,92,246,0.6)'
        }}
      />

      <CustomCursor />
      <Navbar />
      <SectionDivider />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
      <SectionDivider />
      <Footer />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-50"
            style={{
              boxShadow: '0 0 30px rgba(139,92,246,0.4)'
            }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
