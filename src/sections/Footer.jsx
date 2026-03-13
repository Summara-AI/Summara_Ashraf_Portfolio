import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      background: 'rgba(255,255,255,0.01)',
      borderTop: '1px solid rgba(139,92,246,0.15)',
      padding: isMobile ? '40px 24px 24px' : '60px 60px 32px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '40px',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: 'Clash Display, sans-serif',
            fontSize: '22px', color: '#F8FAFC',
            fontWeight: '700', marginBottom: '4px'
          }}>Summara Ashraf</p>
          <p style={{
            color: '#94A3B8', fontSize: '13px',
            fontFamily: 'Inter, sans-serif'
          }}>Full Stack Developer · Vibe Coder</p>
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '6px', marginTop: '8px',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#22C55E', boxShadow: '0 0 6px #22C55E'
            }} />
            <span style={{
              color: '#94A3B8', fontSize: '12px',
              fontFamily: 'Inter, sans-serif'
            }}>Available for freelance</span>
          </div>
        </div>

        {/* Nav */}
        <div style={{
          display: 'flex', gap: '32px', flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['about','projects','contact'].map(id => (
            <button key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none',
                color: '#94A3B8', fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer', transition: 'color 0.3s',
                textTransform: 'capitalize'
              }}
              onMouseEnter={e => e.target.style.color = '#F8FAFC'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}
            >{id}</button>
          ))}
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { icon: <Github size={18}/>, href: 'https://github.com/Summara-AI' },
            { icon: <Linkedin size={18}/>, href: 'https://linkedin.com/in/summara-ashraf-ai' },
            { icon: <Mail size={18}/>, href: 'mailto:summaraashraf99@gmail.com' }
          ].map((s, i) => (
            <a key={i} href={s.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#94A3B8',
                textDecoration: 'none', transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#8B5CF6'
                e.currentTarget.style.color = '#8B5CF6'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#94A3B8'
              }}
            >{s.icon}</a>
          ))}
        </div>
      </div>

      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
        marginBottom: '24px'
      }} />

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px', textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(148,163,184,0.5)', fontSize: '13px',
          fontFamily: 'Inter, sans-serif'
        }}>© 2025 Summara Ashraf. All rights reserved.</p>
        <p style={{
          color: 'rgba(148,163,184,0.5)', fontSize: '13px',
          fontFamily: 'Inter, sans-serif'
        }}>Built with React · Three.js · Framer Motion ⚡</p>
      </div>
    </footer>
  )
}
