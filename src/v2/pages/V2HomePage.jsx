export default function V2HomePage() {
  return (
    <section aria-labelledby="v2-home-title">
      <h1 id="v2-home-title">V2 pages</h1>
      <p className="v2-muted">
        This is a new page-based structure (separate URLs) built alongside the original
        single-page portfolio.
      </p>

      <div className="v2-grid" style={{ marginTop: '1.25rem' }}>
        <div className="v2-card">
          <h2 style={{ marginTop: 0 }}>About</h2>
          <p>Professional bio with an explicit focus on accessibility.</p>
          <a href="/v2/about/">Go to About</a>
        </div>
        <div className="v2-card">
          <h2 style={{ marginTop: 0 }}>Experience</h2>
          <p>Employment history and roles.</p>
          <a href="/v2/experience/">Go to Experience</a>
        </div>
        <div className="v2-card">
          <h2 style={{ marginTop: 0 }}>Projects</h2>
          <p>Featured apps, courses, and themes.</p>
          <a href="/v2/projects/">Go to Projects</a>
        </div>
        <div className="v2-card">
          <h2 style={{ marginTop: 0 }}>Writing</h2>
          <p>Technical articles and blog posts.</p>
          <a href="/v2/writing/">Go to Writing</a>
        </div>
      </div>

      <p className="v2-muted" style={{ marginTop: '1.25rem' }}>
        Tip: Use <span className="v2-kbd">Tab</span> to verify focus order and the skip link.
      </p>
    </section>
  )
}
