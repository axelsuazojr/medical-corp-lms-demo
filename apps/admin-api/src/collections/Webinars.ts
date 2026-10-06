import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access'

export const Webinars: CollectionConfig = {
  slug: 'webinars',

  versions: {
    drafts: true,
  },

  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      '_status',
      'eventStatus',
      'startAt',
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'speaker',
      type: 'text',
      required: true,
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
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
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'meetingUrl',
      type: 'text',
    },
    {
      name: 'recordingUrl',
      type: 'text',
    },

    // Estado del evento, independiente del draft/published de Payload
    {
      name: 'eventStatus',
      type: 'select',
      required: true,
      defaultValue: 'UPCOMING',
      options: [
        {
          label: 'Próximo',
          value: 'UPCOMING',
        },
        {
          label: 'En vivo',
          value: 'LIVE',
        },
        {
          label: 'Finalizado',
          value: 'COMPLETED',
        },
      ],
    },

    {
      name: 'isFree',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}