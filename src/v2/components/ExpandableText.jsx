import { useState } from 'react'
import { ArrowDown } from './ArrowIcon.jsx'

export default function ExpandableText({ text, maxLength = 200, className = '', fadeLines = 2 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!text) return null
  
  const shouldTruncate = text.length > maxLength
  
  if (!shouldTruncate) {
    return <p className={className}>{text}</p>
  }

  // Calculate approximate lines (rough estimate: ~60 chars per line)
  const charsPerLine = 60
  const linesToShow = fadeLines
  const charsToShow = linesToShow * charsPerLine
  
  const displayText = isExpanded 
    ? text 
    : text.slice(0, charsToShow)

  return (
    <div className="v2-expandable-text" style={{ position: 'relative' }}>
      <p 
        className={className} 
        style={{ 
          margin: 0,
          lineHeight: '1.6',
          maxHeight: isExpanded ? 'none' : `${linesToShow * 1.6}em`,
          overflow: 'hidden',
        }}
      >
        {displayText}
        {!isExpanded && text.length > charsToShow && '...'}
      </p>
      
      {!isExpanded && (
        <div 
          className="v2-fade-overlay"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3em',
            background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0), var(--bg-card) 70%)',
            pointerEvents: 'none',
          }}
        />
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="v2-expand-button"
        aria-expanded={isExpanded}
        style={{
          marginTop: '0.75rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'color 0.2s ease',
        }}
      >
        <span>{isExpanded ? 'Show less' : 'Read more'}</span>
        <span 
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: '0.25rem',
          }}
        >
          <ArrowDown size={16} />
        </span>
      </button>
    </div>
  )
}
