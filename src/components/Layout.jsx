import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav.jsx'
import SocialLinks from './SocialLinks.jsx'
import { PAGE_IDS, HERO_SCROLL_THRESHOLD } from '../config/constants.js'

export default function Layout({ currentPage, children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isNonMobileViewport, setIsNonMobileViewport] = useState(false)
  const menuRef = useRef(null)

  const showHeader = currentPage !== PAGE_IDS.HOME || isPastHero || isNonMobileViewport

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open)
  }

  // Keep header visible on tablet+ (tests + usability)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(min-width: 768px)')
    const handleChange = () => setIsNonMobileViewport(media.matches)

    handleChange()
    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
    } else if (media.addListener) {
      media.addListener(handleChange)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handleChange)
      } else if (media.removeListener) {
        media.removeListener(handleChange)
      }
    }
  }, [])

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show header when scrolling past hero section (only on home page)
  useEffect(() => {
    if (currentPage !== PAGE_IDS.HOME) return

    const handleScroll = () => {
      const heroSection = document.querySelector('.hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight * HERO_SCROLL_THRESHOLD
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

    // Focus trap: handle Tab key navigation within mobile menu
    const handleTabKey = (event) => {
      if (!isMobileMenuOpen || event.key !== 'Tab') return

      const menu = menuRef.current
      if (!menu) return

      const focusableElements = menu.querySelectorAll(
        'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          event.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          event.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleTabKey)
      // Prevent body scroll when menu is open
      document.body.classList.add('menu-open')
      
      // Focus trap: focus first focusable element in menu
      const firstFocusable = menuRef.current?.querySelector('a, button, [tabindex]:not([tabindex="-1"])')
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)
      document.body.classList.remove('menu-open')
    }
  }, [isMobileMenuOpen])

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`header ${showHeader ? 'header--visible' : ''}`}>
          <div className="container header__row">
            <a className="brand" href="/" aria-label="Sajesh S F home">
              Sajesh S F
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div 
              ref={menuRef}
              className={`header__actions ${isMobileMenuOpen ? 'header__actions--open' : ''}`}
            >
              <Nav 
                currentPage={currentPage} 
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={toggleMobileMenu}
              />
              <SocialLinks ariaLabel="Header social links" />
            </div>
            {isMobileMenuOpen && (
              <div 
                className="mobile-menu-overlay"
                onClick={toggleMobileMenu}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="header__scroll-indicator" aria-hidden="true">
            <div 
              className="header__scroll-progress" 
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </header>

      <main id="main" className="main">
        {currentPage === PAGE_IDS.HOME ? children : <div className="container">{children}</div>}
      </main>

      <footer className="footer">
        <div className="container">
          <p className="text-muted no-margin">
            Portfolio website of Sajesh S F. Built with React and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  currentPage: PropTypes.string,
  children: PropTypes.node.isRequired,
}
