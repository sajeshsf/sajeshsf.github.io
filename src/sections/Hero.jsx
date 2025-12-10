import profile from '../assets/profile.svg'
import SocialLinks from '../components/SocialLinks'

const Hero = () => (
  <section className="section section--hero" aria-label="Hero">
    <div className="hero">
      <div className="hero__content">
        <p className="eyebrow">
          Director of Software & Systems · Hands-on Builder
        </p>
        <h1>Head-of-engineering operator who still ships firmware.</h1>
        <p>
          I&apos;m Sajesh, leading software at American Security and stewarding
          the CashWizard portfolio from hardware architecture through cloud and
          AI analytics. I partner with executives on roadmap bets, then jump into
          code reviews, RTOS traces, or AWS IaC when the situation demands it.
        </p>
        <p>
          Today that means keeping{' '}
          <strong className="hero__number">15K+</strong> smart safes online,
          modernizing them to Yocto Linux + React touch UIs, and compressing
          enterprise reporting from 45 minutes to sub-three seconds while
          trimming infrastructure spend by 40%.
        </p>
        <p>
          Earlier, I scaled Travancore Analytics&apos; embedded practice from 3
          to 35 engineers, delivered ISRO flight-critical systems, advised
          open-source privacy projects, and grew new business from $0 to $100K in
          the first year.
        </p>

        <div className="hero__actions">
          <a className="btn" href="#projects">
            Review transformation programs
          </a>
          <a className="btn btn--ghost" href="/sajesh-resume.pdf">
            Download leadership resume
          </a>
        </div>

        <SocialLinks variant="pill" />
      </div>

      <img src={profile} alt="Minimal illustration of Sajesh" />
    </div>
  </section>
)

export default Hero
