import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'name'],
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Product', value: 'product' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: 'viewer',
      required: true,
      admin: {
        description: 'User role determines access permissions. Super Admin can manage all companies.',
      },
    },
  ],
}
