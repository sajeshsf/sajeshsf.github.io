# sajeshsf.github.io

Personal portfolio website built with React + Vite, featuring a modern design with Bento Box grids, dark theme, and parallax scrolling.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` for the main site.

## Project Structure

```text
sajeshsf.github.io/
├── src/              # Source code (see src/README.md)
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level components
│   ├── data/         # Content data (projects, timeline, writing)
│   ├── utils/        # Helper functions and hooks
│   ├── config/       # Configuration and constants
│   └── assets/       # Static assets (SVG images)
├── public/           # Public assets (see public/README.md)
├── tests/            # E2E tests (see tests/README.md)
├── about/            # HTML entry point for About page
├── experience/       # HTML entry point for Experience page
├── projects/         # HTML entry point for Projects page
└── writing/          # HTML entry point for Writing page
```

For detailed documentation, see the README in each folder.

## Features

- **Modern Design**: Bento Box grid layout with dark theme
- **Single-Page Layout**: Long-scrolling homepage with parallax effects
- **Multi-Page Support**: Separate pages for About, Experience, Projects, and Writing
- **Progressive Disclosure**: Fade-out truncation for projects and timeline
- **Responsive**: Mobile-first design with comprehensive responsive tests
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, sitemap, and Open Graph tags
- **Testing**: Automated E2E tests for rendering, accessibility, responsive design, visibility, and navigation
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
- `npm run test:visibility` - Test component visibility and layout
- `npm run test:navigation` - Test navigation smoothness and routing
- `npm run test:lighthouse` - Run Lighthouse CI

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on push to `main`. The workflow:

1. Runs comprehensive tests (rendering, responsive, accessibility, visibility, navigation, Lighthouse)
2. Builds the production bundle
3. Deploys to GitHub Pages
4. Runs post-deployment tests against the live site
5. Uploads build artifacts and test results for debugging

### CI/CD Artifacts

Both PR checks and deployment workflows upload artifacts:

- **Build artifacts** (`dist/`) - Production build output
- **Test results** (`test-results/`) - Playwright test results
- **Playwright reports** (`playwright-report/`) - HTML test reports

Artifacts are available in the GitHub Actions UI for download and analysis.

## Tech Stack

- React 19
- Vite 7
- Playwright (testing)
- Lighthouse CI (performance)
- PropTypes (type checking)

## Architecture

- **Components**: Reusable, focused components with PropTypes (see `src/components/README.md`)
- **Pages**: Page-level components with SEO support (see `src/pages/README.md`)
- **Data**: Content data organized by type (see `src/data/README.md`)
- **Utils**: Custom hooks for scroll tracking, hash routing, progressive disclosure (see `src/utils/README.md`)
- **Config**: Centralized configuration (see `src/config/README.md`)
- **Error Handling**: ErrorBoundary component for graceful error handling
- **Styling**: CSS variables for theming, Bento Box grid system

## SEO Implementation

The site is fully optimized for search engines. Key SEO features include:

### ✅ Implemented

- **Meta Tags**: Title, description, keywords on all pages
- **Open Graph Tags**: Facebook/LinkedIn sharing support
- **Twitter Cards**: Twitter/X sharing support
- **Structured Data**: Person schema (JSON-LD) with contact info and social profiles
- **Technical SEO**: Google Search Console verification, robots.txt, sitemap.xml
- **Dynamic Meta Tags**: Page-specific SEO via SEO component
- **Mobile-Friendly**: Responsive design for all devices
- **Performance**: Fast loading times with Vite optimization

### Setup Instructions

1. **Google Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `https://sajeshsf.github.io`
   - Verify ownership (already configured via meta tag in `index.html`)
   - Submit sitemap: `https://sajeshsf.github.io/sitemap.xml`
   - Request indexing for homepage and key pages

2. **Monitor Indexing**
   - Use "URL Inspection" tool in Search Console
   - Check indexing status weekly
   - Monitor search performance and queries

### Target Keywords

- Primary: "Sajesh S F", "Sajesh S F Software Engineer", "Sajesh S F Portfolio"
- Secondary: "Software Engineering Leader", "IoT Engineer", "Embedded Systems Engineer"
- Long-tail: "Software engineer with IoT experience in California"

### SEO Files

- `public/robots.txt` - Search engine crawler instructions
- `public/sitemap.xml` - Site structure for search engines
- `index.html` - Base meta tags and structured data
- `src/components/SEO.jsx` - Dynamic meta tag component

For detailed SEO documentation, see the SEO section in this README.

## Performance

The site achieves high performance scores:

- Lighthouse Performance: 95+
- SEO Score: 100
- Accessibility Score: 100
- Best Practices: 100

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a personal portfolio site. For questions or suggestions, please open an issue or contact the owner.

## License

All rights reserved. Personal portfolio content.
