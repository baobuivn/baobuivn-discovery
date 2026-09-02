'use client'

import { useEffect, useState } from 'react'

export interface ArticleTOCItem {
  value: string
  url: string
  depth: number
  children?: ArticleTOCItem[]
}

interface ArticleTOCProps {
  toc: { value: string; url: string; depth: number }[]
  sticky?: boolean
}

function createNestedItems(items: ArticleTOCProps['toc']) {
  const roots: ArticleTOCItem[] = []
  const stack: ArticleTOCItem[] = []

  items
    .filter((item) => item.depth >= 2 && item.depth <= 3)
    .forEach((item) => {
      const nestedItem: ArticleTOCItem = { ...item }
      while (stack.length > 0 && stack[stack.length - 1].depth >= nestedItem.depth) {
        stack.pop()
      }

      const parent = stack[stack.length - 1]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(nestedItem)
      } else {
        roots.push(nestedItem)
      }
      stack.push(nestedItem)
    })

  return roots
}

function TOCList({
  items,
  activeUrl,
  onNavigate,
}: {
  items: ArticleTOCItem[]
  activeUrl: string
  onNavigate: () => void
}) {
  return (
    <ul className="space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            onClick={onNavigate}
            aria-current={activeUrl === item.url ? 'location' : undefined}
            className={`block border-l-2 py-1 pl-3 leading-5 transition-colors ${
              activeUrl === item.url
                ? 'border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400 font-semibold'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100'
            }`}
          >
            {item.value}
          </a>
          {item.children && item.children.length > 0 && (
            <div className="ml-4 border-l border-gray-200 pl-2 dark:border-gray-700">
              <TOCList items={item.children} activeUrl={activeUrl} onNavigate={onNavigate} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ArticleTOC({ toc, sticky = false }: ArticleTOCProps) {
  const items = createNestedItems(toc)
  const [activeUrl, setActiveUrl] = useState(items[0]?.url || '')

  useEffect(() => {
    const updateActiveHeading = () => {
      const readingPosition = window.scrollY + 140
      let currentUrl = items[0]?.url || ''

      items.forEach((item) => {
        const heading = document.getElementById(item.url.slice(1))
        if (heading && heading.offsetTop <= readingPosition) {
          currentUrl = item.url
        }
        item.children?.forEach((child) => {
          const childHeading = document.getElementById(child.url.slice(1))
          if (childHeading && childHeading.offsetTop <= readingPosition) {
            currentUrl = child.url
          }
        })
      })

      setActiveUrl(currentUrl)
    }

    updateActiveHeading()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    window.addEventListener('resize', updateActiveHeading)
    return () => {
      window.removeEventListener('scroll', updateActiveHeading)
      window.removeEventListener('resize', updateActiveHeading)
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  const handleNavigate = () => {
    window.requestAnimationFrame(() => {
      const hash = window.location.hash
      if (hash) {
        setActiveUrl(hash)
      }
    })
  }

  return (
    <div
      className={
        sticky
          ? 'max-h-[calc(100vh-3rem)] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50'
          : 'my-8 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50'
      }
    >
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        Mục lục
      </h2>
      <TOCList items={items} activeUrl={activeUrl} onNavigate={handleNavigate} />
    </div>
  )
}
