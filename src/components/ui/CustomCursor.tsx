import { useEffect, useRef, useState } from 'react'
import { useIsTouchDevice } from '../../hooks/useReducedMotion'
import styles from './CustomCursor.module.css'

type CursorLabel = 'view' | 'drag' | 'open' | null

export function CustomCursor() {
  const isTouch = useIsTouchDevice()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<CursorLabel>(null)

  useEffect(() => {
    if (isTouch) return

    document.body.classList.add('custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }

    function handleMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      }
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const cursorTarget = target.closest<HTMLElement>('[data-cursor]')
      setLabel((cursorTarget?.dataset.cursor as CursorLabel) ?? null)
    }

    let rafId: number
    function tick() {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)

    return () => {
      document.body.classList.remove('custom-cursor')
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`${styles.ring} ${label ? styles.ringActive : ''}`}
        aria-hidden="true"
      >
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </>
  )
}
