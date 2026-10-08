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

export default function TimelineGrid({ initialCount = INITIAL_TIMELINE_ITEMS }) {
  const totalCount = timeline.length
  const {
    isExpanded,
    hasMore,
    displayedCount,
    containerRef,
    maxHeight,
    toggleExpand,
  } = useProgressiveDisclosure(initialCount, totalCount, TIMELINE_MAX_HEIGHT)

  const displayedItems = timeline.slice(0, displayedCount)

  return (
    <div className="timeline-container" style={{ position: 'relative' }}>
      <ul
        ref={containerRef}
        className="timeline"
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          ...(hasMore
            ? {
                maxHeight: maxHeight || TIMELINE_MAX_HEIGHT,
                overflow: 'hidden',
                transition: 'max-height 0.5s ease',
              }
            : {}),
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
            <span className={`expand-arrow ${isExpanded ? 'expand-arrow--rotated' : ''}`}>
              <ArrowDown size={16} />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

TimelineGrid.propTypes = {
  initialCount: PropTypes.number,
}
