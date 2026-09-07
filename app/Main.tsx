import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts, series }) {
  const sortedSeries = [...series].sort((a, b) => a.order - b.order)

  return (
    <>
      <div className="space-y-12">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Những ghi chép
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <section className="space-y-5" aria-labelledby="series-heading">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="series-heading" className="text-2xl font-bold tracking-tight">
              Các dòng khám phá
            </h2>
            <Link href="/series" className="text-primary-500 text-sm font-medium">
              Xem tất cả &rarr;
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {sortedSeries.map((item) => (
              <Link
                key={item.slug}
                href={`/series/${item.slug}`}
                className="group hover:border-primary-400 dark:hover:border-primary-500 rounded-lg border border-gray-200 p-5 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    {posts.filter((post) => post.series === item.slug).length} bài
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{item.description}</p>
                <span className="text-primary-500 mt-4 block text-sm font-medium">
                  Đọc theo dòng &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section
          className="divide-y divide-gray-200 dark:divide-gray-700"
          aria-labelledby="recent-heading"
        >
          <h2 id="recent-heading" className="pb-5 text-2xl font-bold tracking-tight">
            Ghi chép gần đây
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="flex flex-col">
                  <article className="flex h-full flex-col">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:border-primary-400 dark:hover:border-primary-500 flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                    >
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="mt-4 flex flex-1 flex-col">
                        <h2 className="hover:text-primary-500 dark:hover:text-primary-400 text-xl leading-7 font-bold tracking-tight text-gray-900 dark:text-gray-100">
                          {title}
                        </h2>
                        <div className="mt-3 flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                        <div className="prose mt-4 line-clamp-4 max-w-none overflow-hidden text-sm text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="mt-auto pt-5 text-sm leading-6 font-medium">
                        <span className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          Đọc bài này &rarr;
                        </span>
                      </div>
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
