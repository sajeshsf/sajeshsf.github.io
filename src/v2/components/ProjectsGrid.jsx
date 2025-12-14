import { v2Projects } from '../data/projects.js'
import { useProgressiveDisclosure } from '../utils/useProgressiveDisclosure.js'
import {
  INITIAL_PROJECTS_COUNT,
  PROJECTS_GRID_MAX_HEIGHT,
  FADE_OVERLAY_HEIGHT,
} from '../config/constants.js'
import ProjectCard from './ProjectCard.jsx'
import { ArrowDown } from './ArrowIcon.jsx'

export default function ProjectsGrid() {
  const { isExpanded, hasMore, showAll, displayedCount, maxHeight } = useProgressiveDisclosure(
    INITIAL_PROJECTS_COUNT,
    v2Projects.length,
    PROJECTS_GRID_MAX_HEIGHT
  )

  const displayedProjects = v2Projects.slice(0, displayedCount)

  return (
    <div className="v2-progressive-disclosure">
      <div
        className="v2-projects-grid"
        style={{ maxHeight, overflow: 'hidden', position: 'relative' }}
      >
        {displayedProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {!isExpanded && hasMore && (
        <>
          <div className="v2-fade-overlay" style={{ height: `${FADE_OVERLAY_HEIGHT}px` }} />
          <div className="v2-expand-button-container">
            <button onClick={showAll} className="v2-expand-button">
              <span>Show all</span>
              <ArrowDown size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

