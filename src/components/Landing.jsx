import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 className="brand-logo">Skill Board</h1>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-button">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Your Skills,
            <span className="gradient-text"> Track Your Progress</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate platform to organize, track, and showcase your skills. 
            Build your professional profile and achieve your learning goals.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">
              Start Free Today
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <div className="card-icon">📊</div>
            <div className="card-text">Skills Dashboard</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🎯</div>
            <div className="card-text">Goal Tracking</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">📈</div>
            <div className="card-text">Progress Analytics</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Skill Board?</h2>
          <p className="section-subtitle">
            Everything you need to manage and showcase your skills
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Skill Management</h3>
            <p className="feature-description">
              Organize and categorize all your skills in one place. Track your proficiency levels and see your growth over time.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Goal Setting</h3>
            <p className="feature-description">
              Set learning goals and milestones. Stay motivated with clear objectives and track your progress toward achieving them.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-description">
              Visualize your learning journey with detailed analytics and progress reports. See how far you've come.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Achievements</h3>
            <p className="feature-description">
              Earn badges and achievements as you master new skills. Showcase your accomplishments to the world.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your data is safe with us. We use industry-standard security practices to protect your information.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Fast & Reliable</h3>
            <p className="feature-description">
              Built for speed and performance. Access your skills dashboard anytime, anywhere, on any device.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Build Your Skill Profile?</h2>
          <p className="cta-subtitle">
            Join thousands of professionals who are already tracking their skills and achieving their goals.
          </p>
          <Link to="/signup" className="cta-button">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Skill Board</h3>
            <p>Your personal skill management platform</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Skill Board. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing

