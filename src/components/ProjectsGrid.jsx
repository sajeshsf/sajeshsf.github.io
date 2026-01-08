import PropTypes from 'prop-types'
import { projects } from '../data/projects.js'
import { useProgressiveDisclosure } from '../utils/useProgressiveDisclosure.js'
import {
  INITIAL_PROJECTS_COUNT,
  PROJECTS_GRID_MAX_HEIGHT,
  FADE_OVERLAY_HEIGHT,
} from '../config/constants.js'
import ProjectCard from './ProjectCard.jsx'
import { ArrowDown } from './ArrowIcon.jsx'

export default function ProjectsGrid() {
  const {
    isExpanded,
    hasMore,
    displayedCount,
    containerRef,
    maxHeight,
    toggleExpand,
  } = useProgressiveDisclosure(INITIAL_PROJECTS_COUNT, projects.length, PROJECTS_GRID_MAX_HEIGHT)

  const displayedProjects = projects.slice(0, displayedCount)

  return (
    <div className="projects-container position-relative">
      <div
        ref={containerRef}
        className="projects-grid projects-grid-wrapper"
        style={{
          maxHeight: maxHeight || PROJECTS_GRID_MAX_HEIGHT,
        }}
      >
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore && !isExpanded && (
        <>
          <div
            className="projects-fade-overlay position-absolute"
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              height: FADE_OVERLAY_HEIGHT,
              background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
            }}
          />
          <div className="expand-button-wrapper">
            <button
              onClick={toggleExpand}
              className="expand-button-base"
              aria-expanded={isExpanded}
            >
              <span>Show all</span>
              <span className={`expand-arrow ${isExpanded ? 'expand-arrow--rotated' : ''}`}>
                <ArrowDown size={16} />
              </span>
            </button>
          </div>
        </>
      )}

      {isExpanded && (
        <div className="expand-button-wrapper">
          <button
            onClick={toggleExpand}
            className="expand-button-base"
            aria-expanded={isExpanded}
          >
            <span>Show less</span>
            <span className="expand-arrow expand-arrow--rotated">
              <ArrowDown size={16} />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

ProjectsGrid.propTypes = {}
