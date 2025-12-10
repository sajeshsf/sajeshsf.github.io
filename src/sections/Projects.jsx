import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const Projects = () => (
  <section className="section" id="projects">
    <SectionHeading
      eyebrow="Projects"
      title="Selected work"
      copy="Multi-year programs that blend embedded systems, cloud platforms, and AI-driven insights."
    />

    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  </section>
)

export default Projects
