import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import logo from '../assets/logo.png'
import sunIcon from '../assets/sun.png'
import moonIcon from '../assets/moon.png'

function Header() {
  const current_page = useLocation()
  const { is_dark, toggle_theme } = useTheme()

  return (
    <header className="py-4" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div style={{ 
              width: '5rem', 
              height: '5rem', 
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
              <h1 className="heading-sm" style={{ margin: 0 }}>CourseForge</h1>
              <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>
                AI Course Builder
              </p>
            </div>
          </Link>

          <nav className="flex gap-4 items-center">
            <Link 
              to="/" 
              className={current_page.pathname === '/' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={current_page.pathname === '/create' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              Create Course
            </Link>
            <Link 
              to="/signin" 
              className={current_page.pathname === '/signin' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className={current_page.pathname === '/signup' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              Sign Up
            </Link>
            <button 
              onClick={toggle_theme}
              className="btn btn-secondary"
              style={{ 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={is_dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <img 
                src={is_dark ? sunIcon : moonIcon}
                alt={is_dark ? 'Sun' : 'Moon'}
                style={{ 
                  width: '1.25rem', 
                  height: '1.25rem',
                  filter: 'var(--icon-filter)'
                }}
              />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 