'use client'

import Link from 'next/link'
import { Check, Link as LinkIcon, Share2 } from 'lucide-react'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RichText } from './RichText'
import type { Post, Author, Media } from '@/payload-types'

type ContentProps = {
  post: Post
}

export const ContentSection = ({ post }: ContentProps) => {
  const [copied, setCopied] = useState(false)

  if (!post.content) {
    return null
  }

  const author = typeof post.author === 'number' ? null : (post.author as Author)
  if (!author) {
    return null
  }

  const authorAvatar = author.avatar as Media

  return (
    <section className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-0 px-6 md:px-12 lg:grid-cols-3 lg:gap-[60px] xl:px-0">
      <section className="order-last py-0 lg:order-first lg:py-8">
        <div className="lg:animate-fade-in">
          {post.excerpt && (
            <div className="mb-6 hidden rounded-lg border border-gray-700 bg-gray-800/50 p-4 lg:block">
              <span className="text-sm font-bold">TL;DR</span>
              <p className="text-sm">{post.excerpt}</p>
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-sm text-gray-400">Author</h3>
            <hr className="relative mt-2 h-px min-w-fit border-t border-white/20" />
            <div className="mt-2.5 flex items-center gap-2">
              <div className="relative size-9">
                <Image
                  src={
                    authorAvatar?.url
                      ? authorAvatar.url.startsWith('http')
                        ? authorAvatar.url
                        : authorAvatar.url
                      : '/images/favicon-default.png'
                  }
                  fill
                  alt={author.name}
                  className="full rounded-full border border-gray-600"
                  style={{ borderRadius: '6px' }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md font-medium">
                  <span>{author.name}</span>
                  {author.socialLinks?.twitter && (
                    <Link
                      href={`https://x.com/${author.socialLinks.twitter}`}
                      target="_blank"
                      className="ml-2 inline-block"
                    >
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Link>
                  )}
                </div>
                {author.bio && <div className="text-xs">{author.bio}</div>}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm text-gray-400">Share</h3>
            <hr className="relative mt-2 h-px min-w-fit border-t border-white/20" />
            <div className="mt-2.5 flex gap-2">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 3000)
                  })
                }}
                className="cursor-pointer hover:border-gray-400"
                variant="secondary"
                size="icon"
              >
                {copied ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
              </Button>
              <Link
                href={`https://x.com/compose/post?text=${window.location.href}`}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'icon',
                  }),
                  'hover:border-gray-400',
                )}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post?.title ?? 'Tenki Blog')}`}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'icon',
                  }),
                  'hover:border-gray-400',
                )}
              >
                <Share2 className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {post.excerpt && (
        <div className="mt-6 rounded-lg border border-gray-700 bg-gray-800/50 p-4 lg:hidden">
          <span className="text-sm font-bold">TL;DR</span>
          <p className="text-sm">{post.excerpt}</p>
        </div>
      )}

      <section
        id="blog-post"
        className="h-full py-0 lg:col-span-2 lg:py-3"
      >
        <RichText content={post.content} />
      </section>
    </section>
  )
}
