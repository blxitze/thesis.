import { useState } from 'react'
import { Link } from 'react-router-dom'
import rocketIcon from '../assets/rocket.png'
import eyeIcon from '../assets/eye.png'
import lockIcon from '../assets/lock.png'
import eyeClosedIcon from '../assets/closedeye.png'

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      console.log('Sign in data:', formData)
      alert('Sign in functionality not implemented yet')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="py-20" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
                  <div className="max-w-md mx-auto">
            <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.6s ease forwards' }}>
              <div className="mb-4">
              </div>
              <h1 className="heading-lg mb-4" style={{ fontSize: '2.5rem' }}>Welcome Back</h1>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                Sign in to your CourseForge account and continue creating amazing courses
              </p>
                        </div>

            <div className="card feature-card" style={{ 
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(0, 255, 247, 0.05), rgba(193, 71, 233, 0.05))',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 255, 247, 0.2)'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="email" className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                    style={{
                      paddingLeft: '3rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.email ? '2px solid var(--danger)' : '2px solid rgba(0, 255, 247, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--primary)',
                    fontSize: '1.2rem'
                  }}>
                    @
                  </div>
                </div>
                {errors.email && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    style={{
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.password ? '2px solid var(--danger)' : '2px solid rgba(0, 255, 247, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={lockIcon} 
                      alt="Lock" 
                      style={{ 
                        width: '1rem', 
                        height: '1rem',
                        filter: 'var(--icon-filter)'
                      }} 
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img 
                      src={showPassword ? eyeClosedIcon : eyeIcon} 
                      alt={showPassword ? 'Hide password' : 'Show password'} 
                      style={{ 
                        width: '1rem', 
                        height: '1rem',
                        filter: 'var(--icon-filter)'
                      }} 
                    />
                  </button>
                </div>
                {errors.password && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    id="remember"
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: 'var(--primary)'
                    }}
                  />
                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'var(--primary-hover)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--primary)'}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-ripple"
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  marginTop: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div className="animate-spin" style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }}></div>
                    Signing In...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <img 
                      src={rocketIcon} 
                      alt="Rocket" 
                      style={{ 
                        width: '1rem', 
                        height: '1rem',
                        filter: 'brightness(0) saturate(100%) invert(100%)'
                      }} 
                    />
                    Sign In
                  </span>
                )}
              </button>
            </form>

            <div style={{ 
              margin: '2rem 0', 
              position: 'relative', 
              textAlign: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--border), transparent)'
              }
            }}>
              <span style={{ 
                background: 'var(--card)', 
                padding: '0 1rem', 
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
              }}>
                New to CourseForge?
              </span>
            </div>

            <div className="text-center">
              <Link 
                to="/signup" 
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <img 
                  src={rocketIcon} 
                  alt="Rocket" 
                  style={{ 
                    width: '1rem', 
                    height: '1rem',
                    filter: 'var(--icon-filter)'
                  }} 
                />
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage 