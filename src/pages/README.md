# Pages

Page-level components for each route in the portfolio website.

## Overview

This directory contains page-level components:
- **HomePage.jsx** - Single-page landing page with all sections
- **AboutPage.jsx** - About page with profile image and executive summary
- **ExperiencePage.jsx** - Experience timeline page with detail views
- **ProjectsPage.jsx** - Projects grid page with detail pages
- **WritingPage.jsx** - Writing/blog posts listing page

## Routing

Pages are determined by the `data-page` attribute in HTML entry points. The `App.jsx` component reads this attribute and renders the appropriate page component.

Detail pages use hash-based routing managed by the `useHash` hook.

## Detailed Documentation

For complete page documentation including routing details, hash-based routing, SEO implementation, and data integration, see [src/README.md](../README.md#pages).
