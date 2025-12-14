import { experience } from '../../data/experience.js'

export default function V2ExperiencePage() {
  return (
    <section aria-labelledby="experience-title">
      <h1 id="experience-title">Experience</h1>
      <p className="v2-muted">
        Employment history and roles. (Using your existing data for now.)
      </p>

      <div style={{ marginTop: '1.25rem', display: 'grid', gap: '1rem' }}>
        {experience.map((role) => (
          <article key={`${role.company}-${role.role}`} className="v2-card">
            <header>
              <h2 style={{ margin: 0 }}>{role.role}</h2>
              <p className="v2-muted" style={{ margin: '0.35rem 0 0' }}>
                {role.company} · {role.period}
              </p>
            </header>

            {Array.isArray(role.highlights) && role.highlights.length > 0 ? (
              <ul>
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
