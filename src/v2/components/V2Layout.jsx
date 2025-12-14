import V2Nav from './V2Nav.jsx'

export default function V2Layout({ currentPage, children }) {
  return (
    <div className="v2">
      <a className="v2-skip-link" href="#main">
        Skip to content
      </a>

      <header className="v2-header">
        <div className="v2-container v2-header__row">
          <a className="v2-brand" href="/v2/" aria-label="Sajesh S F home">
            Sajesh S F
          </a>
          <V2Nav currentPage={currentPage} />
        </div>
      </header>

      <main id="main" className="v2-main">
        <div className="v2-container">{children}</div>
      </main>

      <footer className="v2-footer">
        <div className="v2-container">
          <p className="v2-muted" style={{ margin: 0 }}>
            V2 pages are in progress. Back to the original one-page version at{' '}
            <a href="/">/</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}
