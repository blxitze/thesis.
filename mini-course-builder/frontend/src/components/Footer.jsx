import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import logo from '../assets/logo.png'
import sunIcon from '../assets/sun.png'
import moonIcon from '../assets/moon.png'

function Footer() {
  const { is_dark, toggle_theme } = useTheme()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src={logo} 
                  alt="CourseForge Logo" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>CourseForge</h3>
              </div>
            </Link>
            <p className="text-muted" style={{ maxWidth: '300px', lineHeight: '1.6' }}>
              Create professional courses with AI-powered content generation. 
              Transform your expertise into engaging learning experiences.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/create" className="footer-link">Create Course</Link></li>
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#how-it-works" className="footer-link">How it Works</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Settings</h4>
            <div className="theme-toggle">
              <button 
                onClick={toggle_theme}
                className="btn btn-secondary"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem'
                }}
              >
                <img 
                  src={is_dark ? sunIcon : moonIcon}
                  alt={is_dark ? 'Sun' : 'Moon'}
                  style={{ 
                    width: '1rem', 
                    height: '1rem',
                    filter: 'var(--icon-filter)'
                  }}
                />
                {is_dark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="social-links" style={{ marginTop: '1rem' }}>
              <a href="https://github.com/blxitze" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="flex items-center justify-between">
            <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
              © 2025 CourseForge. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/blxitze" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: '0.875rem' }}>
                Made by @blxitze
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 