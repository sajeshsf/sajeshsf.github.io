import { projects } from '../../data/projects.js'

export default function V2ProjectsPage() {
  return (
    <section aria-labelledby="projects-title">
      <h1 id="projects-title">Projects</h1>
      <p className="v2-muted">Featured apps, courses, and themes. (Wiring to your existing list for now.)</p>

      <div className="v2-grid" style={{ marginTop: '1.25rem' }}>
        {projects.map((p) => (
          <article key={p.title} className="v2-card">
            <h2 style={{ marginTop: 0 }}>{p.title}</h2>
            <p className="v2-muted">{p.description}</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {p.live ? <a href={p.live}>Live</a> : null}
              {p.repo ? <a href={p.repo}>Code</a> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
