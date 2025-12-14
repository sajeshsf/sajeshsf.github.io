import { v2Projects } from '../data/projects.js'
import { useHash } from '../utils/useHash.js'

function getIdFromHash(hash) {
  return String(hash || '').replace(/^#/, '').trim()
}

function ProjectDetail({ project }) {
  return (
    <article aria-labelledby="project-detail-title">
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
        <a href="/v2/projects/">← Back to projects</a>
      </nav>

      <header className="v2-card">
        <p className="v2-muted" style={{ margin: 0 }}>
          {project.year || 'Year TBD'}
        </p>
        <h1 id="project-detail-title" style={{ margin: '0.35rem 0 0' }}>
          {project.title}
        </h1>
        <p className="v2-muted" style={{ margin: '0.35rem 0 0' }}>
          {project.headline || 'Headline TBD'}
        </p>
      </header>

      <section className="v2-card" style={{ marginTop: '1rem' }} aria-labelledby="project-details-title">
        <h2 id="project-details-title" style={{ marginTop: 0 }}>
          Details
        </h2>
        <p className="v2-muted" style={{ margin: 0 }}>
          Details TBD.
        </p>
      </section>
    </article>
  )
}

export default function V2ProjectsPage() {
  const hash = useHash()
  const selectedId = getIdFromHash(hash)
  const selected = selectedId ? v2Projects.find((p) => p.id === selectedId) : null

  return (
    <section aria-labelledby="projects-title">
      <h1 id="projects-title">Projects</h1>
      <p className="v2-muted" style={{ marginBottom: 0 }}>
        A grid of professional and personal projects. Select a card to open its detail view.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        {selected ? (
          <ProjectDetail project={selected} />
        ) : (
          <div className="v2-grid">
            {v2Projects.map((p) => (
              <article key={p.id} className="v2-card">
                <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>
                  <a href={`#${p.id}`}>{p.title}</a>
                </h2>
                <p className="v2-muted" style={{ margin: 0 }}>
                  {p.headline || 'Headline TBD'}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
