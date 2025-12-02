import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function ApplicantDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications/my")
      .then((res) => setApplications(res.data.applications))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Your Applications</h2>

      {applications.length === 0 && <p>You haven't applied to any jobs yet.</p>}

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Employer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.job.title}</td>
              <td>{app.job.employer.name}</td>
              <td className={`status-${app.status}`}>
                {app.status.toUpperCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantDashboard;
