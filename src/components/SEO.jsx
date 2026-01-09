import { useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * SEO Component - Updates document title and meta tags dynamically
 *
 * Usage:
 * <SEO
 *   title="Page Title"
 *   description="Page description"
 *   keywords="keyword1, keyword2"
 *   ogImage="/path/to/image.jpg"
 * />
 */
export default function SEO({
  title = 'Sajesh S F | Technical & Organizational Leader',
  description = 'Portfolio of Sajesh S F - Software Engineering Leader with 7+ years of experience in IoT, embedded systems, cloud solutions, and leading global engineering teams.',
  keywords = 'Sajesh S F, Software Engineering Leader, IoT, Embedded Systems, Cloud Solutions, Engineering Manager, React, AWS, C++, C#, .NET, React.js, Portfolio, Software Engineer, Tech Lead',
  ogImage = 'https://sajeshsf.github.io/profile.jpg',
  canonical = 'https://sajeshsf.github.io/',
  type = 'website'
}) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)

      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Update description
    updateMetaTag('description', description)

    // Update keywords
    updateMetaTag('keywords', keywords)

    // Update Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:url', canonical, true)
    updateMetaTag('og:type', type, true)

    // Update Twitter Card tags
    updateMetaTag('twitter:title', title, true)
    updateMetaTag('twitter:description', description, true)
    updateMetaTag('twitter:image', ogImage, true)
    updateMetaTag('twitter:url', canonical, true)

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonical)
  }, [title, description, keywords, ogImage, canonical, type])

  return null
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  canonical: PropTypes.string,
  type: PropTypes.string,
}
