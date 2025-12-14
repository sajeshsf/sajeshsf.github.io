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
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="v2-error-boundary">
          <div className="v2-card">
            <h1>Something went wrong</h1>
            <p className="v2-muted" style={{ marginBottom: '1.5rem' }}>
              An unexpected error occurred. Please try reloading the page.
            </p>
            <button onClick={this.handleReload}>
              Reload Page
            </button>
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
