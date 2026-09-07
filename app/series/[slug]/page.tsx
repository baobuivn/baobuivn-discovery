import { allBlogs, allSeries } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { sortPostsBySeriesOrder } from '@/lib/blog'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import SeriesPostGrid from '@/components/SeriesPostGrid'

export const generateStaticParams = async () => {
  return allSeries.map((series) => ({ slug: series.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const series = allSeries.find((item) => item.slug === params.slug)
  return series
    ? genPageMetadata({ title: series.title, description: series.description })
    : undefined
}

export default async function SeriesDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const series = allSeries.find((item) => item.slug === params.slug)
  if (!series) {
    return notFound()
  }

  const posts = allCoreContent(
    sortPostsBySeriesOrder(allBlogs.filter((post) => post.series === series.slug))
  )

  return (
    <div className="space-y-10">
      <header className="space-y-3 border-b border-gray-200 pb-8 dark:border-gray-700">
        <p className="text-primary-500 text-sm font-medium tracking-wide uppercase">Series</p>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
          {series.title}
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          {series.description}
        </p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'bài viết' : 'bài viết'} trong series
        </p>
      </header>
      <div className="prose dark:prose-invert max-w-none">
        <MDXLayoutRenderer code={series.body.code} components={components} />
      </div>
      <SeriesPostGrid posts={posts} />
    </div>
  )
}
