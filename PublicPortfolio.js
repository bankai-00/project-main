import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';
import './PublicPortfolio.css';

const PublicPortfolio = () => {
  const { theme } = useTheme();
  const { username } = useParams();
  const [portfolios, setPortfolios] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolios();
  }, [username]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/portfolio/public/${username}`);
      setPortfolios(response.data.portfolios);
      if (response.data.portfolios.length > 0) {
        setUserInfo(response.data.portfolios[0].userId);
      }
    } catch (err) {
      setError('Portfolio not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`public-portfolio ${theme}`} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading"></div>
      </div>
    );
  }

  if (error || !userInfo) {
    return (
      <div className={`public-portfolio ${theme}`} style={{ minHeight: '100vh', padding: '40px 0' }}>
        <div className="container text-center">
          <h1>Portfolio Not Found</h1>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`public-portfolio ${theme}`}>
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <div className="hero-content">
            {userInfo.profilePicture && (
              <img
                src={userInfo.profilePicture}
                alt={userInfo.username}
                className="profile-pic"
              />
            )}
            <h1>{userInfo.username}</h1>
            {userInfo.bio && <p className="bio">{userInfo.bio}</p>}

            <div className="social-links">
              {userInfo.socialLinks?.linkedin && (
                <a href={userInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
              )}
              {userInfo.socialLinks?.github && (
                <a href={userInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  GitHub
                </a>
              )}
              {userInfo.socialLinks?.twitter && (
                <a href={userInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                  Twitter
                </a>
              )}
              {userInfo.socialLinks?.portfolio && (
                <a href={userInfo.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolios Section */}
      <section className="portfolio-items-section">
        <div className="container">
          <h2>Projects</h2>

          {portfolios.length > 0 ? (
            <div className="portfolio-grid grid grid-2">
              {portfolios.map((portfolio) => (
                <div key={portfolio._id} className="portfolio-card card">
                  {portfolio.image && (
                    <img src={portfolio.image} alt={portfolio.title} className="portfolio-image" />
                  )}
                  <div className="portfolio-details">
                    <h3>{portfolio.title}</h3>
                    <p className="category">{portfolio.category}</p>
                    {portfolio.description && (
                      <p className="description">{portfolio.description}</p>
                    )}

                    {portfolio.technologies && portfolio.technologies.length > 0 && (
                      <div className="technologies">
                        <strong>Technologies:</strong>
                        <div className="tech-tags">
                          {portfolio.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {portfolio.links && portfolio.links.length > 0 && (
                      <div className="portfolio-links">
                        {portfolio.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}

                    <p className="views">👁️ {portfolio.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state card text-center">
              <p>No portfolios yet</p>
            </div>
          )}
        </div>
      </section>

      <div className="back-link-section">
        <div className="container">
          <Link to="/" className="btn btn-outline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;
