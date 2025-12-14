import PropTypes from 'prop-types'
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
  const {
    isExpanded,
    hasMore,
    displayedCount,
    containerRef,
    maxHeight,
    toggleExpand,
  } = useProgressiveDisclosure(INITIAL_PROJECTS_COUNT, v2Projects.length, PROJECTS_GRID_MAX_HEIGHT)

  const displayedProjects = v2Projects.slice(0, displayedCount)

  return (
    <div className="v2-projects-container" style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        className="v2-projects-grid"
        style={{
          maxHeight: maxHeight || PROJECTS_GRID_MAX_HEIGHT,
          overflow: 'hidden',
          transition: 'max-height 0.5s ease',
        }}
      >
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore && !isExpanded && (
        <>
          <div
            className="v2-projects-fade-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: FADE_OVERLAY_HEIGHT,
              background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div
            className="v2-expand-button-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.5rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <button
              onClick={toggleExpand}
              className="v2-expand-button"
              aria-expanded={isExpanded}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Show all</span>
              <span
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <ArrowDown size={16} />
              </span>
            </button>
          </div>
        </>
      )}

      {isExpanded && (
        <div
          className="v2-expand-button-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}
        >
          <button
            onClick={toggleExpand}
            className="v2-expand-button"
            aria-expanded={isExpanded}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Show less</span>
            <span
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <ArrowDown size={16} />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

ProjectsGrid.propTypes = {}
