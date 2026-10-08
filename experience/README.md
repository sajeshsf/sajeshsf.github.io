# Experience Page

HTML entry point for the Experience page.

## File

- **index.html** - HTML entry point with `data-page="experience"` attribute

## Purpose

This directory contains the HTML entry point for the Experience page. The `data-page="experience"` attribute tells the React app to render the `ExperiencePage` component.

## Routing

When visiting `/experience/`, Vite serves this `index.html`, which:
1. Loads the React app
2. The app reads `data-page="experience"`
3. Renders `ExperiencePage` component from `src/pages/ExperiencePage.jsx`

Hash-based routing is used for detail views:
- `/experience/#role-id` - Shows detail view for specific role
