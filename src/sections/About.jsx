import SectionHeading from '../components/SectionHeading'

const highlights = [
  'Head of Software @ American Security · zero-downtime ops for 15K+ safes across US, Korea, China, and India',
  "Scaled Travancore Analytics' embedded org from 3 → 35 engineers while managing a $600K+ portfolio of global programs",
  'Directed ISRO, aerospace, medical imaging, and fintech deployments with on-site qualifications in India, Japan, and the US',
  'Designed AI copilots, AWS analytics stacks, Yocto/RTOS firmware, and open-source privacy products under unified roadmaps',
]

const About = () => (
  <section className="section" id="about">
    <SectionHeading
      eyebrow="About"
      title="Board-level clarity with lab-bench depth"
      copy="I close the gap between strategic steering committees and the teams soldering boards at 2 a.m., keeping quality, velocity, and financials in lockstep."
    />

    <div className="about">
      <p>
        From American Security to ISRO payload qualification, I operate where
        hardware, firmware, and cloud platforms intersect with regulated
        environments. I set the destination with executives, translate it into
        measurable program increments, and stay close enough to the work to
        unblock engineers, review architectures, and de-risk integrations in the
        field.
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
