import { useEffect, useState } from 'react'

export function useHash() {
  const get = () => {
    if (typeof window === 'undefined') return ''
    return window.location.hash || ''
  }
  const [hash, setHash] = useState(() => {
    // Initialize with current hash on mount
    if (typeof window !== 'undefined') {
      return window.location.hash || ''
    }
    return ''
  })

  useEffect(() => {
    const onChange = () => {
      const newHash = get()
      setHash(newHash)
    }

    // Listen for hash changes
    window.addEventListener('hashchange', onChange)

    return () => {
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  return hash
}
