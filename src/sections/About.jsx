import SectionHeading from '../components/SectionHeading'

const highlights = [
  'Scaled an embedded practice from 3 → 35 engineers across 3 countries',
  'Cut cloud reporting latency from 45 min to under 3 sec for 15K safes',
  'Directed $600K+ multi-domain programs in aerospace, medical, and fintech',
  'Architected AI copilots, IoT firmware, and cloud analytics under one roadmap',
]

const About = () => (
  <section className="section" id="about">
    <SectionHeading
      eyebrow="About"
      title="Technical & organizational leadership at scale"
      copy="I bring hardware, firmware, cloud, and product teams into the same conversation and keep the outcomes measurable."
    />

    <div className="about">
      <p>
        From American Security to ISRO programs, I've navigated highly regulated
        environments where downtime isn't an option. I pair systems thinking
        with a product mindset—owning architecture, agile delivery, stakeholder
        alignment, and the coaching needed to grow resilient teams.
      </p>

      <ul>
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </section>
)

export default About
