# V2 Portfolio

Modern single-page portfolio with Bento Box grid layout, dark theme, and parallax scrolling.

## Architecture

- **Components** (`components/`) - Reusable UI components with PropTypes
- **Pages** (`pages/`) - Page-level components for each route
- **Data** (`data/`) - Content data (projects, timeline, writing)
- **Utils** (`utils/`) - Helper functions and custom React hooks
- **Config** (`config/`) - Application constants and configuration
- **Styles** (`v2.css`) - Main stylesheet with CSS variables

## Key Components

- `V2Layout` - Main layout wrapper (header, nav, footer, error boundary)
- `V2Nav` - Navigation menu with smooth scrolling
- `SocialLinks` - Social media links with modern icons
- `TimelineGrid` - Experience timeline with progressive disclosure
- `ProjectsGrid` - Projects grid with fade-out truncation
- `ErrorBoundary` - React error boundary for error handling

## Custom Hooks

- `useScroll()` - Tracks scroll position for parallax effects
- `useHash()` - Hash-based routing for detail pages
- `useProgressiveDisclosure()` - Reusable hook for expand/collapse patterns

## Constants

All magic numbers and configuration values are in `config/constants.js`:
- Display counts (projects, timeline items)
- Heights and dimensions
- Scroll and animation parameters
- Intersection Observer settings

## Entry Point

`main.jsx` - Renders V2App wrapped in ErrorBoundary and StrictMode.
