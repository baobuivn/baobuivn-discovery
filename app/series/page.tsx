import Link from '@/components/Link'
import { allBlogs, allSeries } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Các dòng khám phá',
  description: 'Những chuỗi bài viết được sắp xếp theo từng mạch suy nghĩ.',
})

export default function SeriesPage() {
  const series = [...allSeries].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-12">
      <header className="space-y-3 border-b border-gray-200 pb-8 dark:border-gray-700">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
          Các dòng khám phá
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          Mỗi series là một mạch suy nghĩ có điểm bắt đầu, những bước chuyển và một hướng đi riêng.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {series.map((item) => {
          const postCount = allBlogs.filter((post) => post.series === item.slug).length
          return (
            <Link
              key={item.slug}
              href={`/series/${item.slug}`}
              className="group hover:border-primary-400 dark:hover:border-primary-500 rounded-lg border border-gray-200 p-6 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {item.title}
                </h2>
                <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                  {postCount} bài
                </span>
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{item.description}</p>
              <span className="text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-6 block text-sm font-medium">
                Mở dòng khám phá &rarr;
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
