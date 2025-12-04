import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, CheckCircle2, XCircle, Clock, 
  Search, ArrowRight, FileText, Calendar 
} from "lucide-react";
import api from "../../api/axios";
import "../../styles/applicant-dashboard.css";
import Navbar from "../../components/Navbar";

function ApplicantDashboard() {
  const [apps, setApps] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await api.get("/applications/my");
      console.log("API Response:", res.data); 

      if (Array.isArray(res.data)) {
        setApps(res.data);
      } else if (res.data && Array.isArray(res.data.applications)) {
        setApps(res.data.applications);
      } else if (res.data && Array.isArray(res.data.data)) {
        setApps(res.data.data);
      } else {
        console.error("Data is not an array:", res.data);
        setApps([]);
      }

    } catch (err) {
      console.error("Error loading applications:", err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  const safeApps = apps || [];

  const totalApps = safeApps.length;
  const shortlisted = safeApps.filter(a => a.status === "shortlisted").length;
  const rejected = safeApps.filter(a => a.status === "rejected").length;
  const interviews = safeApps.filter(a => a.status === "interview").length; 

  const renderStatus = (status) => {
    let styleClass = "applied"; 
    let icon = <Clock size={14} />;
    let label = status || "Applied";

    if (status === "shortlisted") {
      styleClass = "shortlisted"; 
      icon = <CheckCircle2 size={14} />;
    } else if (status === "rejected") {
      styleClass = "rejected"; 
      icon = <XCircle size={14} />;
    } else if (status === "interview") {
      styleClass = "interview"; 
      icon = <Calendar size={14} />;
    }

    return (
      <span className={`status-pill ${styleClass}`}>
        {icon} <span className="capitalize">{label}</span>
      </span>
    );
  };

  if (loading) return <div className="app-dashboard">Loading your career profile...</div>;

  return (
    <div className="app-dashboard">
      <Navbar/>
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Applicant Dashboard</h1>
          <p>Track your job applications and current status.</p>
        </div>
        <Link to="/jobs">
          <button className="action-btn">
            <Search size={18} /> Find New Jobs
          </button>
        </Link>
      </div>

      <div className="app-stats-grid">
        <div className="app-stat-card">
          <div className="stat-icon-box" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <h3>{totalApps}</h3>
            <p>Total Applications</p>
          </div>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <h3>{shortlisted}</h3>
            <p>Shortlisted</p>
          </div>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>{interviews}</h3>
            <p>Interviews</p>
          </div>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <XCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      <div className="applications-section">
        <div className="section-header">
          <h2>Your Applications</h2>
        </div>

        {safeApps.length > 0 ? (
          <table className="app-table">
            <thead>
              <tr>
                <th width="40%">Job Role</th>
                <th width="20%">Applied On</th>
                <th width="20%">Status</th>
                <th width="20%">Action</th>
              </tr>
            </thead>
            <tbody>
              {safeApps.map((app, index) => (
                <tr key={index}>
                  <td>
                    <div className="job-cell">
                      <span className="job-title">{app.job?.title || "Unknown Job"}</span>
                      <span className="company-name">{app.job?.company || "Company Name"}</span>
                    </div>
                  </td>
                  <td>
                    <span className="date-text">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </td>
                  <td>{renderStatus(app.status)}</td>
                  <td>
                    {app.job?.id && (
                      <Link to={`/jobs/${app.job.id}`} className="view-link">
                        View Details <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }}/>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div style={{ background: '#f1f5f9', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FileText size={30} color="#94a3b8" />
            </div>
            <h3>No applications found</h3>
            <p>You haven't applied to any jobs yet.</p>
            <Link to="/jobs">
              <button className="action-btn" style={{ background: '#0f172a' }}>
                Start Applying
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicantDashboard;