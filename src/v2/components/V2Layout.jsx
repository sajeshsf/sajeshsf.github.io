import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import V2Nav from './V2Nav.jsx'
import SocialLinks from './SocialLinks.jsx'

export default function V2Layout({ currentPage, children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const menuRef = useRef(null)

  const showHeader = currentPage !== 'home' || isPastHero

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open)
  }

  // Show header when scrolling past hero section (only on home page)
  useEffect(() => {
    if (currentPage !== 'home') return

    const handleScroll = () => {
      const heroSection = document.querySelector('.v2-hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight * 0.1 // Show header when 10% past hero
        setIsPastHero(scrollPosition > heroBottom)
      }
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    // Close menu on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="v2">
      <a className="v2-skip-link" href="#main">
        Skip to content
      </a>

      <header className={`v2-header ${showHeader ? 'v2-header--visible' : ''}`}>
          <div className="v2-container v2-header__row">
            <a className="v2-brand" href="/v2/" aria-label="Sajesh S F home">
              Sajesh S F
            </a>
            <button
              className="v2-mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="v2-hamburger">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div 
              ref={menuRef}
              className={`v2-header__actions ${isMobileMenuOpen ? 'v2-header__actions--open' : ''}`}
            >
              <V2Nav 
                currentPage={currentPage} 
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={toggleMobileMenu}
              />
              <SocialLinks />
            </div>
            {isMobileMenuOpen && (
              <div 
                className="v2-mobile-menu-overlay"
                onClick={toggleMobileMenu}
                aria-hidden="true"
              />
            )}
          </div>
        </header>

      <main id="main" className="v2-main">
        {currentPage === 'home' ? children : <div className="v2-container">{children}</div>}
      </main>

      <footer className="v2-footer">
        <div className="v2-container">
          <p className="v2-muted" style={{ margin: 0 }}>
            Portfolio v2. Back to the original one-page version at{' '}
            <a href="/">/</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

V2Layout.propTypes = {
  currentPage: PropTypes.string,
  children: PropTypes.node.isRequired,
}
