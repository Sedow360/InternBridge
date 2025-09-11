import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InternshipCard from '../components/InternshipCard';

const OpportunitiesPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('');
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState('Upload Your Resume');
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to the backend here.
    // For now, we'll just log the data.
    console.log({
      name,
      email,
      phone,
      education,
      resume,
    });

    // Mock results for demonstration
    const mockResults = {
      user_id: '12345',
      extracted_skills: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS'],
      recommendations: [
        {
          id: 1,
          title: 'Frontend Developer Intern',
          company: 'Tech Solutions Inc.',
          match_score: 0.95,
          matched_skills: 'React, JavaScript',
          description: 'Work on exciting projects using modern web technologies.',
          location: 'Remote',
          salary: '$20/hr',
          requirements: 'Experience with React and CSS.',
        },
      ],
      all_internships: [
        {
          id: 1,
          title: 'Frontend Developer Intern',
          company: 'Tech Solutions Inc.',
          description: 'Work on exciting projects using modern web technologies.',
          location: 'Remote',
          salary: '$20/hr',
          requirements: 'Experience with React and CSS.',
        },
        {
          id: 2,
          title: 'Backend Developer Intern',
          company: 'Data Systems Co.',
          description: 'Help build our scalable backend services.',
          location: 'New York, NY',
          salary: '$25/hr',
          requirements: 'Knowledge of Node.js and databases.',
        },
      ],
    };
    setResults(mockResults);
  };

  return (
    <div>
      <Navbar />
      <section className="opportunities-section">
        <div className="container">
          <div className="section-header">
            <h2>Find Your Perfect Internship</h2>
            <p>Upload your resume and let our AI match you with the best opportunities</p>
          </div>

          <div className="opportunities-content">
            <div className="upload-section">
              <form id="resume-form" className="resume-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="education">Education Level</label>
                    <select id="education" name="education" required value={education} onChange={(e) => setEducation(e.target.value)}>
                      <option value="">Select Education Level</option>
                      <option value="diploma">Diploma</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </div>

                <div className="form-group file-upload-group">
                  <label htmlFor="resume" className="file-upload-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span id="file-name">{fileName}</span>
                    <small>PDF, DOCX, or TXT files only (Max 16MB)</small>
                  </label>
                  <input type="file" id="resume" name="resume" accept=".pdf,.docx,.txt" required onChange={handleFileChange} />
                </div>

                <button type="submit" className="btn btn-submit">
                  <i className="fas fa-rocket"></i>
                  Find My Internships
                </button>
              </form>
            </div>

            <div className="opportunities-info">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h3>Quick Processing</h3>
                <p>Your resume is analyzed in under 30 seconds using advanced AI technology</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Secure & Private</h3>
                <p>Your data is encrypted and protected according to government security standards</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-target"></i>
                </div>
                <h3>Smart Matching</h3>
                <p>Get personalized recommendations based on your skills and career aspirations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {results && (
        <section id="results" className="results-section">
          <div className="container">
            <div className="results-header">
              <h2>Your Profile</h2>
              <div id="user-info">
                <h3>Welcome, User!</h3>
                <p>We've analyzed your resume and found {results.extracted_skills.length} relevant skills.</p>
              </div>
              <div id="extracted-skills">
                <div className="skills-container">
                  <h4>Your Skills</h4>
                  <div className="skills-list">
                    {results.extracted_skills.map((skill) => (
                      <span className="skill-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendations">
              <h3>Recommended Internships</h3>
              <div id="recommendations-list">
                {results.recommendations.map((internship) => (
                  <InternshipCard internship={internship} isRecommended={true} key={internship.id} />
                ))}
              </div>
            </div>

            <div className="all-internships">
              <h3>All Available Internships</h3>
              <div id="internships-list">
                {results.all_internships.map((internship) => (
                  <InternshipCard internship={internship} key={internship.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default OpportunitiesPage;
