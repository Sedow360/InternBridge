import React from 'react';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>Hear from our successful interns</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The PM Internship Scheme gave me the perfect platform to start my career. The AI matching system found me an internship that perfectly aligned with my skills."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <h4>Priya Sharma</h4>
                <p>Software Engineer Intern at TCS</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Amazing experience! The program not only provided me with industry exposure but also helped me build a strong professional network."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <h4>Rahul Patel</h4>
                <p>Data Analyst Intern at Infosys</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The structured approach and government backing gave me confidence. I learned so much and got a job offer right after my internship!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <h4>Ananya Singh</h4>
                <p>Marketing Intern at Microsoft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
