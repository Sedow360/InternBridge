import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <i className="fas fa-bridge"></i>
          <span>InternBridge</span>
        </div>
        <div className="nav-menu" id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/opportunities" className="nav-link">Opportunities</Link>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle">
                Language <i className="fas fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#" className="dropdown-link">English</a></li>
                <li><a href="#" className="dropdown-link">हिंदी (Hindi)</a></li>
                <li><a href="#" className="dropdown-link">বাংলা (Bengali)</a></li>
                <li><a href="#" className="dropdown-link">தமிழ் (Tamil)</a></li>
                <li><a href="#" className="dropdown-link">తెలుగు (Telugu)</a></li>
                <li><a href="#" className="dropdown-link">ગુજરાતી (Gujarati)</a></li>
                <li><a href="#" className="dropdown-link">ಕನ್ನಡ (Kannada)</a></li>
                <li><a href="#" className="dropdown-link">മലയാളം (Malayalam)</a></li>
                <li><a href="#" className="dropdown-link">ਪੰਜਾਬੀ (Punjabi)</a></li>
                <li><a href="#" className="dropdown-link">मराठी (Marathi)</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="nav-toggle" id="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
