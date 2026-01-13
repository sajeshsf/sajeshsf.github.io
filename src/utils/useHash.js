import { useCallback, useEffect, useState } from 'react'

export function useHash() {
  const getHash = useCallback(() => {
    if (typeof window === 'undefined') return ''
    return window.location.hash || ''
  }, [])

  // Initialize with current hash on mount (no effect needed)
  const [hash, setHash] = useState(getHash)

  useEffect(() => {
    const onChange = () => {
      setHash(getHash())
    }

    // Listen for hash changes
    window.addEventListener('hashchange', onChange)

    // Also check periodically in case hash was set programmatically
    const interval = setInterval(() => {
      const currentHash = getHash()
      setHash((prev) => (prev === currentHash ? prev : currentHash))
    }, 250)

    return () => {
      window.removeEventListener('hashchange', onChange)
      clearInterval(interval)
    }
  }, [getHash])

  return hash
}
