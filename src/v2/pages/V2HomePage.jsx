import { useEffect, useRef, useState } from 'react'
import { timeline } from '../data/timeline.js'
import { v2Projects } from '../data/projects.js'
import { writing } from '../data/writing.js'
import { experience } from '../../data/experience.js'
import { useScroll } from '../utils/useScroll.js'
import ProjectCard from '../components/ProjectCard.jsx'
import TimelineItem from '../components/TimelineItem.jsx'
import { ArrowDown, ArrowLeft } from '../components/ArrowIcon.jsx'

function TimelineGrid() {
  const [showAllItems, setShowAllItems] = useState(false)
  
  // Show first 2 items initially
  const initialItemsCount = 2
  const displayedItems = showAllItems ? timeline : timeline.slice(0, initialItemsCount)
  const hasMoreItems = timeline.length > initialItemsCount

  return (
    <div style={{ position: 'relative' }}>
      <ol 
        className="v2-timeline" 
        aria-label="Experience and education timeline"
        style={{
          maxHeight: showAllItems ? 'none' : '300px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {displayedItems.map((item) => (
          <TimelineItem 
            key={item.id} 
            item={item}
          />
        ))}
      </ol>
      
      {!showAllItems && hasMoreItems && (
        <>
          <div 
            className="v2-timeline-fade-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <button
              onClick={() => setShowAllItems(true)}
              className="v2-expand-timeline-button"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Show all</span>
              <ArrowDown size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function ProjectsGrid() {
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Show first 6 projects initially (2 rows of 3)
  const initialProjectsCount = 6
  const displayedProjects = showAllProjects ? v2Projects : v2Projects.slice(0, initialProjectsCount)
  const hasMoreProjects = v2Projects.length > initialProjectsCount

  return (
    <div style={{ position: 'relative' }}>
      <div 
        className="v2-projects-grid"
        style={{
          maxHeight: showAllProjects ? 'none' : '600px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {displayedProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      
      {!showAllProjects && hasMoreProjects && (
        <>
          <div 
            className="v2-projects-fade-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <button
              onClick={() => setShowAllProjects(true)}
              className="v2-expand-projects-button"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Show all</span>
              <ArrowDown size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function V2HomePage() {
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const writingRef = useRef(null)
  const { scrollY } = useScroll()
  const [visibleSections, setVisibleSections] = useState(new Set())

  // Parallax effect for hero section
  useEffect(() => {
    if (heroRef.current) {
      const parallax = Math.min(scrollY * 0.3, 200)
      heroRef.current.style.transform = `translateY(${parallax}px)`
      heroRef.current.style.opacity = Math.max(0, 1 - scrollY / 600)
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
              setVisibleSections((prev) => new Set([...prev, entry.target.id]))
              entry.target.classList.add('visible')
            }
          },
          {
            threshold: 0.05,
            rootMargin: '0px',
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
    <div className="v2-landing">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="v2-hero" aria-labelledby="hero-title">
        <div className="v2-hero-content">
          <h1 id="hero-title" className="v2-hero-title">
            Sajesh
          </h1>
          <p className="v2-hero-subtitle">
            Software Engineering Leader
          </p>
          <div className="v2-hero-scroll-indicator">
            <span>Scroll to explore</span>
            <div className="v2-scroll-arrow">
              <ArrowDown size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="v2-section v2-section-about">
        <div className="v2-container">
          <h2 className="v2-section-title">About</h2>
          <div className="v2-bento-grid">
            <div className="v2-card">
              <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>
                Professional Image
              </h3>
              <img
                src="/profile.jpg"
                alt="Sajesh S F - Professional headshot"
                className="v2-profile-image"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="v2-card v2-bento-span-2">
              <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>
                Executive Summary
              </h3>
              <p className="v2-muted" style={{ margin: 0, lineHeight: '1.8' }}>
                Seasoned Engineering leader with a quality-driven mindset, passion for data-driven decision making, 7+ years of experience delivering IoT, embedded systems, and enterprise applications, SaaS solutions in industrial, robotics, medical, aerospace, and fintech domains. Proven record of transitioning products from prototype to large-scale deployments, leading cross-functional engineering teams (35+ members), coordinating global engineering teams (US, India, Japan, and China), and ensuring zero-downtime operations across global infrastructure. Skilled in Agile/Scrum leadership, application development (C#, .NET, React.js, WPF), cloud platforms (AWS, IaC), and real-time embedded/IoT integration (C, C++). I excel at taking ideas from the conceptual stage to fully realized products. With a keen eye for detail and a deep understanding of all stages of product development, I can create high-quality products that accurately reflect the vision of the client. I am passionate about bringing innovative ideas to life and thrive in fast-paced, collaborative environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="v2-section v2-section-experience">
        <div className="v2-container">
          <h2 className="v2-section-title">Experience</h2>
          <p className="v2-muted" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            Professional roles and education timeline
          </p>
          <TimelineGrid />
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="v2-section v2-section-projects">
        <div className="v2-container">
          <h2 className="v2-section-title">Projects</h2>
          <p className="v2-muted" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            Professional and personal projects
          </p>
          <ProjectsGrid />
        </div>
      </section>

      {/* Writing Section */}
      <section ref={writingRef} id="writing" className="v2-section v2-section-writing">
        <div className="v2-container">
          <h2 className="v2-section-title">Writing</h2>
          <p className="v2-muted" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            Technical articles and blog posts
          </p>
          {writing.length === 0 ? (
            <div className="v2-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Coming Soon</h3>
              <p className="v2-muted" style={{ margin: 0 }}>
                Writing list to be added.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {writing.map((post) => (
                <article key={post.title} className="v2-card">
                  <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>
                    <a href={post.url}>{post.title}</a>
                  </h3>
                  <p className="v2-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                    <time dateTime={post.date}>{post.date}</time>
                    {post.kind ? ` · ${post.kind}` : ''}
                  </p>
                  {post.summary && (
                    <p className="v2-muted" style={{ margin: '0.5rem 0 0' }}>
                      {post.summary}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
