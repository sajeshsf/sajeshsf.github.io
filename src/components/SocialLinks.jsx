const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/sajesh',
    text: 'GH',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sajesh',
    text: 'IN',
  },
  {
    label: 'Email',
    href: 'mailto:hello@sajesh.dev',
    text: '@',
  },
]

const SocialLinks = ({ className = '', variant = 'pill' }) => {
  const classes = ['social-links', `social-links--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <ul className={classes}>
      {socials.map(({ label, href, text }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <span aria-hidden="true">{text}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
