const SectionHeading = ({ eyebrow, title, copy }) => (
  <header className="section-heading">
    {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {copy && <p className="section-heading__copy">{copy}</p>}
  </header>
)

export default SectionHeading
