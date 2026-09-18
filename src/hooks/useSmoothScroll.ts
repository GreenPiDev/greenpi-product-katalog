import { useEffect } from 'react'
import { startSmoothScroll } from '../lib/lenis'
import { useReducedMotion } from './useReducedMotion'

export function useSmoothScroll() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const stop = startSmoothScroll()
    return stop
  }, [reducedMotion])
}
