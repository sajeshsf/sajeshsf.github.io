import { projects } from '../../data/projects.js'
import { slugify } from '../utils/slugify.js'

// Skeleton-only: keep the titles, strip descriptions, add placeholder headline.
export const v2Projects = projects.map((p) => ({
  id: slugify(p.title),
  title: p.title,
  headline: 'Headline TBD',
  year: p.year,
}))
