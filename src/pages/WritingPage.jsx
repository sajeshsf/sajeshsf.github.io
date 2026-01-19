import { writing, writingCategories } from '../data/writing.js'
import { useHash } from '../utils/useHash.js'
import { slugify } from '../utils/slugify.js'
import { ArrowLeft } from '../components/ArrowIcon.jsx'

function getIdFromHash(hash) {
  return String(hash || '').replace(/^#/, '').trim()
}

function getPostSlug(post) {
  return post?.id ?? slugify(post?.title ?? '')
}

export default function WritingPage() {
  const hash = useHash()
  const postId = getIdFromHash(hash)

  // Find the post if we have a hash (and it's not just '#writing')
  const selectedPost = postId && postId !== 'writing'
    ? writing.find((post) => getPostSlug(post) === postId)
    : null

  // If no posts, show coming soon
  if (writing.length === 0) {
    return (
      <section aria-labelledby="writing-title">
        <h1 id="writing-title">Writing</h1>
        <p className="text-muted margin-bottom-0">
          Articles, guides, and stories organized by category.
        </p>
        <div className="card margin-top-xl">
          <h2 className="no-margin-top">Coming soon</h2>
          <p className="text-muted no-margin">
            Writing list TBD.
          </p>
        </div>
      </section>
    )
  }

  // Show blog post detail if hash is present
  if (selectedPost) {
    const category = writingCategories[selectedPost.category]

    return (
      <section aria-labelledby="writing-detail-title">
        <nav className="breadcrumb-nav" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <a href="/#writing" className="breadcrumb-link">
            <ArrowLeft size={16} />
            <span style={{ marginLeft: '0.5rem' }}>Back to Writing</span>
          </a>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginLeft: 'auto' }}>
            <a
              href="/"
              className="breadcrumb-link"
              style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
            >
              Home
            </a>
            <a
              href="/#about"
              className="breadcrumb-link"
              style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
            >
              About
            </a>
            <a
              href="/#experience"
              className="breadcrumb-link"
              style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
            >
              Experience
            </a>
            <a
              href="/#projects"
              className="breadcrumb-link"
              style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
            >
              Projects
            </a>
          </div>
        </nav>

        <article>
          <header className="detail-header">
            {category && (
              <p className="text-muted m-0 font-size-0-95">
              {category.icon} {category.name}
              </p>
            )}
            {selectedPost.series && (
              <p className="text-muted m-0 font-size-0-95" style={{ marginTop: '0.25rem' }}>
                Series: {selectedPost.seriesTitle || selectedPost.series}
              </p>
            )}
            <h1 id="writing-detail-title" className="mt-md font-size-2xl">
              {selectedPost.title}
            </h1>
            <p className="text-muted m-0 font-size-1-05" style={{ marginTop: '0.5rem' }}>
              <time dateTime={selectedPost.date}>{selectedPost.date}</time>
            </p>
          </header>

          {selectedPost.content && (
            <div
              className="writing-content mt-lg"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          )}

          {!selectedPost.content && selectedPost.summary && (
            <div className="mt-lg">
              <p className="text-muted line-height-1-8">{selectedPost.summary}</p>
            </div>
          )}
        </article>
      </section>
    )
  }

  // Show masonry grid view
  return (
    <section aria-labelledby="writing-title">
      <h1 id="writing-title">Writing</h1>
      <p className="text-muted margin-bottom-0">
        Articles, guides, and stories organized by category.
      </p>

      <div className="blog-masonry-grid">
        {writing.map((post) => {
          const category = writingCategories[post.category]
          const postSlug = getPostSlug(post)
          // Determine color based on category
          let collectionColor = 'blue'
          if (post.category === 'internet-finds') collectionColor = 'green'
          if (post.category === 'travel-food-experiences') collectionColor = 'purple'

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
                  {post.summary && (
                    <p className="text-muted font-size-0-95 line-height-1-6" style={{ marginTop: '0.5rem' }}>
                      {post.summary}
                    </p>
                  )}
                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                    <p className="text-muted font-size-xs" style={{ margin: 0 }}>
                      <time dateTime={post.date}>{post.date}</time>
                    </p>
                    {post.stats && (
                      <p className="card-stats">{post.stats}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}