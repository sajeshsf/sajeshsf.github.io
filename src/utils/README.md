# V2 Utils

Utility functions and React hooks.

## Hooks

- **useScroll.js** - Tracks window scroll position for parallax effects
- **useHash.js** - React hook for hash-based routing (e.g., `#project-id`)
- **useProgressiveDisclosure.js** - Reusable hook for expand/collapse patterns with fade-out

## Utilities

- **slugify.js** - Converts strings to URL-friendly slugs (used for IDs)

## Usage

```javascript
// Scroll tracking
const scrollY = useScroll()

// Hash routing
const hash = useHash()

// Progressive disclosure
const { isExpanded, hasMore, showAll, displayedCount, maxHeight } = 
  useProgressiveDisclosure(initialCount, totalCount, maxHeight)
```
