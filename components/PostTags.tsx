'use client'

import { slug } from 'github-slugger'

interface Props {
  tags: string[]
}

const PostTags = ({ tags }: Props) => {
  if (!tags || tags.length === 0) {
    return null
  }

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn sự kiện lan lên link cha
    window.location.href = `/tags/${encodeURIComponent(slug(tag))}`
  }

  const handleKeyDown = (tag: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      window.location.href = `/tags/${encodeURIComponent(slug(tag))}`
    }
  }

  return (
    <div className="mt-3 flex flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={(e) => handleTagClick(tag, e)}
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
