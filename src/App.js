import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Jobs from "./pages/jobs";
import JobDetails from "./pages/jobdetails";
import Login from "./pages/login";
import Signup from "./pages/signup";

import ApplicantDashboard from "./pages/dashboards/applicantdashboard";
import EmployerDashboard from "./pages/dashboards/employerdashboard";
import AdminDashboard from "./pages/dashboards/admindashboard";

import ProtectedRoute from "./components/protected-route";
import { AuthProvider } from "./context/authcontext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard/applicant"
            element={
              <ProtectedRoute role="applicant">
                <ApplicantDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/employer"
            element={
              <ProtectedRoute role="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
