'use client'

import dynamic from 'next/dynamic'
import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

// Waline ships a Vue runtime; keep it out of the route's first-load bundle.
const WalineComments = dynamic(() => import('./WalineComments'), { ssr: false })

export default function Comments({ slug }: { slug: string }) {
  const comments = siteMetadata.comments

  if (!comments?.provider) {
    return null
  }

  if (comments.provider === 'waline') {
    return <WalineComments {...comments.walineConfig} path={slug} />
  }

  return <CommentsComponent commentsConfig={comments} slug={slug} />
}
