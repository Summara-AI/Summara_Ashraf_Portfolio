import React from 'react';

function Footer() {
  return (
    <section 
      id="footer" 
      style={{
        minHeight: '100vh',
        background: '#050505',
        color: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Footer Section</h1>
        <p style={{ fontSize: '18px' }}>This is the Footer section - it should be visible!</p>
      </div>
    </section>
  );
}

export default Footer;
