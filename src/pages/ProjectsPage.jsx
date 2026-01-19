import { useEffect } from 'react'
import { projects } from '../data/projects.js'
import { useHash } from '../utils/useHash.js'
import ProjectsGrid from '../components/ProjectsGrid.jsx'
import { ArrowLeft } from '../components/ArrowIcon.jsx'

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

    matches.forEach((match) => {
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
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <a
          href="/projects/"
          className="breadcrumb-link"
          onClick={(e) => {
            e.preventDefault()
            window.location.hash = ''
            setTimeout(() => {
              const section = document.getElementById('projects-title')
              if (section) {
                section.scrollIntoView({ behavior: 'instant', block: 'start' })
              } else {
                window.scrollTo({ top: 0, behavior: 'instant' })
              }
            }, 0)
          }}
        >
          <ArrowLeft size={16} />
          Back to projects
        </a>
      </nav>

      <header className="card">
        <p className="text-muted no-margin font-size-sm">
          {project.year || 'Year TBD'}
        </p>
        <h1 id="project-detail-title" className="detail-header">
          {project.title}
        </h1>
      </header>

      <section className="card margin-top-2xl">
        <h2 className="detail-subheader">
          Description
        </h2>
        {bullets.length > 0 ? (
          <ul className="text-muted line-height-loose font-size-lg no-margin padding-left-md list-style-disc">
            {bullets.map((bullet, index) => (
              <li key={index} className="margin-bottom-md">
                {bullet}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted line-height-loose font-size-lg">
            {project.headline || 'Description TBD.'}
          </div>
        )}
      </section>
    </article>
  )
}

export default function ProjectsPage() {
  const hash = useHash()
  const selectedId = getIdFromHash(hash)
  const selected = selectedId ? projects.find((p) => p.id === selectedId) : null

  // Scroll to section heading when returning to list view (when hash is cleared)
  useEffect(() => {
    if (!selected) {
      // Scroll to the Projects section heading when returning to projects grid
      // Use a small delay to ensure DOM has updated
      setTimeout(() => {
        const section = document.getElementById('projects-title')
        if (section) {
          section.scrollIntoView({ behavior: 'instant', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }, 0)
    }
  }, [selected])

  return (
    <section aria-labelledby="projects-title">
      <h1 id="projects-title">Projects</h1>
      <p className="text-muted margin-bottom-0">
        Professional and personal projects. Click a card to view details.
      </p>

      <div className="section-spacer">
        {selected ? <ProjectDetail project={selected} /> : <ProjectsGrid />}
      </div>
    </section>
  )
}
