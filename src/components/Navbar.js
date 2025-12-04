import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { 
  Briefcase, Menu, X, User, LogOut 
} from "lucide-react";

import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    return `/dashboard/${user.role}`;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          
          <Link to="/" className="nav-logo">
            <div className="logo-icon">
              <Briefcase size={20} strokeWidth={2.5} />
            </div>
            <span>Skill<span className="brand-accent">Board</span></span>
          </Link>

          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/jobs" className={`nav-link ${location.pathname === "/jobs" ? "active" : ""}`}>
              Find Jobs
            </Link>
          </div>

          <div className="nav-auth">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="btn-dashboard">
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="btn-logout" title="Logout">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Log In
                </Link>
                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              <button class="pro-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                      <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                  </svg>
                  Unlock Pro
              </button>
              </>
            )}
          </div>

          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="mobile-menu-overlay">
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/jobs" className="mobile-link">Find Jobs</Link>
          
          {user ? (
            <>
              <Link to={getDashboardLink()} className="mobile-link" style={{ fontWeight: 'bold', color: '#f97316' }}>
                Go to Dashboard
              </Link>
              <div 
                className="mobile-link" 
                onClick={handleLogout} 
                style={{ cursor: 'pointer', color: '#dc2626' }}
              >
                Logout
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <Link to="/login" className="btn-login" style={{ textAlign: 'center', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '8px' }}>
                Log In
              </Link>
              <Link to="/signup" className="btn-signup" style={{ textAlign: 'center' }}>
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;