export type CourseStatus = 'Activo' | 'Completado' | 'Próximamente'
export type CourseResource = { title: string; type: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'LINK'; size?: string; description: string }
export type ForumEntry = { author: string; body: string; date: string }
export type CourseWeek = {
  number: number
  title: string
  classTitle: string
  classDescription: string
  resources: CourseResource[]
  assignment: { title: string; instructions: string; due: string; points: number; status: 'Pendiente' | 'Enviada' | 'Calificada'; grade?: string }
  forum: { title: string; instructions: string; closes: string; classmates: ForumEntry[] }
}
export type Course = {
  slug: string
  title: string
  summary: string
  category: string
  duration: string
  instructor: string
  progress: number
  status: CourseStatus
  weeks: number
  coverClass: string
  schedule: string
  students: number
  content: CourseWeek[]
}

const classmates: ForumEntry[] = [
  { author: 'María Fernanda López', body: 'Una instrucción breve y confirmada con el paciente reduce errores y evita interpretaciones distintas entre miembros del equipo.', date: '6 oct · 9:12 AM' },
  { author: 'José Martínez', body: 'También considero clave documentar la información relevante y verificar que el paciente comprendió las indicaciones antes de cerrar la atención.', date: '6 oct · 10:04 AM' },
  { author: 'Daniela Cruz', body: 'La escucha activa y las preguntas abiertas ayudan a detectar dudas que muchas veces no aparecen si la comunicación es únicamente técnica.', date: '6 oct · 11:26 AM' },
]

function makeWeeks(course: string, count: number): CourseWeek[] {
  return Array.from({ length: count }, (_, index) => {
    const n = index + 1
    return {
      number: n,
      title: n === 1 ? 'Fundamentos y contexto' : n === 2 ? 'Aplicación práctica' : n === 3 ? 'Casos y toma de decisiones' : `Integración profesional ${n}`,
      classTitle: `Clase ${n} · ${course}`,
      classDescription: 'Contenido asincrónico con explicación aplicada, ejemplos profesionales y puntos de control para reforzar los conceptos de la semana.',
      resources: [
        { title: `Guía de estudio · Semana ${n}`, type: 'PDF', size: '2.4 MB', description: 'Lectura principal con conceptos, ejemplos y referencias.' },
        { title: `Plantilla de trabajo · Semana ${n}`, type: n % 2 === 0 ? 'XLSX' : 'DOCX', size: n % 2 === 0 ? '420 KB' : '680 KB', description: 'Archivo editable para desarrollar la actividad de aplicación.' },
        { title: `Presentación de apoyo · Semana ${n}`, type: 'PPTX', size: '3.1 MB', description: 'Diapositivas resumidas para repasar la clase.' },
      ],
      assignment: {
        title: n === 1 ? 'Análisis inicial del caso' : `Actividad aplicada · Semana ${n}`,
        instructions: 'Analiza el caso de la semana, identifica el problema principal, sustenta tu criterio con el material del curso y entrega una conclusión breve con una recomendación aplicable. Adjunta un archivo PDF, Word, Excel o imagen según corresponda.',
        due: `${7 + n} oct · 11:59 PM`,
        points: 20,
        status: n === 1 ? 'Calificada' : n === 2 ? 'Enviada' : 'Pendiente',
        grade: n === 1 ? '18 / 20' : undefined,
      },
      forum: {
        title: `Foro · Reflexión profesional ${n}`,
        instructions: 'Publica una participación de al menos 120 palabras respondiendo la pregunta orientadora. Después de enviar tu aporte podrás consultar las participaciones de tus compañeros y continuar la conversación con respeto profesional.',
        closes: `${9 + n} oct · 8:00 PM`,
        classmates,
      },
    }
  })
}

