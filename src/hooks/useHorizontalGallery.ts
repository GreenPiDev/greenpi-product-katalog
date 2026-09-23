import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsapConfig'

// Below this width the gallery falls back to native horizontal swipe
// (see the matching @media rule in the consuming component's CSS module).
const PINNABLE_QUERY = '(min-width: 861px)'

type HorizontalGallery = {
  wrapperRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLDivElement>
}

export function useHorizontalGallery(deps: unknown[] = []): HorizontalGallery {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(PINNABLE_QUERY, () => {
        const track = trackRef.current
        if (!track) return
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => mm.revert()
    }, wrapperRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { wrapperRef, trackRef }
}
