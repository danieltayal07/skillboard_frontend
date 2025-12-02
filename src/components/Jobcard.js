import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <p style={{ margin: "8px 0", color: "#64748B" }}>{job.location}</p>
      <p style={{ color: "#3B82F6" }}>{job.skills}</p>

      <div style={{ marginTop: "12px" }}>
        <Link to={`/jobs/${job.id}`} className="btn-primary">
          View Job
        </Link>
      </div>
    </div>
  );
}


export default JobCard;
