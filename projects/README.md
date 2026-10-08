# Projects Page

HTML entry point for the Projects page.

## File

- **index.html** - HTML entry point with `data-page="projects"` attribute

## Purpose

This directory contains the HTML entry point for the Projects page. The `data-page="projects"` attribute tells the React app to render the `ProjectsPage` component.

## Routing

When visiting `/projects/`, Vite serves this `index.html`, which:
1. Loads the React app
2. The app reads `data-page="projects"`
3. Renders `ProjectsPage` component from `src/pages/ProjectsPage.jsx`

Hash-based routing is used for detail views:
- `/projects/#project-id` - Shows detail view for specific project
