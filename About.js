import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './About.css';

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`about-page ${theme}`}>
      <div className="container">
        <div className="about-header">
          <h1>About PortfolioHub</h1>
          <p>Empowering creators to showcase their work</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="section-icon">🚀</div>
            <h2>Our Mission</h2>
            <p>
              PortfolioHub exists to make it easy for talented creators, designers, developers, and professionals to build and share their portfolios. We believe everyone deserves a platform to showcase their best work.
            </p>
          </section>

          <section className="about-section">
            <div className="section-icon">💡</div>
            <h2>Why We Built This</h2>
            <p>
              Traditional portfolio hosting can be expensive and complicated. We created PortfolioHub to provide a simple, elegant, and free solution where you can upload your projects and share them instantly.
            </p>
          </section>

          <section className="about-section">
            <div className="section-icon">🎯</div>
            <h2>Our Features</h2>
            <ul className="features-list">
              <li>✨ Easy project uploads with images and videos</li>
              <li>🎨 Beautiful, responsive design</li>
              <li>🔗 Shareable public portfolio links</li>
              <li>🎛️ Complete control over your content</li>
              <li>🌓 Dark mode support</li>
              <li>📊 View tracking for your projects</li>
              <li>🔐 Secure authentication</li>
            </ul>
          </section>

          <section className="about-section">
            <div className="section-icon">👨‍💻</div>
            <h2>About the Creator</h2>
            <p>
              PortfolioHub was built with passion by a developer who wanted to help others showcase their talent. Built with modern web technologies and designed with users in mind.
            </p>
            <div className="creator-links">
              <a href="#" className="social-btn">
                GitHub
              </a>
              <a href="#" className="social-btn">
                LinkedIn
              </a>
              <a href="#" className="social-btn">
                Twitter
              </a>
            </div>
          </section>

          <section className="about-section">
            <div className="section-icon">🙏</div>
            <h2>Thank You</h2>
            <p>
              Thanks for using PortfolioHub! We're constantly working to improve the platform. If you have any feedback or suggestions, feel free to contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
