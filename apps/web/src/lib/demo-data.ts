export type Course = {
  slug: string; title: string; summary: string; category: string; duration: string; instructor: string; progress: number; status: 'Activo' | 'Completado' | 'Próximamente'; weeks: number; coverClass: string
}

export const courses: Course[] = [
  { slug:'actualizacion-atencion-medica', title:'Actualización Profesional en Atención Médica', summary:'Protocolos, comunicación clínica y buenas prácticas para equipos de atención.', category:'Atención médica', duration:'6 semanas', instructor:'Dra. Andrea Mejía', progress:72, status:'Activo', weeks:6, coverClass:'cover-a' },
  { slug:'bioseguridad-clinica', title:'Bioseguridad Clínica y Prevención de Riesgos', summary:'Principios prácticos de bioseguridad, control de riesgos y cultura preventiva.', category:'Bioseguridad', duration:'4 semanas', instructor:'Dr. Luis Pineda', progress:45, status:'Activo', weeks:4, coverClass:'cover-b' },
  { slug:'gestion-calidad-salud', title:'Gestión de Calidad en Servicios de Salud', summary:'Indicadores, mejora continua y herramientas para elevar la experiencia del paciente.', category:'Gestión', duration:'5 semanas', instructor:'Lic. María Flores', progress:100, status:'Completado', weeks:5, coverClass:'cover-c' },
  { slug:'comunicacion-clinica', title:'Comunicación Efectiva con Pacientes', summary:'Técnicas de escucha, educación al paciente y comunicación en situaciones sensibles.', category:'Habilidades clínicas', duration:'3 semanas', instructor:'Psic. Carla Reyes', progress:0, status:'Próximamente', weeks:3, coverClass:'cover-d' },
]

export const tasks = [
  { title:'Análisis de caso clínico', course:'Actualización Profesional en Atención Médica', due:'8 oct · 11:59 PM', points:20, status:'Pendiente' },
  { title:'Checklist de bioseguridad', course:'Bioseguridad Clínica y Prevención de Riesgos', due:'10 oct · 8:00 PM', points:15, status:'En progreso' },
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
