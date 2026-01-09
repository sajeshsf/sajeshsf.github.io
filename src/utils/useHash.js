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

    // Set initial hash
    setHash(get())

    // Listen for hash changes
    window.addEventListener('hashchange', onChange)

    // Also check periodically in case hash was set programmatically
    const interval = setInterval(() => {
      const currentHash = get()
      if (currentHash !== hash) {
        setHash(currentHash)
      }
    }, 100)

    return () => {
      window.removeEventListener('hashchange', onChange)
      clearInterval(interval)
    }
  }, [])

  return hash
}
