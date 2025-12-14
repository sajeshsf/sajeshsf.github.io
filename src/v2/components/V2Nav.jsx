const nav = [
  { id: 'about', href: '/v2/about/', label: 'About' },
  { id: 'experience', href: '/v2/experience/', label: 'Experience' },
  { id: 'projects', href: '/v2/projects/', label: 'Projects' },
  { id: 'writing', href: '/v2/writing/', label: 'Writing' },
]

export default function V2Nav({ currentPage }) {
  return (
    <nav className="v2-nav" aria-label="V2 primary">
      {nav.map((item) => (
        <a
          key={item.id}
          href={item.href}
          aria-current={currentPage === item.id ? 'page' : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
