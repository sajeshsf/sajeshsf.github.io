# Source Code

This directory contains all the source code for the portfolio website.

## Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page-level components
├── data/          # Content data files
├── utils/         # Helper functions and hooks
├── config/        # Configuration and constants
├── assets/        # Static assets like SVG images
├── App.jsx        # Main application component
├── main.jsx       # Application entry point
└── index.css      # Main stylesheet
```

## Entry Point

- **main.jsx**: React application entry point that renders the App component
- **App.jsx**: Main application component that handles routing and layout

## Styling

- **index.css**: Main stylesheet with CSS variables, Bento Box grid system, and responsive design utilities

## Components

### Layout Components

- **Layout.jsx** - Main layout wrapper with header, navigation, footer, and error boundary. Features:
  - Scroll progress indicator at the bottom of the header
  - Header visibility logic (shows after 10% scroll into hero section on home page)
  - Responsive mobile menu
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

All components use PropTypes for type safety. Components follow React best practices with accessibility (ARIA labels, semantic HTML) and responsive design.

## Pages

### HomePage.jsx

Single-page landing page with all sections (About, Experience, Projects, Writing). Features:
- Parallax hero section with rotating tagline
- Scroll animations and progressive disclosure
- Timeline and projects grids with fade-out truncation
- Smooth scrolling navigation

### AboutPage.jsx

About page with profile image and executive summary. Features:
- Professional headshot display
- Executive summary with Bento Box grid layout
- SEO optimization with page-specific meta tags

### ExperiencePage.jsx

Experience timeline page with detail views for each role. Features:
- Hash-based routing for role detail pages (e.g., `#role-id`)
- Timeline grid with progressive disclosure
- Detailed role information with highlights
- SEO optimization per role
- Navigation back to home page with hash preservation
- Conditional rendering of page title (hidden in detail view)

### ProjectsPage.jsx

Projects grid page with detail pages for each project. Features:
- Hash-based routing for project detail pages (e.g., `#project-id`)
- Projects grid with progressive disclosure
- Detailed project descriptions with bullet points
- SEO optimization per project
- Navigation back to home page with hash preservation
- Conditional rendering of page title (hidden in detail view)

### WritingPage.jsx

Writing/blog posts listing page. Features:
- Masonry grid layout for blog posts
- Category-based organization (technical, internet finds, travel)
- Hash-based routing for individual posts (e.g., `#post-id`)
- Article content with HTML rendering
- SEO optimization per post
- Navigation back to home page with hash preservation

## Routing

Pages are determined by the `data-page` attribute in HTML entry points:
- `index.html` → `data-page="home"` → HomePage
- `about/index.html` → `data-page="about"` → AboutPage
- `experience/index.html` → `data-page="experience"` → ExperiencePage
- `projects/index.html` → `data-page="projects"` → ProjectsPage
- `writing/index.html` → `data-page="writing"` → WritingPage

The `App.jsx` component reads the `data-page` attribute and renders the appropriate page component.

### Hash-Based Routing

Detail pages (experience roles, projects, blog posts) use hash-based routing:
- Experience: `/experience/` → `/experience/#role-id`
- Projects: `/projects/` → `/projects/#project-id`
- Writing: `/writing/` → `/writing/#post-id`

The `useHash` hook (from `utils/useHash.js`) manages hash changes and updates the view accordingly.

**Navigation Behavior:**
- When navigating back from detail views, users are taken to the home page (`/`) with the appropriate hash (`/#experience`, `/#projects`, `/#writing`)
- This ensures the full landing page is visible with proper scroll behavior

## Data

### experience.js

Professional experience data including roles, companies, periods, and highlights.

**Structure:**
```javascript
{
  period: 'Jun 2024 – Present',
  role: 'Head of Software Engineering',
  company: 'American Security · Los Angeles, CA',
  focus: 'CashWizard Smart Safe Platform & Analytics',
  highlights: [
    'Achievement or responsibility 1',
    'Achievement or responsibility 2',
    ...
  ]
}
```

### timeline.js

Combined timeline data for both experience roles and education entries, sorted by date.

**Structure:**
```javascript
{
  id: 'unique-id',
  type: 'experience' | 'education',
  role: 'Role or Degree Title',
  company: 'Company or Institution',
  startDate: 'YYYY-MM-DD',
  endDate: 'YYYY-MM-DD' | 'Present',
  dateLabel: 'Human-readable date',
  sortKey: timestamp // For sorting
}
```

**Functions:**
- `getExperienceForTimelineItem(timelineItem)` - Matches timeline items with experience data

### projects.js

Project listings with descriptions, stack, and metadata.

**Structure:**
```javascript
{
  id: 'unique-id',
  title: 'Project Name',
  headline: 'Project description',
  year: '2023 – ongoing',
  stack: ['Technology1', 'Technology2'],
  live: 'URL' | null,
  repo: 'URL' | null
}
```

### writing.js

