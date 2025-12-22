import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function RotatingTagline({ taglines, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length)
        setIsFlipping(false)
      }, 300) // Half of flip animation duration
    }, interval)

    return () => clearInterval(timer)
  }, [taglines.length, interval])

  return (
    <span className={`rotating-tagline ${isFlipping ? 'rotating-tagline--flip' : ''}`}>
      {taglines[currentIndex]}
    </span>
  )
}

RotatingTagline.propTypes = {
  taglines: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
}


