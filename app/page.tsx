import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { allSeries } from 'contentlayer/generated'
import { sortPostsByDate } from '@/lib/blog'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPostsByDate(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} series={allSeries} />
}
