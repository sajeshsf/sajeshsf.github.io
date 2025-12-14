import { useState } from 'react'

/**
 * Hook for progressive disclosure pattern (fade-out truncation with expand button)
 * @param {number} initialCount - Number of items to show initially
 * @param {number} totalCount - Total number of items
 * @param {number} maxHeight - Maximum height in pixels when collapsed
 * @returns {object} - State and handlers for progressive disclosure
 */
export function useProgressiveDisclosure(initialCount, totalCount, maxHeight) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = totalCount > initialCount

  return {
    isExpanded,
    hasMore,
    showAll: () => setIsExpanded(true),
    displayedCount: isExpanded ? totalCount : initialCount,
    maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
  }
}

