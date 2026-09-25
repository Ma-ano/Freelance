import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PortfolioPage from './PortfolioPage.jsx'
import { findPortfolioByPath } from './data/team.js'

const isPortfolioPath = /^\/portfolio(?:\/|$)/i.test(window.location.pathname)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isPortfolioPath ? <PortfolioPage member={findPortfolioByPath(window.location.pathname)} /> : <App />}
  </StrictMode>,
)
