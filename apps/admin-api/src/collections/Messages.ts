import type { CollectionConfig } from 'payload'
import { loggedIn } from '../access'

export const Messages: CollectionConfig = {
  slug: 'messages',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: () => false },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user && typeof req.user === 'object') {
          data.sender = req.user.id
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'threadKey', type: 'text', required: true, index: true },
    { name: 'course', type: 'relationship', relationTo: 'courses' },
    { name: 'sender', type: 'relationship', relationTo: 'users', required: true },
    { name: 'recipients', type: 'relationship', relationTo: 'users', hasMany: true, required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'attachments', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'readBy', type: 'relationship', relationTo: 'users', hasMany: true },
  ],
}
