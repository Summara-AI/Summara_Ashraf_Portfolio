import React from 'react';

function Contact() {
  return (
    <section 
      id="contact" 
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
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Contact Section</h1>
        <p style={{ fontSize: '18px' }}>This is the Contact section - it should be visible!</p>
      </div>
    </section>
  );
}

export default Contact;
