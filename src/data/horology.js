// Horology articles: notes on watches and how they work

export const horologyTopics = {
  movements: {
    id: 'movements',
    name: 'Movements',
    description: 'How mechanical watch movements work',
    icon: '⚙️',
  },
}

// Import individual articles
import howHandWoundWatchesWork from './horology/how-hand-wound-watches-work.js'

// All horology articles - add new articles here by importing and adding to the array
export const horology = [
  howHandWoundWatchesWork,
]
