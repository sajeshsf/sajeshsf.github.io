const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sajesh-sf',
    text: 'IN',
  },
  {
    label: 'Email Sajesh',
    href: 'mailto:official.sajesh@gmail.com',
    text: '@',
  },
  {
    label: 'Call Sajesh',
    href: 'tel:+19255686538',
    text: '+',
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
