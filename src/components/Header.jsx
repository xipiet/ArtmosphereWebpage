import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Wenn oben auf der Seite, immer sichtbar
      if (currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Wenn nach oben scrollt, zeigen
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } 
      // Wenn nach unten scrollt, verstecken
      else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isVisible ? 'header--visible' : 'header--hidden'}`}>
      <div className="header-content">
        <div className="header-logo">
          <h1>ARTMOSPHERE</h1>
          <p className="header-subtitle">Immersive Art Installation</p>
        </div>
        
        <nav className="header-nav">
          <button onClick={() => scrollToSection('gallery')} className="nav-link">
            Gallery
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('process')} className="nav-link">
            Process
          </button>
          <button onClick={() => scrollToSection('howitworks')} className="nav-link">
            How It Works
          </button>
          <button onClick={() => scrollToSection('events')} className="nav-link">
            Events
          </button>
        </nav>
      </div>
      
      <div className="header-divider"></div>
    </header>
  );
};

export default Header;
