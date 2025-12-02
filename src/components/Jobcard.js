import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.location}</p>
      <p>{job.skills}</p>
      <p>Salary: {job.salary}</p>

      <Link to={`/jobs/${job.id}`} className="btn-primary">
        View Details
      </Link>
    </div>
  );
}

export default JobCard;
