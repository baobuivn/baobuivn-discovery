import Link from '@/components/Link'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

export default function SeriesPostGrid({ posts }: { posts: CoreContent<Blog>[] }) {
  // Calculate the number of rows based on the number of posts and the number of posts per row
  const rows = Array.from({ length: Math.ceil(posts.length / 4) }, (_, rowIndex) =>
    posts.slice(rowIndex * 4, rowIndex * 4 + 4)
  )

  return (
    <div className="space-y-5">
      {rows.map((rowPosts, rowIndex) => {
        // Determine if the row should be reversed
        const isReversedRow = rowIndex % 2 === 1

        return (
          <div key={rowIndex} className="relative">
            <ol
              className={`grid gap-5 md:grid-cols-2 lg:grid-cols-4 ${
                isReversedRow ? 'lg:[direction:rtl]' : ''
              }`}
            >
              {rowPosts.map((post, rowPostIndex) => {
                // Determine the post number
                const postNumber = post.seriesOrder || rowIndex * 4 + rowPostIndex + 1
                // Determine if this is the last post in the row
                const isLastInRow = rowPostIndex === rowPosts.length - 1

                return (
                  <li key={post.slug} className="relative [direction:ltr]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group hover:border-primary-400 dark:hover:border-primary-500 flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-primary-200 dark:text-primary-900 text-3xl leading-none font-semibold">
                          {postNumber}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          Bài {postNumber}
                        </span>
                      </div>
                      <div className="mt-5">
                        <h2 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {post.summary}
                          </p>
                        )}
                      </div>
                      <span className="text-primary-500 mt-auto block pt-5 text-sm font-medium">
                        Đọc bài này &rarr;
                      </span>
                    </Link>
                    {!isLastInRow && (
                      <span
                        aria-hidden="true"
                        className={`text-primary-400 pointer-events-none absolute top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center text-xl font-semibold lg:flex ${
                          isReversedRow ? 'right-full' : 'left-full'
                        }`}
                      >
                        {isReversedRow ? '←' : '→'}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
            {rowIndex < rows.length - 1 && (
              <span
                aria-hidden="true"
                className={`text-primary-400 pointer-events-none absolute top-full z-10 hidden h-5 w-5 items-center justify-center text-xl font-semibold lg:flex ${
                  isReversedRow ? 'left-[12.5%]' : 'right-[12.5%]'
                }`}
              >
                ↓
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
