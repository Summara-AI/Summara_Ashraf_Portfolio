import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Github, Linkedin, Mail, Send, Loader2 } from 'lucide-react'

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const formRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isSuccess || isError) {
      const t = setTimeout(() => {
        setIsSuccess(false)
        setIsError(false)
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [isSuccess, isError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setIsSuccess(true)
      formRef.current.reset()
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(139,92,246,0.2)',
    borderRadius: '12px', color: '#F8FAFC',
    fontSize: '15px', fontFamily: 'Inter, sans-serif',
    outline: 'none', boxSizing: 'border-box',
    transition: 'all 0.3s'
  }

  const labelStyle = {
    display: 'block', color: '#94A3B8',
    fontSize: '14px', fontFamily: 'Inter, sans-serif',
    marginBottom: '8px'
  }

  return (
    <section id="contact" style={{
      background: '#050505',
      padding: isMobile ? '80px 24px' : '100px 60px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{
          color: '#8B5CF6', fontSize: '13px',
          letterSpacing: '4px', textTransform: 'uppercase',
          fontFamily: 'Clash Display, sans-serif',
          fontWeight: '600', marginBottom: '16px'
        }}>// Contact</p>
        <h2 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(36px,5vw,64px)',
          fontWeight: '700', lineHeight: '1.1',
          color: '#F8FAFC', marginBottom: '16px'
        }}>
          Let's Work{' '}
          <span style={{
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Together</span>
        </h2>
        <p style={{
          color: '#94A3B8', fontSize: '16px',
          maxWidth: '500px', margin: '0 auto',
          fontFamily: 'Inter, sans-serif', lineHeight: '1.8'
        }}>
          Have a project in mind? I'd love to hear about it.
          Let's create something amazing together.
        </p>
      </div>

      <div ref={ref} style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '40px' : '60px',
        maxWidth: '1100px', margin: '0 auto'
      }}>
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ flex: '1.5' }}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Your Name</label>
              <input name="user_name" type="text" required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Your Email</label>
              <input name="user_email" type="email" required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Subject</label>
              <input name="subject" type="text" required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Message</label>
              <textarea name="message" rows={5} required
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
            </div>
            <button type="submit" disabled={isLoading}
              style={{
                width: '100%', height: '56px',
                background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                border: 'none', borderRadius: '12px',
                color: 'white', fontSize: '16px',
                fontFamily: 'Inter, sans-serif', fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px',
                opacity: isLoading ? 0.7 : 1,
                transition: 'all 0.3s'
              }}
            >
              {isLoading
                ? <><Loader2 size={18}
                    style={{ animation: 'spin 1s linear infinite' }}
                  /> Sending...</>
                : <><Send size={18} /> Send Message</>
              }
            </button>
          </form>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {[
            { icon: <Mail size={20}/>, label: 'Email', value: 'summaraashraf99@gmail.com', href: 'mailto:summaraashraf99@gmail.com' },
            { icon: <Github size={20}/>, label: 'GitHub', value: 'github.com/Summara-AI', href: 'https://github.com/Summara-AI' },
            { icon: <Linkedin size={20}/>, label: 'LinkedIn', value: 'linkedin.com/in/summara-ashraf-ai', href: 'https://linkedin.com/in/summara-ashraf-ai' }
          ].map((item, i) => (
            <a key={i} href={item.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: '16px', padding: '24px',
                display: 'flex', alignItems: 'center', gap: '16px',
                textDecoration: 'none', transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ color: '#8B5CF6' }}>{item.icon}</div>
              <div>
                <p style={{
                  color: '#94A3B8', fontSize: '12px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '4px'
                }}>{item.label}</p>
                <p style={{
                  color: '#F8FAFC', fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}>{item.value}</p>
              </div>
            </a>
          ))}

          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '8px', marginTop: '8px'
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#22C55E', boxShadow: '0 0 8px #22C55E'
            }} />
            <span style={{
              color: '#94A3B8', fontSize: '14px',
              fontFamily: 'Inter, sans-serif'
            }}>Available for freelance projects</span>
          </div>
          <p style={{
            color: 'rgba(148,163,184,0.5)', fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          }}>Usually responds within 24 hours</p>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {(isSuccess || isError) && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '16px' : '32px',
              right: isMobile ? '16px' : '32px',
              left: isMobile ? '16px' : 'auto',
              background: isSuccess
                ? 'rgba(34,197,94,0.15)'
                : 'rgba(239,68,68,0.15)',
              border: `1px solid ${isSuccess ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
              borderRadius: '12px', padding: '16px 24px',
              color: isSuccess ? '#4ADE80' : '#F87171',
              fontSize: '15px', fontFamily: 'Inter, sans-serif',
              zIndex: 9999
            }}
          >
            {isSuccess
              ? '✅ Message sent! I\'ll reply soon 🚀'
              : '❌ Something went wrong. Try emailing directly.'}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
