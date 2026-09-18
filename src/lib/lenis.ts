import Lenis from 'lenis'

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

  let rafId: number
  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(rafId)
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
