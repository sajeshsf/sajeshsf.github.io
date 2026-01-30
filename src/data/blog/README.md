# Blog Content

Individual blog post content files.

## Structure

Each blog post is stored as a separate JavaScript file that exports the post content.

**Example (soc2-overview.js):**

```javascript
export default {
  title: 'Post Title',
  date: '2025-01-16',
  category: 'how-tos', // or 'internet-finds', 'travel'
  summary: 'Brief summary of the post',
  content: '<HTML content with the full post>',
  seriesTitle: 'Series Name' // Optional
}
```

## Adding New Posts

1. Create a new file in this directory (e.g., `my-post.js`)
2. Export the post content following the structure above
3. Import and add to `writing.js` array in the parent directory:

```javascript
import myPost from './blog/my-post.js'

// In writing.js array:
{
  id: 'my-post',
  ...myPost
}
```

## Content Format

- **title**: Post title (required)
- **date**: Publication date in ISO format (YYYY-MM-DD) (required)
- **category**: One of 'how-tos', 'internet-finds', 'travel' (required)
- **summary**: Brief summary for listing pages (optional but recommended)
- **content**: Full HTML content of the post (required)
- **seriesTitle**: If part of a series (optional)

## HTML Content

The `content` field can contain HTML. Common tags used:
- `<p>` for paragraphs
- `<h2>`, `<h3>` for headings
- `<ul>`, `<ol>`, `<li>` for lists
- `<code>` for inline code
- `<pre>` for code blocks
- `<a>` for links
- `<strong>`, `<em>` for emphasis

## Related Documentation

- [Data](../README.md) - How blog posts are integrated into the writing data
- [Pages](../../pages/README.md) - How blog posts are displayed
- [Components](../../components/README.md) - Components used for rendering posts
