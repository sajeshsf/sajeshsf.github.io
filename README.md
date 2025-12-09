# sajesh.github.io

Personal portfolio built with React + Vite and optimized for GitHub Pages. The layout follows an industry-standard structure (components, sections, data, assets) so future updates - new projects, services, or content - stay organized.

## Stack

- React 19 with Vite 7 for lightning-fast DX
- Vanilla CSS with design tokens and responsive utilities
- GitHub Pages deployments orchestrated by a GitHub Actions workflow
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

1. Rename/push this repository to GitHub as `sajesh.github.io` (user sites must match this pattern).
2. Open **Settings → Pages** and under **Build and deployment**, choose **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` will:
   - install dependencies,
   - run `npm run build`,
   - upload the `dist/` output,
   - publish it with `actions/deploy-pages`.
4. Monitor the **Actions** tab; once the `Deploy to GitHub Pages` workflow succeeds, GitHub serves the site at `https://sajesh.github.io/`.
5. Re-run the workflow manually (or push new commits) whenever you want to refresh production.

## Customizing content

- Update hero/about copy in `src/sections/Hero.jsx` and `src/sections/About.jsx`.
- Add or remove projects inside `src/data/projects.js`.
- Adjust contact methods in `src/sections/Contact.jsx`.
- Drop new assets into `src/assets/` and import them where needed.

Before pushing, you can run `npm run build` locally to catch issues the workflow would surface.
