import { projects } from '../../data/projects.js'
import { slugify } from '../utils/slugify.js'

// Convert projects data to v2 format
// Using exact text from CV as requested
export const v2Projects = projects.map((p) => ({
  id: slugify(p.title),
  title: p.title,
  headline: p.description,
  year: p.year,
}))
