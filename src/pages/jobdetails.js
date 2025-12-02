import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/authcontext";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => {
      setJob(res.data.job);
    });
  }, [id]);

  const applyJob = async () => {
    await api.post(`/jobs/${id}/applications`);
    alert("Application submitted!");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>Skills: {job.skills}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>

      {user?.role === "applicant" && (
        <button className="btn-primary" onClick={applyJob}>
          Apply Now
        </button>
      )}
    </div>
  );
}

export default JobDetails;
