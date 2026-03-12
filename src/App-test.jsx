import React, { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff' }}>
      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          fontSize: '48px'
        }}>
          SA
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <h1>Portfolio is working!</h1>
          <p>Content loaded successfully.</p>
        </div>
      )}
    </div>
  );
}

export default App;
