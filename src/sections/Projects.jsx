import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'CityPulse AI',
    description: 'An AI-powered city guide delivering real-time insights about cities, attractions, and local experiences. Built with intelligent recommendations and a sleek modern interface.',
    tech: ['React', 'AI/ML', 'REST APIs', 'Tailwind CSS', 'Vite'],
    live: 'https://citypulse-ai.vercel.app',
    github: 'https://github.com/Summara-AI',
    accent: '#8B5CF6'
  },
  {
    number: '02',
    title: 'Restaurant Website',
    description: 'A modern, fully responsive restaurant website with elegant UI, interactive menu showcase, smooth animations, and seamless user experience.',
    tech: ['React', 'JavaScript', 'CSS3', 'Responsive Design'],
    live: 'https://restaurant-website-seven-vert.vercel.app',
    github: 'https://github.com/Summara-AI',
    accent: '#06B6D4'
  }
]

export default function Projects() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="projects" style={{
      background: '#050505',
      padding: isMobile ? '80px 24px' : '100px 60px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{
          color: '#8B5CF6', fontSize: '13px',
          letterSpacing: '4px', textTransform: 'uppercase',
          fontFamily: 'Clash Display, sans-serif',
          fontWeight: '600', marginBottom: '16px'
        }}>// Projects</p>
        <h2 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(36px,5vw,64px)',
          fontWeight: '700', lineHeight: '1.1',
          color: '#F8FAFC', marginBottom: '16px'
        }}>
          Things I've{' '}
          <span style={{
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Built</span>
        </h2>
        <p style={{
          color: '#94A3B8', fontSize: '16px',
          fontFamily: 'Inter, sans-serif'
        }}>
          A collection of projects where design meets functionality
        </p>
      </div>

      <div ref={ref} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
        gap: isMobile ? '24px' : '32px',
        maxWidth: '1200px', margin: '0 auto'
      }}>
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(139,92,246,0.15)',
              borderRadius: '24px',
              padding: isMobile ? '24px' : '40px',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s', cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(139,92,246,0.15)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Top row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: '16px'
            }}>
              <span style={{
                fontFamily: 'Clash Display, sans-serif',
                fontSize: isMobile ? '40px' : '64px',
                color: 'rgba(139,92,246,0.15)',
                lineHeight: '1', fontWeight: '700'
              }}>{project.number}</span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={project.github}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#94A3B8',
                    textDecoration: 'none', transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#8B5CF6'
                    e.currentTarget.style.color = '#8B5CF6'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                    e.currentTarget.style.color = '#94A3B8'
                  }}
                ><Github size={16} /></a>

                <a href={project.live}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#94A3B8',
                    textDecoration: 'none', transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#06B6D4'
                    e.currentTarget.style.color = '#06B6D4'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                    e.currentTarget.style.color = '#94A3B8'
                  }}
                ><ExternalLink size={16} /></a>
              </div>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'Clash Display, sans-serif',
              fontSize: '26px', color: '#F8FAFC',
              marginBottom: '12px', fontWeight: '700'
            }}>{project.title}</h3>

            {/* Description */}
            <p style={{
              color: '#94A3B8', fontSize: '15px',
              lineHeight: '1.8', marginBottom: '24px',
              fontFamily: 'Inter, sans-serif'
            }}>{project.description}</p>

            {/* Tech pills */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              marginBottom: '24px'
            }}>
              {project.tech.map((t, j) => (
                <span key={j} style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  borderRadius: '50px', padding: '6px 14px',
                  color: '#C4B5FD', fontSize: '12px',
                  fontFamily: 'Inter, sans-serif'
                }}>{t}</span>
              ))}
            </div>

            {/* View project link */}
            <a href={project.live}
              target="_blank" rel="noopener noreferrer"
              style={{
                color: project.accent, fontSize: '13px',
                letterSpacing: '2px', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: '500',
                textDecoration: 'none', transition: 'all 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.letterSpacing = '3px'}
              onMouseLeave={e => e.currentTarget.style.letterSpacing = '2px'}
            >View Project →</a>
          </motion.div>
        ))}
      </div>

      {/* GitHub button */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p style={{
          color: '#94A3B8', fontSize: '15px',
          marginBottom: '24px', fontFamily: 'Inter, sans-serif'
        }}>More projects on way...</p>
        <a href="https://github.com/Summara-AI"
          target="_blank" rel="noopener noreferrer"
          style={{
            border: '1.5px solid rgba(139,92,246,0.4)',
            borderRadius: '50px', padding: '12px 28px',
            color: '#C4B5FD', fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none', transition: 'all 0.3s',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(139,92,246,0.1)'
            e.currentTarget.style.borderColor = '#8B5CF6'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
          }}
        ><Github size={18} /> View All on GitHub</a>
      </div>
    </section>
  )
}
