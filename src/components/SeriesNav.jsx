import PropTypes from 'prop-types'
import { getPostsBySeries } from '../data/writing.js'
import { slugify } from '../utils/slugify.js'

const getSlug = (post) => post?.id ?? slugify(post?.title ?? '')

// Table of contents + previous/next links for posts that belong to a series.
export default function SeriesNav({ post, position = 'bottom' }) {
  if (!post?.series) return null
  const posts = getPostsBySeries(post.series)

  const index = posts.findIndex((p) => getSlug(p) === getSlug(post))
  const prev = index > 0 ? posts[index - 1] : null
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
  const title = post.seriesTitle || post.series

  if (position === 'top') {
    return (
      <p className="text-muted font-size-sm series-position">
        Part {index + 1} of {posts.length} in <strong>{title}</strong>
      </p>
    )
  }

  return (
    <nav className="series-nav card margin-top-2xl" aria-label={`${title} series`}>
      <h2 className="series-nav-title">{title}</h2>
      <ol className="series-nav-list">
        {posts.map((p) => {
          const slug = getSlug(p)
          const isCurrent = slug === getSlug(post)
          return (
            <li key={slug} className={isCurrent ? 'is-current' : undefined}>
              {isCurrent ? (
                <span aria-current="page">{p.title}</span>
              ) : (
                <a href={`/writing/#${slug}`}>{p.title}</a>
              )}
            </li>
          )
        })}
      </ol>
      {(prev || next) && (
        <div className="series-nav-pager">
          {prev ? (
            <a className="breadcrumb-link" href={`/writing/#${getSlug(prev)}`}>
              ← {prev.title}
            </a>
          ) : <span />}
          {next && (
            <a className="breadcrumb-link series-nav-next" href={`/writing/#${getSlug(next)}`}>
              {next.title} →
            </a>
          )}
        </div>
      )}
    </nav>
  )
}

SeriesNav.propTypes = {
  post: PropTypes.object,
  position: PropTypes.oneOf(['top', 'bottom']),
}
