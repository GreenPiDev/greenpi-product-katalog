import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsapConfig'

let lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenis
}

export function startSmoothScroll(): () => void {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
  })

  // Keep ScrollTrigger's scroll position in sync with Lenis's virtual
  // scroll instead of the native scroll event, and drive both from the
  // same rAF loop so pinned/scrubbed sections never desync from the
  // smooth-scroll interpolation.
  lenis.on('scroll', ScrollTrigger.update)

  function update(time: number) {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(update)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(update)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string, options?: { duration?: number; offset?: number }) {
  const el = document.getElementById(id)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, {
      duration: options?.duration ?? 0.95,
      offset: options?.offset ?? 0,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
