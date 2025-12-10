import SectionHeading from '../components/SectionHeading'

const contactOptions = [
  {
    label: 'Email',
    value: 'official.sajesh@gmail.com',
    href: 'mailto:official.sajesh@gmail.com',
  },
  {
    label: 'Phone',
    value: '+1 925-568-6538',
    href: 'tel:+19255686538',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sajesh-sf',
    href: 'https://www.linkedin.com/in/sajesh-sf',
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: '/sajesh-resume.pdf',
  },
]

const Contact = () => (
  <section className="section" id="contact">
    <SectionHeading
      eyebrow="Contact"
      title="Engage me when reliability is non-negotiable"
      copy="Open to head-of-engineering roles, modernization mandates, or fractional advisory work where hardware, firmware, and cloud teams must align fast."
    />

    <div className="contact-card">
      <p>
        Send a concise brief if you&apos;re wrestling with large-scale
        deployments, platform turnarounds, or need a steady hand through
        post-merger integration. I respond within one business day with a plan
        to assess, stabilize, and scale.
      </p>

      <div className="contact-card__links">
        {contactOptions.map(({ label, value, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer">
            <span>{label}</span>
            <strong>{value}</strong>
          </a>
        ))}
      </div>
    </div>
  </section>
)

export default Contact
