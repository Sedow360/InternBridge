import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">
              <i className="fas fa-star"></i>
              <span>Government Initiative</span>
            </div>
            <h1>InterBridge</h1>
            <h2>India's Premier Internship Platform</h2>
            <p className="hero-subtitle">Empowering India's youth through quality internship opportunities</p>
            <p className="hero-description">A comprehensive platform to bridge the gap between education and employment, providing students with real-world experience in leading companies across India.</p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Students Registered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2,500+</div>
                <div className="stat-label">Partner Companies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15,000+</div>
                <div className="stat-label">Internships Completed</div>
              </div>
            </div>

            <div className="hero-buttons">
              <a href="opportunities.html" className="btn btn-primary-gov">
                <i className="fas fa-user-graduate"></i>
                Apply for Internship
              </a>
              <a href="#learn-more" className="btn btn-secondary-gov">
                <i className="fas fa-info-circle"></i>
                Learn More
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <div className="emblem">
                <i className="fas fa-university"></i>
              </div>
              <div className="floating-cards">
                <div className="card-float card-1">
                  <i className="fas fa-briefcase"></i>
                  <span>Tech Internships</span>
                </div>
                <div className="card-float card-2">
                  <i className="fas fa-chart-line"></i>
                  <span>Analytics Roles</span>
                </div>
                <div className="card-float card-3">
                  <i className="fas fa-palette"></i>
                  <span>Design Positions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
