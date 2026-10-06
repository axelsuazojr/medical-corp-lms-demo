import type { Access } from 'payload'

const ROLE_VALUES = [
  'SUPER_ADMIN',
  'CO_ADMIN',
  'TEACHER',
  'COMPANY',
  'STUDENT',
] as const

type Role = (typeof ROLE_VALUES)[number]

type UserLike = {
  id: string | number
  role?: Role
}

const isRole = (value: unknown): value is Role => {
  return (
    typeof value === 'string' &&
    ROLE_VALUES.some((role) => role === value)
  )
}

const getUser = (value: unknown): UserLike | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  if (!('id' in value)) {
    return undefined
  }

  const id = value.id

  if (typeof id !== 'string' && typeof id !== 'number') {
    return undefined
  }

  const role =
    'role' in value && isRole(value.role)
      ? value.role
      : undefined

  return {
    id,
    role,
  }
}

const hasRole = (
  user: UserLike | undefined,
  allowedRoles: readonly Role[],
): boolean => {
  if (!user?.role) {
    return false
  }

  return allowedRoles.includes(user.role)
}

export const loggedIn: Access = ({ req }) => {
  return Boolean(getUser(req.user))
}

export const adminOnly: Access = ({ req }) => {
  const currentUser = getUser(req.user)

  return hasRole(currentUser, [
    'SUPER_ADMIN',
    'CO_ADMIN',
  ])
}

export const superAdminOnly: Access = ({ req }) => {
  const currentUser = getUser(req.user)

  return currentUser?.role === 'SUPER_ADMIN'
}

export const staffOnly: Access = ({ req }) => {
  const currentUser = getUser(req.user)

  return hasRole(currentUser, [
    'SUPER_ADMIN',
    'CO_ADMIN',
    'TEACHER',
  ])
}


export const usersReadAccess: Access = ({ req }) => {
  const currentUser = getUser(req.user)

  if (!currentUser) return false
  if (hasRole(currentUser, ['SUPER_ADMIN', 'CO_ADMIN'])) return true

  if (currentUser.role === 'TEACHER') {
    return {
      or: [
        { id: { equals: currentUser.id } },
        { role: { equals: 'STUDENT' } },
      ],
    }
  }

  return { id: { equals: currentUser.id } }
}

export const selfOrAdmin: Access = ({ req }) => {
  const currentUser = getUser(req.user)

  if (!currentUser) {
    return false
  }

  if (
    hasRole(currentUser, [
      'SUPER_ADMIN',
      'CO_ADMIN',
    ])
  ) {
    return true
  }

  return {
    id: {
      equals: currentUser.id,
    },
  }
}

export const ownStudentRecords =
  (studentField = 'student'): Access =>
  ({ req }) => {
    const currentUser = getUser(req.user)

    if (!currentUser) {
      return false
    }

    if (
      hasRole(currentUser, [
        'SUPER_ADMIN',
        'CO_ADMIN',
        'TEACHER',
      ])
    ) {
      return true
    }

    if (currentUser.role === 'STUDENT') {
      return {
        [studentField]: {
          equals: currentUser.id,
        },
      }
    }

    return false
  }

export const preventSuperAdminDelete: Access = async ({
  req,
  id,
}) => {
  const currentUser = getUser(req.user)

  if (currentUser?.role !== 'SUPER_ADMIN') {
    return false
  }

  // Payload también ejecuta access control sin ID
  // para determinar permisos generales del panel.
  if (!id) {
    return true
  }

  const target = await req.payload.findByID({
    collection: 'users',
    id,
    depth: 0,
    overrideAccess: true,
  })

  const targetUser = getUser(target)

  if (!targetUser) {
    return false
  }

  return (
    targetUser.role !== 'SUPER_ADMIN' ||
    String(targetUser.id) === String(currentUser.id)
  )
}