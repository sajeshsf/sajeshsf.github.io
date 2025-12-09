import SocialLinks from './SocialLinks'

const Footer = () => (
  <footer className="footer">
    <p>
      © {new Date().getFullYear()} Sajesh. Built with React + Vite and hosted on
      GitHub Pages.
    </p>
    <SocialLinks variant="ghost" />
  </footer>
)

export default Footer
