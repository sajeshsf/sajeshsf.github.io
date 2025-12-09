import SectionHeading from '../components/SectionHeading'

const highlights = [
  '5+ years building component libraries and design systems',
  'Comfortable owning CI/CD pipelines and GitHub Actions deployments',
  'Mentor for early-career engineers and frequent code reviewer',
]

const About = () => (
  <section className="section" id="about">
    <SectionHeading
      eyebrow="About"
      title="Curious, collaborative, and obsessed with details"
      copy="I thrive where design, engineering, and product strategy overlap."
    />

    <div className="about">
      <p>
        I partner closely with founders, designers, and backend teams to build
        resilient interfaces. My toolkit includes React, TypeScript, Vite,
        Tailwind, testing libraries, and the empathy needed to ship delightful
        products on time.
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
