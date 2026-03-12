import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { TorusKnot } from '@react-three/drei'
import { Github, Linkedin, Mail } from 'lucide-react'

// 3D TorusKnot Component
function AnimatedTorusKnot() {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.003
    }
  })

  return (
    <TorusKnot 
      ref={meshRef} 
      args={[1, 0.3, 128, 16]}
    >
      <meshStandardMaterial 
        wireframe 
        color="#06B6D4" 
        emissive="#06B6D4" 
        emissiveIntensity={0.4}
      />
    </TorusKnot>
  )
}

// Skill Bar Component
function SkillBar({ skill, percentage, isInView, delay }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{ 
          color: '#F8FAFC', 
          fontSize: '14px' 
        }}>
          {skill}
        </span>
        <span style={{ 
          color: '#F8FAFC', 
          fontSize: '14px' 
        }}>
          {percentage}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
            borderRadius: '3px'
          }}
          initial={{ width: '0%' }}
          animate={{ width: isInView ? `${percentage}%` : '0%' }}
          transition={{ 
            duration: 1.5, 
            ease: 'easeOut',
            delay: delay
          }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    { skill: 'JavaScript', percentage: 92 },
    { skill: 'React.js', percentage: 90 },
    { skill: 'Node.js', percentage: 85 },
    { skill: 'MongoDB', percentage: 80 },
    { skill: 'Tailwind CSS', percentage: 88 },
    { skill: 'UI/UX Design', percentage: 75 }
  ]

  const techStack = [
    'React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 
    'Three.js', 'Tailwind CSS', 'Git', 'REST APIs', 'Next.js', 
    'Vite', 'GSAP'
  ]

  const stats = [
    { emoji: '🚀', value: '2+', label: 'Projects Built' },
    { emoji: '⚡', value: 'MERN', label: 'Stack Expert' },
    { emoji: '🎨', value: 'Vibe', label: 'Coder' },
    { emoji: '📍', value: 'PK', label: 'Based' }
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Summara-AI',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/summara-ashraf-ai',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:summaraashraf99@gmail.com',
      label: 'Email'
    }
  ]

  return (
    <section 
      id="about"
      style={{
        padding: '80px 20px',
        background: '#050505',
        position: 'relative',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        {/* SECTION LABEL + HEADING */}
        <motion.div 
          style={{ textAlign: 'center', marginBottom: '60px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Section Label */}
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
          // About Me
        </p>

        {/* Main Heading */}
        <h2 style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: '700',
          lineHeight: '1.1',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#F8FAFC'
        }}>
          Crafting Digital{' '}
          <span style={{
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Experiences
          </span>
        </h2>

        {/* Subtext */}
        <p style={{
          color: '#94A3B8',
          fontSize: '17px',
          lineHeight: '1.8',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: '80px',
          fontFamily: 'Inter, sans-serif'
        }}>
          I'm a Full Stack MERN Developer and vibe coder passionate 
          about building immersive, AI-powered web experiences.
        </p>
        </motion.div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: window.innerWidth < 768 ? '40px' : '60px',
          alignItems: 'flex-start'
        }}>
          {/* LEFT COLUMN */}
          <motion.div 
            style={{ flex: '1' }}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Bio Text */}
            <div>
              <p style={{
                color: '#94A3B8',
                fontSize: '15px',
                lineHeight: '1.9',
                marginBottom: '20px'
              }}>
                Based in Pakistan, I specialize in React, Node.js, MongoDB and modern web technologies. My work blends technical precision with creative vision — from AI-powered city guides to elegant restaurant experiences.
              </p>
              
              <p style={{
                color: '#94A3B8',
                fontSize: '15px',
                lineHeight: '1.9',
                marginBottom: '20px'
              }}>
                I'm a vibe coder at heart — I believe in fast iteration, bold ideas, and shipping things that actually look impressive. Currently building projects that push the boundaries of what the web can do.
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginTop: '32px'
            }}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(139,92,246,0.15)',
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    borderColor: 'rgba(139,92,246,0.4)',
                    background: 'rgba(139,92,246,0.05)',
                    transform: 'translateY(-4px)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {stat.emoji}
                  </div>
                  <div style={{
                    fontFamily: 'Clash Display, sans-serif',
                    color: '#8B5CF6',
                    fontSize: '26px',
                    fontWeight: 'bold'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: '#94A3B8',
                    fontSize: '12px',
                    marginTop: '4px'
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              marginTop: '32px'
            }}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{
                      borderColor: '#8B5CF6',
                      color: '#8B5CF6',
                      background: 'rgba(139,92,246,0.1)',
                      scale: 1.1
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            style={{ flex: '1' }}
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* 3D Canvas */}
            <div style={{ marginBottom: '32px' }}>
              <Canvas 
                camera={{ position: [0, 0, 4] }}
                style={{ 
                  height: window.innerWidth < 768 ? '200px' : '250px',
                  background: 'transparent'
                }}
                gl={{ 
                  antialias: false, 
                  powerPreference: "high-performance",
                  alpha: false
                }}
              >
                <ambientLight intensity={0.4} />
                <pointLight position={[3, 3, 3]} color="#06B6D4" intensity={2} />
                <AnimatedTorusKnot />
              </Canvas>
            </div>

            {/* Skill Bars */}
            <div style={{ marginTop: '24px' }}>
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.skill}
                  skill={skill.skill}
                  percentage={skill.percentage}
                  isInView={isInView}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* TECH STACK PILLS */}
        <motion.div 
          style={{ marginTop: '60px', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div style={{
            color: '#94A3B8',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Tech Stack
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  borderRadius: '50px',
                  padding: '8px 18px',
                  color: '#C4B5FD',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  background: 'rgba(139,92,246,0.2)',
                  borderColor: '#8B5CF6',
                  color: '#F8FAFC',
                  transform: 'translateY(-2px)'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
