export default function V2AboutPage() {
  return (
    <article aria-labelledby="about-title">
      <h1 id="about-title">About</h1>
      
      <div className="v2-bento-grid">
        <section aria-labelledby="headshot-title" className="v2-card">
          <h2 id="headshot-title" style={{ marginTop: 0, marginBottom: '1rem' }}>
            Professional Image
          </h2>
          <div
            className="v2-image-placeholder"
            role="img"
            aria-label="Professional headshot placeholder"
          />
        </section>

        <section aria-labelledby="summary-title" className="v2-card v2-bento-span-2">
          <h2 id="summary-title" style={{ marginTop: 0, marginBottom: '1rem' }}>
            Executive Summary
          </h2>
          <p className="v2-muted" style={{ margin: 0, lineHeight: '1.8' }}>
            Executive summary to be added.
          </p>
        </section>
      </div>
    </article>
  )
}
