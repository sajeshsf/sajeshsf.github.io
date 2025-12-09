import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const Projects = () => (
  <section className="section" id="projects">
    <SectionHeading
      eyebrow="Projects"
      title="Selected work"
      copy="Recent work that highlights my focus on usability, performance, and storytelling."
    />

    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  </section>
)

export default Projects
