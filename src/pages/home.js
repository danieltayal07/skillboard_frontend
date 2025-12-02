import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to SkillBoard</h1>
      <p>Discover jobs. Apply easily. Track your applications.</p>

      <Link to="/jobs" className="btn-primary">
        Browse Jobs
      </Link>
    </div>
  );
}

export default Home;
