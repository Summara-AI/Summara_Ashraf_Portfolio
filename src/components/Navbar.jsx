import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[rgba(5,5,5,0.95)] backdrop-blur-xl' 
            : 'bg-[rgba(5,5,5,0.85)] backdrop-blur-lg'
        } border-b border-[rgba(139,92,246,0.15)]`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          pointerEvents: 'all'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <h1 
                className="text-[24px] sm:text-[28px] font-clash-display text-[#8B5CF6] cursor-pointer"
                onClick={() => scrollToSection('hero')}
                style={{ 
                  textShadow: '0 0 20px rgba(139,92,246,0.8)',
                  fontFamily: 'Clash Display, sans-serif',
                  pointerEvents: 'all',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1001
                }}
              >
                SA
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.id 
                      ? 'text-[#8B5CF6]' 
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                  style={{ 
                    pointerEvents: 'all',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1001
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3B8] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-300"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              style={{ 
                minHeight: '44px', 
                minWidth: '44px',
                pointerEvents: 'all',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1001
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-[rgba(139,92,246,0.15)] bg-[rgba(5,5,5,0.98)] backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'bg-[rgba(139,92,246,0.1)] text-[#8B5CF6]'
                      : 'text-[#94A3B8] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#F8FAFC]'
                  }`}
                  style={{ 
                    pointerEvents: 'all',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1001,
                    minHeight: '44px'
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
