import PropTypes from 'prop-types'
import { PAGE_IDS } from '../config/constants.js'

const nav = [
  { id: PAGE_IDS.ABOUT, href: '/#about', label: 'About' },
  { id: PAGE_IDS.EXPERIENCE, href: '/#experience', label: 'Experience' },
  { id: PAGE_IDS.PROJECTS, href: '/#projects', label: 'Projects' },
  { id: PAGE_IDS.WRITING, href: '/#writing', label: 'Writing' },
]

export default function Nav({ currentPage, isMobileMenuOpen, onMobileMenuToggle }) {
  const handleClick = (e, href) => {
    // If we're on the home page, use smooth scroll to section
    if (currentPage === PAGE_IDS.HOME && href.startsWith('/#')) {
      e.preventDefault()
      const sectionId = href.replace('/#', '')
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Close mobile menu after navigation
    if (isMobileMenuOpen && onMobileMenuToggle) {
      onMobileMenuToggle()
    }
  }

  return (
    <nav className={`nav ${isMobileMenuOpen ? 'nav--open' : ''}`} aria-label="Primary navigation">
      {nav.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          aria-current={currentPage === item.id ? 'page' : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

Nav.propTypes = {
  currentPage: PropTypes.string,
  isMobileMenuOpen: PropTypes.bool,
  onMobileMenuToggle: PropTypes.func,
}
