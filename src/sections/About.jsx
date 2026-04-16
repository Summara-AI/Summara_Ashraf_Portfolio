import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Github, Linkedin, Mail } from 'lucide-react'

function TorusScene() {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.003
    }
  })
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3,3,3]} color="#06B6D4" intensity={2} />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#06B6D4" wireframe
          emissive="#06B6D4" emissiveIntensity={0.4} />
      </mesh>
    </>
  )
}

const skills = [
  { name: 'JavaScript', level: 92 },
  { name: 'React.js', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'Tailwind CSS', level: 88 },
  { name: 'UI/UX Design', level: 75 }
]

const techStack = [
  'React','Node.js','MongoDB','Express.js','JavaScript',
  'Three.js','Tailwind CSS','Git','REST APIs','Next.js','Vite'
]

export default function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="about" style={{
      background: '#050505', padding: isMobile ? '80px 24px' : '100px 60px',
      position: 'relative'
    }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{
          color: '#8B5CF6', fontSize: '13px',
          letterSpacing: '4px', textTransform: 'uppercase',
          fontFamily: 'Clash Display, sans-serif',
          fontWeight: '600', marginBottom: '16px'
        }}>// About Me</p>
        <h2 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(36px,5vw,64px)',
          fontWeight: '700', color: '#F8FAFC',
          lineHeight: '1.1', marginBottom: '20px'
        }}>
          Crafting Digital{' '}
          <span style={{
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Experiences</span>
        </h2>
        <p style={{
          color: '#94A3B8', fontSize: '16px', lineHeight: '1.8',
          maxWidth: '550px', margin: '0 auto',
          fontFamily: 'Inter, sans-serif'
        }}>
          I'm a Full Stack MERN Developer and vibe coder passionate
          about building immersive, AI-powered web experiences.
        </p>
      </div>

      {/* Two columns */}
      <div ref={ref} style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '40px' : '60px',
        maxWidth: '1200px', margin: '0 auto'
      }}>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <p style={{
            color: '#94A3B8', fontSize: '15px',
            lineHeight: '1.9', marginBottom: '20px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Based in Pakistan, I specialize in React, Node.js, MongoDB and
            modern web technologies. My work blends technical precision with
            creative vision — from AI-powered city guides to elegant
            restaurant experiences.
          </p>
          <p style={{
            color: '#94A3B8', fontSize: '15px',
            lineHeight: '1.9', marginBottom: '32px',
            fontFamily: 'Inter, sans-serif'
          }}>
            I'm a vibe coder at heart — I believe in fast iteration,
            bold ideas, and shipping things that actually look impressive.
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '12px', marginBottom: '32px'
          }}>
            {[
              { emoji: '🚀', value: '3', label: 'Projects Built' },
              { emoji: '⚡', value: 'MERN', label: 'Stack Expert' },
              { emoji: '🎨', value: 'Vibe', label: 'Coder' },
              { emoji: '📍', value: 'PK', label: 'Based' }
            ].map((stat, i) => (
              <div key={i}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: '16px', padding: '20px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                  {stat.emoji}
                </div>
                <div style={{
                  fontFamily: 'Clash Display, sans-serif',
                  color: '#8B5CF6', fontSize: '26px',
                  fontWeight: '700'
                }}>{stat.value}</div>
                <div style={{
                  color: '#94A3B8', fontSize: '12px',
                  fontFamily: 'Inter, sans-serif'
                }}>{stat.label}</div>
              </div>
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
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#94A3B8',
                  textDecoration: 'none', transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#8B5CF6'
                  e.currentTarget.style.color = '#8B5CF6'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = '#94A3B8'
                }}
              >{s.icon}</a>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <div style={{
            height: isMobile ? '200px' : '250px',
            marginBottom: '32px'
          }}>
            <Canvas camera={{ position: [0,0,4] }}
              style={{ width: '100%', height: '100%' }}>
              <TorusScene />
            </Canvas>
          </div>

          {/* Skill bars */}
          {skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{
                  color: '#F8FAFC', fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}>{skill.name}</span>
                <span style={{
                  color: '#8B5CF6', fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}>{skill.level}%</span>
              </div>
              <div style={{
                width: '100%', height: '6px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '3px', overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
                    borderRadius: '3px'
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tech stack pills */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p style={{
          color: '#94A3B8', fontSize: '13px', letterSpacing: '3px',
          textTransform: 'uppercase', marginBottom: '24px',
          fontFamily: 'Inter, sans-serif'
        }}>Tech Stack</p>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '10px', justifyContent: 'center'
        }}>
          {techStack.map((tech, i) => (
            <span key={i}
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: '50px', padding: '8px 18px',
                color: '#C4B5FD', fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s', cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.2)'
                e.currentTarget.style.borderColor = '#8B5CF6'
                e.currentTarget.style.color = '#F8FAFC'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.08)'
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)'
                e.currentTarget.style.color = '#C4B5FD'
              }}
            >{tech}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
