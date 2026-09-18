import { useCallback, useEffect, useRef, useState } from 'react'
import { getLenis } from '../../lib/lenis'
import styles from './CustomScrollbar.module.css'

const MIN_THUMB = 48

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const [dragging, setDragging] = useState(false)

  const measure = useCallback(() => {
    const doc = document.documentElement
    const trackHeight = trackRef.current?.clientHeight ?? window.innerHeight
    const scrollable = doc.scrollHeight - doc.clientHeight

    const ratio = doc.clientHeight / doc.scrollHeight
    const height = Math.max(trackHeight * ratio, MIN_THUMB)
    const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0

    setThumbHeight(height)
    setThumbTop(progress * (trackHeight - height))
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  function scrollToClientY(clientY: number, immediate: boolean) {
    const track = trackRef.current
    if (!track) return

    const rect = track.getBoundingClientRect()
    const trackHeight = rect.height
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - doc.clientHeight
    const ratio = Math.min(Math.max((clientY - rect.top) / trackHeight, 0), 1)
    const target = ratio * scrollable

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(target, immediate ? { immediate: true } : { duration: 0.6 })
    } else {
      window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' })
    }
  }

  function handleThumbPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handleThumbPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    scrollToClientY(e.clientY, true)
  }

  function handleThumbPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false)
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target !== trackRef.current) return
    scrollToClientY(e.clientY, false)
  }

  return (
    <div
      ref={trackRef}
      className={styles.track}
      onClick={handleTrackClick}
      aria-hidden="true"
    >
      <div
        className={`${styles.thumb} ${dragging ? styles.thumbDragging : ''}`}
        style={{ height: thumbHeight, transform: `translateY(${thumbTop}px)` }}
        onPointerDown={handleThumbPointerDown}
        onPointerMove={handleThumbPointerMove}
        onPointerUp={handleThumbPointerUp}
      />
    </div>
  )
}
