// Writing/blog posts organized by category

export const writingCategories = {
  'how-tos': {
    id: 'how-tos',
    name: 'How-Tos',
    description: 'Step-by-step guides and tutorials',
    icon: '📚',
  },
  'communication-craft': {
    id: 'communication-craft',
    name: 'Communication Craft',
    description: 'Notes on writing, rhetoric, and clarity',
    icon: '✍️',
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
  writes: {
    id: 'writes',
    name: 'Writes',
    description: 'Short quotes and reflections',
    icon: '✍️',
  },
}

// Import individual blog posts
import articulationPerspicuityEloquence from './blog/articulation-perspicuity-eloquence.js'
import howStrangeItIsToBeAnythingAtAll from './blog/how-strange-it-is-to-be-anything-at-all.js'
import happyIsTheManQuote from './blog/happy-is-the-man-who-finds-a-true-friend-and-far-happier-is-he-who-finds-that-true-friend-in-his-wife.js'
import iAmComposingLikeAGodQuote from './blog/i-am-composing-like-a-god-as-if-it-simply-had-to-be-done-as-it-has-been-done.js'
import iNeverForceMyselfToBeDevoutQuote from './blog/i-never-force-myself-to-be-devout-except-when-i-feel-so-inspired-and-never-compose-hymns-of-prayers-unless-i-feel-within-me-real-and-true-devotion.js'
import myTasteIsPrettySimpleIAmEasilySatisfiedWithTheBest from './blog/my-taste-is-pretty-simple-i-am-easily-satisfied-with-the-best.js'
import thereAreCathedralsEverywhereForThoseHasEyesToSeeIt from './blog/there-are-cathedrals-everywhere-for-those-has-eyes-to-see-it.js'
import soc2Overview from './blog/soc2-overview.js'
import gameOfLifePrinciples from './blog/game-of-life-principles.js'
import albumsYouMustHear from './blog/1001-albums-you-must-hear-before-you-die.js'

// All writing posts - add new posts here by importing and adding to the array
export const writing = [
  albumsYouMustHear,
  articulationPerspicuityEloquence,
  howStrangeItIsToBeAnythingAtAll,
  happyIsTheManQuote,
  iAmComposingLikeAGodQuote,
  iNeverForceMyselfToBeDevoutQuote,
  myTasteIsPrettySimpleIAmEasilySatisfiedWithTheBest,
  thereAreCathedralsEverywhereForThoseHasEyesToSeeIt,
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
