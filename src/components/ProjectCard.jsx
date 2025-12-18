import PropTypes from 'prop-types'
import { ArrowRight } from './ArrowIcon.jsx'

export default function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <a href={`/projects/#${project.id}`} className="project-link">
        <div className="project-header">
          <div className="project-content">
            <p className="text-muted no-margin margin-bottom-sm font-size-xs">
              {project.year}
            </p>
            <h2 className="project-title">
              {project.title}
            </h2>
          </div>
          <span className="project-chevron">
            <ArrowRight size={20} />
          </span>
        </div>
      </a>
    </article>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
}
