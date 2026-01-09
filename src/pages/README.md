# Pages

Page-level components for each route in the portfolio website.

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

### ProjectsPage.jsx

Projects grid page with detail pages for each project. Features:
- Hash-based routing for project detail pages (e.g., `#project-id`)
- Projects grid with progressive disclosure
- Detailed project descriptions with bullet points
- SEO optimization per project

### WritingPage.jsx

Writing/blog posts listing page. Features:
- Category-based organization (technical, internet finds, travel)
- Hash-based routing for individual posts (e.g., `#post-id`)
- Article content with HTML rendering
- SEO optimization per post

## Routing

Pages are determined by the `data-page` attribute in HTML entry points:
- `index.html` → `data-page="home"` → HomePage
- `about/index.html` → `data-page="about"` → AboutPage
- `experience/index.html` → `data-page="experience"` → ExperiencePage
- `projects/index.html` → `data-page="projects"` → ProjectsPage
- `writing/index.html` → `data-page="writing"` → WritingPage

The `App.jsx` component reads the `data-page` attribute and renders the appropriate page component.

## Hash-Based Routing

Detail pages (experience roles, projects, blog posts) use hash-based routing:
- Experience: `#experience` → `#experience#role-id`
- Projects: `#projects` → `#projects#project-id`
- Writing: `#writing` → `#writing#post-id`

The `useHash` hook (from `utils/useHash.js`) manages hash changes and updates the view accordingly.

## SEO Implementation

Each page uses the `SEO` component to set page-specific meta tags:

```jsx
import SEO from '../components/SEO.jsx'

<SEO
  title="Page Title | Sajesh S F"
  description="Page-specific description"
  keywords="relevant, keywords"
  ogImage="https://sajeshsf.github.io/profile.jpg"
/>
```

## Data Integration

Pages import data from the `data/` directory:
- `HomePage` uses: `timeline.js`, `projects.js`, `writing.js`
- `ExperiencePage` uses: `timeline.js`, `experience.js`
- `ProjectsPage` uses: `projects.js`
- `WritingPage` uses: `writing.js`, `blog/*.js`

## Progressive Disclosure

Pages implement progressive disclosure for long content:
- Timeline and projects grids show initial items with "Show More" option
- Long text uses fade-out truncation
- Detail pages show full content

## Related Documentation

- [Components](../components/README.md) - Components used in pages
- [Data](../data/README.md) - Data structure and content
- [Utils](../utils/README.md) - Routing and utility hooks
