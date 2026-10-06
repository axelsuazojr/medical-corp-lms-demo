import { getPayload } from 'payload'
import config from './payload.config'

const payload = await getPayload({ config })
const password = process.env.DEMO_ADMIN_PASSWORD
if (!password) throw new Error('Define DEMO_ADMIN_PASSWORD antes de ejecutar el seed.')

async function user(email:string, role:string, firstName:string, lastName:string){
  const existing=await payload.find({collection:'users',where:{email:{equals:email}},limit:1,overrideAccess:true})
  if(existing.docs[0]) return existing.docs[0]
  return payload.create({collection:'users',overrideAccess:true,data:{email,password,firstName,lastName,role,status:'ACTIVE',mustChangePassword:false} as any})
}

const superAdmin=await user(process.env.DEMO_ADMIN_EMAIL||'demo.admin@medicalcorp.hn','SUPER_ADMIN','Sofía','Mendoza')
const teacher=await user(process.env.DEMO_TEACHER_EMAIL||'demo.teacher@medicalcorp.hn','TEACHER','Carlos','Rivera')
const student=await user(process.env.DEMO_STUDENT_EMAIL||'demo.student@medicalcorp.hn','STUDENT','Ana','Martínez')
await user('demo.coadmin@medicalcorp.hn','CO_ADMIN','María','López')

let course=(await payload.find({collection:'courses',where:{slug:{equals:'actualizacion-atencion-medica'}},limit:1,overrideAccess:true})).docs[0]
if(!course){course=await payload.create({collection:'courses',overrideAccess:true,data:{title:'Actualización Profesional en Atención Médica',slug:'actualizacion-atencion-medica',summary:'Protocolos, comunicación clínica y buenas prácticas para equipos de atención.',status:'PUBLISHED',modality:'ASYNCHRONOUS',estimatedHours:18,instructors:[teacher.id],objectives:[{text:'Aplicar principios actualizados en situaciones profesionales reales.'},{text:'Reconocer riesgos y oportunidades de mejora.'}]} as any})}

const enrollment=(await payload.find({collection:'enrollments',where:{and:[{student:{equals:student.id}},{course:{equals:course.id}}]},limit:1,overrideAccess:true})).docs[0]
if(!enrollment) await payload.create({collection:'enrollments',overrideAccess:true,data:{student:student.id,course:course.id,status:'ACTIVE',progress:72} as any})

for(let i=1;i<=4;i++){
  const title=`Semana ${i}`
  let mod=(await payload.find({collection:'modules',where:{and:[{course:{equals:course.id}},{weekNumber:{equals:i}}]},limit:1,overrideAccess:true})).docs[0]
  if(!mod) mod=await payload.create({collection:'modules',overrideAccess:true,data:{course:course.id,title,weekNumber:i,summary:'Contenido asincrónico y actividad de aplicación.',status:'PUBLISHED'} as any})
  const existingLesson=(await payload.find({collection:'lessons',where:{and:[{module:{equals:mod.id}},{order:{equals:1}}]},limit:1,overrideAccess:true})).docs[0]
  if(!existingLesson) await payload.create({collection:'lessons',overrideAccess:true,data:{module:mod.id,title:`Clase principal · ${title}`,estimatedMinutes:35,order:1,status:'PUBLISHED'} as any})
}

const assignment=(await payload.find({collection:'assignments',where:{title:{equals:'Análisis de caso clínico'}},limit:1,overrideAccess:true})).docs[0]
if(!assignment) await payload.create({collection:'assignments',overrideAccess:true,data:{course:course.id,title:'Análisis de caso clínico',maxPoints:20,maxAttempts:2,allowLate:true,allowStudentDelete:true,dueAt:'2026-10-08T23:59:00.000Z'} as any})

await payload.create({collection:'notifications',overrideAccess:true,data:{recipient:student.id,type:'ASSIGNMENT_NEW',title:'Nueva tarea asignada',body:'Análisis de caso clínico · vence el 8 de octubre.',href:'/campus/tareas'} as any}).catch(()=>undefined)

console.log(`Seed listo. Super Admin: ${superAdmin.email}`)
process.exit(0)
