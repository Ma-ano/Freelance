import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    {/* reducedMotion="user" respects the OS-level prefers-reduced-motion setting */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
)
