import PropTypes from 'prop-types'
import { writingCategories } from '../data/writing.js'
import { slugify } from '../utils/slugify.js'

export default function BlogCollection({ title, posts, collectionColor = 'blue' }) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="blog-collection">
      <h2 className="blog-collection-title">{title}</h2>
      <div className="blog-collection-slider">
        <div className="blog-collection-track">
          {posts.map((post) => {
            const category = writingCategories[post.category]
            const postSlug = post.id ?? slugify(post.title)
            return (
              <div key={postSlug} className={`blog-card outer-card ${collectionColor}`}>
                <div className="tile-holder card-div">
                  <div className="tile-content-holder">
                    <div className="category-holder">
                      {category && (
                        <a
                          className="post-category"
                          href={`#${category.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          {category.icon} {category.name}
                        </a>
                      )}
                    </div>
                    <a
                      className="subtitle-card"
                      href={`/writing/#${postSlug}`}
                    >
                      {post.title}
                    </a>
                    {post.stats && (
                      <p className="card-stats">{post.stats}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

BlogCollection.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  collectionColor: PropTypes.oneOf(['blue', 'green', 'purple']),
}
