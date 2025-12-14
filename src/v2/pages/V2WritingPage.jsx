import { writing } from '../data/writing.js'

export default function V2WritingPage() {
  return (
    <section aria-labelledby="writing-title">
      <h1 id="writing-title">Writing</h1>
      <p className="v2-muted">Technical articles and blog posts.</p>

      <div style={{ marginTop: '1.25rem', display: 'grid', gap: '1rem' }}>
        {writing.map((post) => (
          <article key={post.title} className="v2-card">
            <header>
              <h2 style={{ margin: 0 }}>
                <a href={post.url}>{post.title}</a>
              </h2>
              <p className="v2-muted" style={{ margin: '0.35rem 0 0' }}>
                <time dateTime={post.date}>{post.date}</time>
                {post.kind ? ` · ${post.kind}` : ''}
              </p>
            </header>
            {post.summary ? <p className="v2-muted">{post.summary}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
