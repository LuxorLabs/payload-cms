import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlogCard } from '@/components/blog/BlogCard'
import type { Post } from '@/payload-types'

export const metadata = {
  title: 'Blog | Tenki',
  description: 'Insights, updates, and stories from the Tenki team',
}

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 2,
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 12,
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Tenki Blog</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Insights, updates, and stories from the Tenki team
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No blog posts published yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post as Post} />
          ))}
        </div>
      )}
    </div>
  )
}
