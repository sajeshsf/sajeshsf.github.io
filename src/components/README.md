# Components

Reusable UI components for the portfolio website.

## Core Components

### Layout Components

- **Layout.jsx** - Main layout wrapper with header, navigation, footer, and error boundary
- **Nav.jsx** - Navigation menu with smooth scroll support and responsive design
- **ErrorBoundary.jsx** - React error boundary for graceful error handling

### Display Components

- **TimelineGrid.jsx** - Timeline container with progressive disclosure for experience/education
- **TimelineItem.jsx** - Individual timeline entry component
- **ProjectsGrid.jsx** - Projects grid container with progressive disclosure
- **ProjectCard.jsx** - Individual project card component
- **BlogCollection.jsx** - Blog posts grid with category filtering

### UI Components

- **SEO.jsx** - Dynamic meta tag management for SEO
- **SocialLinks.jsx** - Social media links (LinkedIn, Email, Phone, GitHub) with modern SVG icons
- **ExpandableText.jsx** - Progressive disclosure for long text with fade-out truncation
- **RotatingTagline.jsx** - Rotating tagline component for hero section
- **ArrowIcon.jsx** - Modern SVG arrow icons (down, left, right)

## Component Props

All components use PropTypes for type safety. See individual component files for prop definitions.

## Usage Examples

### SEO Component

```jsx
import SEO from './components/SEO.jsx'

<SEO
  title="Page Title"
  description="Page description"
  keywords="keyword1, keyword2"
  ogImage="/path/to/image.jpg"
/>
```

### Timeline Grid

```jsx
import TimelineGrid from './components/TimelineGrid.jsx'

<TimelineGrid />
```

### Projects Grid

```jsx
import ProjectsGrid from './components/ProjectsGrid.jsx'

<ProjectsGrid />
```

### Expandable Text

```jsx
import ExpandableText from './components/ExpandableText.jsx'

<ExpandableText text={longText} maxLength={500} />
```

## Component Principles

1. **Reusability**: Components are designed to be reusable across pages
2. **Props**: Use PropTypes for type checking and documentation
3. **Accessibility**: All components include ARIA labels and semantic HTML
4. **Responsive**: Components adapt to different screen sizes
5. **Performance**: Optimized rendering with React best practices

## Styling

Components use CSS classes from the main stylesheet (`index.css`). The design follows a Bento Box grid system with dark theme.

## Related Documentation

- [Pages](../pages/README.md) - How components are used in pages
- [Utils](../utils/README.md) - Utility functions used by components
- [Config](../config/README.md) - Configuration constants
