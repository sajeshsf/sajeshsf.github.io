import { ArrowRight } from './ArrowIcon.jsx'

export default function ProjectCard({ project }) {
  return (
    <article className="v2-card v2-project-card">
      <a 
        href={`/v2/projects/#${project.id}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="v2-muted" style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              {project.year}
            </p>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              lineHeight: '1.4',
              color: 'var(--text-primary)',
            }}>
              {project.title}
            </h2>
          </div>
          <span 
            style={{
              color: 'var(--text-secondary)',
              flexShrink: 0,
              marginTop: '1.5rem',
              transition: 'transform 0.2s ease, color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
            }}
            className="v2-project-chevron"
          >
            <ArrowRight size={20} />
          </span>
        </div>
      </a>
    </article>
  )
}
