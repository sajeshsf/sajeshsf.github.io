import { timeline } from '../data/timeline.js'
import { useHash } from '../utils/useHash.js'

function getIdFromHash(hash) {
  return String(hash || '').replace(/^#/, '').trim()
}

function ExperienceDetail({ item }) {
  return (
    <article aria-labelledby="experience-detail-title">
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
        <a href="/v2/experience/">← Back to timeline</a>
      </nav>

      <header className="v2-card">
        <p className="v2-muted" style={{ margin: 0 }}>
          {item.dateLabel}
        </p>
        <h1 id="experience-detail-title" style={{ margin: '0.35rem 0 0' }}>
          {item.role}
        </h1>
        <p className="v2-muted" style={{ margin: '0.35rem 0 0' }}>
          {item.org}
        </p>
      </header>

      <section className="v2-card" style={{ marginTop: '1rem' }} aria-labelledby="role-summary-title">
        <h2 id="role-summary-title" style={{ marginTop: 0 }}>
          Details
        </h2>
        <p className="v2-muted" style={{ margin: 0 }}>
          Details TBD.
        </p>
      </section>
    </article>
  )
}

function ExperienceTimeline() {
  return (
    <ol className="v2-timeline" aria-label="Experience and education timeline">
      {timeline.map((item) => (
        <li key={item.id} className="v2-timeline__item">
          <div className="v2-timeline__marker" aria-hidden="true" />
          <div className="v2-timeline__content">
            <p className="v2-muted" style={{ margin: 0 }}>
              {item.dateLabel}
            </p>
            <h2 style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.1rem' }}>
              <a href={`#${item.id}`}>{item.role}</a>
            </h2>
            <p className="v2-muted" style={{ margin: 0 }}>
              {item.org}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function V2ExperiencePage() {
  const hash = useHash()
  const selectedId = getIdFromHash(hash)
  const selected = selectedId ? timeline.find((t) => t.id === selectedId) : null

  return (
    <section aria-labelledby="experience-title">
      <h1 id="experience-title">Experience</h1>
      <p className="v2-muted" style={{ marginBottom: 0 }}>
        Timeline view (jobs + education). Select an item to open its detail view.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        {selected ? <ExperienceDetail item={selected} /> : <ExperienceTimeline />}
      </div>
    </section>
  )
}
