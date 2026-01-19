# Public Assets

Publicly accessible assets for the portfolio website. Files in this directory are copied to the build output as-is.

## Files

### Images

- **profile.jpg** - Profile picture used in About page and Open Graph images
- **software-leadership.svg** - Favicon and site logo
- **vite.svg** - Vite logo (if needed)

### SEO Files

- **robots.txt** - Search engine crawler instructions
- **sitemap.xml** - XML sitemap for search engines
- **googled367af80c22ab839.html** - Google Search Console verification file

### Documents

- **sajesh-resume.pdf** - Resume PDF (if linked from site)

## robots.txt

Instructs search engine crawlers:
- Allows all user agents
- Points to sitemap location
- Can be used to block specific paths if needed

**Location:** `https://sajeshsf.github.io/robots.txt`

## sitemap.xml

XML sitemap listing all pages for search engines:
- Homepage (`/`)
- About page (`/about/`)
- Experience page (`/experience/`)
- Projects page (`/projects/`)
- Writing page (`/writing/`)
- Individual blog posts

**Location:** `https://sajeshsf.github.io/sitemap.xml`

**Update:** When adding new pages, update the sitemap with:
- `<loc>` - Full URL
- `<lastmod>` - Last modification date
- `<changefreq>` - Update frequency (monthly, weekly, etc.)
- `<priority>` - Priority (0.0 to 1.0)

## Google Search Console Verification

- **googled367af80c22ab839.html** - Verification file for Google Search Console

The site is also verified via meta tag in `index.html`.

## Usage

Reference files in this directory from your code:

```javascript
// In components or pages
<img src="/profile.jpg" alt="Profile" />

// In index.html
<link rel="icon" type="image/svg+xml" href="/software-leadership.svg" />
```

Files are served from the root URL, so use `/filename.ext` (leading slash).

## Best Practices

1. **Optimization**: Optimize images for web (compression, appropriate format)
2. **Naming**: Use descriptive, lowercase filenames with hyphens
3. **Size**: Keep file sizes reasonable for fast loading
4. **Accessibility**: Always include alt text for images
5. **SEO**: Update sitemap when adding new pages

## Related Documentation

- Root [README.md](../README.md) - SEO setup instructions
- [Components](../src/components/README.md) - Components that use these assets
