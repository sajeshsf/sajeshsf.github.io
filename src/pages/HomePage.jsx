import { useEffect, useRef, useState } from 'react'
import { writing, writingCategories } from '../data/writing.js'
import { useScroll } from '../utils/useScroll.js'
import {
  SCROLL_PARALLAX_FACTOR,
  SCROLL_FADE_START,
  INTERSECTION_THRESHOLD,
  INTERSECTION_ROOT_MARGIN,
} from '../config/constants.js'
import TimelineGrid from '../components/TimelineGrid.jsx'
import ProjectsGrid from '../components/ProjectsGrid.jsx'
import RotatingTagline from '../components/RotatingTagline.jsx'
import SocialLinks from '../components/SocialLinks.jsx'

export default function HomePage() {
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const writingRef = useRef(null)
  const scrollY = useScroll()

  // Parallax effect for hero section
  useEffect(() => {
    if (heroRef.current) {
      const parallax = Math.min(scrollY * SCROLL_PARALLAX_FACTOR, 200)
      heroRef.current.style.transform = `translateY(${parallax}px)`
      heroRef.current.style.opacity = Math.max(0, 1 - scrollY / SCROLL_FADE_START)
    }
  }, [scrollY])

  // Intersection Observer for section animations
  useEffect(() => {
    const sections = [aboutRef, experienceRef, projectsRef, writingRef]
    const observers = []

    sections.forEach((ref) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          },
          {
            threshold: INTERSECTION_THRESHOLD,
            rootMargin: INTERSECTION_ROOT_MARGIN,
          }
        )
        observer.observe(ref.current)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="landing">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="hero" aria-labelledby="hero-title">
        <div className="hero-background" />
        <div className="hero-content">
          <span className="hero-greeting">Hi, I am</span>
          <h1 id="hero-title" className="hero-title">
            Sajesh
          </h1>
          <p className="hero-subtitle">
            I am a{' '}
            <RotatingTagline
              taglines={[
                'Technological leader',
                'Organisational leader',
                'Engineering leader',
                'Product architect',
                'Team builder',
              ]}
              interval={3000}
            />
          </p>
          <div className="hero-social-links">
            <SocialLinks />
          </div>
          <a 
            href="#about" 
            className="hero-scroll-indicator"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            aria-label="Scroll to about section"
          >
            <div className="scroll-mouse">
              <div className="scroll-mouse-wheel"></div>
            </div>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="section section-about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="bento-grid">
            <div className="card">
              <h3>Professional Image</h3>
              <img
                src="/profile.jpg"
                alt="Sajesh S F - Professional headshot"
                className="profile-image"
              />
            </div>
            <div className="card bento-span-2">
              <h3>Executive Summary</h3>
              <p className="text-muted no-margin line-height-loose">
                Seasoned Engineering leader with a quality-driven mindset, passion for data-driven decision making, 7+ years of experience delivering IoT, embedded systems, and enterprise applications, SaaS solutions in industrial, robotics, medical, aerospace, and fintech domains. Proven record of transitioning products from prototype to large-scale deployments, leading cross-functional engineering teams (35+ members), coordinating global engineering teams (US, India, Japan, and China), and ensuring zero-downtime operations across global infrastructure. Skilled in Agile/Scrum leadership, application development (C#, .NET, React.js, WPF), cloud platforms (AWS, IaC), and real-time embedded/IoT integration (C, C++). I excel at taking ideas from the conceptual stage to fully realized products. With a keen eye for detail and a deep understanding of all stages of product development, I can create high-quality products that accurately reflect the vision of the client. I am passionate about bringing innovative ideas to life and thrive in fast-paced, collaborative environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="section section-experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <p className="text-muted margin-bottom-lg text-center">
            Professional roles and education timeline
          </p>
          <TimelineGrid />
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="section section-projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p className="text-muted margin-bottom-lg text-center">
            Professional and personal projects
          </p>
          <ProjectsGrid />
        </div>
      </section>

      {/* Writing Section */}
      <section ref={writingRef} id="writing" className="section section-writing">
        <div className="container">
          <h2 className="section-title">Writing</h2>
          <p className="text-muted margin-bottom-lg text-center">
            Technical articles and blog posts
          </p>
          {writing.length === 0 ? (
            <div className="card empty-state">
              <h3>Coming Soon</h3>
              <p className="text-muted no-margin">
                Writing list to be added.
              </p>
            </div>
          ) : (
            <div className="writing-grid">
              {writing.slice(0, 3).map((post) => {
                const category = writingCategories[post.category]
                return (
                  <article key={post.id || post.title} className="card">
                    {post.series && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--accent-soft)',
                            fontWeight: 500,
                          }}
                        >
                          Series: {post.seriesTitle || post.series}
                        </span>
                      </div>
                    )}
                    <h3 className="no-margin margin-bottom-sm">
                      <a href={`/writing/#${post.id || post.title.toLowerCase().replace(/\s+/g, '-')}`}>{post.title}</a>
                    </h3>
                    <p className="text-muted no-margin font-size-xs">
                      <time dateTime={post.date}>{post.date}</time>
                      {category && (
                        <>
                          {' · '}
                          <span>
                            {category.icon} {category.name}
                          </span>
                        </>
                      )}
                    </p>
                    {post.summary && (
                      <p className="text-muted margin-top-sm">
                        {post.summary}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
