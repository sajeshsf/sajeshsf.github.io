export default function V2AboutPage() {
  return (
    <article aria-labelledby="about-title">
      <h1 id="about-title">About</h1>
      <div className="v2-grid" style={{ marginTop: '1.25rem' }}>
        <section aria-labelledby="headshot-title" className="v2-card">
          <h2 id="headshot-title" style={{ marginTop: 0 }}>
            Professional image
          </h2>
          <div
            className="v2-image-placeholder"
            role="img"
            aria-label="Professional headshot placeholder"
          />
        </section>

        <section aria-labelledby="summary-title" className="v2-card">
          <h2 id="summary-title" style={{ marginTop: 0 }}>
            Executive summary
          </h2>
          <p className="v2-muted" style={{ margin: 0 }}>
            Summary TBD.
          </p>
        </section>
      </div>
    </article>
  )
}
