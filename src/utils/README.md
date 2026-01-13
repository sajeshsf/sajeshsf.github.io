# Utils

Utility functions and React hooks for the portfolio website.

## Hooks

### useHash.js

React hook for hash-based routing. Tracks and updates when the URL hash changes.

**Usage:**
```javascript
import { useHash } from './utils/useHash.js'

function MyComponent() {
  const hash = useHash()
  // hash will be the current URL hash (e.g., '#projects#my-project')

  // React to hash changes
  useEffect(() => {
    if (hash) {
      // Handle hash change
    }
  }, [hash])
}
```

**Returns:** Current URL hash string (e.g., `'#projects#my-project'` or `''`)

### useScroll.js

Tracks window scroll position for parallax effects and scroll animations.

**Usage:**
```javascript
import { useScroll } from './utils/useScroll.js'

function MyComponent() {
  const scrollY = useScroll()
  // scrollY is the current vertical scroll position
}
```

**Returns:** Current vertical scroll position in pixels

**Throttling:** Scroll events are throttled for performance (see `config/constants.js`)

### useProgressiveDisclosure.js

Reusable hook for expand/collapse patterns with fade-out truncation.

**Usage:**
```javascript
import { useProgressiveDisclosure } from './utils/useProgressiveDisclosure.js'

function MyComponent({ items }) {
  const { isExpanded, hasMore, showAll, displayedCount } =
    useProgressiveDisclosure(6, items.length, '800px')

  return (
    <>
      {items.slice(0, displayedCount).map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
      {hasMore && !isExpanded && (
        <button onClick={showAll}>Show More</button>
      )}
    </>
  )
}
```

**Parameters:**
- `initialCount` - Number of items to show initially
- `totalCount` - Total number of items
- `maxHeight` - Maximum height before truncation (e.g., '800px')

**Returns:**
- `isExpanded` - Whether all items are shown
- `hasMore` - Whether there are more items to show
- `showAll` - Function to show all items
- `displayedCount` - Current number of items displayed
- `maxHeight` - Maximum height value

## Utilities

### slugify.js

Converts strings to URL-friendly slugs for use as IDs.

**Usage:**
```javascript
import { slugify } from './utils/slugify.js'

const id = slugify('My Project Name') // 'my-project-name'
const id2 = slugify('Company Name - Role Title') // 'company-name-role-title'
```

**Function:**
```javascript
export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
}
```

**Use Cases:**
- Generating IDs from titles
- Creating hash fragments for routing
- Matching timeline items with experience data

## Best Practices

1. **Hooks**: Use hooks for React stateful logic (scroll, hash, progressive disclosure)
2. **Pure Functions**: Utilities should be pure functions (no side effects)
3. **Reusability**: Design utilities to be reusable across components
4. **Performance**: Throttle/debounce event handlers where appropriate
5. **Type Safety**: Consider adding JSDoc comments for better IDE support

## Related Documentation

- [Components](../components/README.md) - Components that use these utilities
- [Pages](../pages/README.md) - Pages that use these utilities
- [Config](../config/README.md) - Configuration constants used by utilities
