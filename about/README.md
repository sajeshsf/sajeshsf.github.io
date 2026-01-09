# About Page

HTML entry point for the About page.

## File

- **index.html** - HTML entry point with `data-page="about"` attribute

## Purpose

This directory contains the HTML entry point for the About page. The `data-page="about"` attribute tells the React app to render the `AboutPage` component.

## Routing

When visiting `/about/`, Vite serves this `index.html`, which:
1. Loads the React app
2. The app reads `data-page="about"`
3. Renders `AboutPage` component from `src/pages/AboutPage.jsx`

## Structure

The HTML file includes:
- Meta tags for SEO
- Root div for React mounting
- Script tag to load the React app

## Related Documentation

- [Pages](../src/pages/README.md) - AboutPage component documentation
- [Components](../src/components/README.md) - Components used in AboutPage
