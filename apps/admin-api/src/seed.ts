import { getPayload } from 'payload'

import config from './payload.config'

type SeedRole =
  | 'SUPER_ADMIN'
  | 'CO_ADMIN'
  | 'TEACHER'
  | 'COMPANY'
  | 'STUDENT'

const payload = await getPayload({ config })

const password = process.env.DEMO_ADMIN_PASSWORD

if (!password) {
  throw new Error(
    'Define DEMO_ADMIN_PASSWORD antes de ejecutar el seed.',
  )
}

async function ensureUser(
  email: string,
  role: SeedRole,
  firstName: string,
  lastName: string,
) {
  const existing = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  return payload.create({
    collection: 'users',
    overrideAccess: true,
    data: {
      email,
      password,
      firstName,
      lastName,
      role,
      status: 'ACTIVE',
      mustChangePassword: false,
    },
  })
}

const superAdmin = await ensureUser(
  process.env.DEMO_ADMIN_EMAIL || 'demo.admin@medicalcorp.hn',
  'SUPER_ADMIN',
  'Sofía',
  'Mendoza',
)

const teacher = await ensureUser(
  process.env.DEMO_TEACHER_EMAIL || 'demo.teacher@medicalcorp.hn',
  'TEACHER',
  'Carlos',
  'Rivera',
)

const student = await ensureUser(
  process.env.DEMO_STUDENT_EMAIL || 'demo.student@medicalcorp.hn',
  'STUDENT',
  'Ana',
  'Martínez',
)

await ensureUser(
  'demo.coadmin@medicalcorp.hn',
  'CO_ADMIN',
  'María',
  'López',
)

/**
 * Curso demo
 */
const existingCourses = await payload.find({
  collection: 'courses',
  where: {
    slug: {
      equals: 'actualizacion-atencion-medica',
    },
  },
  limit: 1,
  overrideAccess: true,
})

let course = existingCourses.docs[0]

if (!course) {
  course = await payload.create({
    collection: 'courses',
    overrideAccess: true,
    data: {
      title: 'Actualización Profesional en Atención Médica',
      slug: 'actualizacion-atencion-medica',
      summary:
        'Protocolos, comunicación clínica y buenas prácticas para equipos de atención.',
      lifecycleStatus: 'ACTIVE',
      modality: 'ASYNCHRONOUS',
      estimatedHours: 18,
      instructors: [teacher.id],
      objectives: [
        {
          text: 'Aplicar principios actualizados en situaciones profesionales reales.',
        },
        {
          text: 'Reconocer riesgos y oportunidades de mejora.',
        },
      ],
    },
  })
}

/**
 * Matrícula demo
 */
const existingEnrollments = await payload.find({
  collection: 'enrollments',
  where: {
    and: [
      {
        student: {
          equals: student.id,
        },
      },
      {
        course: {
          equals: course.id,
        },
      },
    ],
  },
  limit: 1,
  overrideAccess: true,
})

if (!existingEnrollments.docs[0]) {
  await payload.create({
    collection: 'enrollments',
    overrideAccess: true,
    data: {
      student: student.id,
      course: course.id,
      status: 'ACTIVE',
      progress: 72,
    },
  })
}

/**
 * Módulos y lecciones
 */
for (let weekNumber = 1; weekNumber <= 4; weekNumber += 1) {
  const title = `Semana ${weekNumber}`

  const existingModules = await payload.find({
    collection: 'modules',
    where: {
      and: [
        {
          course: {
            equals: course.id,
          },
        },
        {
          weekNumber: {
            equals: weekNumber,
          },
        },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })

 let courseModule = existingModules.docs[0]

if (!courseModule) {
  courseModule = await payload.create({
    collection: 'modules',
    overrideAccess: true,
    data: {
      course: course.id,
      title,
      weekNumber,
      summary: 'Contenido asincrónico y actividad de aplicación.',
      status: 'PUBLISHED',
    },
  })
}

  const existingLessons = await payload.find({
    collection: 'lessons',
    where: {
      and: [
        {
         module: {
  equals: courseModule.id,
},
        },
        {
          order: {
            equals: 1,
          },
        },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })

  if (!existingLessons.docs[0]) {
    await payload.create({
      collection: 'lessons',
      overrideAccess: true,
      data: {
        module: module.id,
        title: `Clase principal · ${title}`,
        estimatedMinutes: 35,
        order: 1,
        status: 'PUBLISHED',
      },
    })
  }
}

/**
 * Tarea demo
 */
const existingAssignments = await payload.find({
  collection: 'assignments',
  where: {
    title: {
      equals: 'Análisis de caso clínico',
    },
  },
  limit: 1,
  overrideAccess: true,
})

if (!existingAssignments.docs[0]) {
  await payload.create({
    collection: 'assignments',
    overrideAccess: true,
    data: {
      course: course.id,
      title: 'Análisis de caso clínico',
      maxPoints: 20,
      maxAttempts: 2,
      allowLate: true,
      allowStudentDelete: true,
      dueAt: '2026-10-08T23:59:00.000Z',
    },
  })
}

/**
 * Notificación demo.
 *
 * Primero comprobamos si ya existe para que ejecutar el seed varias
 * veces no genere notificaciones duplicadas.
 */
const existingNotifications = await payload.find({
  collection: 'notifications',
  where: {
    and: [
      {
        recipient: {
          equals: student.id,
        },
      },
      {
        title: {
          equals: 'Nueva tarea asignada',
        },
      },
    ],
  },
  limit: 1,
  overrideAccess: true,
})

if (!existingNotifications.docs[0]) {
  await payload.create({
    collection: 'notifications',
    overrideAccess: true,
    data: {
      recipient: student.id,
      type: 'ASSIGNMENT_NEW',
      title: 'Nueva tarea asignada',
      body: 'Análisis de caso clínico · vence el 8 de octubre.',
      href: '/campus/tareas',
    },
  })
}

console.log('Seed completado correctamente.')
console.log(`Super Admin: ${superAdmin.email}`)

process.exit(0)