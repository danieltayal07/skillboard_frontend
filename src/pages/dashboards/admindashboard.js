import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const loadData = () => {
    api.get("/admin/users").then((res) => setUsers(res.data.users));
    api.get("/admin/jobs").then((res) => setJobs(res.data.jobs));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await api.delete(`/admin/users/${id}`);
      loadData();
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      await api.delete(`/admin/jobs/${id}`);
      loadData();
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <h3>All Users</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn-danger" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>All Jobs</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Employer</th>
            <th>Location</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.employer.name}</td>
              <td>{job.location}</td>
              <td>
                <button className="btn-danger" onClick={() => deleteJob(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminDashboard;
