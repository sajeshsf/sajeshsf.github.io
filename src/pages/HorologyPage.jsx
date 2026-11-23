import { horology, horologyTopics } from '../data/horology.js'
import { useHash } from '../utils/useHash.js'
import { ArrowLeft } from '../components/ArrowIcon.jsx'

function getIdFromHash(hash) {
  return String(hash || '').replace(/^#/, '').trim()
}

export default function HorologyPage() {
  const hash = useHash()
  const articleId = getIdFromHash(hash)
  const selected = articleId ? horology.find((a) => a.id === articleId) : null

  if (selected) {
    const topic = horologyTopics[selected.topic]

    return (
      <section aria-labelledby="horology-detail-title">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <a href="/horology/" className="breadcrumb-link">
            <ArrowLeft size={16} />
            <span style={{ marginLeft: '0.5rem' }}>Back to Horology</span>
          </a>
        </nav>

        <article>
          <header>
            {topic && (
              <p className="text-muted font-size-sm">
                {topic.icon} {topic.name}
              </p>
            )}
            <h1 id="horology-detail-title" className="post-title">
              {selected.title}
            </h1>
            <p className="text-muted font-size-lg" style={{ marginTop: '0.5rem' }}>
              <time dateTime={selected.date}>{selected.date}</time>
            </p>
          </header>

          <div
            className="writing-content margin-top-2xl"
            dangerouslySetInnerHTML={{ __html: selected.content }}
          />
        </article>
      </section>
    )
  }

  return (
    <section aria-labelledby="horology-title">
      <h1 id="horology-title">Horology</h1>
      <p className="text-muted margin-bottom-0">
        Notes on watches: the mechanisms, the craft, and how they keep time.
      </p>

      <div className="writing-grid margin-top-xl">
        {horology.map((article) => {
          const topic = horologyTopics[article.topic]
          return (
            <article key={article.id} className="card">
              <h2 className="no-margin margin-bottom-sm">
                <a href={`/horology/#${article.id}`}>{article.title}</a>
              </h2>
              <p className="text-muted no-margin font-size-xs">
                <time dateTime={article.date}>{article.date}</time>
                {topic && (
                  <>
                    {' · '}
                    <span>
                      {topic.icon} {topic.name}
                    </span>
                  </>
                )}
              </p>
              {article.summary && (
                <p className="text-muted margin-top-sm">{article.summary}</p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
