import { useEffect } from 'react'
import { startSmoothScroll } from '../lib/lenis'
import { ScrollTrigger } from '../lib/gsapConfig'
import { useReducedMotion } from './useReducedMotion'

export function useSmoothScroll() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const stop = startSmoothScroll()
    return stop
  }, [reducedMotion])

  // GSAP's own layout measurements can be taken before web fonts or
  // late-loading images settle (the Safari race condition this pin
  // system used to hit), so force a recompute once everything is in.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready?.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
}
