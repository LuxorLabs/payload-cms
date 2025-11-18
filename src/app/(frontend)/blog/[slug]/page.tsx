import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Post, Category, Author, Media, Tag } from '@/payload-types'
import { RichText } from '@/components/blog/RichText'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })

  const post = docs[0] as Post | undefined

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = post.seo?.ogImage as Media | undefined
  const featuredImage = post.featuredImage as Media

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.map((k) => k.keyword),
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: ogImage?.url || featuredImage?.url ? [ogImage?.url || featuredImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: ogImage?.url || featuredImage?.url ? [ogImage?.url || featuredImage.url] : [],
    },
    ...(post.seo?.canonicalURL && { alternates: { canonical: post.seo.canonicalURL } }),
    ...(post.seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  const post = docs[0] as Post | undefined

  if (!post) {
    notFound()
  }

  const category = post.category as Category
  const author = post.author as Author
  const featuredImage = post.featuredImage as Media
  const tags = (post.tags as Tag[]) || []

  return (
    <article className="container mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-8">
        {category && (
          <Badge
            variant="secondary"
            style={{ backgroundColor: category.color || '#3B82F6' }}
            className="mb-4 text-white"
          >
            {category.name}
          </Badge>
        )}

        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{post.title}</h1>

        <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar && typeof author.avatar === 'object' && author.avatar.url && (
                <Image
                  src={author.avatar.url}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-foreground">{author.name}</p>
                {author.role && <p className="text-xs capitalize">{author.role}</p>}
              </div>
            </div>
          )}

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
        </div>
      </header>

      {featuredImage?.url && (
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
        <RichText content={post.content} />
      </div>

      {tags.length > 0 && (
        <footer className="mx-auto mt-12 max-w-4xl border-t pt-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            {tags.map((tag) => (
              <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                <Badge variant="outline" className="hover:bg-accent">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </footer>
      )}

      {author && author.bio && (
        <div className="mx-auto mt-12 max-w-4xl rounded-lg border p-6">
          <div className="flex items-start gap-4">
            {author.avatar && typeof author.avatar === 'object' && author.avatar.url && (
              <Image
                src={author.avatar.url}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="mb-2 text-lg font-semibold">About {author.name}</h3>
              <p className="text-muted-foreground">{author.bio}</p>
              {author.socialLinks && (
                <div className="mt-4 flex gap-4 text-sm">
                  {author.socialLinks.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {author.socialLinks.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.socialLinks.github && (
                    <a
                      href={author.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    limit: 1000,
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
