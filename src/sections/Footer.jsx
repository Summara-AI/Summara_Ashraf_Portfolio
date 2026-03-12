import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Summara-AI',
      label: 'GitHub Profile'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/summara-ashraf-ai',
      label: 'LinkedIn Profile'
    },
    {
      icon: Mail,
      href: 'mailto:summaraashraf99@gmail.com',
      label: 'Email Summara'
    }
  ];

  return (
    <footer 
      className="relative bg-[#050505] py-12 sm:py-16 lg:py-20 border-t border-[rgba(139,92,246,0.15)]"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.05) 0%, transparent 60%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 sm:mb-6">
              <h3 
                className="text-3xl sm:text-4xl font-clash-display font-bold text-[#8B5CF6] cursor-pointer mb-4"
                onClick={scrollToTop}
                style={{ 
                  fontFamily: 'Clash Display, sans-serif',
                  textShadow: '0 0 20px rgba(139,92,246,0.8)'
                }}
              >
                SA
              </h3>
              <div 
                className="w-12 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)'
                }}
              />
            </div>
            
            <p 
              className="text-[#94A3B8] mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
              style={{ lineHeight: '1.8' }}
            >
              Full-stack developer passionate about creating immersive digital experiences 
              and pushing the boundaries of web development.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label.includes('Email') ? undefined : '_blank'}
                    rel={social.label.includes('Email') ? undefined : 'noopener noreferrer'}
                    aria-label={social.label}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[rgba(139,92,246,0.2)] flex items-center justify-center text-[#94A3B8] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.1)] transition-all duration-300"
                    style={{ minHeight: '44px', minWidth: '44px' }}
                  >
                    <Icon size={16} className="sm:size-20" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 
              className="text-[#F8FAFC] font-semibold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Navigation
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors duration-300 text-sm sm:text-base text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Info */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 
              className="text-[#F8FAFC] font-semibold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Contact Info
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-[#94A3B8] text-sm sm:text-base">
                  Email: 
                  <a 
                    href="mailto:summaraashraf99@gmail.com" 
                    className="text-[#8B5CF6] hover:text-[#06B6D4] transition-colors duration-300 ml-2"
                  >
                    summaraashraf99@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm sm:text-base">
                  Location: 
                  <span className="ml-2">Available Worldwide</span>
                </p>
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm sm:text-base">
                  Status: 
                  <span className="inline-flex items-center gap-2 ml-2">
                    <span 
                      className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"
                      style={{ boxShadow: '0 0 8px #22C55E' }}
                    />
                    <span className="text-[#22C55E]">Available for work</span>
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 
              className="text-[#F8FAFC] font-semibold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Let's Connect
            </h4>
            <p className="text-[#94A3B8] mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Have a project in mind or just want to chat? I'd love to hear from you!
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                boxShadow: '0 0 20px rgba(139,92,246,0.3)',
                minHeight: '44px'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 30px rgba(139,92,246,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 0 20px rgba(139,92,246,0.3)';
              }}
            >
              Get In Touch
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{ minWidth: '16px' }}
              >
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgba(139,92,246,0.15)] mt-12 sm:mt-16 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
            <motion.div 
              className="text-center sm:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-[#64748B] text-xs sm:text-sm">
                © {new Date().getFullYear()} Summara Ashraf. All rights reserved.
              </p>
            </motion.div>

            <motion.div 
              className="flex items-center gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-[#94A3B8] hover:text-[#8B5CF6] transition-colors duration-300 text-xs sm:text-sm"
              >
                <ArrowUp size={16} className="sm:size-18" />
                Back to Top
              </button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div 
            className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#8B5CF6]"
                style={{ opacity: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
