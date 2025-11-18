import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Post, Category, Author, Media } from '@/payload-types'

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  const category = post.category as Category
  const author = post.author as Author
  const featuredImage = post.featuredImage as Media

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video w-full overflow-hidden">
          {featuredImage?.url && (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </Link>
      <CardHeader>
        <div className="flex items-center gap-2">
          {category && (
            <Badge
              variant="secondary"
              style={{ backgroundColor: category.color || '#3B82F6' }}
              className="text-white"
            >
              {category.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 text-2xl font-bold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar && typeof author.avatar === 'object' && author.avatar.url && (
                <Image
                  src={author.avatar.url}
                  alt={author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{author.name}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          )}
          {post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
