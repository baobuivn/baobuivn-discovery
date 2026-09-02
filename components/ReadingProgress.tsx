'use client'

import { useEffect, useRef } from 'react'

export default function ReadingProgress({ targetId }: { targetId: string }) {
  const progressTrackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number | null = null

    const updateProgress = () => {
      frameId = null
      const target = document.getElementById(targetId)
      const progressTrack = progressTrackRef.current
      const progressBar = progressBarRef.current

      if (!target || !progressTrack || !progressBar) {
        return
      }

      const targetTop = target.getBoundingClientRect().top + window.scrollY
      const targetHeight = target.offsetHeight
      const viewportBottom = window.scrollY + window.innerHeight
      const progress = Math.min(
        1,
        Math.max(0, (viewportBottom - targetTop) / Math.max(targetHeight, 1))
      )

      progressBar.style.width = `${progress * 100}%`
      progressTrack.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
    }

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateProgress)
      }
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [targetId])

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 h-0.5 w-full bg-transparent"
      ref={progressTrackRef}
      role="progressbar"
      aria-label="Tiến độ đọc"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={progressBarRef}
        className="bg-primary-500 h-full transition-[width] duration-100 ease-out"
        style={{ width: '0%' }}
      />
    </div>
  )
}
