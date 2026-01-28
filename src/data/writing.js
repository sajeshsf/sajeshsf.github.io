// Writing/blog posts organized by category

export const writingCategories = {
  'how-tos': {
    id: 'how-tos',
    name: 'How-Tos',
    description: 'Step-by-step guides and tutorials',
    icon: '📚',
  },
  'internet-finds': {
    id: 'internet-finds',
    name: 'Interesting Internet Finds',
    description: 'Cool discoveries and resources from around the web',
    icon: '🌐',
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    description: 'Destination notes, itineraries, and travel planning tips',
    icon: '✈️',
  },
}

// Import individual blog posts
import bhuj from './blog/bhuj.js'
import dehradun from './blog/dehradun.js'
import goa from './blog/goa.js'
import gokarna from './blog/gokarna.js'
import haridwar from './blog/haridwar.js'
import jaipur from './blog/jaipur.js'
import jodhpur from './blog/jodhpur.js'
import kargil from './blog/kargil.js'
import leh from './blog/leh.js'
import manali from './blog/manali.js'
import mumba from './blog/mumba.js'
import rannOfKuch from './blog/rann-of-kuch.js'
import rishikesh from './blog/rishikesh.js'
import shimla from './blog/shimla.js'
import soc2Overview from './blog/soc2-overview.js'
import srinagar from './blog/srinagar.js'
import udupi from './blog/udupi.js'

// All writing posts - add new posts here by importing and adding to the array
export const writing = [
  haridwar,
  rishikesh,
  dehradun,
  shimla,
  manali,
  leh,
  kargil,
  srinagar,
  jaipur,
  jodhpur,
  bhuj,
  rannOfKuch,
  mumba,
  goa,
  gokarna,
  udupi,
  soc2Overview,
  // Add more blog posts here as you create them
]

// Helper function to get posts by category
export function getPostsByCategory(categoryId) {
  if (!categoryId) return writing
  return writing.filter((post) => post.category === categoryId)
}

// Helper function to get posts by series
export function getPostsBySeries(seriesId) {
  if (!seriesId) return []
  return writing.filter((post) => post.series === seriesId)
}

// Helper function to get all categories that have posts
export function getActiveCategories() {
  const categoryIds = new Set(writing.map((post) => post.category))
  return Object.values(writingCategories).filter((cat) =>
    categoryIds.has(cat.id)
  )
}
