import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Search, Zap, ShieldCheck, TrendingUp 
} from "lucide-react";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-bg-pattern"></div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            <span>Job Search Made Easier</span>
          </div>

          <h1 className="hero-title">
            Find the <span className="gradient-text">Best Opportunities</span> <br />
            for Your Career
          </h1>

          <p className="hero-subtitle">
            Discover job openings, track applications, and manage your career effortlessly. 
            Connect with top companies and get hired faster.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="btn-xl btn-primary-xl">
              Browse Jobs <ArrowRight size={20} />
            </Link>
            <Link to="/signup" className="btn-xl btn-secondary-xl">
              Post a Job - It's Free
            </Link>
          </div>
        </div>
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Active Jobs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24h</span>
            <span className="stat-label">Avg. Response</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="section-label">Why Choose SkillBoard</div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-circle">
              <Search size={24} />
            </div>
            <h3>Smart Search</h3>
            <p>
              Filter jobs by salary, remote options, and specific skill sets to find 
              the perfect match for your expertise.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-circle">
              <ShieldCheck size={24} />
            </div>
            <h3>Verified Employers</h3>
            <p>
              We vet every company on our platform. No spam, no fake listings. 
              Only legitimate opportunities.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-circle">
              <TrendingUp size={24} />
            </div>
            <h3>Career Growth</h3>
            <p>
              Get insights into salary trends and market demands. Track your 
              application status in real-time.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;