import PropTypes from 'prop-types'

export default function TimelineItem({ item }) {
  return (
    <li className="timeline__item">
      <div className="timeline__marker" aria-hidden="true" />
      <div className="timeline__content">
        <p className="text-muted no-margin font-size-xs">
          {item.dateLabel}
        </p>
        <h2 className="timeline-heading">
          <a href={`/experience/#${item.id}`}>{item.role}</a>
        </h2>
        <p className="text-muted no-margin font-size-sm">
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

