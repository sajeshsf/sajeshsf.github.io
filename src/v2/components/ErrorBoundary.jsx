import { Component } from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    // In production, you could log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="v2-error-boundary">
          <div className="v2-container">
            <div className="v2-card">
              <h1>Something went wrong</h1>
              <p className="v2-muted" style={{ marginBottom: 'var(--spacing-lg)' }}>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

