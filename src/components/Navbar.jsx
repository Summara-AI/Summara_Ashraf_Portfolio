import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: scrolled
            ? 'rgba(5,5,5,0.95)'
            : 'rgba(5,5,5,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(139,92,246,0.15)',
          padding: '0 40px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo */}
        <div style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: '28px', fontWeight: '700',
          color: '#8B5CF6',
          filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 8px #22C55E'
          }} />
          SA
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '40px' }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none', border: 'none',
                  color: '#94A3B8', fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  padding: '4px 0'
                }}
                onMouseEnter={e => e.target.style.color = '#F8FAFC'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none', border: 'none',
              color: '#F8FAFC', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              zIndex: 1001
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0,
              width: '100vw', height: '100vh',
              background: 'rgba(5,5,5,0.98)',
              zIndex: 999,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '40px'
            }}
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none', border: 'none',
                  color: '#F8FAFC', fontSize: '32px',
                  fontFamily: 'Clash Display, sans-serif',
                  fontWeight: '700', cursor: 'pointer'
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
