import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('portfolios');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchPortfolios();
    }
  }, [user, navigate]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/portfolio/user');
      setPortfolios(response.data.portfolios);
    } catch (err) {
      setError('Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      try {
        await api.delete(`/portfolio/${id}`);
        setPortfolios(portfolios.filter(p => p._id !== id));
      } catch (err) {
        setError('Failed to delete portfolio');
      }
    }
  };

  const publicLink = user ? `${window.location.origin}/portfolio/${user.username}` : '';

  return (
    <div className={`dashboard ${theme}`}>
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.username}!</p>
          </div>
          <a
            href={publicLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            👁️ View Public Portfolio
          </a>
        </div>

        <div className="dashboard-nav">
          <button
            className={`tab-btn ${activeTab === 'portfolios' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolios')}
          >
            My Portfolios ({portfolios.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Profile Settings
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {activeTab === 'portfolios' && (
          <div className="portfolios-section">
            <div className="section-header">
              <h2>Your Portfolios</h2>
              <button
                onClick={() => navigate('/dashboard/create')}
                className="btn btn-primary"
              >
                + Create New
              </button>
            </div>

            {loading ? (
              <div className="text-center">
                <div className="loading"></div>
              </div>
            ) : portfolios.length > 0 ? (
              <div className="portfolios-grid grid grid-3">
                {portfolios.map((portfolio) => (
                  <div key={portfolio._id} className="portfolio-item card">
                    {portfolio.image && (
                      <img src={portfolio.image} alt={portfolio.title} />
                    )}
                    <div className="portfolio-item-content">
                      <h3>{portfolio.title}</h3>
                      <p className="category">{portfolio.category}</p>
                      <p className="description">{portfolio.description}</p>
                      <div className="portfolio-stats">
                        <span>👁️ {portfolio.views} views</span>
                        <span>⭐ {portfolio.featured ? 'Featured' : 'Not featured'}</span>
                      </div>
                    </div>
                    <div className="portfolio-actions">
                      <button
                        onClick={() => navigate(`/dashboard/edit/${portfolio._id}`)}
                        className="btn-icon"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(portfolio._id)}
                        className="btn-icon delete"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state card">
                <div className="empty-icon">📂</div>
                <h3>No portfolios yet</h3>
                <p>Create your first portfolio to get started!</p>
                <button
                  onClick={() => navigate('/dashboard/create')}
                  className="btn btn-primary"
                >
                  Create Portfolio
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <ProfileSettings />
        )}
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    socialLinks: user?.socialLinks || { linkedin: '', github: '', twitter: '', portfolio: '' }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social-')) {
      const linkName = name.replace('social-', '');
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [linkName]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/auth/profile', formData);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-container card">
        <h2>Profile Settings</h2>

        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="social-links-section">
            <h3>Social Links</h3>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                name="social-linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="github">GitHub</label>
              <input
                type="url"
                id="github"
                name="social-github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="url"
                id="twitter"
                name="social-twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="portfolio">Portfolio</label>
              <input
                type="url"
                id="portfolio"
                name="social-portfolio"
                value={formData.socialLinks.portfolio}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
