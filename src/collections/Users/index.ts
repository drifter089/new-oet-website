import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'image'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  timestamps: true,
}

export default Users
