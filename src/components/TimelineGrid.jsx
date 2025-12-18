import PropTypes from 'prop-types'
import { timeline } from '../data/timeline.js'
import { useProgressiveDisclosure } from '../utils/useProgressiveDisclosure.js'
import {
  INITIAL_TIMELINE_ITEMS,
  TIMELINE_MAX_HEIGHT,
  FADE_OVERLAY_HEIGHT,
} from '../config/constants.js'
import TimelineItem from './TimelineItem.jsx'
import { ArrowDown } from './ArrowIcon.jsx'

export default function TimelineGrid() {
  const {
    isExpanded,
    hasMore,
    displayedCount,
    containerRef,
    maxHeight,
    toggleExpand,
  } = useProgressiveDisclosure(INITIAL_TIMELINE_ITEMS, timeline.length, TIMELINE_MAX_HEIGHT)

  const displayedItems = timeline.slice(0, displayedCount)

  return (
    <div className="timeline-container" style={{ position: 'relative' }}>
      <ul
        ref={containerRef}
        className="timeline"
        style={{
          maxHeight: maxHeight || TIMELINE_MAX_HEIGHT,
          overflow: 'hidden',
          transition: 'max-height 0.5s ease',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {displayedItems.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ul>

      {hasMore && !isExpanded && (
        <>
          <div
            className="timeline-fade-overlay"
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
            className="expand-button-container"
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
              className="expand-button"
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
          className="expand-button-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}
        >
          <button
            onClick={toggleExpand}
            className="expand-button"
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

TimelineGrid.propTypes = {}
