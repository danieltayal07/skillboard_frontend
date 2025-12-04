import React, { useEffect, useState } from "react";
import { 
  Users, Briefcase, Trash2, ShieldAlert, 
  Download 
} from "lucide-react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

import "../../styles/admin-dashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, jobsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/jobs")
      ]);

      setUsers(usersRes.data.users || usersRes.data || []);
      setJobs(jobsRes.data.jobs || jobsRes.data || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      try {
        await api.delete(`/admin/jobs/${id}`);
        setJobs(jobs.filter(j => j.id !== id));
      } catch (err) {
        alert("Failed to delete job.");
      }
    }
  };

  const safeUsers = users || [];
  const safeJobs = jobs || [];

  if (loading) return <div className="admin-dashboard">Loading Admin Panel...</div>;

  return (
    <div className="admin-dashboard">
      <Navbar />
      
      <div className="admin-header" style={{ marginTop: '80px' }}>
        <div>
          <h1>Admin Dashboard</h1>
          <p style={{ color: '#64748b' }}>Overview of platform activity and management.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                <Download size={16} /> Export Data
            </button>
        </div>
      </div>

      <div className="stats-row" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b', fontWeight: 500 }}>Total Users</span>
                <Users size={20} color="#f97316" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{safeUsers.length}</div>
        </div>
        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b', fontWeight: 500 }}>Total Jobs</span>
                <Briefcase size={20} color="#f97316" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{safeJobs.length}</div>
        </div>
        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b', fontWeight: 500 }}>System Status</span>
                <ShieldAlert size={20} color="#16a34a" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#16a34a' }}>Active</div>
        </div>
      </div>

      <div className="admin-section">
        
        <div style={{ padding: '0 24px' }}>
            <div className="tabs-container">
                <button 
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Manage Users
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    Manage Jobs
                </button>
            </div>
        </div>

        {activeTab === 'users' && (
            <div style={{ overflowX: 'auto' }}>
                {safeUsers.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {safeUsers.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{u.name}</div>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`badge ${u.role === 'admin' ? 'shortlisted' : 'applied'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>{new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className="btn-icon-danger" 
                                            onClick={() => deleteUser(u.id)}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No users found.</div>
                )}
            </div>
        )}

        {activeTab === 'jobs' && (
            <div style={{ overflowX: 'auto' }}>
                {safeJobs.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Employer</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {safeJobs.map((job) => (
                                <tr key={job.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{job.title}</div>
                                    </td>
                                    <td>{job.employer?.name || "Unknown"}</td>
                                    <td>{job.location}</td>
                                    <td>
                                        <span className="badge reviewing">{job.type || "Full Time"}</span>
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
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No jobs found.</div>
                )}
            </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;