import React from 'react';
import Plasma from './components/Plasma';
import MagicBento from './components/MagicBento';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#1a1a1a' }}>
        <Plasma 
          color="#400080"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={1}
          mouseInteractive={false}
        />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
