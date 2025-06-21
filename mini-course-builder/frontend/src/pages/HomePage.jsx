import { Link } from 'react-router-dom'
import TypewriterHero from '../components/TypewriterHero'
import aiIcon from '../assets/ai.png'
import lightningIcon from '../assets/lightning.png'
import paletteIcon from '../assets/palette.png'
import mobileIcon from '../assets/mobile-friendly.png'
import lockIcon from '../assets/lock.png'
import analyticsIcon from '../assets/analytics.png'

function HomePage() {
  return (
    <div className="py-24">
      <div className="text-center mb-32" style={{ marginTop: '4rem' }}>
        <TypewriterHero />
        <p className="text-muted mb-8" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Transform your expertise into engaging courses with our AI-powered course builder. 
          Simple, fast, and professional.
        </p>
        <Link to="/create" className="btn btn-hero btn-ripple floating">
          Start Creating →
        </Link>
      </div>

      <div id="how-it-works" className="mb-36" style={{ marginTop: '5rem'}}>
        <h2 className="heading-md text-center mb-20" style={{ marginTop: '5rem', marginBottom: '3rem', fontSize: '3rem'}}>How it Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {[
            {
              step: '1',
              title: 'Define Your Course',
              description: 'Enter your topic, target audience, and module titles'
            },
            {
              step: '2', 
              title: 'AI Creates Content',
              description: 'Our AI generates a complete course outline with learning objectives'
            },
            {
              step: '3',
              title: 'Download & Share',
              description: 'Get a professional PDF ready to share with your students'
            }
          ].map((item, index) => (
            <div key={index} className="card text-center step-card">
              <div className="btn-primary step-number" style={{ 
                width: '3rem', 
                height: '3rem', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}>
                {item.step}
              </div>
              <h3 className="heading-sm">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-40" style={{ marginTop: '6rem' }}>
        <div className="card" style={{ padding: '4rem', background: 'linear-gradient(135deg, rgba(0, 255, 247, 0.1), rgba(193, 71, 233, 0.1))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            {[
              { number: '10,000+', label: 'Courses Created' },
              { number: '50,000+', label: 'Happy Users' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center stat-item">
                <div className="heading-lg stat-number" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {stat.number}
                </div>
                <div className="text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="features" className="mb-40" style={{ marginTop: '6rem' }}>
        <h2 className="heading-md text-center mb-24" style={{ marginTop: '5rem', marginBottom: '3rem', fontSize: '3rem' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {[
            { icon: aiIcon, title: 'AI-Powered', description: 'Advanced GPT-4 content generation' },
            { icon: lightningIcon, title: 'Fast Creation', description: 'Generate courses in under a minute' },
            { icon: paletteIcon, title: '10 Design Themes', description: 'Choose from professional templates' },
            { icon: mobileIcon, title: 'Mobile Friendly', description: 'Works perfectly on all devices' },
            { icon: lockIcon, title: 'Secure & Private', description: 'Your data is encrypted and never shared' },
            { icon: analyticsIcon, title: 'Analytics Ready', description: 'Track engagement and learning progress' }
          ].map((feature, index) => (
            <div key={index} className="card text-center feature-card" style={{ padding: '2.5rem' }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="feature-icon"
                  style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    objectFit: 'contain',
                    filter: 'var(--icon-filter, brightness(0) saturate(100%) invert(100%))'
                  }} 
                />
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '1rem' }}>{feature.title}</h3>
              <p className="text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center" style={{ marginTop: '8rem' }}>
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem' }}>
          <h2 className="heading-md mb-4">Ready to Get Started?</h2>
          <p className="text-muted mb-6">
            Join thousands of educators creating professional courses with AI
          </p>
          <Link to="/create" className="btn btn-hero btn-ripple">
            Create Your First Course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage 