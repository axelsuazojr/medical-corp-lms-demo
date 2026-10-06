import type { CollectionConfig } from 'payload'
import { loggedIn, staffOnly } from '../access'

export const Courses: CollectionConfig = {
  slug: 'courses',

  versions: {
    drafts: true,
  },

  access: {
    read: loggedIn,
    create: staffOnly,
    update: staffOnly,
    delete: staffOnly,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      '_status',
      'lifecycleStatus',
      'startAt',
      'endAt',
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
    },

    // _status es administrado automáticamente por Payload:
    // draft | published

    {
      name: 'lifecycleStatus',
      type: 'select',
      defaultValue: 'ACTIVE',
      options: [
        {
          label: 'Activo',
          value: 'ACTIVE',
        },
        {
          label: 'Archivado',
          value: 'ARCHIVED',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'modality',
      type: 'select',
      defaultValue: 'ASYNCHRONOUS',
      options: [
        {
          label: 'Asincrónico',
          value: 'ASYNCHRONOUS',
        },
        {
          label: 'Híbrido',
          value: 'HYBRID',
        },
        {
          label: 'En vivo',
          value: 'LIVE',
        },
      ],
    },
    {
      name: 'startAt',
      type: 'date',
    },
    {
      name: 'endAt',
      type: 'date',
    },
    {
      name: 'estimatedHours',
      type: 'number',
    },
    {
      name: 'instructors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'objectives',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'prerequisiteCourse',
      type: 'relationship',
      relationTo: 'courses',
    },
  ],
}