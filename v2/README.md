# V2 HTML Entry Points

HTML entry files for Vite multi-page build configuration.

## Structure

Each subdirectory contains an `index.html` that:
- Sets `data-page` attribute to identify the page
- Loads the React app via `src/v2/main.jsx`
- V2App.jsx reads `data-page` and renders the corresponding page component

## Routes

- `/v2/` - Home page (single-page layout)
- `/v2/about/` - About page
- `/v2/experience/` - Experience timeline page
- `/v2/projects/` - Projects grid page
- `/v2/writing/` - Writing/blog posts page

## Build Configuration

Defined in `vite.config.js` under `rollupOptions.input` for multi-page build.
