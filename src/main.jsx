import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApplicationContext } from './context/Application.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ApplicationContext>
  </StrictMode>,
)
