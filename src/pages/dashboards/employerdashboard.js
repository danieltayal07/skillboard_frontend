import React, { useEffect, useState } from "react";
import { 
  Briefcase, Users, FileText, Plus, 
  MapPin, X, Trash2, ArrowUpRight 
} from "lucide-react";
import api from "../../api/axios";
import "../../styles/employer-dashboard.css";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    type: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        api.get("/employer/jobs"), 
        api.get("/employer/applications")
      ]);
      
      setJobs(jobsRes.data.jobs || jobsRes.data || []);
      setApps(appsRes.data.apps || appsRes.data || []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", form);
      alert("Job posted successfully!");
      setForm({ title: "", description: "", location: "", salary: "", skills: "", type: "" });
      setShowModal(false);
      loadData(); 
    } catch (err) {
      alert("Failed to create job.");
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await api.delete(`/jobs/${id}`);
        loadData();
      } catch (err) {
        alert("Failed to delete job.");
      }
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/applications/${id}/status`, { status: newStatus });
      loadData();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const safeJobs = jobs || [];
  const safeApps = apps || [];
  const activeJobs = safeJobs.length;
  const totalApps = safeApps.length;

  if (loading) return <div className="employer-dashboard">Loading Dashboard...</div>;

  return (
    <div className="employer-dashboard">
      <div className="emp-header">
        <div>
          <h1>Employer Dashboard</h1>
          <p>Manage your job postings and incoming applications.</p>
        </div>
        <button className="btn-post-job" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Post New Job
        </button>
      </div>

      <div className="emp-stats-grid">
        <div className="emp-stat-card">
          <div className="emp-stat-content">
            <p>Active Listings</p>
            <h3>{activeJobs}</h3>
          </div>
          <div className="emp-icon-wrapper" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <Briefcase size={24} />
          </div>
        </div>
        <div className="emp-stat-card">
          <div className="emp-stat-content">
            <p>Total Candidates</p>
            <h3>{totalApps}</h3>
          </div>
          <div className="emp-icon-wrapper" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Users size={24} />
          </div>
        </div>
        <div className="emp-stat-card">
          <div className="emp-stat-content">
            <p>Total Views</p>
            <h3>--</h3>
          </div>
          <div className="emp-icon-wrapper" style={{ background: '#f1f5f9', color: '#475569' }}>
            <FileText size={24} />
          </div>
        </div>
      </div>

      <div className="emp-section">
        <div className="emp-section-header">
          <h2>Your Job Postings</h2>
        </div>
        {safeJobs.length > 0 ? (
          <table className="emp-table">
            <thead>
              <tr>
                <th width="40%">Job Title</th>
                <th width="30%">Location</th>
                <th width="20%">Applicants</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              {safeJobs.map((job) => {
                const count = safeApps.filter(a => a.job?.id === job.id).length;
                return (
                  <tr key={job.id}>
                    <td>
                      <div className="text-bold">{job.title}</div>
                      <div className="text-sub">{job.type}</div>
                    </td>
                    <td><div style={{display:'flex', gap:'5px', color:'#64748b'}}><MapPin size={14}/> {job.location}</div></td>
                    <td>
                      <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                        <Users size={14} /> <b>{count}</b>
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn-icon-danger" 
                        onClick={() => deleteJob(job.id)}
                        title="Delete Job"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="emp-empty">No jobs posted yet.</div>
        )}
      </div>

      <div className="emp-section">
        <div className="emp-section-header">
          <h2>Received Applications</h2>
        </div>
        {safeApps.length > 0 ? (
          <table className="emp-table">
            <thead>
              <tr>
                <th width="25%">Candidate</th>
                <th width="35%">Job Role</th>
                <th width="25%">Status</th>
                <th width="15%">View</th>
              </tr>
            </thead>
            <tbody>
              {safeApps.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="text-bold">{app.user?.name}</div>
                    <div className="text-sub">{app.user?.email}</div>
                  </td>
                  <td>{app.job?.title}</td>
                  <td>
                    <select 
                      className="status-select"
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                    >
                      <option value="applied">Applied</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="interview">Interview</option>
                    </select>
                  </td>
                  <td>
                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'not-allowed' }}>
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="emp-empty">No applications yet.</div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Job</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={createJob}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input name="title" className="form-input" placeholder="e.g. Senior React Developer" value={form.title} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input name="location" className="form-input" placeholder="e.g. Remote / New York" value={form.location} onChange={handleInputChange} required />
              </div>

              <div className="role-group" style={{gridTemplateColumns: '1fr 1fr', marginBottom: '1rem'}}>
                 <div className="form-group" style={{marginBottom:0}}>
                    <label className="form-label">Salary</label>
                    <input name="salary" className="form-input" placeholder="$80k - $120k" value={form.salary} onChange={handleInputChange} required />
                 </div>
                 <div className="form-group" style={{marginBottom:0}}>
                    <label className="form-label">Type</label>
                    <input name="type" className="form-input" placeholder="Full Time" value={form.type} onChange={handleInputChange} required />
                 </div>
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills</label>
                <input name="skills" className="form-input" placeholder="React, Node.js, SQL" value={form.skills} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  name="description" 
                  className="form-input" 
                  rows="4"
                  placeholder="Describe the role responsibilities..." 
                  value={form.description} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <button type="submit" className="btn-primary" style={{width: '100%'}}>
                Publish Job Post
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default EmployerDashboard;