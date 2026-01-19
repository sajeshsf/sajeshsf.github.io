# Config

Configuration and constants for the portfolio website.

## constants.js

Centralized configuration file containing all application constants.

### Progressive Disclosure

```javascript
INITIAL_PROJECTS_COUNT = 6           // Initial number of projects to show
INITIAL_TIMELINE_ITEMS = 2           // Initial number of timeline items to show
PROJECTS_GRID_MAX_HEIGHT = '800px'   // Max height for projects grid
TIMELINE_MAX_HEIGHT = '600px'        // Max height for timeline
FADE_OVERLAY_HEIGHT = '120px'        // Height of fade overlay
```

### Expandable Text

```javascript
DEFAULT_MAX_LENGTH = 500             // Default max length for text truncation
CHARS_PER_LINE = 80                  // Characters per line estimate
DEFAULT_FADE_LINES = 3               // Default number of lines before fade
```

### Scroll Animations

```javascript
SCROLL_PARALLAX_FACTOR = 0.5         // Parallax scroll factor (0-1)
SCROLL_FADE_START = 300              // Pixel position where fade starts
HERO_SCROLL_THRESHOLD = 0.1          // 10% of hero height to show header
SCROLL_THROTTLE_MS = 16              // Throttle interval (~60fps)
```

### Intersection Observer

```javascript
INTERSECTION_THRESHOLD = 0.1         // Visibility threshold (0-1)
INTERSECTION_ROOT_MARGIN = '0px 0px -100px 0px'  // Root margin for intersection
```

### Page IDs

```javascript
PAGE_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  WRITING: 'writing'
}
```

### Environment

```javascript
IS_DEVELOPMENT = import.meta.env.DEV  // True in development mode
```

## Usage

Import constants where needed:

```javascript
import {
  INITIAL_PROJECTS_COUNT,
  HERO_SCROLL_THRESHOLD,
  PAGE_IDS
} from './config/constants.js'
```

## Customization

Modify constants to adjust:
- Number of items shown initially
- Scroll animation behavior
- Fade and truncation settings
- Threshold values for interactions

## Best Practices

1. **Centralization**: Keep all constants in this file
2. **Naming**: Use UPPER_SNAKE_CASE for constants
3. **Documentation**: Add comments for complex values
4. **Grouping**: Group related constants together
5. **Immutability**: Constants should never be modified at runtime

## Related Documentation

- [Utils](../utils/README.md) - Utilities that use these constants
- [Components](../components/README.md) - Components that use these constants
- [Pages](../pages/README.md) - Pages that use these constants
