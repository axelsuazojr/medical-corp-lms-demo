import type { CollectionConfig } from 'payload'
import { loggedIn } from '../access'

export const ForumPosts: CollectionConfig = {
  slug: 'forum-posts',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.user && typeof req.user === 'object' && 'role' in req.user && req.user.role === 'STUDENT') {
          data.author = req.user.id
          data.isPinned = false
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'forum', type: 'relationship', relationTo: 'forums', required: true },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'parentPost', type: 'relationship', relationTo: 'forum-posts' },
    { name: 'body', type: 'textarea', required: true },
    { name: 'attachments', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'isPinned', type: 'checkbox', defaultValue: false },
    { name: 'editedAt', type: 'date' },
  ],
}
