import { useEffect, useRef, useState } from 'react'

interface UseRevealResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  visible: boolean
}

/** Reveals an element the first time it scrolls into view. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
): UseRevealResult<T> {
  const ref = useRef<T>(null)
  // Without IntersectionObserver support, everything starts visible.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