Blog posts and articles organized by category.

**Structure:**
```javascript
{
  id: 'unique-id',
  title: 'Post Title',
  date: 'YYYY-MM-DD',
  category: 'technical' | 'internet-finds' | 'travel-food-experiences',
  summary: 'Brief summary',
  content: '<HTML content>',
  seriesTitle: 'Series name' | null
}
```

**Categories:**
- `technical` - Technical articles and guides
- `internet-finds` - Interesting links and resources
- `travel-food-experiences` - Travel and food stories

### blog/

Directory for individual blog post content files. Each blog post is stored as a separate JavaScript file that exports the post content.

**Example:**
```javascript
export default {
  title: 'Post Title',
  date: '2025-01-16',
  category: 'technical',
  summary: 'Brief summary of the post',
  content: '<HTML content with the full post>',
  seriesTitle: 'Series Name' // Optional
}
```

**Adding New Posts:**
1. Create a new file in `blog/` directory (e.g., `blog/my-post.js`)
2. Export the post content following the structure above
3. Import and add to `writing.js` array

## Utils

### Hooks

#### useHash.js

React hook for hash-based routing. Tracks and updates when the URL hash changes.

**Usage:**
```javascript
import { useHash } from './utils/useHash.js'

function MyComponent() {
  const hash = useHash()
  // hash will be the current URL hash (e.g., '#projects#my-project')
}
```

**Returns:** Current URL hash string (e.g., `'#projects#my-project'` or `''`)

#### useScroll.js

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

#### useProgressiveDisclosure.js

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

### Utilities

#### slugify.js

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

## Config

### constants.js

Centralized configuration file containing all application constants.

**Progressive Disclosure:**
```javascript
INITIAL_PROJECTS_COUNT = 6           // Initial number of projects to show
INITIAL_TIMELINE_ITEMS = 2           // Initial number of timeline items to show
PROJECTS_GRID_MAX_HEIGHT = '800px'   // Max height for projects grid
TIMELINE_MAX_HEIGHT = '600px'        // Max height for timeline
FADE_OVERLAY_HEIGHT = '120px'        // Height of fade overlay
```

**Expandable Text:**
```javascript
DEFAULT_MAX_LENGTH = 500             // Default max length for text truncation
CHARS_PER_LINE = 80                  // Characters per line estimate
DEFAULT_FADE_LINES = 3               // Default number of lines before fade
```

**Scroll Animations:**
```javascript
SCROLL_PARALLAX_FACTOR = 0.5         // Parallax scroll factor (0-1)
SCROLL_FADE_START = 300              // Pixel position where fade starts
HERO_SCROLL_THRESHOLD = 0.1          // 10% of hero height to show header
SCROLL_THROTTLE_MS = 16              // Throttle interval (~60fps)
```

**Intersection Observer:**
```javascript
INTERSECTION_THRESHOLD = 0.1         // Visibility threshold (0-1)
INTERSECTION_ROOT_MARGIN = '0px 0px -100px 0px'  // Root margin for intersection
```

**Page IDs:**
```javascript
PAGE_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  WRITING: 'writing'
}
```

**Environment:**
```javascript
IS_DEVELOPMENT = import.meta.env.DEV  // True in development mode
```

**Usage:**
```javascript
import {
  INITIAL_PROJECTS_COUNT,
  HERO_SCROLL_THRESHOLD,
  PAGE_IDS
} from './config/constants.js'
```

## Assets

Static assets (images, icons, etc.) used in the portfolio website.

**SVG Images:**
- **profile.svg** - Profile picture SVG (fallback)
- **react.svg** - React logo (if needed)

**Usage:**
```javascript
import profileSvg from '../assets/profile.svg'

<img src={profileSvg} alt="Profile" />
```

**Note:** For publicly accessible assets (like profile.jpg), use the `public/` directory instead.

## Development Guidelines

- Use PropTypes for type checking
- Follow React best practices (hooks, functional components)
- Maintain accessibility (ARIA labels, semantic HTML)
- Ensure responsive design for all screen sizes
- Use CSS variables for theming
- Keep all constants in `config/constants.js`
- Use hooks for React stateful logic (scroll, hash, progressive disclosure)
- Utilities should be pure functions (no side effects)
- Design utilities to be reusable across components
- Throttle/debounce event handlers where appropriate

## Data Flow

1. Data is stored in `data/` directory as JavaScript modules
2. Components import and use this data to render content
3. Pages compose components and data to create full pages
4. Utils provide helper functions for data transformation and routing

## Adding New Content

### Adding a New Experience

Edit `data/experience.js` and add a new entry. The timeline will automatically include it.

### Adding a New Project

Edit `data/projects.js` and add a new entry with required fields.

### Adding a New Blog Post

1. Create a new file in `data/blog/` directory (e.g., `blog/my-post.js`)
2. Export the post content following the structure above
3. Import and add to `data/writing.js` array
