import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';
import './Home.css';

const Home = () => {
  const { theme } = useTheme();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const response = await api.get('/portfolio/featured');
      setFeatured(response.data.portfolios);
    } catch (error) {
      console.error('Error fetching featured portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`home ${theme}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="slide-in-up">Showcase Your Portfolio</h1>
            <p className="slide-in-up">Create a stunning, personalized portfolio website and share your amazing projects with the world.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <a href="#featured" className="btn btn-outline btn-lg">
                View Examples
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <span className="icon">🎨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose PortfolioHub?</h2>
          <div className="features-grid grid grid-3">
            <div className="feature-card card">
              <div className="feature-icon">📤</div>
              <h3>Easy Upload</h3>
              <p>Upload your projects with images, videos, and descriptions in minutes.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Your portfolio automatically looks stunning on all devices.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🔗</div>
              <h3>Share Easily</h3>
              <p>Get a public link to share your portfolio anywhere.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🎛️</div>
              <h3>Full Control</h3>
              <p>Edit, delete, and manage your projects anytime.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🌓</div>
              <h3>Dark Mode</h3>
              <p>Switch between light and dark themes for comfortable viewing.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3>View Analytics</h3>
              <p>Track how many people view your portfolio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolios */}
      <section id="featured" className="featured">
        <div className="container">
          <h2>Featured Portfolios</h2>
          {loading ? (
            <div className="text-center">
              <div className="loading"></div>
            </div>
          ) : featured.length > 0 ? (
            <div className="featured-grid grid grid-3">
              {featured.map((portfolio) => (
                <Link
                  key={portfolio._id}
                  to={`/portfolio/${portfolio._id}`}
                  className="portfolio-card card"
                >
                  {portfolio.image && (
                    <img src={portfolio.image} alt={portfolio.title} />
                  )}
                  <div className="portfolio-info">
                    <h3>{portfolio.title}</h3>
                    <p className="portfolio-user">
                      by {portfolio.userId?.username}
                    </p>
                    <p className="portfolio-views">👁️ {portfolio.views} views</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center">No featured portfolios yet. Be the first!</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Showcase Your Work?</h2>
          <p>Join hundreds of creators and share your portfolio today.</p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create Your Portfolio Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
