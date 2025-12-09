import profile from '../assets/profile.svg'
import SocialLinks from '../components/SocialLinks'

const Hero = () => (
  <section className="section section--hero" aria-label="Hero">
    <div className="hero">
      <div className="hero__content">
        <p className="eyebrow">Product-minded Front-end Engineer</p>
        <h1>
          Hi, I'm Sajesh. I build useful experiences for the web and ship them
          with care.
        </h1>
        <p>
          I specialize in modern React ecosystems, accessibility-first design,
          and lean delivery pipelines. I enjoy turning ambiguous requirements
          into well-crafted UI that feels effortless.
        </p>

        <div className="hero__actions">
          <a className="btn" href="#projects">
            View selected work
          </a>
          <a className="btn btn--ghost" href="mailto:hello@sajesh.dev">
            Book a call
          </a>
        </div>

        <SocialLinks variant="pill" />
      </div>

      <img src={profile} alt="Minimal illustration of Sajesh" />
    </div>
  </section>
)

export default Hero
