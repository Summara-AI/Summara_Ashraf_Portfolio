import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

function HeroScene() {
  const meshRef = useRef()
  const torusRef = useRef()
  
  useFrame((state) => {
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
        <meshStandardMaterial 
          color="#8B5CF6" 
          wireframe={true}
          emissive="#8B5CF6"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={torusRef}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.5}
        />
      </mesh>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={false}
      />
    </>
  )
}

export default function Hero() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const titles = [
    'Full Stack Developer',
    'MERN Stack Developer', 
    'React Developer',
    'Node.js Developer',
    'Vibe Coder ✨'
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = titles[index]
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
          setIndex(i => (i + 1) % titles.length)
        }
      }
    }, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, index])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(c => !c)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 60px 60px',
      position: 'relative',
      overflow: 'hidden',
      gap: '40px'
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '30%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      {/* LEFT COLUMN */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          flex: 1,
          maxWidth: '55%',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Available badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 10px #22C55E',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{
            color: '#94A3B8',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif'
          }}>
            Available for Freelance
          </span>
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: '700',
          lineHeight: '1.1',
          marginBottom: '16px',
          color: '#F8FAFC'
        }}>
          Hi, I'm
        </h1>
        <h1 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: '700',
          lineHeight: '1.1',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Summara Ashraf
        </h1>

        {/* Typewriter */}
        <div style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(20px, 3vw, 32px)',
          color: '#8B5CF6',
          marginBottom: '24px',
          minHeight: '40px'
        }}>
          {text}
          <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </div>

        {/* Description */}
        <p style={{
          color: '#94A3B8',
          fontSize: '16px',
          lineHeight: '1.8',
          maxWidth: '480px',
          marginBottom: '40px',
          fontFamily: 'Inter, sans-serif'
        }}>
          I build immersive digital experiences with React, Node.js & MongoDB. 
          Turning bold ideas into reality, one line of code at a time.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('projects')}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
              border: 'none',
              borderRadius: '50px',
              padding: '14px 32px',
              color: 'white',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 0 30px rgba(139,92,246,0.4)'
            }}
          >
            View My Work <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(139,92,246,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('contact')}
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(139,92,246,0.6)',
              borderRadius: '50px',
              padding: '14px 32px',
              color: '#F8FAFC',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Let's Talk
          </motion.button>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { icon: <Github size={18} />, href: 'https://github.com/Summara-AI' },
            { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/summara-ashraf-ai' },
            { icon: <Mail size={18} />, href: 'mailto:summaraashraf99@gmail.com' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, borderColor: '#8B5CF6', color: '#8B5CF6' }}
              style={{
                width: '44px', height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* RIGHT COLUMN - 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          flex: 1,
          maxWidth: '45%',
          height: '500px',
          pointerEvents: 'none'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5] }}
          style={{ width: '100%', height: '100%' }}
        >
          <HeroScene />
        </Canvas>
      </motion.div>

    </section>
  )
}
