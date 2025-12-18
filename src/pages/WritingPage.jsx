import { writing } from '../data/writing.js'

export default function WritingPage() {
  return (
    <section aria-labelledby="writing-title">
      <h1 id="writing-title">Writing</h1>
      <p className="text-muted margin-bottom-0">
        Technical articles and blog posts.
      </p>

      {writing.length === 0 ? (
        <div className="card margin-top-xl">
          <h2 className="no-margin-top">Coming soon</h2>
          <p className="text-muted no-margin">
            Writing list TBD.
          </p>
        </div>
      ) : (
        <div className="writing-grid-container">
          {writing.map((post) => (
            <article key={post.title} className="card">
              <header>
                <h2 className="no-margin">
                  <a href={post.url}>{post.title}</a>
                </h2>
                <p className="text-muted writing-meta">
                  <time dateTime={post.date}>{post.date}</time>
                  {post.kind ? ` · ${post.kind}` : ''}
                </p>
              </header>
              {post.summary ? <p className="text-muted">{post.summary}</p> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