export const courses: Course[] = [
  { slug:'actualizacion-atencion-medica', title:'Actualización Profesional en Atención Médica', summary:'Protocolos, comunicación clínica y buenas prácticas para equipos de atención.', category:'Atención médica', duration:'6 semanas', instructor:'Dra. Andrea Mejía', progress:72, status:'Activo', weeks:6, coverClass:'cover-a', schedule:'Asincrónico · acceso 24/7', students:28, content:makeWeeks('Atención Médica',6) },
  { slug:'bioseguridad-clinica', title:'Bioseguridad Clínica y Prevención de Riesgos', summary:'Principios prácticos de bioseguridad, control de riesgos y cultura preventiva.', category:'Bioseguridad', duration:'4 semanas', instructor:'Dr. Luis Pineda', progress:45, status:'Activo', weeks:4, coverClass:'cover-b', schedule:'Asincrónico · acceso 24/7', students:24, content:makeWeeks('Bioseguridad Clínica',4) },
  { slug:'gestion-calidad-salud', title:'Gestión de Calidad en Servicios de Salud', summary:'Indicadores, mejora continua y herramientas para elevar la experiencia del paciente.', category:'Gestión', duration:'5 semanas', instructor:'Lic. María Flores', progress:100, status:'Completado', weeks:5, coverClass:'cover-c', schedule:'Programa finalizado', students:31, content:makeWeeks('Gestión de Calidad',5) },
  { slug:'comunicacion-clinica', title:'Comunicación Efectiva con Pacientes', summary:'Técnicas de escucha, educación al paciente y comunicación en situaciones sensibles.', category:'Habilidades clínicas', duration:'3 semanas', instructor:'Psic. Carla Reyes', progress:0, status:'Próximamente', weeks:3, coverClass:'cover-d', schedule:'Inicio 19 oct 2026', students:19, content:makeWeeks('Comunicación Clínica',3) },
]

export const tasks = [
  { title:'Análisis de caso clínico', course:'Actualización Profesional en Atención Médica', due:'8 oct · 11:59 PM', points:20, status:'Pendiente' },
  { title:'Checklist de bioseguridad', course:'Bioseguridad Clínica y Prevención de Riesgos', due:'10 oct · 8:00 PM', points:15, status:'Enviada' },
  { title:'Foro: calidad percibida', course:'Gestión de Calidad en Servicios de Salud', due:'Completada', points:10, status:'Calificada' },
]

export const grades = [
  { course:'Atención Médica', activity:'Quiz diagnóstico', score:'18 / 20', percent:90, status:'Calificada' },
  { course:'Atención Médica', activity:'Foro semana 2', score:'9 / 10', percent:90, status:'Calificada' },
  { course:'Bioseguridad', activity:'Actividad 1', score:'14 / 15', percent:93, status:'Calificada' },
  { course:'Gestión de Calidad', activity:'Proyecto final', score:'46 / 50', percent:92, status:'Calificada' },
]

export const webinars = [
  { title:'Actualización 2026: seguridad del paciente', date:'15 octubre 2026', time:'6:30 PM', speaker:'Dra. Sofía Cáceres', status:'Próximo' },
  { title:'IA responsable en entornos de salud', date:'29 octubre 2026', time:'7:00 PM', speaker:'Ing. Marco Zelaya', status:'Próximo' },
  { title:'Comunicación efectiva en equipos clínicos', date:'Grabación disponible', time:'42 min', speaker:'Psic. Daniela Cruz', status:'Grabado' },
]

export const notifications = [
  { title:'Nueva tarea asignada', body:'Análisis de caso clínico · vence el 8 de octubre.', age:'Hace 12 min' },
  { title:'Nueva calificación', body:'Tu actividad “Foro semana 2” fue calificada con 9/10.', age:'Hace 2 h' },
  { title:'Nuevo recurso', body:'Se agregó “Guía de comunicación clínica.pdf”.', age:'Ayer' },
]

export const teacherStudents = [
  { id:'s1', name:'Ana Martínez', email:'ana.martinez@medicalcorp.hn', progress:72, average:91, attendance:94, lastAccess:'6 oct · 12:42 PM' },
  { id:'s2', name:'María Fernanda López', email:'maria.lopez@medicalcorp.hn', progress:84, average:95, attendance:98, lastAccess:'6 oct · 11:58 AM' },
  { id:'s3', name:'José Martínez', email:'jose.martinez@medicalcorp.hn', progress:58, average:86, attendance:89, lastAccess:'5 oct · 8:17 PM' },
  { id:'s4', name:'Daniela Cruz', email:'daniela.cruz@medicalcorp.hn', progress:66, average:90, attendance:92, lastAccess:'6 oct · 9:24 AM' },
]

export const teacherEvents = [
  { type:'Tarea', title:'Análisis de caso clínico', course:'Atención Médica', start:'6 oct · 8:00 AM', end:'8 oct · 11:59 PM' },
  { type:'Foro', title:'Comunicación y seguridad del paciente', course:'Atención Médica', start:'7 oct · 8:00 AM', end:'10 oct · 8:00 PM' },
  { type:'Tarea', title:'Checklist de bioseguridad', course:'Bioseguridad', start:'5 oct · 8:00 AM', end:'10 oct · 8:00 PM' },
]
