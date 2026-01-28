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
  'book-notes': {
    id: 'book-notes',
    name: 'Book Notes',
    description: 'Highlights and reflections from books',
    icon: '📖',
  },
  'travel-food-experiences': {
    id: 'travel-food-experiences',
    name: 'Travel, Food & Experiences',
    description: 'Stories from travels, food adventures, and life experiences',
    icon: '✈️',
  },
}

// Import individual blog posts
import soc2Overview from './blog/soc2-overview.js'
import gameOfLifePrinciples from './blog/game-of-life-principles.js'
import albumsYouMustHear from './blog/1001-albums-you-must-hear-before-you-die.js'

// All writing posts - add new posts here by importing and adding to the array
export const writing = [
  albumsYouMustHear,
  soc2Overview,
  gameOfLifePrinciples,
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
