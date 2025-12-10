import profile from '../assets/profile.svg'
import SocialLinks from '../components/SocialLinks'

const Hero = () => (
  <section className="section section--hero" aria-label="Hero">
    <div className="hero">
      <div className="hero__content">
        <p className="eyebrow">Engineering Leader · IoT · Robotics · Fintech</p>
        <h1>
          Hi, I'm Sajesh. I scale mission-critical platforms without losing
          sleep.
        </h1>
        <p>
          I build and lead cross-functional teams (35+ engineers across the US,
          India, Japan, and China) to ship zero-downtime IoT, robotics, and
          enterprise systems. From Rust-based peer-to-peer stacks to AWS-native
          analytics, I translate field constraints into resilient architecture.
        </p>
        <p>
          Right now I'm modernizing CashWizard smart safes keeping{' '}
          <strong className="hero__number">15K+</strong> devices online while
          driving AI-powered analytics for operators.
        </p>

        <div className="hero__actions">
          <a className="btn" href="#projects">
            See transformation work
          </a>
          <a className="btn btn--ghost" href="/sajesh-resume.pdf">
            Download resume
          </a>
        </div>

        <SocialLinks variant="pill" />
      </div>

      <img src={profile} alt="Minimal illustration of Sajesh" />
    </div>
  </section>
)

export default Hero
