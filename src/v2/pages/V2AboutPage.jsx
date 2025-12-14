export default function V2AboutPage() {
  return (
    <article aria-labelledby="about-title">
      <h1 id="about-title">About</h1>
      
      <div className="v2-bento-grid">
        <section aria-labelledby="headshot-title" className="v2-card">
          <h2 id="headshot-title" style={{ marginTop: 0, marginBottom: '1rem' }}>
            Professional Image
          </h2>
          <img
            src="/profile.jpg"
            alt="Sajesh S F - Professional headshot"
            className="v2-profile-image"
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: 'var(--radius-md)',
              objectFit: 'cover',
            }}
          />
        </section>

        <section aria-labelledby="summary-title" className="v2-card v2-bento-span-2">
          <h2 id="summary-title" style={{ marginTop: 0, marginBottom: '1rem' }}>
            Executive Summary
          </h2>
          <p className="v2-muted" style={{ margin: 0, lineHeight: '1.8' }}>
            Seasoned Engineering leader with a quality-driven mindset, passion for data-driven decision making, 7+ years of experience delivering IoT, embedded systems, and enterprise applications, SaaS solutions in industrial, robotics, medical, aerospace, and fintech domains. Proven record of transitioning products from prototype to large-scale deployments, leading cross-functional engineering teams (35+ members), coordinating global engineering teams (US, India, Japan, and China), and ensuring zero-downtime operations across global infrastructure. Skilled in Agile/Scrum leadership, application development (C#, .NET, React.js, WPF), cloud platforms (AWS, IaC), and real-time embedded/IoT integration (C, C++). I excel at taking ideas from the conceptual stage to fully realized products. With a keen eye for detail and a deep understanding of all stages of product development, I can create high-quality products that accurately reflect the vision of the client. I am passionate about bringing innovative ideas to life and thrive in fast-paced, collaborative environments.
          </p>
        </section>
      </div>
    </article>
  )
}
