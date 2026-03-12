import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// Project Card Component
function ProjectCard({ project, index, isInView }) {
  const cardRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e) => {
    if (!isTouch && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouch) setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isTouch ? 'default' : 'pointer' }}
    >
      <div 
        className="relative h-64 sm:h-72 lg:h-80 rounded-2xl border border-[rgba(139,92,246,0.15)] hover:border-[rgba(139,92,246,0.4)] hover:bg-[rgba(139,92,246,0.05)] transition-all duration-300 overflow-hidden"
        style={{ 
          background: 'rgba(255,255,255,0.02)',
          transform: !isTouch && isHovered ? 
            `perspective(1000px) rotateY(${(mousePosition.x - 50) * 0.05}deg) rotateX(${(mousePosition.y - 50) * -0.05}deg) scale3d(1.02, 1.02, 1.02)` : 
            'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Shimmer Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(139,92,246,0.1) 50%, transparent 60%)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease-out'
          }}
        />
        
        {/* Project Number */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
          <span 
            className="text-[#8B5CF6] font-clash-display font-bold"
            style={{ 
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontFamily: 'Clash Display, sans-serif',
              opacity: 0.3
            }}
          >
            {project.number}
          </span>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
          <div>
            <h3 
              className="text-[#F8FAFC] font-clash-display font-bold mb-3 sm:mb-4"
              style={{ 
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontFamily: 'Clash Display, sans-serif'
              }}
            >
              {project.title}
            </h3>
            <p 
              className="text-[#94A3B8] mb-4 sm:mb-6 leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {project.tech.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-xs font-medium"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  color: '#8B5CF6',
                  border: '1px solid rgba(139,92,246,0.2)',
                  fontSize: 'clamp(10px, 1.2vw, 12px)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3 sm:gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3B8] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.1)] transition-all duration-300"
                  style={{ minHeight: '36px', minWidth: '36px' }}
                >
                  <Github size={14} className="sm:size-16" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3B8] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.1)] transition-all duration-300"
                  style={{ minHeight: '36px', minWidth: '36px' }}
                >
                  <ExternalLink size={14} className="sm:size-16" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      number: "01",
      title: "CityPulse AI",
      description: "An AI-powered city guide delivering real-time insights about cities, attractions, and local experiences. Built with intelligent recommendations and a sleek modern interface.",
      tech: ["React", "AI/ML", "REST APIs", "Tailwind CSS", "Vite"],
      live: "https://citypulse-ai.vercel.app",
      github: "https://github.com/Summara-AI",
      accent: "#8B5CF6"
    },
    {
      number: "02",
      title: "Restaurant Website",
      description: "A modern, fully responsive restaurant website with elegant UI, interactive menu showcase, smooth animations, and seamless user experience.",
      tech: ["React", "JavaScript", "CSS3", "Responsive Design", "Animations"],
      live: "https://restaurant-website-seven-vert.vercel.app",
      github: "https://github.com/Summara-AI",
      accent: "#06B6D4"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-[#050505]"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.08) 0%, transparent 60%)',
        padding: '80px 20px'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p style={{
            color: '#8B5CF6',
            fontSize: '14px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Clash Display, sans-serif',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            // Projects
          </p>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-clash-display font-bold mb-4 sm:mb-6"
            style={{ 
              color: '#F8FAFC',
              fontFamily: 'Clash Display, sans-serif'
            }}
          >
            Featured Projects
          </h2>
          <div 
            className="w-16 sm:w-20 h-1 rounded-full mx-auto mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)'
            }}
          />
          <p style={{
  color: '#8B5CF6',
  fontSize: '14px',
  letterSpacing: '6px',
  textTransform: 'uppercase',
  fontFamily: 'Clash Display, sans-serif',
  fontWeight: '600',
  marginBottom: '20px',
  textAlign: 'center'
}}>
  // Projects
</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" style={{ marginTop: '40px' }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-[#94A3B8] mb-6 sm:mb-8 text-base sm:text-lg">
            Interested in collaborating or have a project in mind?
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
              boxShadow: '0 0 30px rgba(139,92,246,0.4)',
              minHeight: '44px'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 40px rgba(139,92,246,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 0 30px rgba(139,92,246,0.4)';
            }}
          >
            Let's Work Together
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
    </section>
  );
};

export default Projects;
