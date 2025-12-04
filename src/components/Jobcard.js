import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight, Building2 } from "lucide-react";
import "../styles/job-card.css";

function JobCard({ job }) {
  const renderSkills = () => {
    if (!job.skills) return null;
    
    const skillsArray = Array.isArray(job.skills) 
      ? job.skills 
      : job.skills.split(',').slice(0, 3);

    return skillsArray.map((skill, index) => (
      <span key={index} className="skill-badge">
        {typeof skill === 'string' ? skill.trim() : skill}
      </span>
    ));
  };

  return (
    <div className="job-card">
      <div className="card-header">
        <div className="company-logo-placeholder">
          <Building2 size={24} />
        </div>
        <div className="job-info">
          <h3>{job.title}</h3>
          <div className="company-name">{job.company || "Top Company"}</div>
        </div>
      </div>

      <div className="card-tags">
        {renderSkills()}
      </div>

      <div className="card-footer">
        <div className="meta-info">
          <div className="meta-item">
            <MapPin size={14} />
            <span>{job.location || "Remote"}</span>
          </div>
          <div className="meta-item">
            <Briefcase size={14} />
            <span>{job.type || "Full Time"}</span>
          </div>
        </div>

        <Link to={`/jobs/${job.id}`} className="btn-view">
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default JobCard;