import { useState } from 'react'
import { Link } from 'react-router-dom'
import rocketIcon from '../assets/rocket.png'
import eyeIcon from '../assets/eye.png'
import lockIcon from '../assets/lock.png'
import eyeClosedIcon from '../assets/closedeye.png'

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength === 0) return 'transparent'
    if (strength <= 2) return 'var(--danger)'
    if (strength <= 3) return 'var(--warning)'
    return 'var(--success)'
  }

  const getPasswordStrengthText = (strength) => {
    if (strength === 0) return ''
    if (strength <= 2) return 'Weak'
    if (strength <= 3) return 'Good'
    return 'Strong'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      console.log('Sign up data:', formData)
      alert('Sign up functionality not implemented yet')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="py-20" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.6s ease forwards' }}>
            <h1 className="heading-lg mb-4" style={{ fontSize: '2.5rem' }}>Join CourseForge</h1>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Create your account and start building amazing courses with AI
            </p>
          </div>

          <div className="card feature-card" style={{ 
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(193, 71, 233, 0.05), rgba(0, 255, 247, 0.05))',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(193, 71, 233, 0.2)'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="name" className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    style={{
                      paddingLeft: '3rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.name ? '2px solid var(--danger)' : '2px solid rgba(193, 71, 233, 0.3)',
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
                      src={rocketIcon} 
                      alt="Name" 
                      style={{ 
                        width: '1rem', 
                        height: '1rem',
                        filter: 'var(--icon-filter)'
                      }} 
                    />
                  </div>
                </div>
                {errors.name && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {errors.name}
                  </div>
                )}
              </div>

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
                      border: errors.email ? '2px solid var(--danger)' : '2px solid rgba(193, 71, 233, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--secondary)',
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
                    placeholder="Create a strong password"
                    style={{
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.password ? '2px solid var(--danger)' : '2px solid rgba(193, 71, 233, 0.3)',
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
                      alt="Password" 
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
                
                {formData.password && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.25rem', 
                      marginBottom: '0.25rem'
                    }}>
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          style={{
                            height: '0.25rem',
                            flex: 1,
                            backgroundColor: level <= passwordStrength ? getPasswordStrengthColor(passwordStrength) : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '0.125rem',
                            transition: 'background-color 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: getPasswordStrengthColor(passwordStrength),
                      fontWeight: '500'
                    }}>
                      {getPasswordStrengthText(passwordStrength)}
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    style={{
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: errors.confirmPassword ? '2px solid var(--danger)' : '2px solid rgba(193, 71, 233, 0.3)',
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
                      alt="Confirm Password" 
                      style={{ 
                        width: '1rem', 
                        height: '1rem',
                        filter: 'var(--icon-filter)'
                      }} 
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                      src={showConfirmPassword ? eyeClosedIcon : eyeIcon} 
                      alt={showConfirmPassword ? 'Hide password' : 'Show password'} 
                      style={{ 
                        width: '1rem', 
                        height: '1rem',
                        filter: 'var(--icon-filter)'
                      }} 
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {errors.confirmPassword}
                  </div>
                )}
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
                    Creating Account...
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
                    Create Account
                  </span>
                )}
              </button>
            </form>

            <div style={{ 
              margin: '2rem 0', 
              position: 'relative', 
              textAlign: 'center'
            }}>
              <span style={{ 
                background: 'var(--card)', 
                padding: '0 1rem', 
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
              }}>
                Already have an account?
              </span>
            </div>

            <div className="text-center">
              <Link 
                to="/signin" 
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
                  src={lockIcon} 
                  alt="Lock" 
                  style={{ 
                    width: '1rem', 
                    height: '1rem',
                    filter: 'var(--icon-filter)'
                  }} 
                />
                Sign In Instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage 