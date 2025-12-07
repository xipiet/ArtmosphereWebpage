import React, { useRef } from 'react';
import Plasma from './components/Plasma';
import Header from './components/Header';
import { Gallery, About, HowItWorks, Events } from './components/Sections';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const sectionsRef = useRef({});

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Hero Section with Plasma */}
      <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#1a1a1a' }}>
        <Plasma 
          color="#400080"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={1}
          mouseInteractive={false}
        />
        
        <Header scrollToSection={scrollToSection} />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', zIndex: 10 }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>Welcome to</h2>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #8400ff, #ff00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 1rem 0', letterSpacing: '3px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>ARTMOSPHERE</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: '1rem 0', lineHeight: 1.6, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>Immersive art installation experience where individual creativity forms a single evolving artwork.</p>
          <button onClick={() => scrollToSection('gallery')} style={{ marginTop: '2rem', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #8400ff, #ff00ff)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s ease', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>Explore Gallery</button>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{ background: '#1a1a1a', position: 'relative', zIndex: 5 }}>
        <Gallery />
        <About />
        <HowItWorks />
        <AboutUs />
        <Events />
      </div>
    </div>
  );
}

export default App;
