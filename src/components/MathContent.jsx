import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// Renders trusted post HTML. When `math` is true, LaTeX delimited by
// $...$, $$...$$, \(...\) or \[...\] is typeset with KaTeX (loaded lazily,
// so posts without math do not pay for it).
export default function MathContent({ html, math = false, className }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!math || !ref.current) return
    let cancelled = false
    Promise.all([
      import('katex/contrib/auto-render'),
      import('katex/dist/katex.min.css'),
    ]).then(([{ default: renderMathInElement }]) => {
      if (cancelled || !ref.current) return
      renderMathInElement(ref.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        throwOnError: false,
      })
    })
    return () => {
      cancelled = true
    }
  }, [html, math])

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

MathContent.propTypes = {
  html: PropTypes.string.isRequired,
  math: PropTypes.bool,
  className: PropTypes.string,
}
