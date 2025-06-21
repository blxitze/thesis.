import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import PreviewPage from './pages/PreviewPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import './index.css'
import ClickSpark from './components/ClickSpark'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dark" style={{ position: 'relative' }}>
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <ParticlesBackground />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/preview" element={<PreviewPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </main>
            <Footer />
      </div>
        </ClickSpark>
      </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
