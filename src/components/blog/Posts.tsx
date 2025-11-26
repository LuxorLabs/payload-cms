'use client'

import { useMemo, useState } from 'react'
import { isAfter, isBefore, isEqual } from 'date-fns'
import { X } from 'lucide-react'
import { BlogCard } from './BlogCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Post, Tag } from '@/payload-types'

type PostsProps = {
  posts: Post[]
  tags: Tag[]
}

export const Posts = ({ posts, tags }: PostsProps) => {
  const tagNames = useMemo(() => {
    return tags.map((tag) => tag.name).filter(Boolean) as string[]
  }, [tags])

  const [filters, setFilters] = useState<Record<string, boolean>>(
    () => Object.fromEntries(tagNames.map((name) => [name, false])) as Record<string, boolean>,
  )

  const appliedFiltersCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length
  }, [filters])

  const filteredPosts = useMemo(() => {
    let filteredData = posts
    const enabledFilters = Object.keys(filters).filter((key) => filters[key])

    if (enabledFilters.length !== 0) {
      filteredData = posts.filter((post: Post) => {
        const postTags =
          post?.tags
            ?.map((tag) => {
              const tagData = typeof tag === 'number' ? null : tag
              return tagData?.name
            })
            .filter(Boolean) ?? []

        for (const tag of enabledFilters) {
          if (postTags.includes(tag)) {
            return true
          }
        }
        return false
      })
    }

    return filteredData
  }, [posts, filters])

  const resetFilters = () => {
    setFilters(Object.fromEntries(tagNames.map((name) => [name, false])))
  }

  return (
    <section className="relative mx-auto mt-6 max-w-5xl px-6 md:px-12 xl:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-wrap gap-2">
          {tagNames.map((tag) => (
            <Button
              key={tag}
              className={cn(
                'cursor-pointer !p-2.5 transition-colors duration-200 hover:border-gray-400',
                filters[tag as string] &&
                  'border-blue-500 bg-blue-500/20 hover:border-blue-400',
              )}
              variant={'secondary'}
              onClick={() => {
                setFilters({
                  ...filters,
                  [tag as string]: !filters[tag as string],
                })
              }}
            >
              {tag}
            </Button>
          ))}
          {appliedFiltersCount > 0 && (
            <Button
              variant="secondary"
              className="cursor-pointer !p-2.5 transition-all duration-200 hover:border-gray-400"
              onClick={resetFilters}
            >
              {appliedFiltersCount} {appliedFiltersCount > 1 ? 'Filters' : 'Filter'} Applied
              <X className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {filteredPosts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post: Post, idx: number) => (
            <BlogCard key={`blog-${idx}`} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-400">No posts found matching your filters.</p>
        </div>
      )}
    </section>
  )
}
