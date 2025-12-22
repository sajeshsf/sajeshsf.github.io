import { useEffect, useState } from 'react'

export function useHash() {
  const [hash, setHash] = useState(() => {
    // Initialize with current hash on mount
    if (typeof window !== 'undefined') {
      return window.location.hash || ''
    }
    return ''
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getHash = () => window.location.hash || ''
    const onChange = () => {
      setHash(getHash())
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', onChange)
    
    // Also check periodically in case hash was set programmatically
    const interval = setInterval(() => {
      const currentHash = getHash()
      setHash((prev) => (prev === currentHash ? prev : currentHash))
    }, 100)
    
    return () => {
      window.removeEventListener('hashchange', onChange)
      clearInterval(interval)
    }
  }, [])

  return hash
}
