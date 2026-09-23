import { useLayoutEffect, useRef, useState } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

const COMPACT_QUERY = '(max-width: 860px)'

type HorizontalGallery = {
  wrapperRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLDivElement>
  x: MotionValue<number>
  wrapperHeight: string
  isCompact: boolean
}

export function useHorizontalGallery(deps: unknown[] = []): HorizontalGallery {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [isCompact, setIsCompact] = useState(false)

  useLayoutEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY)
    setIsCompact(query.matches)
    const handleQuery = (e: MediaQueryListEvent) => setIsCompact(e.matches)
    query.addEventListener('change', handleQuery)

    function measure() {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    // Fonts/images finishing layout after mount (more likely under extra
    // network latency, e.g. behind a proxy) can change scrollWidth after the
    // initial synchronous measurement — keep it in sync as layout settles.
    const resizeObserver = trackRef.current ? new ResizeObserver(measure) : null
    if (trackRef.current) resizeObserver?.observe(trackRef.current)
    document.fonts?.ready?.then(measure)
    window.addEventListener('load', measure)

    return () => {
      query.removeEventListener('change', handleQuery)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      resizeObserver?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return {
    wrapperRef,
    trackRef,
    x,
    wrapperHeight: isCompact ? 'auto' : `calc(100vh + ${distance}px)`,
    isCompact,
  }
}
