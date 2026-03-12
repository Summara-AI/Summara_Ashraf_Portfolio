import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  // Hide cursor on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const animationFrameRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a, .hoverable')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('button, a, .hoverable')) {
        setIsHovering(false);
      }
    };

    const updateRingPosition = () => {
      setRingPosition({
        x: position.x + (position.x - ringPosition.x) * 0.1,
        y: position.y + (position.y - ringPosition.y) * 0.1
      });
      animationFrameRef.current = requestAnimationFrame(updateRingPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);
    
    animationFrameRef.current = requestAnimationFrame(updateRingPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [position, ringPosition]);

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: ringPosition.y - 20,
          left: ringPosition.x - 20,
          width: 40,
          height: 40,
          border: '2px solid rgba(139, 92, 246, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease-out',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      
      {/* Dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: position.y - 4,
          left: position.x - 4,
          width: 8,
          height: 8,
          backgroundColor: isHovering ? '#06B6D4' : '#8B5CF6',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: isMouseDown ? 'scale(0.8)' : 'scale(1)',
          transition: 'transform 0.1s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;
