import PropTypes from 'prop-types'

// Table of contents + previous/next links for posts that belong to a series.
// Renders nothing for series with a single post.
// Hash-only navigation keeps the scroll position, so jump back to the top
// when moving between posts in the series.
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' })
}

export default function SeriesNav({ currentSlug, posts, seriesTitle, getSlug }) {
  if (!posts || posts.length < 2) return null

  const index = posts.findIndex((post) => getSlug(post) === currentSlug)
  const prev = index > 0 ? posts[index - 1] : null
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null

  return (
    <nav className="series-nav margin-top-2xl" aria-label={`${seriesTitle} series`}>
      <h2 className="series-nav-title">{seriesTitle}</h2>
      <ol className="series-nav-list">
        {posts.map((post) => {
          const slug = getSlug(post)
          const isCurrent = slug === currentSlug
          return (
            <li key={slug} className={isCurrent ? 'is-current' : undefined}>
              {isCurrent ? (
                <span aria-current="page">{post.title}</span>
              ) : (
                <a href={`/writing/#${slug}`} onClick={scrollToTop}>{post.title}</a>
              )}
            </li>
          )
        })}
      </ol>
      {(prev || next) && (
        <div className="series-nav-pager">
          {prev ? (
            <a className="series-nav-link" href={`/writing/#${getSlug(prev)}`} onClick={scrollToTop}>
              <span className="series-nav-label">← Previous</span>
              <span>{prev.title}</span>
            </a>
          ) : <span />}
          {next && (
            <a className="series-nav-link series-nav-next" href={`/writing/#${getSlug(next)}`} onClick={scrollToTop}>
              <span className="series-nav-label">Next →</span>
              <span>{next.title}</span>
            </a>
          )}
        </div>
      )}
    </nav>
  )
}

SeriesNav.propTypes = {
  currentSlug: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  seriesTitle: PropTypes.string.isRequired,
  getSlug: PropTypes.func.isRequired,
}
