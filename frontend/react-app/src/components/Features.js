import React from 'react';

const Features = () => {
  return (
    <section id="learn-more" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose InterBridge?</h2>
          <p>Discover the benefits of India's premier internship platform</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Government Backed</h3>
            <p>Official initiative by the Government of India ensuring credibility and quality standards</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI-Powered Matching</h3>
            <p>Advanced algorithms match your skills with the most suitable internship opportunities</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Top Companies</h3>
            <p>Partner with leading organizations across various industries nationwide</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h3>Certified Programs</h3>
            <p>Receive official certificates and gain valuable industry experience</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <h3>Stipend Support</h3>
            <p>Financial assistance and stipends for deserving candidates during internships</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Skill Development</h3>
            <p>Comprehensive training programs to enhance your professional capabilities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
