import SEO from '../components/SEO.jsx'

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About | Sajesh S F - Software Engineering Leader"
        description="Learn about Sajesh S F - Software Engineering Leader with 7+ years of experience in IoT, embedded systems, and cloud solutions. Leading global engineering teams and delivering enterprise applications."
        keywords="Sajesh S F, About, Software Engineering Leader, Engineering Manager, IoT, Embedded Systems, Cloud Solutions, Rancho Cucamonga, California"
        canonical="https://sajeshsf.github.io/about/"
      />
      <article aria-labelledby="about-title">
      <h1 id="about-title">About</h1>

      <div className="bento-grid">
        <section aria-labelledby="headshot-title" className="card">
          <h2 id="headshot-title" className="no-margin-top margin-bottom-md">
            Professional Image
          </h2>
          <img
            src="/profile.jpg"
            alt="Sajesh S F - Professional headshot"
            className="profile-image width-full aspect-square border-radius-md"
            style={{ objectFit: 'cover' }}
          />
        </section>

        <section aria-labelledby="summary-title" className="card bento-span-2">
          <h2 id="summary-title" className="no-margin-top margin-bottom-md">
            Executive Summary
          </h2>
          <p className="text-muted no-margin line-height-loose">
            Seasoned Engineering leader with a quality-driven mindset, passion for data-driven decision making, 7+ years of experience delivering IoT, embedded systems, and enterprise applications, SaaS solutions in industrial, robotics, medical, aerospace, and fintech domains. Proven record of transitioning products from prototype to large-scale deployments, leading cross-functional engineering teams (35+ members), coordinating global engineering teams (US, India, Japan, and China), and ensuring zero-downtime operations across global infrastructure. Skilled in Agile/Scrum leadership, application development (C#, .NET, React.js, WPF), cloud platforms (AWS, IaC), and real-time embedded/IoT integration (C, C++). I excel at taking ideas from the conceptual stage to fully realized products. With a keen eye for detail and a deep understanding of all stages of product development, I can create high-quality products that accurately reflect the vision of the client. I am passionate about bringing innovative ideas to life and thrive in fast-paced, collaborative environments.
          </p>
        </section>
      </div>
    </article>
    </>
  )
}
