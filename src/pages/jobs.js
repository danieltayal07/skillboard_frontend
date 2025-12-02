import React, { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/Jobcard";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => {
      setJobs(res.data.jobs);
    });
  }, []);

  return (
    <div className="jobs-page">
      <h2>Available Jobs</h2>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
