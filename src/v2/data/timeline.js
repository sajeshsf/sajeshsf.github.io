import { experience } from '../../data/experience.js'
import { slugify } from '../utils/slugify.js'

function yearSortKey(period) {
  const years = String(period || '').match(/\d{4}/g) || []
  if (years.length === 0) return 0
  return Number(years[0]) || 0
}

const experienceItems = experience.map((r) => ({
  type: 'role',
  id: slugify(`${r.role}-${r.company}-${r.period}`),
  dateLabel: r.period,
  role: r.role,
  org: r.company,
  sortKey: yearSortKey(r.period),
}))

// Placeholder education entry (skeleton only; you’ll populate later)
const educationItems = [
  {
    type: 'education',
    id: 'education',
    dateLabel: 'Dates TBD',
    role: 'Education',
    org: 'Institution TBD',
    sortKey: 0,
  },
]

export const timeline = [...educationItems, ...experienceItems]
  .slice()
  .sort((a, b) => a.sortKey - b.sortKey)
