import { useEffect, useRef, useState } from 'react'

/**
 * Aşağı scroll'da true, yukarı scroll'da veya sayfanın en üstündeyken false döner.
 * `threshold` altında (sayfa başında) header her zaman görünür kalır.
 */
export function useHideOnScroll(threshold = 80) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    function update() {
      const y = window.scrollY
      const diff = y - lastY.current

      if (y < threshold) {
        setHidden(false)
      } else if (diff > 4) {
        setHidden(true)
      } else if (diff < -4) {
        setHidden(false)
      }

      lastY.current = y
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return hidden
}
