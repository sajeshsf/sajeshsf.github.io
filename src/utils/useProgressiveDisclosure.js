import { useState, useEffect, useRef } from 'react'

/**
 * Hook for managing progressive disclosure with fade-out truncation
 * @param {number} initialCount - Number of items to show initially
 * @param {number} totalCount - Total number of items
 * @param {string} maxHeight - Maximum height when collapsed (CSS value)
 * @returns {object} - State and handlers for progressive disclosure
 */
export function useProgressiveDisclosure(initialCount, totalCount, maxHeight) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(initialCount)
  const containerRef = useRef(null)
  const [actualHeight, setActualHeight] = useState(null)

  const hasMore = totalCount > initialCount

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight
      setActualHeight(`${height}px`)
    }
  }, [displayedCount, isExpanded])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    setDisplayedCount(isExpanded ? initialCount : totalCount)
  }

  return {
    isExpanded,
    hasMore,
    displayedCount,
    containerRef,
    actualHeight,
    maxHeight: isExpanded ? actualHeight : maxHeight,
    toggleExpand,
  }
}
