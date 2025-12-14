import PropTypes from 'prop-types'

export default function TimelineItem({ item }) {
  return (
    <li className="v2-timeline__item">
      <div className="v2-timeline__marker" aria-hidden="true" />
      <div className="v2-timeline__content">
        <p className="v2-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
          {item.dateLabel}
        </p>
        <h2 style={{ margin: '0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
          <a href={`/v2/experience/#${item.id}`}>{item.role}</a>
        </h2>
        <p className="v2-muted" style={{ margin: 0, fontSize: '0.95rem' }}>
          {item.org}
        </p>
      </div>
    </li>
  )
}

TimelineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    org: PropTypes.string.isRequired,
    dateLabel: PropTypes.string.isRequired,
  }).isRequired,
}

