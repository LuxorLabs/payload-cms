import { cn } from '@/lib/utils'
import { calculateReadingTime } from '@/lib/utils'
import type { Post, Tag } from '@/payload-types'

type BlogTagProps = {
  displayAll?: boolean
  displayReadTime?: boolean
  position?: 'start' | 'end'
  readTimeClassName?: string
  post: Post
}

function getContentText(content: any): string {
  if (!content?.root?.children) return ''

  const extractText = (node: any): string => {
    if (node.text) return node.text
    if (node.children) {
      return node.children.map(extractText).join(' ')
    }
    return ''
  }

  return content.root.children.map(extractText).join(' ')
}

function readingTime(post: Post): string {
  const contentText = getContentText(post.content)
  const minutes = calculateReadingTime(contentText)
  return `${minutes} min read`
}

export const BlogTag = ({
  displayAll,
  post,
  displayReadTime,
  position = 'end',
  readTimeClassName,
}: BlogTagProps) => {
  const tags = post?.tags

  const readTime = displayReadTime ? (
    <span className={cn('text-sm text-gray-400', readTimeClassName)}>{readingTime(post)}</span>
  ) : null

  return tags ? (
    <div className="flex flex-wrap items-center gap-2 md:gap-6">
      {position === 'start' && readTime}
      <div className="flex flex-wrap items-center gap-2">
        {(tags as Tag[]).map((tag, idx) => {
          if (idx > 1 && !displayAll) return null

          const tagData = typeof tag === 'number' ? null : tag
          const tagName = tagData?.name

          return tagName ? (
            <span
              key={`${tagName}-${idx}`}
              className={cn(
                'flex h-7 items-center rounded-md border border-gray-700 bg-gray-800/50 px-2 py-1 text-sm text-gray-400',
              )}
            >
              {tagName}
            </span>
          ) : null
        })}
        {!displayAll && tags.length > 2 && (
          <span
            className={cn(
              'flex h-7 items-center rounded-md border border-gray-700 bg-gray-800/50 px-2 py-1 text-sm text-gray-400',
            )}
          >
            {`+${tags.length - 2}`}
          </span>
        )}
        {position === 'end' && readTime}
      </div>
    </div>
  ) : null
}
