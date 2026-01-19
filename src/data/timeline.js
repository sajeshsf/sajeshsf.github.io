import { experience } from './experience.js'
import { slugify } from '../utils/slugify.js'

// Helper to match timeline items with experience data
export function getExperienceForTimelineItem(timelineItem) {
  if (timelineItem.type === 'education') {
    return null
  }

  return experience.find((exp) => {
    const expId = slugify(`${exp.role}-${exp.company}-${exp.period}`)
    return expId === timelineItem.id || exp.role === timelineItem.role
  })
}

function getStartYear(period) {
  // Extract start year from period string
  // Handles formats like: "2024 – Present", "2019 – 2022", "2018"
  const years = String(period || '').match(/\d{4}/g) || []
  if (years.length === 0) return 0
  // Always use the first year (start year) for sorting
  return Number(years[0]) || 0
}

function getStartMonth(period) {
  // Extract month from period string (e.g., "Jul 2014", "Jan 2023", "Jun 2024")
  const monthNames = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
  }

  const periodStr = String(period || '').toLowerCase()
  for (const [month, num] of Object.entries(monthNames)) {
    if (periodStr.startsWith(month)) {
      return num
    }
  }

  // Default to 0 (January) if month not found
  return 0
}

// Convert experience data to timeline format
// This includes all roles, even concurrent ones
const experienceItems = experience.map((r) => {
  const startYear = getStartYear(r.period)
  const startMonth = getStartMonth(r.period)

  return {
  type: 'role',
  id: slugify(`${r.role}-${r.company}-${r.period}`),
  dateLabel: r.period,
  role: r.role,
  org: r.company,
    sortKey: startYear * 12 + startMonth, // Sort by start date (year * 12 + month)
    startYear: startYear,
  }
})

// Education entries
const educationItems = [
  {
    type: 'education',
    id: 'education-btech',
    dateLabel: 'Jul 2014 – Jul 2018',
    role: 'Bachelor of Technology - BTech, Electrical and Electronics Engineering',
    org: 'College of Engineering Trivandrum',
    sortKey: 2014 * 12 + 7, // July 2014
    startYear: 2014,
  },
  {
    type: 'education',
    id: 'education-senior-school',
    dateLabel: 'Jun 2012 – Mar 2014',
    role: 'Senior School, Mathematics and Computer Science',
    org: 'Viswabharathy Public School',
    sortKey: 2012 * 12 + 6, // June 2012
    startYear: 2012,
  },
]

// Combine and sort by start date (most recent first)
// For concurrent roles, they'll be sorted by start date
export const timeline = [...educationItems, ...experienceItems]
  .slice()
  .sort((a, b) => {
    // Primary sort: by start date (most recent first)
    if (b.sortKey !== a.sortKey) {
      return b.sortKey - a.sortKey
    }
    // Secondary sort: if same start date, sort by role name alphabetically
    return a.role.localeCompare(b.role)
  })
