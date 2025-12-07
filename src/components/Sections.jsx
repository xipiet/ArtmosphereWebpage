import React, { useRef, useEffect, useState } from 'react';
import './Sections.css';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [
    '/pictures/Sketch-Aquarium__high-1-scaled-1600x900.jpg',
    '/pictures/teamLab-Borderless-IMG_1926-1536x1024.jpg',
    '/pictures/Screenshot 2025-12-07 115125.png',
    '/pictures/Screenshot 2025-12-07 115436.png',
    '/pictures/Screenshot 2025-12-07 120059.png'
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-main">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery ${currentIndex + 1}`}
          className="carousel-image"
        />
        <div className="carousel-overlay"></div>
      </div>
      
      <button className="carousel-button carousel-button--prev" onClick={prevSlide}>
        ◀
      </button>
      <button className="carousel-button carousel-button--next" onClick={nextSlide}>
        ▶
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'indicator--active' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              setAutoPlay(false);
            }}
          />
        ))}
      </div>

      <div className="carousel-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`page-section ${className}`}>
      <div className="section-container">
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <Section id="gallery" title="Gallery" className="gallery-section">
      <ImageCarousel />
    </Section>
  );
};

const About = () => {
  return (
    <Section id="about" title="About Artmosphere" className="about-section">
      <div className="about-content">
        <div className="about-text">
          <p>
            Artmosphere ist eine immersive Kunstinstallation, die Besucher in eine Welt aus Licht, Farbe und interaktiven Elementen entführt.
          </p>
          <p>
            <strong>Das Konzept:</strong> Eine Projektion an die Wände schafft eine sich ständig verändernde visuelle Landschaft. Besucher können mit iPads direkt in die Installation eintreten und ihre eigenen digitalen Gemälde zeichnen.
          </p>
          <p>
            Jedes gezeichnete Kunstwerk wird automatisch auf die projizierte Leinwand übertragen und wird Teil eines größeren, gemeinsam erschafften Werks. Alle Beiträge verschmelzen zu einem zusammenhängenden Bild, wo jeder Besucher sichtbar seinen Platz hat.
          </p>
          <p>
            So entsteht eine einzigartige Erfahrung: Ihr persönliches Kunstwerk wird Teil einer größeren, lebendigen Installation.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <h4>500+</h4>
            <p>Besucher pro Event</p>
          </div>
          <div className="stat">
            <h4>∞</h4>
            <p>Kunstwerke</p>
          </div>
          <div className="stat">
            <h4>1</h4>
            <p>Gemeinsames Meisterwerk</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Enter', description: 'Betreten Sie den installierten Raum mit der Live-Projektion' },
    { number: '02', title: 'Create', description: 'Nehmen Sie ein iPad und zeichnen Sie Ihr Kunstwerk' },
    { number: '03', title: 'Upload', description: 'Ihr Gemälde wird automatisch auf die Leinwand übertragen' },
    { number: '04', title: 'Together', description: 'Sehen Sie, wie Ihr Werk mit anderen verschmilzt' }
  ];

  return (
    <Section id="howitworks" title="How It Works" className="howitworks-section">
      <div className="steps-grid">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Events = () => {
  const nextEvent = {
    date: 'xx.xx.2026',
    time: '16-22',
    location: 'TH NBG',
    tickets: 'Available'
  };

  return (
    <Section id="events" title="Next Event" className="events-section">
      <div className="event-card">
        <div className="event-detail">
          <h3>Artmosphere Experience</h3>
          <div className="event-info">
            <div className="info-item">
              <span className="label">Date</span>
              <span className="value">{nextEvent.date}</span>
            </div>
            <div className="info-item">
              <span className="label">Time</span>
              <span className="value">{nextEvent.time}</span>
            </div>
            <div className="info-item">
              <span className="label">Location</span>
              <span className="value">{nextEvent.location}</span>
            </div>
            <div className="info-item">
              <span className="label">Status</span>
              <span className="value status-available">{nextEvent.tickets}</span>
            </div>
          </div>
          <button className="event-button">Get Tickets</button>
        </div>
      </div>
    </Section>
  );
};

export { Gallery, About, HowItWorks, Events, Section };
