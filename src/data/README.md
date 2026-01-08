# V2 Data

Content data files for the v2 portfolio.

## Files

- **projects.js** - Project listings (transformed from `src/data/projects.js`)
- **timeline.js** - Experience & education timeline (sorted by start date)
- **writing.js** - Blog posts and articles (currently empty)

## Data Structure

- Projects: `{ id, title, headline, year }`
- Timeline: `{ id, type, role, org, dateLabel, sortKey }`
- Writing: `{ title, url, date, kind, summary }`

## Notes

- Timeline includes both experience roles and education entries
- Timeline is sorted by start date (most recent first)
- Concurrent roles are sorted by start date, then alphabetically by role name
