import { useState } from 'react'
import { v2Projects } from '../data/projects.js'
import { useHash } from '../utils/useHash.js'
import ExpandableText from '../components/ExpandableText.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { ArrowLeft, ArrowDown } from '../components/ArrowIcon.jsx'

function getIdFromHash(hash) {
  return String(hash || '').replace(/^#/, '').trim()
}

function parseDescriptionToBullets(description) {
  if (!description) return []
  
  // Split by " - " pattern first (common for sub-items like "Cloud Portal -", "Niox1900 -")
  let parts = description.split(/ - /)
  
  // If we got multiple parts, process each
  if (parts.length > 1) {
    const bullets = []
    // First part is usually the intro
    const intro = parts[0].trim()
    if (intro.length > 0) {
      bullets.push(intro)
    }
    
    // Remaining parts are sub-items
    for (let i = 1; i < parts.length; i++) {
      let bullet = parts[i].trim()
      // Clean up: remove trailing periods, handle sentence endings
      if (bullet.endsWith('.') && i < parts.length - 1) {
        // Check if next part starts with capital (new sentence)
        const nextPart = parts[i + 1]?.trim() || ''
        if (nextPart.length > 0 && /^[A-Z]/.test(nextPart)) {
          bullet = bullet.slice(0, -1)
        }
      }
      if (bullet.length > 0) {
        bullets.push(bullet)
      }
    }
    
    return bullets.filter(b => b.length > 0)
  }
  
  // If no " - " pattern, try splitting by product names or major sections
  // Look for patterns like "ProductName -" or "ProductName:"
  const productPattern = /([A-Z][a-zA-Z0-9]+(?: |\d+)?) - /g
  const matches = [...description.matchAll(productPattern)]
  
  if (matches.length > 0) {
    const bullets = []
    let lastIndex = 0
    
    matches.forEach((match, idx) => {
      // Add text before this match
      if (match.index > lastIndex) {
        const before = description.substring(lastIndex, match.index).trim()
        if (before.length > 0) {
          bullets.push(before)
        }
      }
      lastIndex = match.index + match[0].length
    })
    
    // Add remaining text
    if (lastIndex < description.length) {
      const remaining = description.substring(lastIndex).trim()
      if (remaining.length > 0) {
        bullets.push(remaining)
      }
    }
    
    if (bullets.length > 1) {
      return bullets
    }
  }
  
  // Fallback: split by sentence boundaries for long text
  if (description.length > 150) {
    const sentences = description
      .split(/\. (?=[A-Z])/)
      .filter(s => s.trim().length > 30)
      .map(s => s.trim().replace(/\.$/, ''))
    
    if (sentences.length > 1) {
      return sentences
    }
  }
  
  // If all else fails, return as single bullet
  return [description.trim()]
}

function ProjectDetail({ project }) {
  const bullets = parseDescriptionToBullets(project.headline)
  
  return (
    <article aria-labelledby="project-detail-title">
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
        <a 
          href="/v2/projects/" 
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
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
          Back to projects
        </a>
      </nav>

      <header className="v2-card">
        <p className="v2-muted" style={{ margin: 0, fontSize: '0.95rem' }}>
          {project.year || 'Year TBD'}
        </p>
        <h1 id="project-detail-title" style={{ margin: '0.75rem 0 0', fontSize: '2rem' }}>
          {project.title}
        </h1>
      </header>

      <section className="v2-card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.5rem' }}>
          Description
        </h2>
        {bullets.length > 0 ? (
          <ul 
            className="v2-muted" 
            style={{ 
              lineHeight: '1.8', 
              fontSize: '1.05rem',
              margin: 0,
              paddingLeft: '1.5rem',
              listStyleType: 'disc',
            }}
          >
            {bullets.map((bullet, index) => (
              <li key={index} style={{ marginBottom: '0.75rem' }}>
                {bullet}
              </li>
            ))}
          </ul>
        ) : (
          <div className="v2-muted" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
            {project.headline || 'Description TBD.'}
          </div>
        )}
      </section>
    </article>
  )
}

export default function V2ProjectsPage() {
  const hash = useHash()
  const selectedId = getIdFromHash(hash)
  const selected = selectedId ? v2Projects.find((p) => p.id === selectedId) : null
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Show first 6 projects initially (2 rows of 3)
  const initialProjectsCount = 6
  const displayedProjects = showAllProjects ? v2Projects : v2Projects.slice(0, initialProjectsCount)
  const hasMoreProjects = v2Projects.length > initialProjectsCount

  return (
    <section aria-labelledby="projects-title">
      <h1 id="projects-title">Projects</h1>
      <p className="v2-muted" style={{ marginBottom: 0 }}>
        Professional and personal projects. Click a card to view details.
      </p>

      <div style={{ marginTop: '1.25rem', position: 'relative' }}>
        {selected ? (
          <ProjectDetail project={selected} />
        ) : (
          <>
            <div 
              className="v2-projects-grid"
              style={{
                maxHeight: showAllProjects ? 'none' : '600px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {displayedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            
            {!showAllProjects && hasMoreProjects && (
              <>
                <div 
                  className="v2-projects-fade-overlay"
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
                    onClick={() => setShowAllProjects(true)}
                    className="v2-expand-projects-button"
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
          </>
        )}
      </div>
    </section>
  )
}
