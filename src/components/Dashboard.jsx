import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Skill Board</h1>
          <div className="header-actions">
            <span className="user-email">{user?.email}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome back, {user?.name || user?.email}!</h2>
          <p className="welcome-text">
            You're successfully logged in to Skill Board.
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Your Skills</h3>
            <p>Track and manage your skills</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎯</div>
            <h3>Goals</h3>
            <p>Set and achieve your learning goals</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📈</div>
            <h3>Progress</h3>
            <p>Monitor your learning progress</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏆</div>
            <h3>Achievements</h3>
            <p>View your accomplishments</p>
          </div>
        </div>

        <div className="user-info-card">
          <h3>Account Information</h3>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{user?.name || 'Not set'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">User ID:</span>
            <span className="info-value">{user?.id}</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

