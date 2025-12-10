import SocialLinks from './SocialLinks'

const Footer = () => (
  <footer className="footer">
    <p>
      © {new Date().getFullYear()} Sajesh S F. Built with React + Vite and
      fueled by late-night chai + telemetry dashboards.
    </p>
    <SocialLinks variant="ghost" />
  </footer>
)

export default Footer
