import { BlogCard } from './BlogCard'
import type { Post } from '@/payload-types'

type RelatedNewsProps = {
  posts: Post[]
  selectedPost: Post
}

export const RelatedNews = ({ posts, selectedPost }: RelatedNewsProps) => {
  const relatedPosts = posts.filter((post) => post.id !== selectedPost.id).slice(0, 3)
  if (relatedPosts.length === 0) return null

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col px-6 py-6 md:px-12 xl:px-0">
      <div>
        <h3 className="text-sm text-[#9ca3af]">Related News</h3>
        <hr className="relative mt-2 h-px min-w-fit border-t border-white/20" />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedPosts.map((post, idx) => (
            <BlogCard key={`related-news-${idx}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
