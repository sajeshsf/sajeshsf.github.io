import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/experience'

const Experience = () => (
  <section className="section section--timeline" id="experience">
    <SectionHeading
      eyebrow="Experience"
      title="Career timeline of high-stakes programs"
      copy="A vertical snapshot of roles and flagship initiatives I've stewarded across hardware, firmware, and cloud."
    />

    <div className="timeline" role="list">
      {experience.map(({ period, role, company, focus, highlights }) => (
        <article key={`${period}-${role}`} className="timeline__item" role="listitem">
          <div className="timeline__marker" aria-hidden="true" />
          <div className="timeline__content">
            <p className="timeline__period">{period}</p>
            <h3>{role}</h3>
            <p className="timeline__company">{company}</p>
            {focus && <p className="timeline__focus">{focus}</p>}

            {highlights && (
              <ul>
                {highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default Experience
