import React from 'react';

const Partners = () => {
  return (
    <section className="partners">
      <div className="container">
        <div className="section-header">
          <h2>Our Partner Companies</h2>
          <p>Join internships at India's leading organizations</p>
        </div>

        <div className="partners-grid">
          <div className="partner-logo">
            <div className="logo-placeholder">
              <i className="fab fa-microsoft"></i>
              <span>Microsoft</span>
            </div>
          </div>
          <div className="partner-logo">
            <div className="logo-placeholder">
              <i className="fab fa-google"></i>
              <span>Google</span>
            </div>
          </div>
          <div className="partner-logo">
            <div className="logo-placeholder">
              <i className="fab fa-amazon"></i>
              <span>Amazon</span>
            </div>
          </div>
          <div className="partner-logo">
            <div className="logo-placeholder">
              <i className="fas fa-building"></i>
              <span>TCS</span>
            </div>
          </div>
          <div className="partner-logo">
            <div className="logo-placeholder">
              <i className="fas fa-industry"></i>
              <span>Infosys</span>
            </div>
          </div>
          <div className="partner-logo">
            <div className="logo-placeholder">
              <i className="fas fa-chart-line"></i>
              <span>Wipro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
