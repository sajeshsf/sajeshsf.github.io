# sajeshsf.github.io

Personal portfolio website built with React + Vite, featuring a modern v2 design with Bento Box grids, dark theme, and parallax scrolling.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` for the main site or `http://localhost:5173/v2/` for the v2 design.

## Project Structure

```
src/
  v2/              # V2 portfolio (modern design)
    components/    # Reusable UI components
    pages/         # Page-level components
    data/          # Content data (projects, timeline, writing)
    utils/         # Helper functions and hooks
    config/        # Configuration and constants
    v2.css         # Main stylesheet
  components/      # V1 components
  sections/        # V1 page sections
  data/            # Shared data (experience, projects)
v2/                # HTML entry points for v2 pages
tests/             # E2E tests (Playwright)
```

## Features

- **V2 Design**: Modern Bento Box grid layout with dark theme
- **Single-Page Layout**: Long-scrolling homepage with parallax effects
- **Progressive Disclosure**: Fade-out truncation for projects and timeline
- **Responsive**: Mobile-first design with comprehensive responsive tests
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **Testing**: Automated E2E tests for rendering, accessibility, and responsive design
- **Performance**: Lighthouse CI integration for performance monitoring

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run all Playwright tests
- `npm run test:render` - Test page rendering
- `npm run test:responsive` - Test responsive design
- `npm run test:accessibility` - Test accessibility
- `npm run test:lighthouse` - Run Lighthouse CI

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on push to `main`. The workflow:
1. Runs comprehensive tests (rendering, responsive, accessibility, Lighthouse)
2. Builds the production bundle
3. Deploys to GitHub Pages

## Tech Stack

- React 19
- Vite 7
- Playwright (testing)
- Lighthouse CI (performance)
- PropTypes (type checking)

## Architecture

- **Components**: Reusable, focused components with PropTypes
- **Hooks**: Custom hooks for scroll tracking, hash routing, progressive disclosure
- **Constants**: Centralized configuration in `src/v2/config/constants.js`
- **Error Handling**: ErrorBoundary component for graceful error handling
- **Styling**: CSS variables for theming, Bento Box grid system


