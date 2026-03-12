import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import Lenis from 'lenis';
import App from './App.jsx';
import './index.css';

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  lerp: 0.08,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Connect Lenis to requestAnimationFrame loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Expose lenis to window for external access if needed
window.lenis = lenis;

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
