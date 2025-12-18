import PropTypes from 'prop-types'

const nav = [
  { id: 'about', href: '/v2/#about', label: 'About' },
  { id: 'experience', href: '/v2/#experience', label: 'Experience' },
  { id: 'projects', href: '/v2/#projects', label: 'Projects' },
  { id: 'writing', href: '/v2/#writing', label: 'Writing' },
]

export default function V2Nav({ currentPage, isMobileMenuOpen, onMobileMenuToggle }) {
  const handleClick = (e, href) => {
    // If we're on the home page, use smooth scroll to section
    if (currentPage === 'home' && href.startsWith('/v2/#')) {
      e.preventDefault()
      const sectionId = href.replace('/v2/#', '')
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
    <nav className={`v2-nav ${isMobileMenuOpen ? 'v2-nav--open' : ''}`} aria-label="V2 primary">
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

V2Nav.propTypes = {
  currentPage: PropTypes.string,
  isMobileMenuOpen: PropTypes.bool,
  onMobileMenuToggle: PropTypes.func,
}
