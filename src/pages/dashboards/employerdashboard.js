import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    type: "",
  });

  // Fetch employer jobs
  const loadJobs = () => {
    api.get("/employer/jobs").then((res) => setJobs(res.data.jobs));
  };

  // Fetch applications across all employer jobs
  const loadApplications = () => {
    api.get("/employer/applications").then((res) => setApplications(res.data.apps));
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createJob = async (e) => {
    e.preventDefault();

    await api.post("/jobs", form);
    alert("Job created!");
    setForm({ title: "", description: "", location: "", salary: "", skills: "", type: "" });
    loadJobs();
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      await api.delete(`/jobs/${id}`);
      loadJobs();
    }
  };

  const updateStatus = async (id, newStatus) => {
    await api.put(`/applications/${id}/status`, { status: newStatus });
    loadApplications();
  };

  return (
    <div className="dashboard-container">
      <h2>Employer Dashboard</h2>

      {/* Create Job Section */}
      <div className="job-form">
        <h3>Create New Job</h3>

        <form onSubmit={createJob}>
          <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input name="salary" placeholder="Salary Range" value={form.salary} onChange={handleChange} required />
          <input name="skills" placeholder="Skills required" value={form.skills} onChange={handleChange} required />
          <input name="type" placeholder="Job Type (Internship/Full-Time)" value={form.type} onChange={handleChange} required />
          <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} required />

          <button type="submit" className="btn-primary">Create Job</button>
        </form>
      </div>

      {/* Jobs List */}
      <h3>Your Posted Jobs</h3>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.skills}</p>

            <button className="btn-danger" onClick={() => deleteJob(job.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Applications Section */}
      <h3>Applications Received</h3>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Job</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.user.name}</td>
              <td>{app.job.title}</td>
              <td>{app.status.toUpperCase()}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                >
                  <option value="applied">Applied</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployerDashboard;
