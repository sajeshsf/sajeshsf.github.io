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
      title="Let's build dependable systems together"
      copy="I'm currently leading platform engineering at American Security and open to advisory or head-of-engineering conversations."
    />

    <div className="contact-card">
      <p>
        If you're navigating modernization, large-scale deployments, or
        cross-geography delivery, send a quick brief. I typically respond within
        24 hours with next steps.
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
