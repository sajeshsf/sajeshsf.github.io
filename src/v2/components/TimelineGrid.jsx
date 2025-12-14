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
  const { isExpanded, hasMore, showAll, displayedCount, maxHeight } = useProgressiveDisclosure(
    INITIAL_TIMELINE_ITEMS,
    timeline.length,
    TIMELINE_MAX_HEIGHT
  )

  const displayedItems = timeline.slice(0, displayedCount)

  return (
    <div className="v2-progressive-disclosure">
      <ol
        className="v2-timeline"
        aria-label="Experience and education timeline"
        style={{ maxHeight, overflow: 'hidden', position: 'relative' }}
      >
        {displayedItems.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ol>

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

