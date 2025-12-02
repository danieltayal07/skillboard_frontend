import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="page-container" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "18px" }}>
          Find the Best Opportunities for Your Career
        </h1>
  
        <p style={{ maxWidth: "600px", margin: "auto", marginBottom: "30px" }}>
          Discover job openings, track applications, and manage your career effortlessly—all in one place.
        </p>
  
        <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
      </div>
    );
  }
  
export default Home;
