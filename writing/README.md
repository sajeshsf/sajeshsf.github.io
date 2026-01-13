# Writing Page

HTML entry point for the Writing page.

## File

- **index.html** - HTML entry point with `data-page="writing"` attribute

## Purpose

This directory contains the HTML entry point for the Writing page. The `data-page="writing"` attribute tells the React app to render the `WritingPage` component.

## Routing

When visiting `/writing/`, Vite serves this `index.html`, which:
1. Loads the React app
2. The app reads `data-page="writing"`
3. Renders `WritingPage` component from `src/pages/WritingPage.jsx`

Hash-based routing is used for individual posts:
- `/writing/#post-id` - Shows full content of specific blog post

## Structure

The HTML file includes:
- Meta tags for SEO
- Root div for React mounting
- Script tag to load the React app

## Related Documentation

- [Pages](../src/pages/README.md) - WritingPage component documentation
- [Data](../src/data/README.md) - Writing and blog data structure
- [Data/Blog](../src/data/blog/README.md) - Individual blog post files
- [Components](../src/components/README.md) - Components used in WritingPage
