# sajesh.github.io

Personal portfolio built with React + Vite and optimized for GitHub Pages. The layout follows an industry-standard structure (components, sections, data, assets) so future updates - new projects, services, or content - stay organized.

## Stack

- React 19 with Vite 7 for lightning-fast DX
- Vanilla CSS with design tokens and responsive utilities
- GitHub Pages deployments via the `gh-pages` CLI
- ESLint 9 for linting consistency

## Project structure

```
src/
  components/    // Shared UI (Navbar, ProjectCard, SocialLinks, etc.)
  sections/      // Page sections (Hero, About, Projects, Contact)
  data/          // Content objects (projects, contact links)
  assets/        // SVG/illustrations used inside sections
  App.jsx        // Section composition + layout
  App.css        // Page-level styling + utilities
```

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and edit files inside `src/` - Vite hot reloads automatically.

## Deploying to GitHub Pages (`sajesh.github.io`)

1. Rename/push this repository to GitHub as `sajesh.github.io`.
2. Run `npm run deploy`. The script builds the site and publishes the `dist/` folder to a `gh-pages` branch.
3. In GitHub, open **Settings → Pages** and set the source to the `gh-pages` branch (root).
4. GitHub will provision `https://sajesh.github.io` automatically. Re-run `npm run deploy` whenever you push new code.

## Customizing content

- Update hero/about copy in `src/sections/Hero.jsx` and `src/sections/About.jsx`.
- Add or remove projects inside `src/data/projects.js`.
- Adjust contact methods in `src/sections/Contact.jsx`.
- Drop new assets into `src/assets/` and import them where needed.

Before deploying, run `npm run build` to ensure the production bundle succeeds.
