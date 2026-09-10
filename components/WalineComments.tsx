'use client'

import { useEffect, useRef } from 'react'
import { init, type WalineInitOptions } from '@waline/client'
import '@waline/client/style'

type WalineCommentsProps = Omit<WalineInitOptions, 'el' | 'path'> & { path: string }

export default function WalineComments({ path, ...options }: WalineCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // The config comes from siteMetadata and is spread on every render, so read it
  // through a ref to keep the effect from re-initialising the comment thread.
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const instance = init({ ...optionsRef.current, path, el: containerRef.current })

    return () => instance?.destroy()
  }, [path])

  return <div ref={containerRef} className="text-left" />
}
