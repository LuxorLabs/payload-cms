/**
 * Migration Script: Import Existing Blog Content to Payload CMS
 *
 * This script helps migrate existing blog content into Payload CMS.
 * Adapt the data source and mapping logic based on your existing blog format.
 *
 * Usage:
 * 1. Update the data source (JSON file, API, database, etc.)
 * 2. Map your existing blog structure to Payload's structure
 * 3. Run: pnpm tsx scripts/migrate-blog-content.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'path'
import fs from 'fs/promises'

// Example blog post structure from your existing blog
interface ExistingBlogPost {
  title: string
  slug: string
  content: string
  excerpt?: string
  publishedDate: string
  author: {
    name: string
    email: string
    bio?: string
  }
  category: string
  tags: string[]
  featuredImage?: {
    url: string
    alt: string
  }
  metaTitle?: string
  metaDescription?: string
}

async function migrateContent() {
  console.log('Starting blog migration...')

  const payload = await getPayload({ config })

  try {
    // Example: Load data from a JSON file
    // Replace this with your actual data source (API, database, etc.)
    const dataPath = path.join(process.cwd(), 'data', 'existing-blog-posts.json')

    let existingPosts: ExistingBlogPost[] = []

    try {
      const fileContent = await fs.readFile(dataPath, 'utf-8')
      existingPosts = JSON.parse(fileContent)
      console.log(`Found ${existingPosts.length} posts to migrate`)
    } catch (error) {
      console.log('No existing blog data found. Creating sample data structure...')

      // Create a sample JSON file template
      const sampleData: ExistingBlogPost[] = [
        {
          title: 'Sample Blog Post',
          slug: 'sample-blog-post',
          content: 'This is the content of your blog post...',
          excerpt: 'A brief summary of the post',
          publishedDate: new Date().toISOString(),
          author: {
            name: 'John Doe',
            email: 'john@example.com',
            bio: 'Content creator and blogger',
          },
          category: 'Product Updates',
          tags: ['announcement', 'features'],
          featuredImage: {
            url: 'https://example.com/image.jpg',
            alt: 'Featured image',
          },
          metaTitle: 'Sample Blog Post - Tenki',
          metaDescription: 'A brief summary of the post for SEO',
        },
      ]

      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
      await fs.writeFile(dataPath, JSON.stringify(sampleData, null, 2))
      console.log(`Sample data template created at: ${dataPath}`)
      console.log('Please update the JSON file with your actual blog data and run the script again.')
      return
    }

    // Create a default author if needed
    let defaultAuthor
    try {
      const { docs: authors } = await payload.find({
        collection: 'authors',
        limit: 1,
      })
      defaultAuthor = authors[0]
    } catch (error) {
      console.log('Creating default author...')
      defaultAuthor = await payload.create({
        collection: 'authors',
        data: {
          name: 'Migration User',
          email: 'migration@example.com',
          bio: 'Default author for migrated content',
          role: 'marketing',
        },
      })
    }

    // Migrate each post
    for (const post of existingPosts) {
      console.log(`Migrating: ${post.title}`)

      try {
        // 1. Find or create author
        let author = defaultAuthor
        if (post.author) {
          const { docs: existingAuthors } = await payload.find({
            collection: 'authors',
            where: {
              email: { equals: post.author.email },
            },
            limit: 1,
          })

          if (existingAuthors.length > 0) {
            author = existingAuthors[0]
          } else {
            author = await payload.create({
              collection: 'authors',
              data: {
                name: post.author.name,
                email: post.author.email,
                bio: post.author.bio || '',
                role: 'marketing',
              },
            })
          }
        }

        // 2. Find or create category
        let category
        const { docs: existingCategories } = await payload.find({
          collection: 'categories',
          where: {
            name: { equals: post.category },
          },
          limit: 1,
        })

        if (existingCategories.length > 0) {
          category = existingCategories[0]
        } else {
          const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-')
          category = await payload.create({
            collection: 'categories',
            data: {
              name: post.category,
              slug: categorySlug,
              description: '',
            },
          })
        }

        // 3. Find or create tags
        const tagIds = []
        for (const tagName of post.tags) {
          const { docs: existingTags } = await payload.find({
            collection: 'tags',
            where: {
              name: { equals: tagName },
            },
            limit: 1,
          })

          let tag
          if (existingTags.length > 0) {
            tag = existingTags[0]
          } else {
            const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-')
            tag = await payload.create({
              collection: 'tags',
              data: {
                name: tagName,
                slug: tagSlug,
              },
            })
          }
          tagIds.push(tag.id)
        }

        // 4. Handle featured image (if you need to upload it)
        // For now, we'll create a placeholder media item
        // You'll need to update this to actually upload images to R2
        let featuredImageId
        if (post.featuredImage) {
          // TODO: Implement actual image upload
          // For migration, you might want to create a media record pointing to existing URLs
          console.log(`⚠ Skipping image upload for: ${post.featuredImage.url}`)
        }

        // Create a default/placeholder media item if needed
        // You should update this logic based on your image migration strategy
        const { docs: mediaItems } = await payload.find({
          collection: 'media',
          limit: 1,
        })
        if (mediaItems.length > 0) {
          featuredImageId = mediaItems[0].id
        }

        if (!featuredImageId) {
          console.log('⚠ No media found for featured image. Please upload at least one image first.')
          continue
        }

        // 5. Create the post
        const newPost = await payload.create({
          collection: 'posts',
          draft: false,
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || post.content.substring(0, 200),
            featuredImage: featuredImageId,
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: post.content,
                      },
                    ],
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            author: author.id,
            category: category.id,
            tags: tagIds,
            status: 'published',
            publishedAt: post.publishedDate,
            seo: {
              metaTitle: post.metaTitle,
              metaDescription: post.metaDescription,
            },
          },
        })

        console.log(`✓ Migrated: ${post.title} (ID: ${newPost.id})`)
      } catch (error) {
        console.error(`✗ Failed to migrate: ${post.title}`, error)
      }
    }

    console.log('\nMigration complete!')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

// Run migration
migrateContent()
  .then(() => {
    console.log('Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
