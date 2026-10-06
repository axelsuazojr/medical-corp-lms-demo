import type { CollectionConfig } from 'payload'
import { ownStudentRecords, loggedIn } from '../access'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Entrega', plural: 'Entregas' },
  access: {
    read: ownStudentRecords(),
    create: loggedIn,
    update: ownStudentRecords(),
    delete: ownStudentRecords(),
  },
  admin: { group: 'Evaluación', defaultColumns: ['assignment', 'student', 'status', 'submittedAt'] },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.user && typeof req.user === 'object' && 'role' in req.user && req.user.role === 'STUDENT') {
          data.student = req.user.id
          // La calificación y retroalimentación pertenecen exclusivamente al personal docente.
          delete data.teacherFeedback
          delete data.gradedBy
          delete data.gradedAt
          if (data.status === 'GRADED') data.status = 'SUBMITTED'
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'assignment', type: 'relationship', relationTo: 'assignments', required: true },
    { name: 'student', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'IN_PROGRESS',
      options: ['IN_PROGRESS', 'SUBMITTED', 'LATE', 'GRADED', 'REVISION_REQUIRED', 'WITHDRAWN'],
    },
    { name: 'text', type: 'textarea' },
    { name: 'files', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'startedAt', type: 'date' },
    { name: 'submittedAt', type: 'date' },
    { name: 'withdrawnAt', type: 'date' },
    { name: 'attempt', type: 'number', defaultValue: 1 },
    { name: 'teacherFeedback', label: 'Retroalimentación del profesor', type: 'textarea' },
    { name: 'gradedBy', type: 'relationship', relationTo: 'users' },
    { name: 'gradedAt', type: 'date' },
  ],
}
