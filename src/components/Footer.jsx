import SocialLinks from './SocialLinks'

const Footer = () => (
  <footer className="footer">
    <p>
      © {new Date().getFullYear()} Sajesh S F. Director-level builder ensuring
      the board vision and the bench execution stay aligned.
    </p>
    <SocialLinks variant="ghost" />
  </footer>
)

export default Footer
