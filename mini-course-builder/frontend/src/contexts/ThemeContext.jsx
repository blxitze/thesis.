import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const theme_data = useContext(ThemeContext)
  if (!theme_data) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme_data
}

export const ThemeProvider = ({ children }) => {
  const [is_dark, set_dark] = useState(true)

  useEffect(() => {
    const saved_theme = localStorage.getItem('theme')
    if (saved_theme) {
      set_dark(saved_theme === 'dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', is_dark ? 'dark' : 'light')
    localStorage.setItem('theme', is_dark ? 'dark' : 'light')
  }, [is_dark])

  const toggle_theme = () => {
    set_dark(!is_dark)
  }

  return (
    <ThemeContext.Provider value={{ is_dark, toggle_theme }}>
      {children}
    </ThemeContext.Provider>
  )
} 