import SectionHeading from '../components/SectionHeading'

const contactOptions = [
  {
    label: 'Email',
    value: 'hello@sajesh.dev',
    href: 'mailto:hello@sajesh.dev',
  },
  {
    label: 'Calendly',
    value: 'Book a 30-min chat',
    href: 'https://cal.com/sajesh/intro',
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: 'https://sajesh.dev/resume.pdf',
  },
]

const Contact = () => (
  <section className="section" id="contact">
    <SectionHeading
      eyebrow="Contact"
      title="Let's build the next launch together"
      copy="Whether you need a sprint partner or a long-term collaborator, I can help."
    />

    <div className="contact-card">
      <p>
        I'm currently taking on new freelance work and fractional front-end
        leads. Send a quick brief, and I'll respond within a day.
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
