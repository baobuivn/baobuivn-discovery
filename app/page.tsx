import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { sortPostsByOrder } from '@/lib/blog'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPostsByOrder(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
