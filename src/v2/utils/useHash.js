import { useEffect, useState } from 'react'

export function useHash() {
  const get = () => (typeof window === 'undefined' ? '' : window.location.hash || '')
  const [hash, setHash] = useState(get)

  useEffect(() => {
    const onChange = () => setHash(get())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}
