import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showCompanyPassword, setShowCompanyPassword] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    // Handle student login logic here
    console.log({ studentEmail, studentPassword });
  };

  const handleCompanyLogin = (e) => {
    e.preventDefault();
    // Handle company login logic here
    console.log({ companyEmail, companyPassword, companyId });
  };

  return (
    <div>
      <Navbar />
      <section className="login-section">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Login to InterBridge</h1>
              <p>Choose your account type to continue</p>
            </div>

            <div className="user-type-tabs">
              <button
                type="button"
                className={`tab-button ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => handleTabClick('student')}
              >
                <i className="fas fa-user-graduate"></i>
                <span>Student</span>
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}
                onClick={() => handleTabClick('company')}
              >
                <i className="fas fa-building"></i>
                <span>Company/Admin</span>
              </button>
            </div>

            {activeTab === 'student' && (
              <form id="student-login-form" className="login-form tab-content active" onSubmit={handleStudentLogin}>
                <div className="form-group">
                  <label htmlFor="student-email">Email Address</label>
                  <div className="input-group">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="student-email"
                      name="email"
                      placeholder="Enter your student email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="student-password">Password</label>
                  <div className="input-group">
                    <i className="fas fa-lock"></i>
                    <input
                      type={showStudentPassword ? 'text' : 'password'}
                      id="student-password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowStudentPassword(!showStudentPassword)}>
                      <i className={`fas ${showStudentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" id="student-remember" name="remember" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="btn btn-login">
                  <i className="fas fa-sign-in-alt"></i>
                  Login as Student
                </button>
              </form>
            )}

            {activeTab === 'company' && (
              <form id="company-login-form" className="login-form tab-content active" onSubmit={handleCompanyLogin}>
                <div className="form-group">
                  <label htmlFor="company-email">Company Email Address</label>
                  <div className="input-group">
                    <i className="fas fa-building"></i>
                    <input
                      type="email"
                      id="company-email"
                      name="email"
                      placeholder="Enter your company email"
                      required
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company-password">Password</label>
                  <div className="input-group">
                    <i className="fas fa-lock"></i>
                    <input
                      type={showCompanyPassword ? 'text' : 'password'}
                      id="company-password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={companyPassword}
                      onChange={(e) => setCompanyPassword(e.target.value)}
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowCompanyPassword(!showCompanyPassword)}>
                      <i className={`fas ${showCompanyPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company-id">Company ID (Optional)</label>
                  <div className="input-group">
                    <i className="fas fa-id-card"></i>
                    <input
                      type="text"
                      id="company-id"
                      name="company_id"
                      placeholder="Enter your company ID"
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" id="company-remember" name="remember" />
                    <span className="checkmark"></span>
                    Keep me logged in
                  </label>
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="btn btn-login">
                  <i className="fas fa-building"></i>
                  Login as Company
                </button>
              </form>
            )}

            <div className="login-divider">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button className="btn btn-google">
                <i className="fab fa-google"></i>
                Continue with Google
              </button>
              <button className="btn btn-linkedin">
                <i className="fab fa-linkedin-in"></i>
                Continue with LinkedIn
              </button>
            </div>

            <div className="signup-prompt">
              <p>Don't have an account? <a href="/">Start by uploading your resume</a></p>
            </div>
          </div>

          <div className="login-features">
            <h3 id="features-title">Why Login to InterBridge?</h3>

            {activeTab === 'student' && (
                <div className="features-grid student-features active" id="student-features">
                    <div className="feature-item">
                        <i className="fas fa-bookmark"></i>
                        <h4>Save Favorites</h4>
                        <p>Bookmark internships you're interested in</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-chart-line"></i>
                        <h4>Track Applications</h4>
                        <p>Monitor your application status in real-time</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-bell"></i>
                        <h4>Get Notifications</h4>
                        <p>Receive alerts for new matching opportunities</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-user-graduate"></i>
                        <h4>Profile Management</h4>
                        <p>Update your skills and preferences anytime</p>
                    </div>
                </div>
            )}

            {activeTab === 'company' && (
                <div className="features-grid company-features active" id="company-features">
                    <div className="feature-item">
                        <i className="fas fa-plus-circle"></i>
                        <h4>Post Internships</h4>
                        <p>Create and manage internship opportunities</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-users"></i>
                        <h4>Manage Candidates</h4>
                        <p>Review applications and shortlist candidates</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-analytics"></i>
                        <h4>Analytics Dashboard</h4>
                        <p>Track application metrics and insights</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-handshake"></i>
                        <h4>Talent Matching</h4>
                        <p>AI-powered candidate recommendations</p>
                    </div>
                </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;
