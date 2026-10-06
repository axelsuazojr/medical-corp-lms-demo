import type { CollectionConfig, FieldAccess } from 'payload'
import { adminOnly, selfOrAdmin, superAdminOnly, usersReadAccess } from '../access'

const adminFieldOnly: FieldAccess = ({ req }) => {
  const role = req.user && typeof req.user === 'object' && 'role' in req.user ? req.user.role : undefined
  return role === 'SUPER_ADMIN' || role === 'CO_ADMIN'
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: { maxLoginAttempts: 5, lockTime: 10 * 60 * 1000 },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'role', 'status'],
    group: 'Administración',
  },
  access: {
    admin: adminOnly,
    create: adminOnly,
    read: usersReadAccess,
    update: selfOrAdmin,
    delete: superAdminOnly,
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'STUDENT',
      options: ['SUPER_ADMIN', 'CO_ADMIN', 'TEACHER', 'COMPANY', 'STUDENT'],
      access: { update: adminFieldOnly },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'ACTIVE',
      options: ['ACTIVE', 'INVITED', 'SUSPENDED', 'INACTIVE'],
      access: { update: adminFieldOnly },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      access: { update: adminFieldOnly },
    },
    {
      name: 'permissions',
      type: 'select',
      hasMany: true,
      options: [
        'users.read',
        'users.create',
        'users.update',
        'users.delete',
        'courses.read',
        'courses.create',
        'courses.update',
        'courses.delete',
        'assignments.create',
        'assignments.grade',
        'quizzes.create',
        'quizzes.grade',
        'grades.read',
        'grades.update',
        'attendance.read',
        'attendance.update',
        'reports.read',
        'audit.read',
        'roles.assign',
      ],
      access: { update: adminFieldOnly },
    },
    {
      name: 'mustChangePassword',
      type: 'checkbox',
      defaultValue: false,
      access: { update: adminFieldOnly },
    },
    { name: 'profilePhoto', label: 'Foto de perfil', type: 'upload', relationTo: 'media' },
  ],
}
