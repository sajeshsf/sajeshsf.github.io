import { useState } from 'react'
import SocialLinks from './SocialLinks'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="navbar">
      <a className="navbar__logo" href="#top">
        sajesh<span className="accent">sf</span>
      </a>

      <button
        className="navbar__toggle"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`navbar__menu ${isOpen ? 'is-open' : ''}`}>
        {navItems.map(({ href, label }) => (
          <a key={href} href={href} onClick={handleNavClick}>
            {label}
          </a>
        ))}
        <a
          className="navbar__cta"
          href="mailto:official.sajesh@gmail.com"
          onClick={handleNavClick}
        >
          Say hello
        </a>
      </nav>

      <SocialLinks className="navbar__social" variant="ghost" />
    </header>
  )
}

export default Navbar
