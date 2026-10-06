import type { CollectionConfig } from 'payload'
import { loggedIn, staffOnly } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo', plural: 'Archivos y recursos' },
  access: { read: loggedIn, create: loggedIn, update: staffOnly, delete: staffOnly },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user && typeof req.user === 'object') {
          data.uploadedBy = req.user.id
          if ('role' in req.user && req.user.role === 'STUDENT') data.visibility = 'PRIVATE'
        }
        return data
      },
    ],
  },
  upload: {
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'video/*',
      'audio/*',
      'application/zip',
    ],
    filesRequiredOnCreate: true,
  },
  admin: { useAsTitle: 'alt', group: 'Contenido académico' },
  fields: [
    { name: 'alt', type: 'text', required: true },
    {
      name: 'visibility',
      type: 'select',
      defaultValue: 'ENROLLED',
      options: ['PUBLIC', 'ENROLLED', 'STAFF', 'PRIVATE'],
    },
    { name: 'course', type: 'relationship', relationTo: 'courses' },
    { name: 'uploadedBy', type: 'relationship', relationTo: 'users' },
  ],
}
