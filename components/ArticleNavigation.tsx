import Link from '@/components/Link'

interface ArticleNavigationProps {
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function ArticleNavigation({ next, prev }: ArticleNavigationProps) {
  if (!next && !prev) {
    return null
  }

  return (
    <nav
      aria-label="Điều hướng bài viết"
      className="border-y border-gray-200 py-6 dark:border-gray-700"
    >
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        {prev ? (
          <Link
            href={`/${prev.path}`}
            className="group min-w-0 rounded-md px-3 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label={`Bài trước: ${prev.title}`}
          >
            <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              &larr; Bài trước
            </span>
            <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 mt-1 block text-sm font-semibold break-words text-gray-900 dark:text-gray-100">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}
        {next && (
          <Link
            href={`/${next.path}`}
            className="group min-w-0 rounded-md px-3 py-2 text-right transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label={`Bài tiếp theo: ${next.title}`}
          >
            <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Bài tiếp theo &rarr;
            </span>
            <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 mt-1 block text-sm font-semibold break-words text-gray-900 dark:text-gray-100">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
