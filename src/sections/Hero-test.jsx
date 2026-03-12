import React from 'react';

function Hero() {
  return (
    <section style={{ 
      minHeight: '100vh', 
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F8FAFC'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Hero Section Working</h1>
        <p style={{ fontSize: '18px' }}>Content is loading properly</p>
      </div>
    </section>
  );
}

export default Hero;
