'use client'

import { useRouter } from 'next/navigation'
import { slug } from 'github-slugger'

interface Props {
  tags: string[]
}

const PostTags = ({ tags }: Props) => {
  const router = useRouter()

  if (!tags || tags.length === 0) {
    return null
  }

  const goToTag = (tag: string) => router.push(`/tags/${slug(tag)}`)

  const handleClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Ngăn sự kiện lan lên link cha
    goToTag(tag)
  }

  const handleKeyDown = (tag: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      goToTag(tag)
    }
  }

  return (
    <div className="mt-3 flex flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={(e) => handleClick(tag, e)}
          onKeyDown={(e) => handleKeyDown(tag, e)}
          role="link"
          tabIndex={0}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 cursor-pointer text-sm font-medium uppercase"
        >
          {tag.split(' ').join('-')}
        </button>
      ))}
    </div>
  )
}

export default PostTags
