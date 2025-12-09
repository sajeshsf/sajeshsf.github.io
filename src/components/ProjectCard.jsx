const ProjectCard = ({ project }) => {
  const { title, description, stack, live, repo, year } = project

  return (
    <article className="project-card">
      <p className="project-card__year">{year}</p>
      <h3>{title}</h3>
      <p className="project-card__description">{description}</p>

      <ul className="project-card__stack">
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="project-card__links">
        {live && (
          <a href={live} target="_blank" rel="noreferrer">
            Live site
          </a>
        )}
        {repo && (
          <a href={repo} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
