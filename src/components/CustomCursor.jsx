import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const isMobile = window.innerWidth < 768

  useEffect(() => {
    if (isMobile) return
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      <div style={{
        position: 'fixed',
        left: pos.x - 4, top: pos.y - 4,
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: '#8B5CF6',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s'
      }} />
      <div style={{
        position: 'fixed',
        left: pos.x - 20, top: pos.y - 20,
        width: '40px', height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(139,92,246,0.6)',
        pointerEvents: 'none',
        zIndex: 99998,
        opacity: visible ? 1 : 0,
        transition: 'left 0.1s, top 0.1s, opacity 0.3s'
      }} />
    </>
  )
}
