import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const Projects = () => (
  <section className="section" id="projects">
    <SectionHeading
      eyebrow="Programs"
      title="Transformations I've steered end-to-end"
      copy="From fintech safes to aerospace testbeds, these initiatives span strategy, architecture, delivery, and the field validation needed to hold the gains."
    />

    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  </section>
)

export default Projects
