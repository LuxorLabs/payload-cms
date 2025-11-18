import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subdomain', 'domain', 'active'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Super admins can see all companies
      if (user?.role === 'super-admin') {
        return true
      }
      // Other users can only see their own company
      if (user?.company) {
        return {
          id: { equals: user.company },
        }
      }
      return false
    },
    create: ({ req: { user } }) => {
      // Only super admins can create companies
      return user?.role === 'super-admin'
    },
    update: ({ req: { user } }) => {
      // Only super admins can update companies
      return user?.role === 'super-admin'
    },
    delete: ({ req: { user } }) => {
      // Only super admins can delete companies
      return user?.role === 'super-admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Company name (e.g., "Acme Inc")',
      },
    },
    {
      name: 'subdomain',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Subdomain for this company (e.g., "acme" for acme.yourdomain.com)',
      },
    },
    {
      name: 'domain',
      type: 'text',
      unique: true,
      admin: {
        description: 'Custom domain (optional, e.g., "blog.acme.com")',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo for branding',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Set to false to disable this company\'s blog',
      },
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'blogTitle',
          type: 'text',
          admin: {
            description: 'Title for the blog (defaults to company name)',
          },
        },
        {
          name: 'blogDescription',
          type: 'textarea',
          admin: {
            description: 'Description for the blog',
          },
        },
        {
          name: 'primaryColor',
          type: 'text',
          admin: {
            description: 'Primary brand color (hex code)',
            placeholder: '#3B82F6',
          },
        },
        {
          name: 'socialLinks',
          type: 'group',
          fields: [
            {
              name: 'twitter',
              type: 'text',
            },
            {
              name: 'linkedin',
              type: 'text',
            },
            {
              name: 'facebook',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
