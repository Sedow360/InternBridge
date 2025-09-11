import React from 'react';

const InternshipCard = ({ internship, isRecommended = false }) => {
  const matchInfo = isRecommended ? (
    <div className="match-info">
      <small>Match Score: {Math.round(internship.match_score * 100)}% • {internship.matched_skills} skills matched</small>
    </div>
  ) : null;

  return (
    <div className={`internship-card ${isRecommended ? 'recommended' : ''}`}>
      <div className="card-header">
        <h4>{internship.title}</h4>
        <div className="company">{internship.company}</div>
        {matchInfo}
      </div>

      <div className="card-body">
        <p>{internship.description}</p>

        <div className="card-meta">
          <div className="meta-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{internship.location || 'Location not specified'}</span>
          </div>
          {internship.salary && (
            <div className="meta-item">
              <i className="fas fa-dollar-sign"></i>
              <span>{internship.salary}</span>
            </div>
          )}
        </div>

        <div className="requirements">
          <h5>Requirements</h5>
          <p>{internship.requirements}</p>
        </div>

        <button className="btn btn-apply">
          <i className="fas fa-paper-plane"></i>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
