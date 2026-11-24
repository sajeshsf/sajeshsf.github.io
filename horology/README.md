# Horology Page

HTML entry point for the Horology section.

## File

- **index.html** - HTML entry point with `data-page="horology"` attribute

## Routing

When visiting `/horology/`, the app reads `data-page="horology"` and renders `HorologyPage` from `src/pages/HorologyPage.jsx`.

Hash-based routing is used for individual articles:
- `/horology/#article-id` - Shows the full article

## Adding an article

1. Create `src/data/horology/<article-id>.js` exporting `{ id, title, topic, date, summary, content }`
2. Import it in `src/data/horology.js` and add it to the `horology` array
3. Add the article URL to `public/sitemap.xml`
