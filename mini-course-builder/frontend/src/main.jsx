import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root_element = document.getElementById('root')
const app_root = createRoot(root_element)

app_root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
