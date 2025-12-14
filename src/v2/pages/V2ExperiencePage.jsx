import { useState } from 'react'
import { timeline } from '../data/timeline.js'
import { useHash } from '../utils/useHash.js'
import { experience } from '../../data/experience.js'
import { slugify } from '../utils/slugify.js'
import ExpandableText from '../components/ExpandableText.jsx'
import TimelineItem from '../components/TimelineItem.jsx'
import { ArrowLeft, ArrowDown } from '../components/ArrowIcon.jsx'

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
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <a 
            href="/v2/experience/" 
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease',
            }}
          >
            <ArrowLeft size={16} />
            Back to timeline
          </a>
        </nav>

        <header className="v2-card">
          <p className="v2-muted" style={{ margin: 0, fontSize: '0.95rem' }}>
            {item.dateLabel}
          </p>
          <h1 id="experience-detail-title" style={{ margin: '0.75rem 0 0', fontSize: '2rem' }}>
            {item.role}
          </h1>
          <p className="v2-muted" style={{ margin: '0.5rem 0 0', fontSize: '1.05rem' }}>
            {item.org}
          </p>
        </header>
      </article>
    )
  }

  return (
    <article aria-labelledby="experience-detail-title">
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
        <a 
          href="/v2/experience/" 
          style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'color 0.2s ease',
          }}
        >
          <ArrowLeft size={16} />
          Back to timeline
        </a>
      </nav>

      <header className="v2-card">
        <p className="v2-muted" style={{ margin: 0, fontSize: '0.95rem' }}>
          {item.dateLabel}
        </p>
        <h1 id="experience-detail-title" style={{ margin: '0.75rem 0 0', fontSize: '2rem' }}>
          {item.role}
        </h1>
        <p className="v2-muted" style={{ margin: '0.5rem 0 0', fontSize: '1.05rem' }}>
          {item.org}
        </p>
        {fullExperience?.focus && (
          <p className="v2-muted" style={{ margin: '0.75rem 0 0', fontStyle: 'italic', fontSize: '1rem' }}>
            {fullExperience.focus}
          </p>
        )}
      </header>

      {fullExperience?.highlights && fullExperience.highlights.length > 0 && (
        <section className="v2-card" style={{ marginTop: '1.5rem' }} aria-labelledby="role-highlights-title">
          <h2 id="role-highlights-title" style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.5rem' }}>
            Key Achievements
          </h2>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', listStyle: 'disc' }}>
            {fullExperience.highlights.map((highlight, idx) => (
              <li key={idx} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                <span className="v2-muted" style={{ fontSize: '1.05rem' }}>
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
  const [showAllItems, setShowAllItems] = useState(false)
  
  // Show first 2 items initially
  const initialItemsCount = 2
  const displayedItems = showAllItems ? timeline : timeline.slice(0, initialItemsCount)
  const hasMoreItems = timeline.length > initialItemsCount

  return (
    <div style={{ position: 'relative' }}>
      <ol 
        className="v2-timeline" 
        aria-label="Experience and education timeline"
        style={{
          maxHeight: showAllItems ? 'none' : '300px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {displayedItems.map((item) => (
          <TimelineItem 
            key={item.id} 
            item={item}
          />
        ))}
      </ol>
      
      {!showAllItems && hasMoreItems && (
        <>
          <div 
            className="v2-timeline-fade-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <button
              onClick={() => setShowAllItems(true)}
              className="v2-expand-timeline-button"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Show all</span>
              <ArrowDown size={18} />
            </button>
          </div>
        </>
      )}
    </div>
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
        Timeline view of professional roles and education. Click an item to view details.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        {selected ? <ExperienceDetail item={selected} /> : <ExperienceTimeline />}
      </div>
    </section>
  )
}
