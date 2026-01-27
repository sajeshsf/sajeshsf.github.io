# Data

Content data files for the portfolio website.

## Files

### experience.js

Professional experience data including roles, companies, periods, and highlights.

**Structure:**
```javascript
{
  period: 'Jun 2024 – Present',
  role: 'Head of Software Engineering',
  company: 'American Security · Los Angeles, CA',
  focus: 'CashWizard Smart Safe Platform & Analytics',
  highlights: [
    'Achievement or responsibility 1',
    'Achievement or responsibility 2',
    ...
  ]
}
```

### timeline.js

Combined timeline data for both experience roles and education entries, sorted by date.

**Structure:**
```javascript
{
  id: 'unique-id',
  type: 'experience' | 'education',
  role: 'Role or Degree Title',
  company: 'Company or Institution',
  startDate: 'YYYY-MM-DD',
  endDate: 'YYYY-MM-DD' | 'Present',
  dateLabel: 'Human-readable date',
  sortKey: timestamp // For sorting
}
```

**Functions:**
- `getExperienceForTimelineItem(timelineItem)` - Matches timeline items with experience data

### projects.js

Project listings with descriptions, stack, and metadata.

**Structure:**
```javascript
{
  id: 'unique-id',
  title: 'Project Name',
  headline: 'Project description',
  year: '2023 – ongoing',
  stack: ['Technology1', 'Technology2'],
  live: 'URL' | null,
  repo: 'URL' | null
}
```

### writing.js

Blog posts and articles organized by category.

**Structure:**
```javascript
{
  id: 'unique-id',
  title: 'Post Title',
  date: 'YYYY-MM-DD',
  category: 'how-tos' | 'internet-finds' | 'travel',
  summary: 'Brief summary',
  content: '<HTML content>',
  seriesTitle: 'Series name' | null
}
```

**Categories:**
- `how-tos` - Step-by-step guides and tutorials
- `internet-finds` - Interesting links and resources
- `travel` - Travel destination notes and guides

### blog/

Directory for individual blog post content files.

#### blog/soc2-overview.js

Example blog post content file. Each post can have its own file for better organization.

## Data Transformation

The data is processed and transformed as needed:

1. **Timeline Generation**: Experience data is transformed into timeline format
2. **ID Generation**: Uses `slugify` utility to create URL-friendly IDs
3. **Sorting**: Timeline items are sorted by date (most recent first)
4. **Filtering**: Writing posts can be filtered by category

## Adding New Content

### Adding a New Experience

Edit `experience.js` and add a new entry. The timeline will automatically include it.

### Adding a New Project

Edit `projects.js` and add a new entry with required fields.

### Adding a New Blog Post

1. Create a new file in `blog/` directory (e.g., `blog/my-post.js`)
2. Export the post content:
   ```javascript
   export default {
     title: 'My Post',
     date: '2025-01-16',
     category: 'technical',
     summary: 'Post summary',
     content: '<HTML content>'
   }
   ```
3. Import and add to `writing.js` array

## Data Structure Best Practices

1. **IDs**: Use `slugify` utility for consistent ID generation
2. **Dates**: Use ISO format (YYYY-MM-DD) for consistency
3. **Arrays**: Use arrays for lists (highlights, stack, etc.)
4. **Null Values**: Use `null` for optional fields (live, repo)
5. **Consistency**: Maintain consistent structure across similar items

## Related Documentation

- [Utils](../utils/README.md) - Utilities used for data transformation
- [Pages](../pages/README.md) - How data is used in pages
- [Config](../config/README.md) - Configuration constants
