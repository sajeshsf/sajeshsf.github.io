# V2 Pages

Page-level components for each route.

## Pages

- **V2HomePage.jsx** - Single-page landing with all sections (About, Experience, Projects, Writing)
- **V2AboutPage.jsx** - About page with profile image and executive summary
- **V2ExperiencePage.jsx** - Experience timeline with detail views for each role
- **V2ProjectsPage.jsx** - Projects grid with detail pages for each project
- **V2WritingPage.jsx** - Writing/blog posts listing

## Routing

Pages are determined by `data-page` attribute in HTML entry points. V2App.jsx reads this and renders the appropriate page component.

## Features

- **V2HomePage**: Parallax hero, scroll animations, progressive disclosure for timeline and projects
- **V2ExperiencePage**: Hash-based routing for role detail pages
- **V2ProjectsPage**: Hash-based routing for project detail pages with bullet-point descriptions
