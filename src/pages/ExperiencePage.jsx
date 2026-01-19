import { timeline } from '../data/timeline.js'
import { useHash } from '../utils/useHash.js'
import { experience } from '../data/experience.js'
import { slugify } from '../utils/slugify.js'
import TimelineGrid from '../components/TimelineGrid.jsx'
import { ArrowLeft } from '../components/ArrowIcon.jsx'

function getIdFromHash(hash) {
  return String(hash || '').replace(/^#/, '').trim()
}

function ExperienceDetail({ item }) {
  // Find the full experience entry to get highlights
  // Match by creating the same ID format used in timeline
  const fullExperience = experience.find((exp) => {
    const expId = slugify(`${exp.role}-${exp.company}-${exp.period}`)
    return expId === item.id
  })

  // For education items, show education-specific content
  if (item.type === 'education') {
    return (
      <article aria-labelledby="experience-detail-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <a
            href="/"
            className="breadcrumb-link"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/#experience'
            }}
          >
            <ArrowLeft size={16} />
            Back to timeline
          </a>
        </nav>

        <header className="card">
          <p className="text-muted no-margin font-size-sm">
            {item.dateLabel}
          </p>
          <h1 id="experience-detail-title" className="detail-header">
            {item.role}
          </h1>
          <p className="text-muted margin-top-sm font-size-lg">
            {item.org}
          </p>
        </header>
      </article>
    )
  }

  return (
    <article aria-labelledby="experience-detail-title">
      <nav aria-label="Breadcrumb" className="breadcrumb-nav">
        <a
          href="/"
          className="breadcrumb-link-alt"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/#experience'
          }}
        >
          <ArrowLeft size={16} />
          Back to timeline
        </a>
      </nav>

      <header className="card">
        <p className="text-muted no-margin font-size-sm">
          {item.dateLabel}
        </p>
        <h1 id="experience-detail-title" className="detail-header">
          {item.role}
        </h1>
        <p className="text-muted margin-top-sm font-size-lg">
          {item.org}
        </p>
        {fullExperience?.focus && (
          <p className="text-muted margin-top-md text-italic font-size-md">
            {fullExperience.focus}
          </p>
        )}
      </header>

      {fullExperience?.highlights && fullExperience.highlights.length > 0 && (
        <section className="card margin-top-2xl" aria-labelledby="role-highlights-title">
          <h2 id="role-highlights-title" className="detail-subheader">
            Key Achievements
          </h2>
          <ul className="highlights-list">
            {fullExperience.highlights.map((highlight, idx) => (
              <li key={idx} className="highlight-item">
                <span className="text-muted font-size-lg">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

function ExperienceTimeline() {
  return <TimelineGrid />
}

export default function ExperiencePage() {
  const hash = useHash()
  const selectedId = getIdFromHash(hash)
  const selected = selectedId ? timeline.find((t) => t.id === selectedId) : null

  return (
    <section aria-labelledby={selected ? 'experience-detail-title' : 'experience-title'}>
      {!selected && <h1 id="experience-title">Experience</h1>}

      <div className="section-spacer">
        {selected ? <ExperienceDetail item={selected} /> : <ExperienceTimeline />}
      </div>
    </section>
  )
}
