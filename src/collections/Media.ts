import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      // Viewers cannot create media
      return user?.role !== 'viewer'
    },
    update: ({ req: { user } }) => {
      // Viewers cannot update media
      return user?.role !== 'viewer'
    },
    delete: ({ req: { user } }) => {
      // Only super admins and admins can delete media
      return user?.role === 'super-admin' || user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Photo credit or attribution',
      },
    },
  ],
  upload: {
    // These are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'featured',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
  },
}
