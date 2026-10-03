'use client'

import { useEffect, useState } from 'react'
import { getViewCount } from 'next-goatcounter'

// next-goatcounter's TotalViews does not catch fetch rejections (CORS or
// disabled counter endpoint), which crashes the dev overlay with
// "Runtime TypeError: Failed to fetch".
export default function TotalVisits({ fallback = '…' }: { fallback?: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    getViewCount('TOTAL')
      .then((n) => {
        if (active && typeof n === 'number' && !Number.isNaN(n)) {
          setCount(n)
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  if (count === null) {
    return <>{fallback}</>
  }
  return <>{count.toLocaleString()}</>
}
