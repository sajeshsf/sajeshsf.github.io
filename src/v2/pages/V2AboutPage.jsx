export default function V2AboutPage() {
  return (
    <article aria-labelledby="about-title">
      <h1 id="about-title">About</h1>
      <p>
        This page will hold the professional bio, with a clear focus on accessibility in
        engineering practice (inclusive design, semantic HTML, keyboard UX, and measurable
        quality gates).
      </p>

      <section aria-labelledby="accessibility-title" style={{ marginTop: '1.25rem' }}>
        <h2 id="accessibility-title">Accessibility focus</h2>
        <div className="v2-grid">
          <div className="v2-card">
            <h3 style={{ marginTop: 0 }}>Keyboard-first UX</h3>
            <p className="v2-muted">
              Ensure every interaction works without a mouse, with visible focus and logical
              tab order.
            </p>
          </div>
          <div className="v2-card">
            <h3 style={{ marginTop: 0 }}>Semantic structure</h3>
            <p className="v2-muted">
              Use headings/landmarks consistently so assistive tech can navigate reliably.
            </p>
          </div>
          <div className="v2-card">
            <h3 style={{ marginTop: 0 }}>Testable standards</h3>
            <p className="v2-muted">
              Bake in checks (linting, contrast expectations, and manual screen reader
              spot-checks).
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
