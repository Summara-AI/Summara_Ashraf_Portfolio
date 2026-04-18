import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

function HeroScene() {
  const meshRef = useRef()
  const torusRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x += 0.001
    }
    if (torusRef.current) {
      torusRef.current.rotation.y -= 0.005
      torusRef.current.rotation.z += 0.002
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#8B5CF6" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#06B6D4" intensity={1} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#8B5CF6" wireframe
          emissive="#8B5CF6" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={torusRef}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#06B6D4"
          emissive="#06B6D4" emissiveIntensity={0.5} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [text, setText] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const titles = [
    'Software Engineer',
    'Full Stack Developer'
    
    
  ]

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const current = titles[titleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, charIndex + 1))
        setCharIndex(c => c + 1)
        if (charIndex === current.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setText(current.substring(0, charIndex - 1))
        setCharIndex(c => c - 1)
        if (charIndex === 0) {
          setIsDeleting(false)
          setTitleIndex(i => (i + 1) % titles.length)
        }
      }
    }, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, titleIndex])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 500)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '100px 24px 40px' : '120px 60px 60px',
      position: 'relative',
      overflow: 'hidden',
      gap: '40px'
    }}>

      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none'
      }} />

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          flex: 1, width: '100%',
          maxWidth: isMobile ? '100%' : '55%',
          zIndex: 10, position: 'relative',
          textAlign: isMobile ? 'center' : 'left',
          order: isMobile ? 2 : 1
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          justifyContent: isMobile ? 'center' : 'flex-start',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#22C55E', boxShadow: '0 0 10px #22C55E'
          }} />
          <span style={{
            color: '#94A3B8', fontSize: '12px',
            letterSpacing: '2px', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif'
          }}>Available for Freelance</span>
        </div>

        <h1 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: isMobile ? 'clamp(36px,10vw,56px)' : 'clamp(48px,6vw,80px)',
          fontWeight: '700', lineHeight: '1.1',
          color: '#F8FAFC', marginBottom: '8px'
        }}>Hi, I'm</h1>

        <h1 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: isMobile ? 'clamp(36px,10vw,56px)' : 'clamp(48px,6vw,80px)',
          fontWeight: '700', lineHeight: '1.1',
          background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', marginBottom: '20px'
        }}>Summara Ashraf</h1>

        <div style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: isMobile ? 'clamp(16px,5vw,22px)' : 'clamp(20px,3vw,32px)',
          color: '#8B5CF6', marginBottom: '20px', minHeight: '36px'
        }}>
          {text}<span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </div>

        <p style={{
          color: '#94A3B8',
          fontSize: isMobile ? '14px' : '16px',
          lineHeight: '1.8', fontFamily: 'Inter, sans-serif',
          maxWidth: isMobile ? '100%' : '480px',
          margin: isMobile ? '0 auto 32px' : '0 0 32px'
        }}>
          I build immersive digital experiences with React, Node.js & MongoDB.
          Turning bold ideas into reality, one line of code at a time.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '12px', marginBottom: '28px',
          alignItems: isMobile ? 'center' : 'flex-start'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('projects')}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
              border: 'none', borderRadius: '50px',
              padding: '14px 32px', color: 'white',
              fontSize: '15px', fontFamily: 'Inter, sans-serif',
              fontWeight: '500', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              boxShadow: '0 0 30px rgba(139,92,246,0.4)',
              width: isMobile ? '100%' : 'auto'
            }}
          >View My Work <ArrowRight size={16} /></motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('contact')}
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(139,92,246,0.6)',
              borderRadius: '50px', padding: '14px 32px',
              color: '#F8FAFC', fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500', cursor: 'pointer',
              width: isMobile ? '100%' : 'auto'
            }}
          >Let's Talk</motion.button>
        </div>

        <div style={{
          display: 'flex', gap: '12px',
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}>
          {[
            { icon: <Github size={18} />, href: 'https://github.com/Summara-AI' },
            { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/summara-ashraf-ai' },
            { icon: <Mail size={18} />, href: 'mailto:summaraashraf99@gmail.com' }
          ].map((s, i) => (
            <motion.a key={i} href={s.href}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#94A3B8',
                textDecoration: 'none'
              }}
            >{s.icon}</motion.a>
          ))}
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          flex: 1, width: '100%',
          maxWidth: isMobile ? '100%' : '45%',
          height: isMobile ? '260px' : '500px',
          pointerEvents: 'none',
          order: isMobile ? 1 : 2
        }}
      >
        <Canvas camera={{ position: [0, 0, 5] }}
          style={{ width: '100%', height: '100%' }}>
          <HeroScene />
        </Canvas>
      </motion.div>
    </section>
  )
}
