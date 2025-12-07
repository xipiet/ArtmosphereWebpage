import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section id="about-us" className="about-us-section">
      <div className="about-us-container">
        <h2 className="about-us-title">About Us</h2>
        
        <div className="about-us-content">
          <div className="about-us-text">
            <p>
              Wir sind <strong>sechs Entwickler</strong> im <strong>5. Semester</strong> an der <strong>Technischen Hochschule Nürnberg Georg Simon Ohm</strong>.
            </p>
            
            <p>
              Zusammen mit dem Kollektiv <strong>"Orakel von Nürnberg"</strong> und unter der Betreuung von <strong>Prof. Schedel</strong> haben wir <strong>Artmosphere</strong> erschaffen.
            </p>
            
            <p>
              Artmosphere verkörpert <strong>die Kunst der Zukunft</strong>. Es stellt traditionelle Vorstellungen von Kreation in Frage, indem es individuelle Ausdrucksformen in ein kollektives Meisterwerk verwandelt. Jeden Besucher machen wir zum Co-Creator, der seine einzigartige Vision zu einer sich ständig verändernden digitalen Leinwand beiträgt.
            </p>
            
            <p>
              Unsere Vision ist es, immersive Erfahrungen zu schaffen, die die Lücke zwischen menschlicher Kreativität und digitaler Technologie überbrücken und beweisen, dass Kunst in der modernen Zeit nicht etwas ist, das wir konsumieren, sondern etwas, das wir gemeinsam erschaffen.
            </p>
          </div>
          
          <div className="about-us-stats">
            <div className="stat-item">
              <div className="stat-number">5.</div>
              <div className="stat-label">Semester</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">Entwickler</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Möglichkeiten</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
