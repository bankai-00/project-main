import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';
import './PortfolioForm.css';

const PortfolioForm = ({ isEdit = false }) => {
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    technologies: [],
    featured: false,
    links: []
  });
  const [image, setImage] = useState(null);
  const [techInput, setTechInput] = useState('');
  const [linkInput, setLinkInput] = useState({ title: '', url: '' });

  useEffect(() => {
    if (isEdit && id) {
      fetchPortfolio();
    }
  }, [isEdit, id]);

  const fetchPortfolio = async () => {
    try {
      const response = await api.get(`/portfolio/${id}`);
      const portfolio = response.data;
      setFormData({
        title: portfolio.title,
        description: portfolio.description,
        category: portfolio.category,
        technologies: portfolio.technologies || [],
        featured: portfolio.featured,
        links: portfolio.links || []
      });
    } catch (err) {
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  const handleAddLink = () => {
    if (linkInput.title.trim() && linkInput.url.trim()) {
      setFormData({
        ...formData,
        links: [...formData.links, { ...linkInput }]
      });
      setLinkInput({ title: '', url: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index)
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      formDataToSend.append('links', JSON.stringify(formData.links));
      formDataToSend.append('featured', formData.featured);

      if (image) {
        formDataToSend.append('image', image);
      }

      if (isEdit) {
        await api.put(`/portfolio/${id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/portfolio', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save portfolio');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center" style={{ padding: '100px 0' }}><div className="loading"></div></div>;
  }

  return (
    <div className={`portfolio-form ${theme}`}>
      <div className="container">
        <div className="form-header">
          <h1>{isEdit ? 'Edit Portfolio' : 'Create New Portfolio'}</h1>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form-wrapper card">
          <div className="form-section">
            <h2>Project Details</h2>

            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="My Amazing Project"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your project..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Web Development</option>
                <option>App Development</option>
                <option>Design</option>
                <option>Photography</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Project Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              <small>Max file size: 10MB</small>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <label htmlFor="featured">Featured on homepage</label>
            </div>
          </div>

          <div className="form-section">
            <h2>Technologies Used</h2>
            <div className="tags-input-group">
              <div className="tags-input">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g., React, Node.js"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                />
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="btn btn-primary btn-sm"
                >
                  Add
                </button>
              </div>
              <div className="tags-display">
                {formData.technologies.map((tech, index) => (
                  <span key={index} className="tag">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(index)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Project Links</h2>
            <div className="links-input-group">
              <div className="link-input">
                <input
                  type="text"
                  value={linkInput.title}
                  onChange={(e) => setLinkInput({ ...linkInput, title: e.target.value })}
                  placeholder="Link title (e.g., Live Demo)"
                />
                <input
                  type="url"
                  value={linkInput.url}
                  onChange={(e) => setLinkInput({ ...linkInput, url: e.target.value })}
                  placeholder="https://example.com"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="btn btn-primary btn-sm"
                >
                  Add Link
                </button>
              </div>
              <div className="links-display">
                {formData.links.map((link, index) => (
                  <div key={index} className="link-item">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      🔗 {link.title}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="link-remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Portfolio' : 'Create Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
