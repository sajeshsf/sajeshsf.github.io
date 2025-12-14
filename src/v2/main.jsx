import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './v2.css'
import V2App from './V2App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <V2App />
    </ErrorBoundary>
  </StrictMode>,
)
