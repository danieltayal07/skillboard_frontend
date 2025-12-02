import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SkillBoard</Link>

      <div className="nav-links">
        <Link to="/jobs">Jobs</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </>
        )}

        {user && (
          <>
            <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
            <button onClick={logout} className="btn-secondary">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
