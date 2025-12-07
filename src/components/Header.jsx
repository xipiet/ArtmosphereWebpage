import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../logo.png';

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
          <img src={logo} alt="Artmosphere Logo" className="header-logo-image" />
        </div>
        
        <nav className="header-nav">
          <button onClick={() => scrollToSection('gallery')} className="nav-link">
            Gallery
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('about-us')} className="nav-link">
            About Us
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
